"""API routes for case CRUD operations."""
from fastapi import APIRouter, HTTPException, Query
from typing import List
from app.models import CaseCreate, CaseResponse
from app.db import case_store
from app.db.case_store import build_blob_text
from app.services.embeddings import embed_text

router = APIRouter(prefix="/cases", tags=["cases"])


@router.post("", response_model=CaseResponse, status_code=201)
async def create_case(case: CaseCreate):
    """Create a new case."""
    case_dict = case.model_dump()
    
    # Generate embedding
    blob_text = build_blob_text(case_dict)
    vector = embed_text(blob_text)
    
    # Insert case
    case_id = case_store.insert_case_with_cursor(
        case=case_dict,
        blob_text=blob_text,
        embed_model="text-embedding-3-small",
        embed_dims=1536,
        vector=vector
    )
    
    # Fetch created case
    created_case = case_store.get_case_by_id(case_id)
    if not created_case:
        raise HTTPException(status_code=500, detail="Failed to create case")
    
    # Convert to response format
    created_case['smoker'] = bool(created_case['smoker'])
    created_case['synthetic'] = bool(created_case['synthetic'])
    
    return CaseResponse(**created_case)


@router.get("", response_model=List[CaseResponse])
async def list_cases(
    limit: int = Query(default=100, ge=1, le=1000),
    offset: int = Query(default=0, ge=0)
):
    """List all cases."""
    cases = case_store.get_all_cases(limit=limit, offset=offset)
    
    # Convert to response format
    result = []
    for case in cases:
        case['smoker'] = bool(case['smoker'])
        case['synthetic'] = bool(case['synthetic'])
        result.append(CaseResponse(**case))
    
    return result


@router.get("/{case_id}", response_model=CaseResponse)
async def get_case(case_id: int):
    """Get case by ID."""
    case = case_store.get_case_by_id(case_id)
    
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
    
    case['smoker'] = bool(case['smoker'])
    case['synthetic'] = bool(case['synthetic'])
    
    return CaseResponse(**case)

