# Surgical CBR API

A FastAPI backend for Case-Based Reasoning (CBR) surgical pre-planning tool.

## Features

- **Hybrid Retrieval**: Combines vector similarity (embeddings) with feature-based scoring
- **LLM-Powered Recommendations**: Uses Google Gemini for generating surgical recommendations
- **Dual Storage**: SQLite for structured data, Qdrant for vector search
- **Synthetic Case Generation**: Dream mode for generating synthetic cases
- **RESTful API**: Full CRUD operations for cases

## Project Structure

```
surgical-cbr/
├── app/
│   ├── main.py              # FastAPI app entry point
│   ├── config.py            # Configuration settings
│   ├── models.py            # Pydantic models
│   ├── db/
│   │   ├── schema.sql       # SQLite schema
│   │   └── case_store.py    # Database operations
│   ├── services/
│   │   ├── embeddings.py    # OpenAI embeddings
│   │   ├── retrieval.py     # Hybrid retrieval
│   │   ├── llm_client.py    # Gemini LLM client
│   │   └── synthetic.py     # Synthetic case generation
│   ├── api/
│   │   ├── routes_cases.py  # Case CRUD routes
│   │   ├── routes_query.py  # Query routes
│   │   ├── routes_synthetic.py  # Synthetic routes
│   │   └── routes_admin.py # Admin routes
│   └── utils/
│       ├── mermaid.py       # Mermaid utilities
│       └── validators.py    # Validation utilities
├── seed/
│   └── seed_cases.json      # Seed data
├── scripts/
│   └── seed_db.py          # Seeding script
├── requirements.txt
└── README.md
```

## Setup

1. **Install dependencies**:
```bash
pip install -r requirements.txt
```

2. **Set environment variables**:
Create a `.env` file in the project root:
```
OPENAI_API_KEY=your_openai_key
GEMINI_API_KEY=your_gemini_key
QDRANT_HOST=localhost
QDRANT_PORT=6333
```

3. **Start Qdrant** (if running locally):
```bash
docker run -p 6333:6333 qdrant/qdrant
```

4. **Seed the database**:
```bash
python scripts/seed_db.py
```

5. **Run the API**:
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

## API Endpoints

### Health Check
- `GET /api/v1/health` - Health check endpoint

### Cases
- `POST /api/v1/cases` - Create a new case
- `GET /api/v1/cases` - List all cases
- `GET /api/v1/cases/{case_id}` - Get case by ID

### Query
- `POST /api/v1/query` - Query cases with hybrid retrieval and LLM recommendation

### Synthetic Cases
- `POST /api/v1/dream` - Generate a synthetic case

## Usage Examples

### Query Cases
```bash
curl -X POST "http://localhost:8000/api/v1/query" \
  -H "Content-Type: application/json" \
  -d '{
    "user_text": "Patient with 10cm defect on lower leg",
    "structured_profile": {
      "age": 50,
      "sex": "M",
      "bmi": 25.0,
      "smoker": false,
      "defect_length_cm": 10.0,
      "donor_site": "anterolateral thigh"
    },
    "top_k": 3
  }'
```

### Create Case
```bash
curl -X POST "http://localhost:8000/api/v1/cases" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Case",
    "age": 45,
    "sex": "M",
    "bmi": 24.5,
    "smoker": false,
    "defect_length_cm": 8.5,
    "donor_site": "radial forearm",
    "technique_summary": "Radial forearm free flap",
    "outcome_rating": 4
  }'
```

### Generate Synthetic Case
```bash
curl -X POST "http://localhost:8000/api/v1/dream" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Complex hand reconstruction case",
    "constraints": {
      "age_range": [30, 50],
      "bmi_range": [20, 30]
    }
  }'
```

## Retrieval Algorithm

The hybrid retrieval combines:
- **Feature Score (60%)**: Based on defect length, donor site match, smoker status, BMI
- **Embedding Score (40%)**: Cosine similarity of text embeddings

Final score = 0.6 × feature_score + 0.4 × embedding_score

## Documentation

API documentation is available at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## License

MIT

