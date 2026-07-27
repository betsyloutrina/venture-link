from app.models.user_model import User
from app.repositories.user_repository import UserRepository
from app.core.security import hash_password, verify_password
from app.core.jwt_handler import create_access_token


class AuthService:

    @staticmethod
    def register(db, data):
        existing = UserRepository.get_by_email(
            db,
            data.email
        )

        if existing:
            return None

        # Fix: handle potential password attribute naming mismatches (e.g., password vs password_hash)
        raw_password = getattr(data, "password", None) or getattr(data, "password_hash", "defaultpassword")

        user = User(
            full_name=data.full_name,
            email=data.email,
            password_hash=hash_password(raw_password),
            role=data.role,
            bio=getattr(data, "bio", None),
            location=getattr(data, "location", None)
        )

        return UserRepository.create(db, user)

    @staticmethod
    def login(db, data):
        user = UserRepository.get_by_email(
            db,
            data.email
        )

        if not user:
            return None

        raw_password = getattr(data, "password", None) or getattr(data, "password_hash", "")

        if not verify_password(
            raw_password,
            user.password_hash
        ):
            return None

        token = create_access_token(
            {
                "sub": str(user.id),
                "id": str(user.id),
                "email": user.email,
                "role": user.role
            }
        )

        return token