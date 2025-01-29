import os
import requests
from flask import Blueprint, jsonify
from app.initialization import db
from app.models import Exercise, MuscleGroup

exercise_bp = Blueprint('exercise', __name__)

API_BASE_URL = "https://api.api-ninjas.com/v1/exercises"
API_KEY = os.getenv('API_KEY')

@exercise_bp.route('/exercises/<muscle>', methods=['GET'])
def fetch_and_get_exercises(muscle):
    """
    Fetch exercises from the external API if not already in the database,
    save them to the Exercise table, and return exercises for the specified muscle.
    """
    # Fetch exercises from the external API if they don't exist
    headers = {"X-Api-Key": API_KEY}
    response = requests.get(f"{API_BASE_URL}?muscle={muscle}", headers=headers)

    if response.status_code != 200:
        return jsonify({'error': 'Failed to fetch exercises from external API'}), response.status_code

    exercises = response.json()

    for exercise in exercises:
        # Check if the exercise already exists
        existing_exercise = Exercise.query.filter_by(name=exercise['name']).first()
        if not existing_exercise:
            # Add new exercise to the database
            new_exercise = Exercise(
                name=exercise['name'],
                type=exercise.get('type', ''),
                muscle=exercise.get('muscle', ''),
                equipment=exercise.get('equipment', ''),
                difficulty=exercise.get('difficulty', ''),
                instructions=exercise.get('instructions', '')
            )
            db.session.add(new_exercise)
            db.session.flush()  # Get the new exercise ID without committing

            # Check if the muscle group exists; if not, create it
            muscle_group = MuscleGroup.query.filter_by(name=muscle).first()
            if not muscle_group:
                muscle_group = MuscleGroup(name=muscle, exercise_id=new_exercise.id)
                db.session.add(muscle_group)
            else:
                # If the muscle group exists, associate it with the exercise
                muscle_group.exercise_id = new_exercise.id

    db.session.commit()

    # Retrieve all exercises for the muscle group
    muscle_group = MuscleGroup.query.filter_by(name=muscle).first()
    if not muscle_group:
        return jsonify({'error': 'Muscle group not found'}), 404

    exercises_data = Exercise.query.filter_by(muscle=muscle).all()
    exercises_list = [
        {
            'id': exercise.id,
            'name': exercise.name,
            'type': exercise.type,
            'equipment': exercise.equipment,
            'difficulty': exercise.difficulty,
            'instructions': exercise.instructions
        }
        for exercise in exercises_data
    ]
    return jsonify(exercises_list), 200
