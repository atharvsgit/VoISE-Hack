"""Mermaid diagram utilities."""
from typing import Dict, Any


def generate_case_flow_mermaid(case: Dict[str, Any]) -> str:
    """Generate a mermaid diagram for case flow."""
    return f"""graph TD
    A[Patient Profile] --> B[Case {case.get('case_id')}]
    B --> C[Risks Assessment]
    C --> D[Technique Adjustment]
    D --> E[Recommendation]
"""

