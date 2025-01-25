# Will use this file as a entry for my flask app 

from app.initialization import create_app, db

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
