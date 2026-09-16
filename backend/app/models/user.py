# backend/app/models/user.py
from datetime import datetime
from typing import List, Optional, TYPE_CHECKING
from uuid import UUID, uuid4

from sqlmodel import TIMESTAMP, Column, Field, Relationship, SQLModel, text

if TYPE_CHECKING:
    from app.models.journal_entry import JournalEntry


# User model
class User(SQLModel, table=True):
    __tablename__ = "user"

    id: UUID = Field(default_factory=uuid4, primary_key=True, index=True)
    name: str = Field(index=True)
    email: str = Field(unique=True, index=True)
    password_hash: str
    journal_entries: List["JournalEntry"] = Relationship(back_populates="user")
    created_at: datetime = Field(
    sa_column=Column(TIMESTAMP(timezone=True), server_default=text("CURRENT_TIMESTAMP"))
    )
    last_login: datetime | None = Field(
        default=None,
        sa_column=Column(TIMESTAMP(timezone=True), nullable=True)
    )