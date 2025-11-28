"""Admin and health check routes."""
from fastapi import APIRouter
from typing import Dict

router = APIRouter(prefix="/health", tags=["admin"])


@router.get("")
async def health_check() -> Dict[str, str]:
    """Health check endpoint."""
    return {"status": "ok"}

