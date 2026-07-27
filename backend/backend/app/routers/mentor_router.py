from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from app.core.database import get_db
from app.schemas.mentor_schema import MentorCreate, MentorResponse
from app.services.mentor_service import MentorService

router = APIRouter()

@router.post("/", response_model=MentorResponse, status_code=status.HTTP_201_CREATED)
def create_mentor(data: MentorCreate, db: Session = Depends(get_db)):
    return MentorService.register_mentor(db, data)

@router.get("/", response_model=List[MentorResponse])
def get_mentors(db: Session = Depends(get_db)):
    return MentorService.list_mentors(db)

@router.delete("/{mentor_id}", status_code=status.HTTP_200_OK)
def delete_mentor(mentor_id: UUID, db: Session = Depends(get_db)):
    return MentorService.delete_mentor(db, mentor_id)