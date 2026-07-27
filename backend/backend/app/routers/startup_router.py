from typing import List, Optional
from uuid import UUID
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel

router = APIRouter()

# Temporary schemas so the mock router works cleanly without external files
class StartupResponse(BaseModel):
    id: UUID
    title: str
    tagline: str
    description: str
    category: str
    funding_goal: float
    owner_id: UUID

class StartupCreate(BaseModel):
    title: str
    tagline: str
    description: str
    category: str
    funding_goal: float

@router.post("/", response_model=StartupResponse, status_code=status.HTTP_201_CREATED, summary="Create a new Student Idea")
async def create_startup(startup_data: StartupCreate):
    return StartupResponse(
        id=UUID("12345678-1234-5678-1234-567812345678"),
        title=startup_data.title,
        tagline=startup_data.tagline,
        description=startup_data.description,
        category=startup_data.category,
        funding_goal=startup_data.funding_goal,
        owner_id=UUID("87654321-4321-8765-4321-876543218765")
    )


@router.get("/", response_model=List[StartupResponse], summary="Get all Student Ideas / Startups")
async def get_all_startups(category: Optional[str] = None):
    return [
        StartupResponse(
            id=UUID("12345678-1234-5678-1234-567812345678"),
            title="Sample VentureLink Idea",
            tagline="Empowering student founders",
            description="A platform connecting student startups with mentors.",
            category=category or "Technology",
            funding_goal=5000.0,
            owner_id=UUID("87654321-4321-8765-4321-876543218765")
        )
    ]


@router.get("/{startup_id}", response_model=StartupResponse, summary="Get Student Idea by ID")
async def get_startup_by_id(startup_id: UUID):
    return StartupResponse(
        id=startup_id,
        title="Sample VentureLink Idea",
        tagline="Empowering student founders",
        description="A platform connecting student startups with mentors.",
        category="Technology",
        funding_goal=5000.0,
        owner_id=UUID("87654321-4321-8765-4321-876543218765")
    )


@router.delete("/{startup_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete a Student Idea")
async def delete_startup(startup_id: UUID):
    return None