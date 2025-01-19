import os 

class Config:
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.urandom(24) # used for sessions and cookies (will generate 24 random byte to protect the privacy)
   
    SQLALCHEMY_DATABASE_URI = 'sqlite:///musclemap.db'  # Replace with your preferred DB URI

    