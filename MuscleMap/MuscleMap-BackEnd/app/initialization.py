# file to initialize all my flask app (extensions, blueprints etc)
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_cors import CORS
from app.config import Config
from dotenv import load_dotenv

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()
login_manager = LoginManager()
load_dotenv()
def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions with the app
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    login_manager.init_app(app)


    login_manager.login_view = 'auth.login'
    # login_manager.login_message = None

    # Enable CORS for all routes
    CORS(app, supports_credentials=True, resources={r"/api/*": {"origins": "http://localhost:5173"}})

    # Register blueprints
    with app.app_context():
        from app.routes.auth_routes import auth_bp
        from app.routes.user_routes import user_bp
        from app.routes.workout_routes import workout_bp
        from app.routes.exercise_routes import exercise_bp
        from app.routes.muscle_group_routes import muscle_group_bp

        app.register_blueprint(auth_bp, url_prefix='/api')
        app.register_blueprint(user_bp, url_prefix='/api')
        app.register_blueprint(workout_bp, url_prefix='/api')
        app.register_blueprint(exercise_bp, url_prefix='/api')
        app.register_blueprint(muscle_group_bp, url_prefix='/api')

        # Import models
        from app.models import User

        # Flask-Login user loader
        @login_manager.user_loader
        def load_user(user_id):
            return User.query.get(int(user_id))
        
    @app.route('/', methods=['GET'])
    def api_home():
        return "Welcome to MuscleMap API!"
    
    print("Database URI:", app.config['SQLALCHEMY_DATABASE_URI'])



    return app
