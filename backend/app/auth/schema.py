# backend/app/auth/schema.py
from datetime import datetime
from pydantic import BaseModel, ConfigDict, EmailStr, Field, SecretStr, field_validator
from typing import Optional
from uuid import UUID
from app.utils.validate_password import validate_password_complexity

# Base shared attributes
class EmailBase(BaseModel):
    email: EmailStr = Field(max_length=255)

    @field_validator("email")
    @classmethod
    def validate_email(cls, v: str) -> str:
        return v.lower().strip()

class UserBase(EmailBase):
    name: str = Field(min_length=1, max_length=255)

    @field_validator("name")
    @classmethod
    def validate_name(cls, v: str) -> str:
        if v is None:
            return None
        return v.strip()

# Incoming payload for POST /auth/register
class UserRegisterRequest(UserBase):
    password: SecretStr = Field(min_length=8, max_length=255)

    @field_validator('password', mode='after')
    @classmethod
    def password_complexity(cls, v: SecretStr) -> SecretStr:
        return validate_password_complexity(v)


# Outgoing response payload
class UserRegisterResponse(UserBase):
    id: UUID
    bio: Optional[str]
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

# Incoming payload for PATCH /auth/me
class UserUpdateRequest(BaseModel):
    name: Optional[str] = Field(default=None, min_length=1, max_length=255)
    bio: Optional[str] = Field(default=None, max_length=256)

    @field_validator("name")
    @classmethod
    def validate_name(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return None
        return v.strip()

    @field_validator("bio")
    @classmethod
    def validate_bio(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return None
        trimmed = v.strip()
        if trimmed == "":
            return ""
        if len(trimmed) < 3:
            raise ValueError("Bio must be at least 3 characters")
        return trimmed

# Incoming payload for POST /auth/change-password
class UserChangePassword(BaseModel):
    current_password: SecretStr = Field(min_length=8, max_length=64)
    new_password: SecretStr = Field(min_length=8, max_length=255)

    @field_validator('new_password', mode='after')
    @classmethod
    def password_complexity(cls, v: SecretStr) -> SecretStr:
        return validate_password_complexity(v)