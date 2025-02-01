from app.initialization import create_app, db

app = create_app()

if __name__ == "__main__":
    print("App Configurations:")
    print("SECRET_KEY:", app.config['SECRET_KEY'])
    print("DATABASE_URL:", app.config['SQLALCHEMY_DATABASE_URI'])
    app.run(debug=True)
