from initialization import db
from models import User, UserWorkout, Exercise, MuscleGroup, UserFavorite

# ---------- USER QUERIES ----------

def get_user_by_username(username):
    """Fetch a user by username."""
    return User.query.filter_by(username=username).first()

def get_user_by_id(user_id):
    """Fetch a user by user ID."""
    return User.query.get(user_id)

def create_user(username, password, gender):
    """Create a new user and save it to the database."""
    user = User(username=username, gender=gender)
    user.set_password(password)  # Hash the password
    db.session.add(user)
    db.session.commit()
    return user

def update_user_profile(user_id, **kwargs):
    """Update user profile information (e.g., gender)."""
    user = User.query.get(user_id)
    if user:
        for key, value in kwargs.items():
            setattr(user, key, value)
        db.session.commit()
        return user
    return None


# ---------- FAVORITE EXERCISE QUERIES ----------

def get_favorite_exercises_by_user(user_id):
    """Fetch all favorite exercises for a user."""
    return UserFavorite.query.filter_by(user_id=user_id).all()

def add_favorite_exercise(user_id, exercise_id):
    """Add an exercise to a user's favorites."""
    if not UserFavorite.query.filter_by(user_id=user_id, exercise_id=exercise_id).first():
        favorite = UserFavorite(user_id=user_id, exercise_id=exercise_id)
        db.session.add(favorite)
        db.session.commit()
        return favorite
    return None

def remove_favorite_exercise(user_id, exercise_id):
    """Remove an exercise from a user's favorites."""
    favorite = UserFavorite.query.filter_by(user_id=user_id, exercise_id=exercise_id).first()
    if favorite:
        db.session.delete(favorite)
        db.session.commit()
        return True
    return False


# ---------- WORKOUT QUERIES ----------

def get_workouts_by_user(user_id):
    """Fetch all workouts created by a specific user."""
    return UserWorkout.query.filter_by(user_id=user_id).all()

def create_workout(user_id, name, description, exercise_ids):
    """Create a new workout with a list of exercises."""
    workout = UserWorkout(user_id=user_id, name=name, description=description)
    db.session.add(workout)
    db.session.commit()

    for exercise_id in exercise_ids:
        exercise = Exercise.query.get(exercise_id)
        if exercise:
            workout.exercises.append(exercise)

    db.session.commit()
    return workout

def get_workout_by_id(workout_id):
    """Fetch a specific workout by its ID."""
    return UserWorkout.query.get(workout_id)

def delete_workout(workout_id):
    """Delete a workout by its ID."""
    workout = UserWorkout.query.get(workout_id)
    if workout:
        db.session.delete(workout)
        db.session.commit()
        return True
    return False


# ---------- EXERCISE QUERIES ----------

def get_exercises_by_muscle_group(muscle_group_id):
    """Fetch all exercises associated with a specific muscle group."""
    return Exercise.query.filter_by(muscle_group_id=muscle_group_id).all()

def get_exercise_by_id(exercise_id):
    """Fetch a specific exercise by its ID."""
    return Exercise.query.get(exercise_id)


# ---------- MUSCLE GROUP QUERIES ----------

def get_all_muscle_groups():
    """Fetch all muscle groups."""
    return MuscleGroup.query.all()

def get_muscle_group_by_id(muscle_group_id):
    """Fetch a specific muscle group by its ID."""
    return MuscleGroup.query.get(muscle_group_id)