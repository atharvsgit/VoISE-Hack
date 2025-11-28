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
QDRANT_HOST = os.getenv("QDRANT_HOST", "localhost")
QDRANT_PORT = int(os.getenv("QDRANT_PORT", "6333"))
QDRANT_COLLECTION = os.getenv("QDRANT_COLLECTION", "surgical_cases")

# OpenAI settings
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
OPENAI_EMBED_MODEL = "text-embedding-3-small"
OPENAI_EMBED_DIMS = 1536

# Gemini settings
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-pro")

# Retrieval settings
RETRIEVAL_TOP_K = 20
RETRIEVAL_FINAL_K = 3
FEATURE_WEIGHT = 0.6
EMBEDDING_WEIGHT = 0.4

