"""Validation utilities."""
from typing import Dict, Any


def validate_case_data(data: Dict[str, Any]) -> bool:
    """Validate case data structure."""
    required_fields = [
        'title', 'age', 'sex', 'bmi', 'smoker',
        'defect_length_cm', 'donor_site', 'technique_summary'
    ]
    
    for field in required_fields:
        if field not in data:
            return False
    
    return True


def validate_profile(profile: Dict[str, Any]) -> bool:
    """Validate patient profile structure."""
    # Profile can be partial, so we just check types
    if 'age' in profile and not isinstance(profile['age'], (int, type(None))):
        return False
    if 'bmi' in profile and not isinstance(profile['bmi'], (float, int, type(None))):
        return False
    if 'smoker' in profile and not isinstance(profile['smoker'], (bool, type(None))):
        return False
    
    return True

