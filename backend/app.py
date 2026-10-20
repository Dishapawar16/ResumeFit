from flask import Flask
from flask_cors import CORS
from db import init_db
from auth import auth_bp

app = Flask(__name__)
CORS(app)
init_db()
app.register_blueprint(auth_bp)

@app.route("/")
def home():
    return {
        "message": "Welcome to ResumeFit Backend!",
        "status": "success"
    }


@app.route("/api/health")
def health():
    return {
        "status": "ok",
        "message": "ResumeFit backend is running"
    }


if __name__ == "__main__":
    app.run(debug=True)