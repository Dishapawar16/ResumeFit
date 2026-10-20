import json
import urllib.request
import urllib.error

BASE = "http://127.0.0.1:5000/api/auth"


def post(path, payload):
    req = urllib.request.Request(
        BASE + path,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req) as resp:
            return resp.status, resp.read().decode("utf-8")
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode("utf-8")


user = {"fullName": "Test User", "email": "test@example.com", "password": "secret123"}

print("1. Register:", post("/register", user))
print("2. Register again (duplicate):", post("/register", user))
print("3. Login with wrong password:", post("/login", {"email": user["email"], "password": "wrong"}))
print("4. Login with correct password:", post("/login", {"email": user["email"], "password": user["password"]}))