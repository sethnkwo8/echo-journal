# backend/app/models/journal_entry.py
from datetime import datetime
from uuid import UUID, uuid4
from sqlmodel import TIMESTAMP, Column, func, Field, Relationship, text ,SQLModel
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.user import User

# Journal Entry field
class JournalEntry(SQLModel, table=True):
    __tablename__ = "journal_entry"

    id: UUID = Field(default_factory=uuid4, index= True, primary_key=True)
    # Connects the database field to the User's id
    user_id: UUID = Field(foreign_key="user.id", ondelete="CASCADE")
    title: str = Field(index=True)
    content: str
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

    # Allows Python to access the Team object directly.
    # back_populates matches the field name in the parent model.
    user: "User" = Relationship(back_populates="journal_entries")

