# backend/app/auth/service.py
import os
from dotenv import load_dotenv
import jwt
from uuid import UUID
from datetime import datetime, timedelta, timezone
from sqlmodel import select, Session
from .schema import UserRegisterRequest, UserLoginRequest, TokenData
from .exceptions import UserAlreadyExistsError, InvalidCredentialsError, UnauthorizedError
from app.models.user import User
from app.utils.security import hash_password, verify_password
from fastapi.security import OAuth2PasswordBearer

load_dotenv()

secret_key = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_DAYS = 7

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# User registration functiom
def register_user(user_data: UserRegisterRequest, db_session: Session):
    # Check if user exists
    result = db_session.exec(select(User).where(User.email == user_data.email))
    # Grab first user
    existing_user = result.first()

    if existing_user:
        raise UserAlreadyExistsError(existing_user.email)

    # Hash password
    plain_password = user_data.password.get_secret_value()
    hashed_password = hash_password(plain_password)

    # Create user
    user = User(name=user_data.name, email=user_data.email, password_hash=hashed_password)

    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)

    return user

# Authenticate user
def authenticate_user(user_data: UserLoginRequest, db_session: Session):
    # Get user
    result = db_session.exec(select(User).where(User.email == user_data.email))
    user = result.first()

    plain_password = user_data.password.get_secret_value()

    # Generic check for missing user OR invalid password to prevent email enumeration
    if not user or not verify_password(
        plain_password, user.password_hash
    ):
        raise InvalidCredentialsError()

    return user

# Function to create tokens
def _create_token(
    data: dict,
    expires_delta: timedelta,
    token_type: str,
) -> str:
    if not secret_key:
        raise RuntimeError("SECRET_KEY environment variable is not set")

    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode.update({"exp": expire, "type": token_type})

    return jwt.encode(to_encode, secret_key, algorithm=ALGORITHM)

# Function to create access token
def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    delta = expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    return _create_token(data=data, expires_delta=delta, token_type="access")

# Function to create refresh token
def create_refresh_token(data: dict, expires_delta: timedelta | None = None) -> str:
    delta = expires_delta or timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    return _create_token(data=data, expires_delta=delta, token_type="refresh")

# Function to refresh access token
def refresh_access_token(refresh_token: str, db_session: Session) -> str:
    try:
        payload = jwt.decode(refresh_token, secret_key, algorithms=[ALGORITHM])

        # Verify token type
        if payload.get("type") != "refresh":
            raise UnauthorizedError()

        user_id_str = payload.get("sub")
        if not user_id_str:
            raise UnauthorizedError()

        token_data = TokenData(user_id=UUID(user_id_str))
    except (jwt.PyJWTError, ValueError):
        raise UnauthorizedError()

    user = db_session.get(User, token_data.user_id)
    if not user:
        raise UnauthorizedError()

    # Issue a new access token
    return create_access_token(data={"sub": str(user.id)})

# TODO request_password_reset

# TODO reset_password