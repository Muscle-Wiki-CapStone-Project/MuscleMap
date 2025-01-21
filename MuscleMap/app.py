from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config

# Initialize the app and the database
app = Flask(__name__)
app.config.from_object(Config)

db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Import models here to register them
from models import User, Exercise, MuscleGroup, UserFavorites, UserWorkouts, WorkoutPlanDetails

@app.route('/')
def hello_world():
    return 'Hello, MuscleMap'

if __name__ == '__main__':
    app.run(debug=True)

