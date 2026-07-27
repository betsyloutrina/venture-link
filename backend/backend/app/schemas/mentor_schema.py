from pydantic import BaseModel, EmailStr
from typing import Optional
from uuid import UUID

class MentorCreate(BaseModel):
    full_name: str
    email: EmailStr
    expertise: str
    bio: Optional[str] = None
    location: Optional[str] = None
    is_available: Optional[bool] = True

class MentorResponse(MentorCreate):
    id: UUID

    class Config:
        from_attributes = True