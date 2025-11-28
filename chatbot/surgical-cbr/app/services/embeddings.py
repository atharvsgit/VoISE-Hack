"""Gemini embeddings service."""
from typing import List
import google.generativeai as genai
from app.config import GEMINI_API_KEY, EMBED_MODEL


if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)


def embed_text(text: str) -> List[float]:
    """
    Generate embedding for text using Gemini embeddings.
    
    Args:
        text: Input text to embed
        
    Returns:
        List of floats representing the embedding vector
    """
    if not GEMINI_API_KEY:
        raise ValueError("GEMINI_API_KEY not configured. Set GEMINI_API_KEY environment variable.")
    
    response = genai.embed_content(
        model=EMBED_MODEL,
        content=text,
        task_type="SEMANTIC_SIMILARITY"
    )
    
    return response["embedding"]

