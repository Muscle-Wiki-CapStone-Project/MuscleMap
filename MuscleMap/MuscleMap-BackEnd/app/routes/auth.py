# from flask import request, jsonify, session, Blueprint
# from flask_login import login_user, logout_user
# from datetime import timedelta
# from models import User
# from app import app
# from app.initialization import db, bcrypt
# from ..models import User 


# auth_bp = Blueprint('auth', __name__)

# @auth_bp.route('/signup', methods=['POST'])
# def signup():
#     data = request.json
#     username = data.get('username')
#     password = data.get('password')
#     gender = data.get('gender')

#     if User.query.filter_by(username=username).first():
#         return jsonify({'error': 'Username already exists'}), 400

#     user = User(username=username, gender=gender)
#     user.set_password(password)
#     db.session.add(user)
#     db.session.commit()

#     return jsonify({'message': 'User registered successfully'})

# @app.route('/api/login', methods=['POST'])
# def login():
#     data = request.json
#     user = User.query.filter_by(email=data['email']).first()

#     if user and user.check_password(data['password']):
#         login_user(user)
#         session['user_id'] = user.id  # Store user ID in session
#         session.permanent = True
#         app.permanent_session_lifetime = timedelta(days=7)  # 7-day session

#         response = jsonify({'message': 'Login successful', 'session_id': user.id})
#         response.set_cookie('session_id', str(user.id), httponly=True, samesite='Lax')
#         return response

#     return jsonify({'error': 'Invalid credentials'}), 401


# @app.route('/api/profile', methods=['POST'])
# def profile():
#     data = request.json
#     session_id = data.get('session_id')

#     if not session_id:
#         return jsonify({'error': 'Unauthorized'}), 401

#     user = User.query.get(session_id)  # Look up user by session_id

#     if not user:
#         return jsonify({'error': 'User not found'}), 404

#     return jsonify({'username': user.username, 'email': user.email})


# @app.route('/api/logout', methods=['POST'])
# def logout():
#     session.pop('user_id', None)  # Remove user session
#     logout_user()  # Logout the user from Flask-Login

#     response = jsonify({'message': 'Logged out successfully'})
#     response.set_cookie('session_id', '', expires=0)  # Expire session cookie
#     return response
