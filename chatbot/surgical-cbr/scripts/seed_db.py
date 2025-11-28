"""Script to seed database from JSON file."""
import sys
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from app.db import case_store
from app.services.embeddings import embed_text
from app.config import BASE_DIR


def main():
    """Seed database from seed_cases.json."""
    seed_file = BASE_DIR / "seed" / "seed_cases.json"
    
    if not seed_file.exists():
        print(f"Error: Seed file not found at {seed_file}")
        return
    
    print("Initializing database...")
    case_store.init_sqlite()
    case_store.init_qdrant()
    
    print(f"Seeding cases from {seed_file}...")
    case_store.batch_seed_from_json(seed_file, embed_text)
    
    print("Seeding complete!")


if __name__ == "__main__":
    main()

