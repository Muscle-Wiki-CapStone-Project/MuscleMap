from flask import Blueprint, jsonify
from app.models import MuscleGroup, Exercise

muscle_group_bp = Blueprint('muscle_group', __name__)

@muscle_group_bp.route('/muscle-group/<group_name>', methods=['GET'])
def get_exercises_by_muscle_group(group_name):
    exercises = Exercise.query.filter_by(muscle_group=group_name).all()
    data = [{'id': ex.id, 'name': ex.name} for ex in exercises]
    return jsonify(data), 200
