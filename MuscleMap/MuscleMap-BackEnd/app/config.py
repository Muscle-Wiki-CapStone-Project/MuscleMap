
import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://postgres:@localhost:5432/musclemap')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

print("Loaded SECRET_KEY:", os.getenv('SECRET_KEY'))
print("Loaded DATABASE_URL:", os.getenv('DATABASE_URL'))
