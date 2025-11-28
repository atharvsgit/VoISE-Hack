"""Hybrid retrieval service (vector + feature scoring)."""
from typing import List, Dict, Any
from app.config import (
    QDRANT_COLLECTION,
    FEATURE_WEIGHT, EMBEDDING_WEIGHT
)
from app.services.qdrant_client import get_qdrant_client
from app.services.embeddings import embed_text
from app.db.case_store import build_blob_text


def retrieve_top_k(
    user_text: str,
    structured_profile: Dict[str, Any],
    top_k: int = 3
) -> List[Dict[str, Any]]:
    """
    Retrieve top-k cases using hybrid scoring (feature + embedding).
    
    Args:
        user_text: User query text
        structured_profile: Dictionary with age, sex, bmi, smoker, defect_length_cm, donor_site
        top_k: Number of top cases to return
        
    Returns:
        List of case dictionaries sorted by final_score (highest first)
    """
    # Build query blob
    query_blob = build_blob_text(structured_profile)
    if user_text:
        query_blob = f"{user_text}\n{query_blob}"
    
    # Embed query
    query_vector = embed_text(query_blob)
    
    # Query Qdrant for top 20
    client = get_qdrant_client()
    
    search_response = client.query_points(
        collection_name=QDRANT_COLLECTION,
        query=query_vector,
        limit=20,
        with_payload=True
    )
    search_results = search_response.points
    
    # Compute hybrid scores
    scored_cases = []
    
    for result in search_results:
        case = result.payload
        embedding_score = result.score
        
        # Compute feature score
        feature_score = compute_feature_score(case, structured_profile)
        
        # Normalize scores to 0-1
        normalized_embedding = max(0, min(1, embedding_score))  # Cosine similarity already 0-1
        normalized_feature = max(0, min(1, feature_score))
        
        # Final hybrid score
        final_score = (
            FEATURE_WEIGHT * normalized_feature +
            EMBEDDING_WEIGHT * normalized_embedding
        )
        
        case['final_score'] = final_score
        case['embedding_score'] = normalized_embedding
        case['feature_score'] = normalized_feature
        
        scored_cases.append(case)
    
    # Sort by final_score descending
    scored_cases.sort(key=lambda x: x['final_score'], reverse=True)
    
    return scored_cases[:top_k]


def compute_feature_score(case: Dict[str, Any], profile: Dict[str, Any]) -> float:
    """
    Compute feature-based similarity score.
    
    Scoring components:
    - Defect length closeness (normalized difference)
    - Donor site match (exact = 1.0, else 0.0)
    - Smoker match (exact = 1.0, else 0.0)
    - BMI closeness (normalized difference)
    
    Returns:
        Feature score between 0 and 1
    """
    score_components = []
    weights = []
    
    # Defect length closeness
    if profile.get('defect_length_cm') is not None and case.get('defect_length_cm'):
        defect_diff = abs(profile['defect_length_cm'] - case['defect_length_cm'])
        # Normalize: assume max difference of 20cm gives score 0
        defect_score = max(0, 1 - (defect_diff / 20.0))
        score_components.append(defect_score)
        weights.append(0.3)
    
    # Donor site match
    if profile.get('donor_site') and case.get('donor_site'):
        donor_match = 1.0 if profile['donor_site'].lower() == case['donor_site'].lower() else 0.0
        score_components.append(donor_match)
        weights.append(0.3)
    
    # Smoker match
    if profile.get('smoker') is not None and case.get('smoker') is not None:
        smoker_match = 1.0 if profile['smoker'] == case['smoker'] else 0.0
        score_components.append(smoker_match)
        weights.append(0.2)
    
    # BMI closeness
    if profile.get('bmi') is not None and case.get('bmi'):
        bmi_diff = abs(profile['bmi'] - case['bmi'])
        # Normalize: assume max difference of 15 gives score 0
        bmi_score = max(0, 1 - (bmi_diff / 15.0))
        score_components.append(bmi_score)
        weights.append(0.2)
    
    # Weighted average
    if not score_components:
        return 0.0
    
    total_weight = sum(weights[:len(score_components)])
    if total_weight == 0:
        return 0.0
    
    weighted_sum = sum(score * weight for score, weight in zip(score_components, weights))
    return weighted_sum / total_weight

