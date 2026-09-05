# backend/app/database.py
from dotenv import load_dotenv
import os
from sqlmodel import create_engine, Session

load_dotenv()

# Fetch url
postgres_url = os.getenv("DATABASE_URL", "")

if postgres_url.startswith("postgres://"):
    postgres_url = postgres_url.replace("postgres://", "postgresql+psycopg://", 1)
elif postgres_url.startswith("postgresql://") and "+psycopg" not in postgres_url:
    postgres_url = postgres_url.replace("postgresql://", "postgresql+psycopg://", 1)

is_dev = os.getenv("ENV", "development") == "development" # development is default
engine = create_engine(postgres_url, echo=is_dev, connect_args={"options": "-c timezone=utc"}) # echo logs all generated SQL to terminal

# Provides a database session per request and closes it when finished
def get_session():
    with Session(engine) as session:
        yield session