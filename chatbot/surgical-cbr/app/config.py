"""Configuration settings for the surgical CBR application."""
import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

# Base directory
BASE_DIR = Path(__file__).parent.parent

# Database paths
DB_DIR = BASE_DIR / "app" / "db"
DB_PATH = DB_DIR / "cases.db"
SCHEMA_PATH = DB_DIR / "schema.sql"

# Qdrant settings
QDRANT_PATH = os.getenv("QDRANT_PATH", str(BASE_DIR / "qdrant_data"))
QDRANT_HOST = os.getenv("QDRANT_HOST")
QDRANT_PORT = int(os.getenv("QDRANT_PORT", "6333"))
QDRANT_COLLECTION = os.getenv("QDRANT_COLLECTION", "surgical_cases")

# Gemini settings
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "models/gemini-2.0-flash")

# Embedding settings (Gemini)
EMBED_MODEL = os.getenv("EMBED_MODEL", "models/text-embedding-004")
EMBED_DIMS = int(os.getenv("EMBED_DIMS", "768"))

# Retrieval settings
RETRIEVAL_TOP_K = 20
RETRIEVAL_FINAL_K = 3
FEATURE_WEIGHT = 0.6
EMBEDDING_WEIGHT = 0.4

