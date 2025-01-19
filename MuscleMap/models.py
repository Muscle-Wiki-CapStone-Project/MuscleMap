from app import db
from flask import current_app
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import UserMixin

# Users Table 
class User(db.Model, UserMixin):
    #user model will store users and their info
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
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
    

class MuscleGroup(db.Model):
    # defining the muscle Groups 
    __tablename__ = 'muscleGroup'


    muscle_group_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.string(100), nullable=False)
    description = db.Column(db.string(255), nullable=True)

    #Relationships 

    exercises = db.relationship('Exercise', backref='muscle_group', lazy=True)

    class Exercise(db.Model):
        #represents the exercise
        __tablename__ = 'exercise'

        exercise_id = db.Column(db.Integer, primary_key=True)
        name = db.Column(db.string(100), nullable=False)
        description = db.Column(db.string(255), nullable=True)
        video_url = db.Column(db.string(255), nullable=True)
        required_equipment = db.Column(db.string(255), nullable=True)
        muscle_group_id = db.Column(db.Integer, db.ForeignKey('muscleGroup.muscle_group_id') ,nullable=False)

        #Relationships

        favorites = db.relationship('UsersFavorites', backref='exercise', lazy=True)
        workout_plans = db.relationship('WorkoutPlanDetails', backref='exercise', lazy=True)

    