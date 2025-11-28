"""API routes for query/retrieval operations."""
from fastapi import APIRouter, HTTPException
from app.models import QueryRequest, QueryResponse
from app.services.retrieval import retrieve_top_k
from app.services.llm_client import generate_recommendation, extract_mermaid, extract_flags
import json

router = APIRouter(prefix="/query", tags=["query"])


@router.post("", response_model=QueryResponse)
async def query_cases(request: QueryRequest):
    """Query cases using hybrid retrieval and generate LLM recommendation."""
    try:
        # Retrieve top cases
        top_matches = retrieve_top_k(
            user_text=request.user_text,
            structured_profile=request.structured_profile,
            top_k=request.top_k
        )
        
        if not top_matches:
            raise HTTPException(
                status_code=404,
                detail="No matching cases found"
            )
        
        # Prepare profile JSON for LLM
        profile_json = json.dumps(request.structured_profile, indent=2)
        
        # Generate LLM recommendation
        llm_text = generate_recommendation(
            new_profile_json=profile_json,
            retrieved_cases=top_matches
        )
        
        # Extract mermaid diagram
        mermaid = extract_mermaid(llm_text)
        
        # Extract flags
        flags = extract_flags(llm_text)
        
        # Format top_matches for response (remove internal fields)
        formatted_matches = []
        for match in top_matches:
            formatted_match = {
                "case_id": match.get("case_id"),
                "title": match.get("title"),
                "age": match.get("age"),
                "sex": match.get("sex"),
                "bmi": match.get("bmi"),
                "smoker": match.get("smoker"),
                "defect_length_cm": match.get("defect_length_cm"),
                "donor_site": match.get("donor_site"),
                "technique_summary": match.get("technique_summary"),
                "complications": match.get("complications"),
                "notes": match.get("notes"),
                "outcome_rating": match.get("outcome_rating"),
                "final_score": match.get("final_score"),
                "embedding_score": match.get("embedding_score"),
                "feature_score": match.get("feature_score")
            }
            formatted_matches.append(formatted_match)
        
        return QueryResponse(
            top_matches=formatted_matches,
            llm_text=llm_text,
            mermaid=mermaid if mermaid else None,
            flags=flags
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

