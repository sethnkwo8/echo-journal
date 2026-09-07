# backend/app/utils/security.py
from pwdlib import PasswordHash

password_hash = PasswordHash.recommended()

# Helper function to hash password
def hash_password(password: str) -> str:
    return password_hash.hash(password)

# Helper function to verify password
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return password_hash.verify(plain_password, hashed_password)