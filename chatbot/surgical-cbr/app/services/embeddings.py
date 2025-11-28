"""OpenAI embeddings service."""
from typing import List
from openai import OpenAI
from app.config import OPENAI_API_KEY, OPENAI_EMBED_MODEL


client = OpenAI(api_key=OPENAI_API_KEY) if OPENAI_API_KEY else None


def embed_text(text: str) -> List[float]:
    """
    Generate embedding for text using OpenAI.
    
    Args:
        text: Input text to embed
        
    Returns:
        List of floats representing the embedding vector
    """
    if not client:
        raise ValueError("OpenAI API key not configured. Set OPENAI_API_KEY environment variable.")
    
    response = client.embeddings.create(
        model=OPENAI_EMBED_MODEL,
        input=text
    )
    
    return response.data[0].embedding

