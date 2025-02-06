from flask import Blueprint, request, jsonify, session
from flask_login import login_user, logout_user
from datetime import timedelta
from app.initialization import db
from app.models import User

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.json
    existing_user = User.query.filter_by(username=data['username']).first()

    if existing_user:
        return jsonify({'error': 'Username already exists'}), 400

    new_user = User(
        username=data['username'],
        gender=data['gender']
    )
    new_user.set_password(data['password'])  # Hash the password
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data['username']).first()

    if user and user.check_password(data['password']):
        login_user(user)
        session['user_id'] = user.id  # Store user ID in session
        session.permanent = True
        session.permanent_session_lifetime = timedelta(days=7)  # 7-day session

        response = jsonify({'message': 'Login successful', 'session_id': user.id})
        response.set_cookie('session_id', str(user.id), httponly=True, samesite='Lax')
        return response

    return jsonify({'error': 'Invalid credentials'}), 401

@auth_bp.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)  # Remove user session
    logout_user()  # Logout the user from Flask-Login

    response = jsonify({'message': 'Logged out successfully'})
    response.set_cookie('session_id', '', expires=0)  # Expire session cookie
    return response
