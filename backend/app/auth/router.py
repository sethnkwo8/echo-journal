# backend/app/auth/router.py
from fastapi import APIRouter, Cookie, Response, Depends, HTTPException, status
from .exceptions import UnauthorizedError, UserAlreadyExistsError, InvalidCredentialsError
from .schema import UserLoginRequest, UserRegisterResponse, UserRegisterRequest, Token
from .service import register_user, authenticate_user, create_access_token, create_refresh_token, refresh_access_token
from sqlmodel import Session
from app.database import get_session
from typing import Annotated

router = APIRouter(prefix="/auth")

# POST route for registering user
@router.post("/register", response_model=UserRegisterResponse, status_code=status.HTTP_201_CREATED)
def register(
    payload: UserRegisterRequest,
    db_session: Session = Depends(get_session)
):
    # Create full user object
    try:
        user = register_user(payload, db_session)
    except UserAlreadyExistsError as e:
        raise HTTPException(
            status_code=e.status_code,
            detail={"message": e.message, "code": e.code},
        )

    return UserRegisterResponse(email=user.email, name=user.name)

# POST route for authenticating user
@router.post("/login", response_model=Token, status_code=status.HTTP_200_OK)
def login(
    payload: UserLoginRequest,
    response: Response,
    db_session: Session = Depends(get_session)
):
    # Authenticate user
    try: 
        user = authenticate_user(payload, db_session)
    except InvalidCredentialsError as e:
        raise HTTPException(
            status_code=e.status_code,
            detail={"message": e.message, "code": e.code},
        )

    # Generate access token
    access_token = create_access_token(data={"sub": str(user.id)})

    # Generate refresh token
    refresh_token = create_refresh_token(data={"sub": str(user.id)})

    # Set cookie
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        secure=False, # Change to true on https
        httponly=True,
        samesite="lax",
        path="/auth/refresh"
    )

    return Token(access_token=access_token)

# POST route for refreshing access token
@router.post("/refresh", response_model=Token, status_code=status.HTTP_200_OK)
def refresh(
    refresh_token: Annotated[str | None, Cookie()] = None, 
    db_session: Session = Depends(get_session)
):
    if not refresh_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"message": "Refresh token missing", "code": "UNAUTHORIZED"},
        )
    
    try:
        new_access_token = refresh_access_token(refresh_token, db_session)
    except UnauthorizedError as e:
        raise HTTPException(
            status_code=e.status_code,
            detail={"message": e.message, "code": e.code},
        )

    return Token(access_token=new_access_token)

# POST logout route
@router.post("/logout", status_code=status.HTTP_200_OK)
def logout(response: Response):
    # Delete refresh token cookie
    response.delete_cookie(
        key="refresh_token",
        secure=False, # Change to true on https
        httponly=True,
        samesite="lax",
        path="/auth/refresh" # <--- Matches the login route's path
    )

    return {"message" : "Logged out successfully"}