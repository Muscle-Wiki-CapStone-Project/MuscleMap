from app import db
from flask import current_app
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import UserMixin

# Users Table 
class User(db.Model, UserMixin):
    #user model will store users and their info
    id = db.Column(db.integer, primary_key=True)
    username = db.column(db.string(100), nullable=False, unique=True)
    gender = db.column(db.string(20), nullable=True)
    password_hash = db.column(db.string(128), nullable=False)

    favorites = db.relationship('UsersFavorites', backref='user',lazy=True) # establishes the relationship with users_favorites 
    workouts = db.relationship('UserWorkours', backref='user', lazy=True)
# set the users password with a hashing process 
    def set_password(self, password):
        self.password_hash = Bcrypt.generate_password_hash(password).decode('utf-8')
#checking if the typed password is in alignment with the hashed password 
    def check_password(self, password):
        return Bcrypt.check_password_hash(self.password_hash, password)
    