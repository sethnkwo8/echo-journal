# backend/app/utils/validate_password.py
import re

from pydantic import SecretStr

def validate_password_complexity(v: SecretStr) -> SecretStr :
    password_val = v.get_secret_value()
        
    if not re.search(r'[A-Z]', password_val):
        raise ValueError('Password must contain at least one uppercase letter')
    if not re.search(r'[a-z]', password_val):
        raise ValueError('Password must contain at least one lowercase letter')
    if not re.search(r'\d', password_val):
        raise ValueError('Password must contain at least one number')
    if not re.search(r'[!@#$%^&*(),.?":{}|<>_-]', password_val):
        raise ValueError('Password must contain at least one special character')
        
    return v # Return the original SecretStr object 