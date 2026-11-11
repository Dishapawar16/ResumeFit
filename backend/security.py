import os
from datetime import datetime, timedelta, timezone
from functools import wraps

import jwt
from dotenv import load_dotenv
from flask import g, jsonify, request

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
TOKEN_HOURS = 12

if not SECRET_KEY:
    raise RuntimeError("SECRET_KEY is missing. Add it to backend/.env")


def create_token(user_id):
    payload = {
        "sub": str(user_id),
        "exp": datetime.now(timezone.utc) + timedelta(hours=TOKEN_HOURS),
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")


def token_required(view):
    @wraps(view)
    def wrapper(*args, **kwargs):
        header = request.headers.get("Authorization", "")
        if not header.startswith("Bearer "):
            return jsonify({"status": "error", "message": "Login required."}), 401

        token = header[len("Bearer "):]
        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            g.user_id = int(data["sub"])
        except (jwt.InvalidTokenError, KeyError, ValueError):
            return (
                jsonify(
                    {
                        "status": "error",
                        "message": "Session expired. Please log in again.",
                    }
                ),
                401,
            )

        return view(*args, **kwargs)

    return wrapper