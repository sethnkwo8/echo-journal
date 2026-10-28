# backend/app/models/journal_entry.py
from datetime import datetime
from uuid import UUID, uuid4
from sqlmodel import JSON, TIMESTAMP, Column, func, Field, Relationship, text ,SQLModel
from typing import TYPE_CHECKING, List, Optional
from enum import Enum

if TYPE_CHECKING:
    from app.models.user import User

class FeelingName(str, Enum):
    HAPPY = 'happy'
    EXCITED = 'excited'
    GRATEFUL = 'grateful'
    CALM = "calm"
    PROUD = "proud"
    HOPEFUL = "hopeful"
    LOVED = "loved"
    RELAXED = "relaxed"
    CONTENT = "content"
    SAD = "sad"
    LONELY = "lonely"
    DISAPPOINTED = "disappointed"
    ANXIOUS = "anxious"
    STRESSED = "stressed"
    ANGRY = "angry"
    FRUSTRATED = "frustrated"
    OVERWHELMED = "overwhelmed"
    MOTIVATED = "motivated"
    INSPIRED = "inspired"
    CURIOUS = "curious"
    NOSTALGIC = "nostalgic"
    REFLECTIVE = "reflective"
    INDIFFERENT = "indifferent"

# Journal Entry field
class JournalEntry(SQLModel, table=True):
    __tablename__ = "journal_entry"

    id: UUID = Field(default_factory=uuid4, index= True, primary_key=True)
    # Connects the database field to the User's id
    user_id: UUID = Field(foreign_key="user.id", ondelete="CASCADE")
    title: str = Field(index=True)
    content: str
    feeling: List[FeelingName] = Field(default=[], sa_type=JSON, max_length=3)
    tags: List[str] = Field(max_length=4, default=[], sa_type=JSON)
    created_at: datetime = Field(
    sa_column=Column(TIMESTAMP(timezone=True), server_default=text("CURRENT_TIMESTAMP"))
    )
    
    updated_at: datetime = Field(
        sa_column=Column(
            TIMESTAMP(timezone=True),
            server_default=text("CURRENT_TIMESTAMP"),
            onupdate=func.now(),
        )
    )

    # back_populates matches the field name in the parent model.
    user: "User" = Relationship(back_populates="journal_entries")

