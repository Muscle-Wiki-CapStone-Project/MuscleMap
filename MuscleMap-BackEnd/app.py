# from flask import Flask, render_template, redirect, url_for, request, flash, session, Migrate
# from flask_sqlalchemy import SQLAlchemy
# from flask_bcrypt import Bcrypt
# from flask_login import LoginManager, login_user, login_required, logout_user, current_user
# from config import Config

from flask import Flask
from flask_migrate import Migrate
from flask_login import LoginManager
from extensions import db, bcrypt 
from config import Config
from models import User  
from routes import auth_bp  
from flask_cors import CORS



# Initialize the Flask app
app = Flask(__name__)
app.config.from_object(Config)

# Initialize extensions
CORS(app)
db.init_app(app)
bcrypt.init_app(app)
migrate = Migrate(app, db)

# Login manager setup
login_manager = LoginManager(app)
login_manager.login_view = 'auth.login'  # Set the login route

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Test route
@app.route('/')
def home():
    return "Welcome to MuscleMap!"

# Register Blueprints
app.register_blueprint(auth_bp)

if __name__ == '__main__':
    app.run(debug=True)
