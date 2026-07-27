import uuid
from sqlalchemy import Column, String, Boolean, Text, DateTime
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.core.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    full_name = Column(String(120), nullable=False)

    email = Column(
        String(255),
        unique=True,
        nullable=False,
        index=True
    )

    password_hash = Column(String(255), nullable=False)

    role = Column(String(20), nullable=False, default="founder")

    bio = Column(Text, nullable=True)

    location = Column(String(120), nullable=True)

    profile_image = Column(String(255), nullable=True)

    linkedin_url = Column(String(255), nullable=True)

    is_active = Column(
        Boolean,
        nullable=False,
        default=True
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False
    )

    # Relationship to link users directly to the student ideas/startups they create
    startups = relationship("Startup", back_populates="owner", cascade="all, delete-orphan")