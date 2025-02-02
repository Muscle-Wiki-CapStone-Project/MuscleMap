# user related actions 
from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.initialization import db

user_bp = Blueprint('users', __name__)

@user_bp.route('/profile', methods=['GET'])
@login_required
def get_current_user():
    print("Inside the profile route")  # Debugging message
    if current_user.is_authenticated:
        print(f"User {current_user.username} is authenticated")  # Debugging message
        return jsonify({
            'id': current_user.id,
            'username': current_user.username,
            'gender': current_user.gender,
        })
    return jsonify({'error': 'Unauthorized'}), 401
