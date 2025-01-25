from flask import Blueprint, request, jsonify, flash
from flask_login import login_user, logout_user, login_required
from extensions import db, bcrypt  # Import from extensions
from models import User

# Define the Blueprint
auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    gender = data.get('gender')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Username and password are required!'}), 400

    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({'message': 'Username already exists!'}), 409

    user = User(username=username, gender=gender)
    user.set_password(password)

    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully!'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if not user or not user.check_password(password):
        return jsonify({'message': 'Invalid username or password!'}), 401

    login_user(user)
    return jsonify({'message': 'Login successful!'}), 200

@auth_bp.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logout successful!'}), 200
