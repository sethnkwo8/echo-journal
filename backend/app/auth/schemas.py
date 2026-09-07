# backend/app/auth/schemas.py
from datetime import datetime
from pydantic import BaseModel, EmailStr, SecretStr, ConfigDict
from uuid import UUID

# Base shared attributes
class UserBase(BaseModel):
    email: EmailStr
    name: str

# Incoming payload for POST /auth/register
class UserCreate(UserBase):
    password: SecretStr


# Outgoing response payload (strips password hash)
class UserRead(UserBase):
    id: UUID
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


# JWT Token schemas for POST /auth/login
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    user_id: UUID | None = None