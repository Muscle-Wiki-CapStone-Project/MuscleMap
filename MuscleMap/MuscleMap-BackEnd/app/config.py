from datetime import timedelta
import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://postgres:@localhost:5432/musclemap')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    CORS_ALLOW_ORIGINS = ["http://localhost:5173"]
    CORS_SUPPORTS_CREDENTIALS = True


    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    SESSION_COOKIE_SAMESITE = None  # For cross-origin cookies
    SESSION_COOKIE_SECURE = False  # Set to True if using HTTPS (otherwise False for local development)
    SESSION_COOKIE_HTTPONLY = True
    PERMANENT_SESSION_LIFETIME = timedelta(days=1)  # Adjust session timeout if needed

print("Loaded SECRET_KEY:", os.getenv('SECRET_KEY'))
print("Loaded DATABASE_URL:", os.getenv('DATABASE_URL'))
