import json

from flask import Blueprint, g, jsonify, request

from db import get_connection
from security import token_required

resumes_bp = Blueprint("resumes", __name__, url_prefix="/api/resumes")


def error(message, code):
    return jsonify({"status": "error", "message": message}), code


def row_to_dict(row, include_content=True):
    item = {
        "id": row["id"],
        "title": row["title"],
        "createdAt": row["created_at"],
        "updatedAt": row["updated_at"],
    }
    if include_content:
        item["content"] = json.loads(row["content"])
    return item


@resumes_bp.route("", methods=["GET"])
@token_required
def list_resumes():
    conn = get_connection()
    rows = conn.execute(
        "SELECT * FROM resumes WHERE user_id = ? ORDER BY updated_at DESC",
        (g.user_id,),
    ).fetchall()
    conn.close()

    return jsonify(
        {
            "status": "success",
            "resumes": [row_to_dict(r, include_content=False) for r in rows],
        }
    )


@resumes_bp.route("", methods=["POST"])
@token_required
def create_resume():
    data = request.get_json(silent=True) or {}
    title = (data.get("title") or "Untitled resume").strip()
    content = data.get("content")

    if content is None:
        return error("Resume content is required.", 400)

    conn = get_connection()
    cursor = conn.execute(
        "INSERT INTO resumes (user_id, title, content) VALUES (?, ?, ?)",
        (g.user_id, title, json.dumps(content)),
    )
    conn.commit()
    row = conn.execute(
        "SELECT * FROM resumes WHERE id = ?", (cursor.lastrowid,)
    ).fetchone()
    conn.close()

    return jsonify({"status": "success", "resume": row_to_dict(row)}), 201


@resumes_bp.route("/<int:resume_id>", methods=["GET"])
@token_required
def get_resume(resume_id):
    conn = get_connection()
    row = conn.execute(
        "SELECT * FROM resumes WHERE id = ? AND user_id = ?",
        (resume_id, g.user_id),
    ).fetchone()
    conn.close()

    if row is None:
        return error("Resume not found.", 404)

    return jsonify({"status": "success", "resume": row_to_dict(row)})


@resumes_bp.route("/<int:resume_id>", methods=["DELETE"])
@token_required
def delete_resume(resume_id):
    conn = get_connection()
    cursor = conn.execute(
        "DELETE FROM resumes WHERE id = ? AND user_id = ?",
        (resume_id, g.user_id),
    )
    conn.commit()
    deleted = cursor.rowcount
    conn.close()

    if deleted == 0:
        return error("Resume not found.", 404)

    return jsonify({"status": "success", "message": "Resume deleted."})