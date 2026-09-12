# backend/app/main.py
from app.database import get_session
from fastapi.responses import JSONResponse
from app.auth.exceptions import AuthError
from fastapi import Depends, FastAPI, HTTPException, Request
from sqlmodel import Session, text
from app.auth.router import router as auth_router

app = FastAPI()

# Include routes
app.include_router(auth_router, tags=["Auth"])

@app.exception_handler(AuthError)
def auth_error_handler(request: Request, exc: AuthError):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "status": "error",
            "code": exc.code,
            "message": exc.message
        }
    )

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}

@app.get("/health")
def health_check(session: Session = Depends(get_session)):
    try:
        session.exec(text("SELECT 1"))
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Database connection failed: {e!s}"
)