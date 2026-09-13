# backend/app/journal_entry/router.py
from uuid import UUID
from fastapi import APIRouter, Depends, status
from sqlmodel import Session
from .schema import JournalEntryResponse, JournalEntryCreate, JournalEntryUpdate
from .service import create_entry, get_user_entries, get_entry_by_id, update_entry, delete_entry
from app.database import get_session
from app.auth.dependencies import get_current_user
from app.models.user import User
from typing import List

router = APIRouter(prefix="/journals")

# POST route for creating entry
@router.post(path="/", response_model=JournalEntryResponse, status_code=status.HTTP_201_CREATED)
def journal_create(
    payload: JournalEntryCreate,
    user: User = Depends(get_current_user),
    db_session: Session = Depends(get_session)
):
    entry = create_entry(entry_payload=payload, current_user=user, db_session=db_session)

    return JournalEntryResponse(
        id=entry.id,
        title=entry.title,
        content=entry.content,
        created_at=entry.created_at,
        updated_at=entry.updated_at
    )


# GET route for getting all user's journal entries
@router.get(path="/", response_model=list[JournalEntryResponse], status_code=status.HTTP_200_OK)
def get_journals(
    user: User = Depends(get_current_user),
    db_session: Session = Depends(get_session)
):
    entries = get_user_entries(current_user=user, db_session=db_session)

    return [
        JournalEntryResponse(
            id=entry.id,
            title=entry.title,
            content=entry.content,
            created_at=entry.created_at,
            updated_at=entry.updated_at
        ) for entry in entries
    ]

# GET route to get a single user journal entry
@router.get(path="/{entry_id}", response_model=JournalEntryResponse, status_code=status.HTTP_200_OK)
def get_journal_entry(
    entry_id: UUID,
    user: User = Depends(get_current_user),
    db_session: Session = Depends(get_session)
):
    entry = get_entry_by_id(entry_id=entry_id, current_user=user, db_session=db_session)

    return JournalEntryResponse(
        id=entry.id,
        title=entry.title,
        content=entry.content,
        created_at=entry.created_at,
        updated_at=entry.updated_at
    )

# PATCH route to update an entry
@router.patch(path="/{entry_id}", response_model=JournalEntryResponse, status_code=status.HTTP_200_OK)
def update_journal_entry(
    payload: JournalEntryUpdate,
    entry_id: UUID,
    user: User = Depends(get_current_user),
    db_session: Session = Depends(get_session)
):
    entry = update_entry(update_data=payload, entry_id=entry_id, current_user=user, db_session=db_session)

    return JournalEntryResponse(
        id=entry.id,
        title=entry.title,
        content=entry.content,
        created_at=entry.created_at,
        updated_at=entry.updated_at
    )

# DELETE route to delete an entry
@router.delete(path="/{entry_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_journal_entry(
    entry_id: UUID,
    user: User = Depends(get_current_user),
    db_session: Session = Depends(get_session)
):
    delete_entry(entry_id=entry_id, current_user=user, db_session=db_session)

    return None