"""Pydantic models for request/response validation."""
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime


class CaseBase(BaseModel):
    """Base case model."""
    title: str
    age: int
    sex: str
    bmi: float
    smoker: bool
    defect_length_cm: float
    donor_site: str
    technique_summary: str
    complications: Optional[str] = None
    notes: Optional[str] = None
    outcome_rating: int = Field(ge=1, le=5)
    imaging_meta: Optional[str] = None


class CaseCreate(CaseBase):
    """Case creation model."""
    pass


class CaseResponse(CaseBase):
    """Case response model."""
    case_id: int
    synthetic: bool = False
    created_at: datetime

    class Config:
        from_attributes = True


class QueryRequest(BaseModel):
    """Query request model."""
    user_text: str
    structured_profile: Dict[str, Any] = Field(
        default_factory=lambda: {
            "age": None,
            "sex": None,
            "bmi": None,
            "smoker": None,
            "defect_length_cm": None,
            "donor_site": None
        }
    )
    top_k: int = 3


class QueryResponse(BaseModel):
    """Query response model."""
    top_matches: List[Dict[str, Any]]
    llm_text: str
    mermaid: Optional[str] = None
    flags: List[Dict[str, Any]] = Field(default_factory=list)


class SyntheticCaseRequest(BaseModel):
    """Synthetic case generation request."""
    description: str
    constraints: Optional[Dict[str, Any]] = None

