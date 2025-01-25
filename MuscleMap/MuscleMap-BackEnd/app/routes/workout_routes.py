from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import UserWorkout
from app.initialization import db

# Blueprint for workout routes
workout_bp = Blueprint('workouts', __name__)

@workout_bp.route('/manage_workout', methods=['GET', 'POST'])
@login_required
def manage_workout():
    if request.method == 'GET':
        # Handle GET request: Fetch all workouts for the logged-in user
        workouts = UserWorkout.query.filter_by(user_id=current_user.id).all()
        return jsonify([
            {
                'id': workout.id,
                'plan_name': workout.plan_name,
                'created_at': workout.created_at
            } for workout in workouts
        ])

    elif request.method == 'POST':
        # Handle POST request: Add a new workout plan for the logged-in user
        data = request.json
        plan_name = data.get('plan_name')

        if not plan_name:
            return jsonify({'error': 'Plan name is required'}), 400

        new_workout = UserWorkout(plan_name=plan_name, user_id=current_user.id)
        db.session.add(new_workout)
        db.session.commit()

        return jsonify({'message': 'Workout plan created successfully'}), 201


@workout_bp.route('/delete/<int:workout_id>', methods=['DELETE'])
@login_required
def delete_workout(workout_id):
    # Handle DELETE request: Delete a specific workout plan by ID
    workout = UserWorkout.query.filter_by(id=workout_id, user_id=current_user.id).first()

    if not workout:
        return jsonify({'error': 'Workout not found'}), 404

    db.session.delete(workout)
    db.session.commit()

    return jsonify({'message': 'Workout plan deleted successfully'})
