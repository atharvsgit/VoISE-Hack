"""Database operations for cases (SQLite + Qdrant)."""
import sqlite3
import json
from typing import Dict, List, Optional, Any
from pathlib import Path
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
from app.config import DB_PATH, SCHEMA_PATH, QDRANT_HOST, QDRANT_PORT, QDRANT_COLLECTION


def init_sqlite():
    """Initialize SQLite database with schema."""
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    
    conn = sqlite3.connect(str(DB_PATH))
    cursor = conn.cursor()
    
    # Read and execute schema
    with open(SCHEMA_PATH, 'r') as f:
        schema_sql = f.read()
    
    cursor.executescript(schema_sql)
    conn.commit()
    conn.close()
    
    print(f"SQLite database initialized at {DB_PATH}")


def init_qdrant():
    """Initialize Qdrant collection."""
    client = QdrantClient(host=QDRANT_HOST, port=QDRANT_PORT)
    
    # Check if collection exists
    collections = client.get_collections().collections
    collection_names = [c.name for c in collections]
    
    if QDRANT_COLLECTION not in collection_names:
        client.create_collection(
            collection_name=QDRANT_COLLECTION,
            vectors_config=VectorParams(
                size=1536,  # OpenAI text-embedding-3-small dimension
                distance=Distance.COSINE
            )
        )
        print(f"Qdrant collection '{QDRANT_COLLECTION}' created")
    else:
        print(f"Qdrant collection '{QDRANT_COLLECTION}' already exists")


def get_db_connection():
    """Get SQLite database connection."""
    return sqlite3.connect(str(DB_PATH), check_same_thread=False)


def build_blob_text(case: Dict[str, Any]) -> str:
    """Build blob text from case dictionary for embedding."""
    parts = [
        f"Title: {case.get('title', '')}",
        f"Age: {case.get('age', '')}",
        f"Sex: {case.get('sex', '')}",
        f"BMI: {case.get('bmi', '')}",
        f"Smoker: {'Yes' if case.get('smoker') else 'No'}",
        f"Defect Length: {case.get('defect_length_cm', '')} cm",
        f"Donor Site: {case.get('donor_site', '')}",
        f"Technique: {case.get('technique_summary', '')}",
    ]
    
    if case.get('complications'):
        parts.append(f"Complications: {case.get('complications')}")
    
    if case.get('notes'):
        parts.append(f"Notes: {case.get('notes')}")
    
    if case.get('imaging_meta'):
        parts.append(f"Imaging: {case.get('imaging_meta')}")
    
    return "\n".join(parts)


def insert_case_with_cursor(
    case: Dict[str, Any],
    blob_text: str,
    embed_model: str,
    embed_dims: int,
    vector: Optional[List[float]] = None
):
    """
    Insert case into SQLite using cursor and upsert to Qdrant if vector provided.
    
    Args:
        case: Case dictionary with all fields
        blob_text: Text representation for embedding
        embed_model: Embedding model name
        embed_dims: Embedding dimensions
        vector: Optional embedding vector for Qdrant
    """
    conn = get_db_connection()
    cursor = conn.cursor()
    
    case_id_provided = case.get('case_id') is not None
    
    # Insert into SQLite
    if case_id_provided:
        cursor.execute("""
            INSERT INTO cases (
                case_id, title, age, sex, bmi, smoker, defect_length_cm,
                donor_site, technique_summary, complications, notes,
                outcome_rating, imaging_meta, synthetic, blob_text,
                embed_model, embed_dims
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            case.get('case_id'),
            case.get('title'),
            case.get('age'),
            case.get('sex'),
            case.get('bmi'),
            1 if case.get('smoker') else 0,
            case.get('defect_length_cm'),
            case.get('donor_site'),
            case.get('technique_summary'),
            case.get('complications'),
            case.get('notes'),
            case.get('outcome_rating'),
            case.get('imaging_meta'),
            1 if case.get('synthetic', False) else 0,
            blob_text,
            embed_model,
            embed_dims
        ))
        case_id = case.get('case_id')
    else:
        cursor.execute("""
            INSERT INTO cases (
                title, age, sex, bmi, smoker, defect_length_cm,
                donor_site, technique_summary, complications, notes,
                outcome_rating, imaging_meta, synthetic, blob_text,
                embed_model, embed_dims
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            case.get('title'),
            case.get('age'),
            case.get('sex'),
            case.get('bmi'),
            1 if case.get('smoker') else 0,
            case.get('defect_length_cm'),
            case.get('donor_site'),
            case.get('technique_summary'),
            case.get('complications'),
            case.get('notes'),
            case.get('outcome_rating'),
            case.get('imaging_meta'),
            1 if case.get('synthetic', False) else 0,
            blob_text,
            embed_model,
            embed_dims
        ))
        case_id = cursor.lastrowid
    
    conn.commit()
    
    # Upsert to Qdrant if vector provided
    if vector is not None:
        client = QdrantClient(host=QDRANT_HOST, port=QDRANT_PORT)
        
        payload = {
            "case_id": case_id,
            "title": case.get('title'),
            "age": case.get('age'),
            "sex": case.get('sex'),
            "bmi": case.get('bmi'),
            "smoker": case.get('smoker', False),
            "defect_length_cm": case.get('defect_length_cm'),
            "donor_site": case.get('donor_site'),
            "technique_summary": case.get('technique_summary'),
            "complications": case.get('complications'),
            "notes": case.get('notes'),
            "outcome_rating": case.get('outcome_rating'),
            "blob_text": blob_text
        }
        
        point = PointStruct(
            id=case_id,
            vector=vector,
            payload=payload
        )
        
        client.upsert(
            collection_name=QDRANT_COLLECTION,
            points=[point]
        )
        print(f"Upserted case {case_id} to Qdrant")
    
    conn.close()
    return case_id


def batch_seed_from_json(seed_file: Path, embed_func):
    """
    Batch seed cases from JSON file.
    
    Args:
        seed_file: Path to seed JSON file
        embed_func: Function to generate embeddings (text -> List[float])
    """
    with open(seed_file, 'r') as f:
        cases = json.load(f)
    
    for case in cases:
        blob_text = build_blob_text(case)
        vector = embed_func(blob_text)
        
        insert_case_with_cursor(
            case=case,
            blob_text=blob_text,
            embed_model="text-embedding-3-small",
            embed_dims=1536,
            vector=vector
        )
        
        print(f"Seeded case {case.get('case_id', 'unknown')}")


def get_case_by_id(case_id: int) -> Optional[Dict[str, Any]]:
    """Get case by ID from SQLite."""
    conn = get_db_connection()
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM cases WHERE case_id = ?", (case_id,))
    row = cursor.fetchone()
    conn.close()
    
    if row:
        return dict(row)
    return None


def get_all_cases(limit: int = 100, offset: int = 0) -> List[Dict[str, Any]]:
    """Get all cases from SQLite."""
    conn = get_db_connection()
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute(
        "SELECT * FROM cases ORDER BY created_at DESC LIMIT ? OFFSET ?",
        (limit, offset)
    )
    rows = cursor.fetchall()
    conn.close()
    
    return [dict(row) for row in rows]

