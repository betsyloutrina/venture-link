from fastapi import FastAPI
from fastapi.security import HTTPBearer
from app.routers import auth_router, user_router, startup_router, mentor_router, message_router, suggestion_router
from app.core.database import engine, Base

# Import your models so SQLAlchemy knows they exist before creating tables
import app.models 

app = FastAPI(title="VentureLink API", version="1.0.0")

# Define HTTP Bearer security scheme for Swagger UI
security = HTTPBearer()

# Create database tables on startup
@app.on_event("startup")
def startup_event():
    Base.metadata.create_all(bind=engine)

# Register routers
app.include_router(auth_router.router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(user_router.router, prefix="/api/v1/users", tags=["Users"])
app.include_router(startup_router.router, prefix="/api/v1/startups", tags=["Startups"])
app.include_router(mentor_router.router, prefix="/api/v1/mentors", tags=["Mentors"])
app.include_router(message_router.router, prefix="/api/v1/messages", tags=["Messaging"])
app.include_router(suggestion_router.router, prefix="/api/v1/suggestions", tags=["Suggestions"])

@app.get("/")
def root():
    return {"message": "Welcome to VentureLink API"}