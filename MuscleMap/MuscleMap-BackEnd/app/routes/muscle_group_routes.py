from flask import Blueprint, jsonify
from app.models import Exercise, MuscleGroup
from app.initialization import db, bcrypt


muscle_group_bp = Blueprint('muscle_group_routes', __name__)

# Route to retrieve all muscle groups
@muscle_group_bp.route('/muscles', methods=['GET'])
def get_muscle_groups():
    try:
    
        muscle_groups = MuscleGroup.query.all()

        return jsonify([{
            'id': group.id,
            'name': group.name,
            'description': group.description
        } for group in muscle_groups]), 200
    except Exception as e:

        return jsonify({'error': 'Failed to retrieve muscle groups', 'details': str(e)}), 500
@muscle_group_bp.route('/muscle-group/<group_name>', methods=['GET'])
def get_exercises_by_muscle_group(group_name):
    exercises = Exercise.query.filter_by(muscle_group=group_name).all()
    data = [{'id': ex.id, 'name': ex.name} for ex in exercises]
    return jsonify(data), 200
