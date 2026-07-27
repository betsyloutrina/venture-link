from app.core.database import engine
from app.models.user_model import User
from app.core.database import Base

Base.metadata.create_all(bind=engine)

print("Tables Created Successfully")