# backend/app/auth/schema.py
from datetime import datetime
from pydantic import BaseModel, ConfigDict, EmailStr, Field, SecretStr, field_validator
from uuid import UUID
import re

# Base shared attributes
class EmailBase(BaseModel):
    email: EmailStr = Field(max_length=255)

    @field_validator("email")
    @classmethod
    def validate_email(cls, v: str) -> str:
        return v.lower().strip()

class UserBase(EmailBase):
    name: str = Field(max_length=255)

# Incoming payload for POST /auth/register
class UserRegisterRequest(UserBase):
    password: SecretStr = Field(min_length=8, max_length=255)

    @field_validator('password', mode='after')
    @classmethod
    def password_complexity(cls, v: SecretStr) -> SecretStr:
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


# Outgoing response payload
class UserRegisterResponse(UserBase):
    id: UUID
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

# Login request payload
class UserLoginRequest(EmailBase):
    password: SecretStr = Field(min_length=8, max_length=64)

# JWT Token schemas for POST /auth/login
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    user_id: UUID | None = None