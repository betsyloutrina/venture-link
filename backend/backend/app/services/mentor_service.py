from sqlalchemy.orm import Session
from uuid import UUID
from fastapi import HTTPException, status
from app.repositories.mentor_repository import MentorRepository
from app.schemas.mentor_schema import MentorCreate

class MentorService:
    @staticmethod
    def register_mentor(db: Session, data: MentorCreate):
        return MentorRepository.create(db, data)

    @staticmethod
    def list_mentors(db: Session):
        return MentorRepository.get_all(db)

    @staticmethod
    def delete_mentor(db: Session, mentor_id: UUID):
        mentor = MentorRepository.get_by_id(db, mentor_id)
        if not mentor:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, 
                detail="Mentor not found"
            )
        return MentorRepository.delete(db, mentor_id)