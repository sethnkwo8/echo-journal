# backend/app/journal_entry/service.py
from uuid import UUID
from .schema import JournalEntryCreate, JournalEntryUpdate
from .exceptions import JournalNotFoundError, UnauthorizedJournalAccess
from app.models.user import User
from app.models.journal_entry import JournalEntry
from app.auth.dependencies import get_current_user
from sqlmodel import Session, select

# Create journal entry service
def create_entry(entry_payload: JournalEntryCreate, current_user: User, db_session: Session):
    # Create journal entry
    entry = JournalEntry(user_id=current_user.id, title=entry_payload.title, content=entry_payload.content)

    db_session.add(entry)
    db_session.commit()
    db_session.refresh(entry)

    return entry

# Get all user entries service
def get_user_entries(current_user: User, db_session: Session):
    # Get user entries
    statement = select(JournalEntry).where(JournalEntry.user_id == current_user.id)
    entries = db_session.exec(statement).all()

    return entries

# Get single entry by id
def get_entry_by_id(entry_id: UUID, current_user: User, db_session: Session):
    # Get single journal entry
    statement = select(JournalEntry).where(JournalEntry.id == entry_id)
    entry = db_session.exec(statement).first()

    # If entry doesn't exist
    if not entry:
        raise JournalNotFoundError(entry_id)

    # If entry doesn't belong to current user
    if entry.user_id != current_user.id:
        raise UnauthorizedJournalAccess()

    return entry

# Service to update an entry
def update_entry(update_data: JournalEntryUpdate, entry_id: UUID, current_user: User, db_session: Session):
    # Get entry
    entry = get_entry_by_id(entry_id, current_user, db_session)

    # Convert update data to a dict
    update_dict = update_data.model_dump(exclude_unset=True)

    # Update entry attributes
    for key, value in update_dict.items():
        setattr(entry, key, value)

    # Commit updated entry
    db_session.commit()
    db_session.refresh(entry)

    return entry


# Service to delete an entry
def delete_entry(entry_id: UUID, current_user: User, db_session: Session):
    # Get entry
    entry = get_entry_by_id(entry_id, current_user, db_session)

    # Delete entry
    db_session.delete(entry)
    db_session.commit()

    return None