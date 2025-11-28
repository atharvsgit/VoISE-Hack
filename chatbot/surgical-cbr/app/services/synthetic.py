"""Synthetic case generation service."""
import json
import google.generativeai as genai
from typing import Dict, Any
from app.config import GEMINI_API_KEY, GEMINI_MODEL


if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)


def generate_synthetic_case(
    description: str,
    constraints: Dict[str, Any] = None
) -> Dict[str, Any]:
    """
    Generate a synthetic case using Gemini.
    
    Args:
        description: Description of the case to generate
        constraints: Optional constraints (age_range, bmi_range, etc.)
        
    Returns:
        Dictionary representing a synthetic case
    """
    if not GEMINI_API_KEY:
        raise ValueError("GEMINI_API_KEY not configured")
    
    prompt = f"""Generate a realistic surgical case for reconstructive surgery pre-planning.

Description: {description}

Constraints: {json.dumps(constraints) if constraints else "None"}

Generate a JSON object with these exact fields:
{{
    "case_id": null,
    "title": "string",
    "age": integer (25-80),
    "sex": "M" or "F",
    "bmi": float (18-35),
    "smoker": boolean,
    "defect_length_cm": float (1-30),
    "donor_site": "string (e.g., 'anterolateral thigh', 'latissimus dorsi', 'radial forearm')",
    "technique_summary": "string (detailed surgical technique)",
    "complications": "string or null",
    "notes": "string or null",
    "outcome_rating": integer (1-5),
    "imaging_meta": "string or null",
    "synthetic": true
}}

Return ONLY valid JSON, no markdown formatting, no explanations."""

    model = genai.GenerativeModel(GEMINI_MODEL)
    response = model.generate_content(prompt)
    
    # Extract JSON from response
    response_text = response.text.strip()
    
    # Remove markdown code blocks if present
    if response_text.startswith("```"):
        response_text = response_text.split("```")[1]
        if response_text.startswith("json"):
            response_text = response_text[4:]
        response_text = response_text.strip()
    
    case = json.loads(response_text)
    case['synthetic'] = True
    
    return case

