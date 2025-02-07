from flask import Blueprint, request, jsonify
from app.models import User, UserWorkout
from app.initialization import db

workout_bp = Blueprint('workout_bp', __name__)

# ✅ Handle both GET (fetch workouts) and POST (create workout)
@workout_bp.route('/workouts', methods=['GET', 'POST'])
def workouts():
    if request.method == "GET":
        return get_workouts()
    elif request.method == "POST":
        return create_workout()
    return jsonify({'error': 'Method not allowed'}), 405  # Fallback

# ✅ Fetch User Workouts
def get_workouts():
    session_id = request.cookies.get("session_id")
    if not session_id:
        session_id = request.headers.get("Authorization")
        if session_id and session_id.startswith("Bearer "):
            session_id = session_id.split("Bearer ")[1]

    print("Cookies received in GET /api/workouts:", request.cookies)
    print("Session ID received in GET /api/workouts:", session_id)

    if not session_id:
        return jsonify({'error': 'Unauthorized'}), 401

    user = User.query.get(session_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    workouts = UserWorkout.query.filter_by(user_id=user.id).all()
    
    workout_list = [{
        'id': workout.id,
        'title': workout.plan_name,
        'description': workout.description
    } for workout in workouts]

    return jsonify({'workouts': workout_list}), 200

# ✅ Create a Workout Routine
def create_workout():
    session_id = request.cookies.get("session_id")
    if not session_id:
        session_id = request.headers.get("Authorization")
        if session_id and session_id.startswith("Bearer "):
            session_id = session_id.split("Bearer ")[1]

    print("Session ID received in POST /api/workouts:", session_id)

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

    # Ensure user only adds favorited exercises
    valid_exercise_ids = [fav.exercise_id for fav in user.favorites]
    if not all(ex_id in valid_exercise_ids for ex_id in exercise_ids):
        return jsonify({'error': 'One or more exercises are not in favorites'}), 400

    # Create workout routine
    new_workout = UserWorkout(
        plan_name=title,
        description=description,
        user_id=user.id
    )
    db.session.add(new_workout)
    db.session.commit()

    return jsonify({'message': 'Workout routine created', 'workout_id': new_workout.id}), 201
