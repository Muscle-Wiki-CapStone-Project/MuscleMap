import os
import requests
from flask import Blueprint, jsonify
from app.initialization import db
from app.models import Exercise, MuscleGroup
from flask_cors import cross_origin

exercise_bp = Blueprint('exercise', __name__)

API_BASE_URL = "https://api.api-ninjas.com/v1/exercises"
API_KEY = os.getenv('API_KEY')

@exercise_bp.route('/exercises/<muscle>', methods=['GET'])
def fetch_and_get_exercises(muscle):
    """
    Fetch exercises from the external API if not already in the database,
    save them to the Exercise table, and ensure they are linked to the correct MuscleGroup.
    """

    headers = {"X-Api-Key": API_KEY}
    response = requests.get(f"{API_BASE_URL}?muscle={muscle}", headers=headers)

    if response.status_code != 200:
        return jsonify({'error': 'Failed to fetch exercises from external API'}), response.status_code

    exercises = response.json()

    # Ensure the muscle group exists or create it
    muscle_group = MuscleGroup.query.filter_by(name=muscle).first()
    if not muscle_group:
        muscle_group = MuscleGroup(name=muscle)
        db.session.add(muscle_group)
        db.session.flush()  # Get the muscle group ID without committing

    # Add exercises and link them to the muscle group
    for exercise in exercises:
        existing_exercise = Exercise.query.filter_by(name=exercise['name']).first()
        if not existing_exercise:
            new_exercise = Exercise(
                name=exercise['name'],
                type=exercise.get('type', ''),
                muscle=exercise.get('muscle', ''),
                equipment=exercise.get('equipment', ''),
                difficulty=exercise.get('difficulty', ''),
                instructions=exercise.get('instructions', ''),
                muscle_group_id=muscle_group.id  # Ensure correct association
            )
            db.session.add(new_exercise)

    db.session.commit()
    
    # Return all exercises related to the muscle group
    stored_exercises = Exercise.query.filter_by(muscle_group_id=muscle_group.id).all()
    exercises_data = [
        {
            'id': exercise.id,
            'name': exercise.name,
            'type': exercise.type,
            'equipment': exercise.equipment,
            'difficulty': exercise.difficulty,
            'instructions': exercise.instructions,
            'muscle_group': muscle_group.name
        }
        for exercise in stored_exercises
    ]

    return jsonify(exercises_data), 200

@exercise_bp.route('/exercises', methods=['GET'])
def get_all_exercises():
    exercises = Exercise.query.all()
    return jsonify([
        {
            'id': exercise.id,
            'name': exercise.name,
            'muscle_group': exercise.muscle_group.name if exercise.muscle_group else "N/A",
            'equipment': exercise.equipment,
            'difficulty': exercise.difficulty,
            'instructions': exercise.instructions
        }
        for exercise in exercises
    ])

update_bp = Blueprint('update', __name__)

@update_bp.route('/update_exercises', methods=['POST'])
def update_exercises():
    exercises = Exercise.query.all()

    for exercise in exercises:
        muscle_name = exercise.muscle.lower()

        # Check if the muscle group already exists
        muscle_group = MuscleGroup.query.filter_by(name=muscle_name).first()

        # Create muscle group if not found
        if not muscle_group:
            muscle_group = MuscleGroup(name=muscle_name)
            db.session.add(muscle_group)
            db.session.commit()

        # Link the exercise to the muscle group
        muscle_group.exercises.append(exercise)
        db.session.commit()

    return jsonify({"message": "Exercises linked to their respective muscle groups successfully."}), 200
