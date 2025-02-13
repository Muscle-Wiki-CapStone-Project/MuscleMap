from flask import Blueprint, request, jsonify
from app.models import User, UserWorkout, Exercise
from app.initialization import db

workout_bp = Blueprint('workout_bp', __name__)

# Handle both GET (fetch workouts) and POST (create workout)
@workout_bp.route('/workouts', methods=['GET', 'POST'])
def workouts():
    if request.method == "GET":
        return get_workouts()
    elif request.method == "POST":
        return create_workout()
    return jsonify({'error': 'Method not allowed'}), 405  # Fallback

#  Fetch User Workouts with Exercises
@workout_bp.route('/workouts', methods=['GET'])
def get_workouts():
    session_id = request.cookies.get("session_id")
    if not session_id:
        session_id = request.headers.get("Authorization")
        if session_id and session_id.startswith("Bearer "):
            session_id = session_id.split("Bearer ")[1]

    if not session_id:
        return jsonify({'error': 'Unauthorized'}), 401

    user = User.query.get(session_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    workouts = UserWorkout.query.filter_by(user_id=user.id).all()
    
    workout_list = [{
        'id': workout.id,
        'title': workout.plan_name,
        'description': workout.description,
        'exercises': [exercise.name for exercise in workout.exercises]  # ✅ Fetch exercises correctly
    } for workout in workouts]

    return jsonify({'workouts': workout_list}), 200




#  Create a Workout Routine
@workout_bp.route('/workouts', methods=['POST'])
def create_workout():
    session_id = request.cookies.get("session_id")
    if not session_id:
        session_id = request.headers.get("Authorization")
        if session_id and session_id.startswith("Bearer "):
            session_id = session_id.split("Bearer ")[1]

    if not session_id:
        return jsonify({'error': 'Unauthorized'}), 401

    user = User.query.get(session_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    data = request.json
    title = data.get("title")
    description = data.get("description")
    exercise_ids = data.get("exercise_ids")

    if not title or not exercise_ids:
        return jsonify({'error': 'Title and at least one exercise are required'}), 400

    # Create the workout
    new_workout = UserWorkout(plan_name=title, description=description, user_id=user.id)
    db.session.add(new_workout)
    db.session.flush()  # Ensure the workout ID is available

    # Add exercises to the workout
    for ex_id in exercise_ids:
        exercise = Exercise.query.get(ex_id)
        if exercise:
            new_workout.exercises.append(exercise)

    db.session.commit()
    return jsonify({'message': 'Workout routine created', 'workout_id': new_workout.id}), 201

@workout_bp.route('/workouts/<int:workout_id>', methods=['PATCH'])
def update_workout(workout_id):
    session_id = request.cookies.get("session_id")
    if not session_id:
        session_id = request.headers.get("Authorization")
        if session_id and session_id.startswith("Bearer "):
            session_id = session_id.split("Bearer ")[1]

    if not session_id:
        return jsonify({'error': 'Unauthorized'}), 401

    user = User.query.get(session_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    workout = UserWorkout.query.get(workout_id)
    if not workout or workout.user_id != user.id:
        return jsonify({'error': 'Workout not found or not authorized'}), 403

    data = request.json
    workout.plan_name = data.get("title", workout.plan_name)
    workout.description = data.get("description", workout.description)

    db.session.commit()

    return jsonify({'message': 'Workout updated successfully'}), 200






@workout_bp.route('/workouts/<int:workout_id>', methods=['DELETE'])
def delete_workout(workout_id):
    session_id = request.cookies.get("session_id")
    if not session_id:
        session_id = request.headers.get("Authorization")
        if session_id and session_id.startswith("Bearer "):
            session_id = session_id.split("Bearer ")[1]

    if not session_id:
        return jsonify({'error': 'Unauthorized'}), 401

    user = User.query.get(session_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    workout = UserWorkout.query.get(workout_id)
    if not workout or workout.user_id != user.id:
        return jsonify({'error': 'Workout not found or not authorized'}), 403

    db.session.delete(workout)
    db.session.commit()

    return jsonify({'message': 'Workout deleted successfully'}), 200
