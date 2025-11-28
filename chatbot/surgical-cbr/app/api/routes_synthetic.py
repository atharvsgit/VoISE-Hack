"""API routes for synthetic case generation."""
from fastapi import APIRouter, HTTPException
from app.models import SyntheticCaseRequest, CaseResponse
from app.services.synthetic import generate_synthetic_case
from app.db import case_store
from app.db.case_store import build_blob_text
from app.services.embeddings import embed_text
from app.db.case_store import build_blob_text

router = APIRouter(prefix="/dream", tags=["synthetic"])


@router.post("", response_model=CaseResponse, status_code=201)
async def generate_synthetic(request: SyntheticCaseRequest):
    """Generate a synthetic case using Gemini."""
    try:
        # Generate synthetic case
        case_dict = generate_synthetic_case(
            description=request.description,
            constraints=request.constraints
        )
        
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
            raise HTTPException(status_code=500, detail="Failed to create synthetic case")
        
        # Convert to response format
        created_case['smoker'] = bool(created_case['smoker'])
        created_case['synthetic'] = bool(created_case['synthetic'])
        
        return CaseResponse(**created_case)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

