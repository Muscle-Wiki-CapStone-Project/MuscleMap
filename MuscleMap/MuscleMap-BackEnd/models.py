from extensions import db, bcrypt
from flask_login import UserMixin

# Users Table
class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False, unique=True)
    gender = db.Column(db.String(20), nullable=True)
    password_hash = db.Column(db.String(128), nullable=False)

    favorites = db.relationship('UserFavorites', backref='user', lazy=True)
    workouts = db.relationship('UserWorkouts', backref='user', lazy=True)

    # Set the user's password with hashing
    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    # Check if the password matches the hashed password
    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

class MuscleGroup(db.Model):
    __tablename__ = 'muscleGroup'

    muscle_group_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=True)

    exercises = db.relationship('Exercise', backref='muscle_group', lazy=True)

class Exercise(db.Model):
    __tablename__ = 'exercise'

    exercise_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    video_url = db.Column(db.String(255), nullable=True)
    required_equipment = db.Column(db.String(255), nullable=True)
    muscle_group_id = db.Column(db.Integer, db.ForeignKey('muscleGroup.muscle_group_id'), nullable=False)

    favorites = db.relationship('UserFavorites', backref='exercise', lazy=True)
    workout_plans = db.relationship('WorkoutPlanDetails', backref='exercise', lazy=True)

class UserFavorites(db.Model):
    __tablename__ = 'users_favorites'

    favorite_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    exercise_id = db.Column(db.Integer, db.ForeignKey('exercise.exercise_id'), nullable=False)

class UserWorkouts(db.Model):
    __tablename__ = 'userWorkouts'

    plan_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    plan_name = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

    details = db.relationship('WorkoutPlanDetails', backref='workout_plan', lazy=True)

class WorkoutPlanDetails(db.Model):
    __tablename__ = 'workoutPlanDetails'

    plan_detail_id = db.Column(db.Integer, primary_key=True)
    plan_id = db.Column(db.Integer, db.ForeignKey('userWorkouts.plan_id'), nullable=False)
    exercise_id = db.Column(db.Integer, db.ForeignKey('exercise.exercise_id'), nullable=False)
