# User Auth handled (signup, login, logout )

from flask import Blueprint, request, jsonify
from app.initialization import db, bcrypt
from app.models import User
from flask_login import login_user, logout_user, login_required, current_user
from flask_cors import cross_origin

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

from flask import Blueprint, request, jsonify, redirect, url_for
from flask_login import login_user, current_user
from app.models import User
from flask_cors import cross_origin

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['GET', 'POST'])  
@cross_origin(origins="http://localhost:5173", supports_credentials=True) 
def login():
    if request.method == 'GET':
        if current_user.is_authenticated:
            print("User is already logged in:", current_user.username)
            return jsonify({"message": "Already logged in", "user": current_user.username}), 200
        return jsonify({"message": "Please log in"}), 401

    # Handle POST login (existing code)
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if not user or not user.check_password(password):
        return jsonify({'error': 'Invalid username or password'}), 401

    login_user(user)
    return jsonify({'message': 'Logged in successfully'}), 200



@auth_bp.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logged out successfully'})
