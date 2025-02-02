# User Auth handled (signup, login, logout )

from flask import Blueprint, request, jsonify
from app.initialization import db, bcrypt
from app.models import User
from flask_login import login_user, logout_user, login_required, current_user

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    gender = data.get('gender')

    if User.query.filter_by(username=username).first():
        return jsonify({'error': 'Username already exists'}), 400

    user = User(username=username, gender=gender)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'})

from flask import request, jsonify, redirect, url_for
from flask_login import login_user, current_user
from app.models import User

@auth_bp.route('/login', methods=['POST', 'GET'])
def login():
    # Handle GET request for already logged-in users
    if current_user.is_authenticated:
        return redirect(url_for('users.get_current_user'))  # Redirect to profile if logged in
    
    # Handle POST request for login
    if request.method == 'POST':
        data = request.get_json()  # Use .get_json() to parse JSON body
        username = data.get('username')
        password = data.get('password')

        # Check if user exists and password is correct
        user = User.query.filter_by(username=username).first()
        if not user or not user.check_password(password):
            return jsonify({'error': 'Invalid username or password'}), 401
        
        # Log in the user
        login_user(user)
        
        # Respond with a success message or a token
        return jsonify({'message': 'Logged in successfully'}), 200

    # If it's a GET request and user is not logged in, return a login prompt or error
    return jsonify({'message': 'Please log in to access this endpoint.'}), 401

@auth_bp.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logged out successfully'})
