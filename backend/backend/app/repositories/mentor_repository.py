from sqlalchemy.orm import Session
from uuid import UUID
from app.models.mentor_model import MentorModel
from app.schemas.mentor_schema import MentorCreate

class MentorRepository:
    @staticmethod
    def create(db: Session, data: MentorCreate):
        mentor = MentorModel(**data.dict())
        db.add(mentor)
        db.commit()
        db.refresh(mentor)
        return mentor

    @staticmethod
    def get_all(db: Session):
        return db.query(MentorModel).all()

    @staticmethod
    def get_by_id(db: Session, mentor_id: UUID):
        return db.query(MentorModel).filter(MentorModel.id == mentor_id).first()

    @staticmethod
    def delete(db: Session, mentor_id: UUID):
        mentor = db.query(MentorModel).filter(MentorModel.id == mentor_id).first()
        if mentor:
            db.delete(mentor)
            db.commit()
        return mentor