from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from pydantic import BaseModel
from datetime import datetime
from app.core.database import get_db
from app.models.idea_model import SuggestionModel, IdeaModel # Or your corresponding Startup/Idea model

router = APIRouter(tags=["Suggestions"])
class SuggestionCreate(BaseModel):
    idea_id: UUID
    mentor_id: UUID
    content: str

class SuggestionResponse(BaseModel):
    id: UUID
    idea_id: UUID
    mentor_id: UUID
    content: str
    created_at: datetime

    class Config:
        from_attributes = True

@router.post("/", response_model=SuggestionResponse, status_code=status.HTTP_201_CREATED)
def create_suggestion(payload: SuggestionCreate, db: Session = Depends(get_db)):
    """Allow a mentor to give suggestions on a student idea/startup."""
    new_suggestion = SuggestionModel(
        idea_id=payload.idea_id,
        mentor_id=payload.mentor_id,
        content=payload.content
    )
    db.add(new_suggestion)
    db.commit()
    db.refresh(new_suggestion)
    return new_suggestion

@router.get("/startup/{idea_id}", response_model=List[SuggestionResponse])
def get_suggestions_for_idea(idea_id: UUID, db: Session = Depends(get_db)):
    """Get all suggestions given by mentors for a specific student idea/startup."""
    suggestions = db.query(SuggestionModel).filter(SuggestionModel.idea_id == idea_id).all()
    return suggestions