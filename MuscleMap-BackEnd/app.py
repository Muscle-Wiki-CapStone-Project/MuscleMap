# from flask import Flask, render_template, redirect, url_for, request, flash, session, Migrate
# from flask_sqlalchemy import SQLAlchemy
# from flask_bcrypt import Bcrypt
# from flask_login import LoginManager, login_user, login_required, logout_user, current_user
# from config import Config

import bcrypt
from flask import Config, Flask, render_template, redirect, url_for, request, flash, session
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from config import Config
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView

# Initialize the app and database
app = Flask(__name__)
app.config.from_object(Config)


db = SQLAlchemy(app)
migrate = Migrate(app, db)

login_manager = LoginManager(app)
login_manager.login_view = 'login'  # Redirect to login page when not authenticated

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Add routes for login/logout, for example:
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username).first()
        if user and bcrypt.check_password_hash(user.password_hash, password):
            login_user(user)
            return redirect(url_for('dashboard'))
        flash('Login failed. Check username and/or password')
    return render_template('login.html')




# Import models after db is initialized to avoid circular imports
from models import User, Exercise, MuscleGroup, UserFavorites, UserWorkouts, WorkoutPlanDetails

@app.route('/')
def home():
    return 'Hello, MuscleMap API!'

admin = Admin(app, name='MuscleMap Admin', template_mode='bootstrap3')

# Add models to the admin interface
admin.add_view(ModelView(User, db.session))
# admin.add_view(ModelView(Exercise, db.session))


if __name__ == '__main__':
    app.run(debug=True)
