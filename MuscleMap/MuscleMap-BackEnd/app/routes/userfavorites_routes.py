from urllib import request
from app.db_queries import add_favorite_exercise
from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.initialization import db, bcrypt
from app.routes.auth_routes import auth_bp




@auth_bp.route('/favorite', methods=['POST'])
@login_required
def add_favorite():
    data = request.json
    exercise_id = data.get('exercise_id')

    if add_favorite_exercise(current_user.id, exercise_id):
        return jsonify({'message': 'Exercise added to favorites'}), 200
    return jsonify({'error': 'Exercise already in favorites or does not exist'}), 400
