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

class MuscleGroup(db.Model):
    __tablename__ = 'muscle_groups'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
   

    # Relationship with Exercise
    exercises = db.relationship('Exercise', back_populates='muscle_group', lazy=True)

class Exercise(db.Model):
    __tablename__ = 'exercises'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    type = db.Column(db.String(100), nullable=True)
    muscle = db.Column(db.String(100), nullable=True)
    equipment = db.Column(db.String(100), nullable=True)
    difficulty = db.Column(db.String(50), nullable=True)
    instructions = db.Column(db.Text, nullable=True)

    # Foreign key to muscle_groups
    muscle_group_id = db.Column(db.Integer, db.ForeignKey('muscle_groups.id'), nullable=False)

    # Define relationship to MuscleGroup
    muscle_group = db.relationship('MuscleGroup', back_populates='exercises')





# UserFavorite Table
class UserFavorite(db.Model):
    
    # Represents a user's favorite exercises.

    __tablename__ = 'user_favorites'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    exercise_id = db.Column(db.Integer, db.ForeignKey('exercises.id'), nullable=False)

    exercise = db.relationship('Exercise', lazy=True)


# UserWorkout Table
workout_exercise = db.Table(
    'workout_exercise',
    db.Column('workout_id', db.Integer, db.ForeignKey('user_workouts.id'), primary_key=True),  
    db.Column('exercise_id', db.Integer, db.ForeignKey('exercises.id'), primary_key=True)  
)


class UserWorkout(db.Model):
    __tablename__ = 'user_workouts'

    id = db.Column(db.Integer, primary_key=True)
    plan_name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False) 

    exercises = db.relationship('Exercise', secondary=workout_exercise, backref=db.backref('workouts', lazy=True))


# WorkoutPlanDetail Table
class WorkoutPlanDetail(db.Model):

    # Links exercises to workout plans.

    __tablename__ = 'workout_plan_details'

    id = db.Column(db.Integer, primary_key=True)

    # Foreign Keys
    plan_id = db.Column(db.Integer, db.ForeignKey('user_workouts.id'), nullable=False)
    exercise_id = db.Column(db.Integer, db.ForeignKey('exercises.id'), nullable=False)
