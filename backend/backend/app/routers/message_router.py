from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from app.core.database import get_db
from app.models.message_model import MessageModel
from app.schemas.message_schema import MessageCreate, MessageResponse

router = APIRouter()

@router.post("/", response_model=MessageResponse, status_code=status.HTTP_201_CREATED)
def send_message(message: MessageCreate, sender_id: UUID, db: Session = Depends(get_db)):
    """
    Send a message from a user to another user.
    """
    db_message = MessageModel(
        sender_id=sender_id,
        receiver_id=message.receiver_id,
        content=message.content
    )
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message

@router.get("/{user_id}", response_model=List[MessageResponse])
def get_messages_for_user(user_id: UUID, db: Session = Depends(get_db)):
    """
    Retrieve all messages where the user is either the sender or receiver.
    """
    messages = db.query(MessageModel).filter(
        (MessageModel.sender_id == user_id) | (MessageModel.receiver_id == user_id)
    ).all()
    return messages