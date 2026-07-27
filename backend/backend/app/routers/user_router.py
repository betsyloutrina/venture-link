from fastapi import APIRouter
from pydantic import BaseModel, EmailStr
from uuid import UUID

router = APIRouter()

class UserResponse(BaseModel):
    id: UUID
    full_name: str
    email: EmailStr
    role: str
    bio: str | None = None
    linkedin_url: str | None = None

@router.get("/", response_model=list[UserResponse], summary="Get all users")
async def get_users():
    return [
        UserResponse(
            id=UUID("87654321-4321-8765-4321-876543218765"),
            full_name="Test Founder",
            email="founder@venturelink.com",
            role="founder",
            bio="Student entrepreneur building awesome things.",
            linkedin_url="https://linkedin.com/in/testfounder"
        )
    ]