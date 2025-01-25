
# from flask import Flask
# from flask_sqlalchemy import SQLAlchemy

# app = Flask(__name__)

# app.config['SECRET_KEY'] = 'your_secret_key'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///musclemap.db' 

# db = SQLAlchemy(app)


# import os

# class Config:
#     SECRET_KEY = 'your_secret_key'
#     SQLALCHEMY_TRACK_MODIFICATIONS = False
#     SQLALCHEMY_DATABASE_URI = 'sqlite:///musclemap.db'  # Relative path for simplicity

import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///musclemap.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv('SECRET_KEY', 'supersecretkey')
