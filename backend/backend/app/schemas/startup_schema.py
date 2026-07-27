from pydantic import BaseModel, Field
from typing import Optional
from uuid import UUID
from datetime import datetime

# Schema for creating a new Student Idea
class StartupCreate(BaseModel):
    title: str = Field(..., max_length=150, example="EcoTrack AI")
    tagline: str = Field(..., max_length=255, example="Smart campus energy tracking and optimization")
    description: str = Field(..., example="An AI-driven platform built by university researchers to monitor and reduce building energy consumption.")
    category: str = Field(..., max_length=80, example="CleanTech / AI")
    funding_goal: Optional[float] = Field(None, example=25000.00)

# Schema for updating an existing Idea
class StartupUpdate(BaseModel):
    title: Optional[str] = Field(None, max_length=150)
    tagline: Optional[str] = Field(None, max_length=255)
    description: Optional[str] = None
    category: Optional[str] = Field(None, max_length=80)
    funding_goal: Optional[float] = None

# Schema returned in API responses
class StartupResponse(BaseModel):
    id: UUID
    title: str
    tagline: str
    description: str
    category: str
    funding_goal: Optional[float] = None
    owner_id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True