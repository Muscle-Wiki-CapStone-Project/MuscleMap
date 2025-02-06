from flask import Blueprint, request, jsonify, session
from app.initialization import db
from app.models import User, UserFavorite, Exercise

user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/profile', methods=['POST', 'GET'])
def profile():
    data = request.json
    session_id = data.get('session_id')

    if not session_id:
        return jsonify({'error': 'Unauthorized'}), 401

    user = User.query.get(session_id)  # Look up user by session_id

    if not user:
        return jsonify({'error': 'User not found'}), 404

    return jsonify({'username': user.username, 'gender': user.gender})


# ⭐ Add Exercise to Favorites (Manual Session Handling)
@user_bp.route('/favorites', methods=['POST'])
def add_favorite():
    data = request.json
    session_id = data.get('session_id')
    exercise_id = data.get('exercise_id')

    if not session_id or not exercise_id:
        return jsonify({'error': 'Session ID and Exercise ID required'}), 400

    user = User.query.get(session_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    exercise = Exercise.query.get(exercise_id)
    if not exercise:
        return jsonify({'error': 'Exercise not found'}), 404

    # Check if already favorited
    existing_favorite = UserFavorite.query.filter_by(user_id=user.id, exercise_id=exercise_id).first()
    if existing_favorite:
        return jsonify({'message': 'Exercise already in favorites'}), 200

    # Add to favorites
    new_favorite = UserFavorite(user_id=user.id, exercise_id=exercise_id)
    db.session.add(new_favorite)
    db.session.commit()

    return jsonify({'message': 'Exercise added to favorites'}), 201


# ❌ Remove Exercise from Favorites (Manual Session Handling)
@user_bp.route('/favorites/<int:exercise_id>', methods=['DELETE'])
def remove_favorite(exercise_id):
    data = request.json
    session_id = data.get('session_id')

    if not session_id:
        return jsonify({'error': 'Session ID required'}), 400

    user = User.query.get(session_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    favorite = UserFavorite.query.filter_by(user_id=user.id, exercise_id=exercise_id).first()

    if not favorite:
        return jsonify({'error': 'Exercise not found in favorites'}), 404

    db.session.delete(favorite)
    db.session.commit()

    return jsonify({'message': 'Exercise removed from favorites'}), 200


# ❤️ Get User's Favorite Exercises (Manual Session Handling)
@user_bp.route('/favorites', methods=['POST'])
def get_favorites():
    data = request.json
    session_id = data.get('session_id')

    if not session_id:
        return jsonify({'error': 'Session ID required'}), 400

    user = User.query.get(session_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    favorites = UserFavorite.query.filter_by(user_id=user.id).all()
    favorite_exercises = [fav.exercise_id for fav in favorites]

    return jsonify({'favorites': favorite_exercises}), 200
