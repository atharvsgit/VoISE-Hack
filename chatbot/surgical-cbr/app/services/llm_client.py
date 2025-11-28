"""Gemini LLM client for case-based reasoning."""
import json
from typing import List, Dict, Any
import google.generativeai as genai
from app.config import GEMINI_API_KEY, GEMINI_MODEL


if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)


SYSTEM_PROMPT = """You are a clinical case-based reasoning assistant for reconstructive surgery.
Be conservative. Cite case IDs. Output sections:
1) Similarity bullets for each case
2) Recommended technique + patient-specific adjustment
3) Contraindication red flags with confidence %
4) Next steps (3 bullets)
5) Mermaid.js diagram inside a mermaid fenced block
Follow strictly."""


def generate_recommendation(
    new_profile_json: str,
    retrieved_cases: List[Dict[str, Any]]
) -> str:
    """
    Generate recommendation using Gemini LLM.
    
    Args:
        new_profile_json: JSON string of new patient profile
        retrieved_cases: List of retrieved case dictionaries
        
    Returns:
        LLM-generated recommendation text
    """
    if not GEMINI_API_KEY:
        raise ValueError("GEMINI_API_KEY not configured")
    
    # Format retrieved cases
    case_texts = []
    for i, case in enumerate(retrieved_cases[:3], 1):
        case_json = json.dumps({
            "case_id": case.get("case_id"),
            "title": case.get("title"),
            "bmi": case.get("bmi"),
            "smoker": case.get("smoker"),
            "defect_length_cm": case.get("defect_length_cm"),
            "donor_site": case.get("donor_site"),
            "technique_summary": case.get("technique_summary"),
            "complications": case.get("complications"),
            "notes": case.get("notes")
        }, indent=2)
        case_texts.append(f"Case {i}:\n{case_json}")
    
    user_prompt = f"""New patient profile:
{new_profile_json}

Top retrieved cases (case_id, title, BMI, smoker, defect_length_cm, donor_site, technique_summary, complications, notes):

{chr(10).join(case_texts)}

Instructions:
- Reference cases by ID.
- Mark speculative reasoning as (speculative).
- Mermaid diagram must start with mermaid and show:
  Patient -> Case -> Risks -> Adjustment
"""
    
    model = genai.GenerativeModel(GEMINI_MODEL)
    
    full_prompt = f"{SYSTEM_PROMPT}\n\n{user_prompt}"
    
    response = model.generate_content(full_prompt)
    
    return response.text


def extract_mermaid(text: str) -> str:
    """Extract mermaid diagram from LLM response."""
    import re
    
    # Look for mermaid code blocks
    pattern = r'```mermaid\s*\n(.*?)\n```'
    matches = re.findall(pattern, text, re.DOTALL)
    
    if matches:
        return matches[0].strip()
    
    # Fallback: look for mermaid without code fences
    pattern2 = r'mermaid\s*\n(.*?)(?=\n\n|\Z)'
    matches2 = re.findall(pattern2, text, re.DOTALL)
    
    if matches2:
        return matches2[0].strip()
    
    return ""


def extract_flags(text: str) -> List[Dict[str, Any]]:
    """Extract red flags from LLM response."""
    import re
    
    flags = []
    
    # Look for red flag patterns
    flag_pattern = r'(?:red flag|contraindication|risk|warning)[^:]*:?\s*([^\\n]+?)(?:\s*\((\d+)%\))?'
    matches = re.findall(flag_pattern, text, re.IGNORECASE)
    
    for match in matches:
        flag_text = match[0].strip()
        confidence = int(match[1]) if match[1] else None
        
        flags.append({
            "text": flag_text,
            "confidence": confidence
        })
    
    return flags

