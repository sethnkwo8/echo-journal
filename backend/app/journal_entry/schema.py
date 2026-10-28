# backend/app/journal_entry/schema.py
from pydantic import BaseModel, Field, field_validator
from typing import Optional, List
from uuid import UUID
from datetime import datetime
from app.models.journal_entry import FeelingName

# Create journal entry schema
class JournalEntryCreate(BaseModel):
    title: str = Field(min_length=3, max_length=255)
    content: str = Field(min_length=3)
    feeling: List[FeelingName] = Field(max_length=3, default=[])
    tags: List[str] = Field(max_length=4, default=[])


    @field_validator("title")
    @classmethod
    def validate_title(cls, v: str) -> str:
        return v.strip()
    
    @field_validator("content")
    @classmethod
    def validate_content(cls, v: str) -> str:
        if v is None:
            return None
        return v.strip()

    @field_validator("feeling")
    @classmethod
    def validate_feeling(cls, v: List[FeelingName]) -> List[FeelingName]:
        return list[FeelingName](dict.fromkeys(v))

    @field_validator("tags")
    @classmethod
    def validate_tags(cls, v: List[str]) -> List[str]:
        normalized = []
        for d in v:
            normalized.append(d.strip().lower())
        for n in normalized:
            if n == "":
                raise ValueError("Tag cannot be empty")
            if len(n) > 15:
                raise ValueError("Tag characters can't exceed 15")
        deduped = list(dict.fromkeys(normalized))
        if len(deduped) > 4:
            raise ValueError("Exceeds max tags for entry")
        return deduped
    

# Update journal entry schema
class JournalEntryUpdate(BaseModel):
    title: Optional[str] = Field(default=None, min_length=3, max_length=255)
    content: Optional[str] = Field(default=None, min_length=3)
    feeling: Optional[List[FeelingName]] = Field(default=None, max_length=3)
    tags: Optional[List[str]] = Field(default=None, max_length=4)

    @field_validator("title")
    @classmethod
    def validate_title(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return None
        return v.strip()

    @field_validator("content")
    @classmethod
    def validate_content(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return None
        return v.strip()

    @field_validator("feeling")
    @classmethod
    def validate_feeling(cls, v: Optional[List[FeelingName]]) -> List[FeelingName] | None:
        if v is None:
            return None
        return list[FeelingName](dict.fromkeys(v))

    @field_validator("tags")
    @classmethod
    def validate_tags(cls, v: Optional[List[str]]) -> List[str] | None:
        if v is None:
            return None
        normalized = []
        for d in v:
            normalized.append(d.strip().lower())
        for n in normalized:
            if n == "":
                raise ValueError("Tag cannot be empty")
            if len(n) > 15:
                raise ValueError("Tag characters can't exceed 15")
        deduped = list(dict.fromkeys(normalized))
        if len(deduped) > 4:
            raise ValueError("Exceeds max tags for entry")
        return deduped

# Journal entry response
class JournalEntryResponse(BaseModel):
    id: UUID
    title: str
    content: str
    feeling: List[FeelingName]
    tags: List[str]

    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True  # Allows SQLModel objects to convert directly to this schema