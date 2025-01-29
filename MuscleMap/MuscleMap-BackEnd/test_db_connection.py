import os
from sqlalchemy import create_engine
from dotenv import load_dotenv

load_dotenv()  # Ensure .env is loaded

DATABASE_URL = os.getenv('DATABASE_URL')

try:
    engine = create_engine(DATABASE_URL)
    connection = engine.connect()
    print("Database connection successful!")
    connection.close()
except Exception as e:
    print("Error connecting to the database:", str(e))
