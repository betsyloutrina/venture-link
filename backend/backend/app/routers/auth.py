from fastapi import APIRouter, status
from pydantic import BaseModel, EmailStr

router = APIRouter()

# --- Schemas ---
class UserRegisterRequest(BaseModel):
    email: EmailStr
    password: str
    full_name: str

class UserLoginRequest(BaseModel):
    email: EmailStr
    password: str

# --- Routes ---

@router.post(
    "/register",
    status_code=status.HTTP_201_CREATED,
    summary="Register"  # This controls the text next to the path in Swagger
)
async def register(user_data: UserRegisterRequest):
    return {
        "message": "User registered successfully",
        "email": user_data.email
    }

@router.post(
    "/login",
    status_code=status.HTTP_200_OK,
    summary="Login"  # This controls the text next to the path in Swagger
)
async def login(credentials: UserLoginRequest):
    # Temporary mock response until you connect the database/JWT logic
    return {
        "access_token": "mock_token_123",
        "token_type": "bearer"
    }