import sqlite3

from flask import Blueprint, jsonify, request
from werkzeug.security import check_password_hash, generate_password_hash

from db import get_connection

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")


def error(message, code):
    return jsonify({"status": "error", "message": message}), code


@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json(silent=True) or {}
    full_name = (data.get("fullName") or "").strip()
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""

    if not full_name or not email or not password:
        return error("Name, email and password are required.", 400)
    if "@" not in email:
        return error("Please enter a valid email address.", 400)
    if len(password) < 6:
        return error("Password must be at least 6 characters.", 400)

    conn = get_connection()
    try:
        conn.execute(
            "INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?)",
            (full_name, email, generate_password_hash(password)),
        )
        conn.commit()
    except sqlite3.IntegrityError:
        return error("An account with this email already exists.", 409)
    finally:
        conn.close()

    return jsonify({"status": "success", "message": "Account created."}), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json(silent=True) or {}
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""

    conn = get_connection()
    user = conn.execute(
        "SELECT * FROM users WHERE email = ?", (email,)
    ).fetchone()
    conn.close()

    if user is None or not check_password_hash(user["password_hash"], password):
        return error("Invalid email or password.", 401)

    return jsonify(
        {
            "status": "success",
            "user": {
                "id": user["id"],
                "fullName": user["full_name"],
                "email": user["email"],
            },
        }
    )