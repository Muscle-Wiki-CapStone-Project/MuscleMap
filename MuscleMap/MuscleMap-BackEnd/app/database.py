# for initializing the DB and sessions 

from app import db
from models import User, MuscleGroup, Exercise, UserWorkout, UserFavorite, WorkoutPlanDetail

def create_tables():
    db.create_all()
