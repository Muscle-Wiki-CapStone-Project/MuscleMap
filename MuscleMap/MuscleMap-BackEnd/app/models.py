from app.initialization import db, bcrypt
from flask_login import UserMixin
from datetime import datetime

# Users Table
class User(db.Model, UserMixin):

    # User model - user information, login details, and relationships with other tables.

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False, unique=True)
    gender = db.Column(db.String(20), nullable=True)
    password_hash = db.Column(db.String(128), nullable=False)

    # Relationships
    favorites = db.relationship('UserFavorite', backref='user', lazy=True)  # Relationship with UserFavorite
    workouts = db.relationship('UserWorkout', backref='user', lazy=True)  # Relationship with UserWorkout

    # Methods
    def set_password(self, password):
        # Hashes and sets the user's password
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        # Checks if the provided password matches the hashed password
        return bcrypt.check_password_hash(self.password_hash, password)


# Muscle Group Table
class MuscleGroup(db.Model):

    # Represents a muscle group (e.g., chest, back, legs).
    __tablename__ = 'muscle_groups'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)  # Muscle name (e.g., biceps, lats)

    # Foreign Keys
    exercise_id = db.Column(db.Integer, db.ForeignKey('exercises.id'), nullable=False)

# Exercise Table
class Exercise(db.Model):
    # Represents all exercises fetched from the external API.
    __tablename__ = 'exercises'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)  # Avoid duplicates
    type = db.Column(db.String(100), nullable=True)  # Type of exercise (e.g., strength)
    muscle = db.Column(db.String(100), nullable=True)  # Targeted muscle
    equipment = db.Column(db.String(100), nullable=True)  # Required equipment
    difficulty = db.Column(db.String(50), nullable=True)  # Difficulty level
    instructions = db.Column(db.Text, nullable=True)  # Exercise instructions


    # Relationships
    muscle_group_association = db.relationship('MuscleGroup', backref='exercise', lazy=True) 
    favorites = db.relationship('UserFavorite', backref='exercise', lazy=True)  # Relationship with UserFavorite
    workout_plans = db.relationship('WorkoutPlanDetail', backref='exercise', lazy=True)  # Relationship with WorkoutPlanDetail


# UserFavorite Table
class UserFavorite(db.Model):
    
    # Represents a user's favorite exercises.

    __tablename__ = 'user_favorites'

    id = db.Column(db.Integer, primary_key=True)

    # Foreign Keys
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    exercise_id = db.Column(db.Integer, db.ForeignKey('exercises.id'), nullable=False)


# UserWorkout Table
class UserWorkout(db.Model):
    
    # Represents a user's workout plan (push day, pull day)

    __tablename__ = 'user_workouts'

    id = db.Column(db.Integer, primary_key=True)
    plan_name = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    # Foreign Keys
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # Relationships
    details = db.relationship('WorkoutPlanDetail', backref='workout_plan', lazy=True)  # Relationship with WorkoutPlanDetail


# WorkoutPlanDetail Table
class WorkoutPlanDetail(db.Model):

    # Links exercises to workout plans.

    __tablename__ = 'workout_plan_details'

    id = db.Column(db.Integer, primary_key=True)

    # Foreign Keys
    plan_id = db.Column(db.Integer, db.ForeignKey('user_workouts.id'), nullable=False)
    exercise_id = db.Column(db.Integer, db.ForeignKey('exercises.id'), nullable=False)
