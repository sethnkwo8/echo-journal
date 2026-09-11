# backend/app/auth/dependencies.py
import jwt
from uuid import UUID
from typing import Annotated
from fastapi import Depends
from sqlmodel import Session
from .exceptions import UnauthorizedError
from app.models.user import User
from app.database import get_session
from .schema import TokenData

from .service import ALGORITHM, secret_key, oauth2_scheme

# Get current user
def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)], 
    db_session: Session = Depends(get_session)
) -> User :
    try:
        payload = jwt.decode(token, secret_key, algorithms=[ALGORITHM])
        user_id_str: str | None = payload.get("sub")
        if user_id_str is None:
            raise UnauthorizedError()
            
        # Parse as UUID
        token_data = TokenData(user_id=UUID(user_id_str))
    except (jwt.PyJWTError, ValueError):
        raise UnauthorizedError()

    user = db_session.get(User, token_data.user_id)
    if user is None:
        raise UnauthorizedError()

    return user