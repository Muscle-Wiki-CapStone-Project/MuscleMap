from flask import Blueprint, request, jsonify, session
from app.models import User

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
