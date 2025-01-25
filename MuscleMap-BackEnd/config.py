
# from flask import Flask
# from flask_sqlalchemy import SQLAlchemy

# app = Flask(__name__)

# app.config['SECRET_KEY'] = 'your_secret_key'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///musclemap.db' 

# db = SQLAlchemy(app)


import os

class Config:
    SECRET_KEY = 'your_secret_key'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///musclemap.db'  # Relative path for simplicity

    