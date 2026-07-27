from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.schemas.auth_schema import RegisterRequest
from app.schemas.auth_schema import LoginRequest

from app.services.auth_service import AuthService

router = APIRouter(
    tags=["Authentication"]
)

security = HTTPBearer()


@router.post("/register")
def register(
    data: RegisterRequest,
    db: Session = Depends(get_db)
):

    user = AuthService.register(db, data)

    if not user:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    return {
        "message": "Registration successful"
    }


@router.post("/login")
def login(
    data: LoginRequest,
    db: Session = Depends(get_db)
):

    token = AuthService.login(db, data)

    if not token:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    return {
        "access_token": token,
        "token_type": "bearer"
    }


@router.get("/protected-route")
def protected_endpoint(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    return {
        "message": "You are authorized!",
        "token": token
    }