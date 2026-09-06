# backend/app/main.py
from app.database import get_session
from fastapi import Depends, FastAPI, HTTPException
from sqlmodel import Session, text

app = FastAPI()


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