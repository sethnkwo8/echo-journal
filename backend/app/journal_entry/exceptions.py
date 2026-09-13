# backend/app/journal_entry/exceptions.py
from uuid import UUID

# Base class for all journal errors
class JournalError(Exception):
    def __init__(self, message: str, status_code: int, code: str):
        self.message = message
        self.status_code = status_code
        self.code = code
        super().__init__(self.message)

# Exception for journal not found
class JournalNotFoundError(JournalError):
    def __init__(self, entry_id: UUID):
        super().__init__(
            message=f"Journal with ID {entry_id} not found",
            status_code=404,
            code="JOURNAL_NOT_FOUND"
        )

# Exception for unauthorized journal
class UnauthorizedJournalAccess(JournalError):
    def __init__(self):
        super().__init__(
            message="Unauthorized to access journal",
            status_code=401,
            code="UNAUTHORIZED_JOURNAL_ACCESS",
        )