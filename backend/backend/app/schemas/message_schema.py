from pydantic import BaseModel
from datetime import datetime
from uuid import UUID

class MessageCreate(BaseModel):
    receiver_id: UUID
    content: str

class MessageResponse(BaseModel):
    id: int
    sender_id: UUID
    receiver_id: UUID
    content: str
    created_at: datetime

    class Config:
        from_attributes = True