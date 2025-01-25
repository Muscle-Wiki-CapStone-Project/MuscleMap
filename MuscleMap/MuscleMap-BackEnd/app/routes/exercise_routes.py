from flask import Blueprint, jsonify
from app.models import Exercise
from app.initialization import db, bcrypt


exercise_bp = Blueprint('exercise_routes', __name__)

@exercise_bp.route('/exercises', methods=['GET'])
def get_exercises():
    try:
        # Query all exercises from the database
        exercises = Exercise.query.all()

        
        return jsonify([{
            'id': exercise.id,
            'name': exercise.name,
            'description': exercise.description,
            'video_url': exercise.video_url,
            'required_equipment': exercise.required_equipment
        } for exercise in exercises]), 200
    except Exception as e:
        # Handle unexpected errors
        return jsonify({'error': 'Failed to retrieve exercises', 'details': str(e)}), 500

