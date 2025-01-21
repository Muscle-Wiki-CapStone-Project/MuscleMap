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
    password = data.get('password')
    gender = data.get('gender')  

    # Check if the username already exists
    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username already exists"}), 400

    # Check gender 
    valid_genders = ['Male', 'Female', 'Other']
    if gender not in valid_genders:
        return jsonify({"error": f"Invalid gender. Must be one of {valid_genders}"}), 400

    # Create the new user
    new_user = User(username=username, gender=gender)
    new_user.set_password(password)

    # Add to the database
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201


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
