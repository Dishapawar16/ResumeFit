import json
import urllib.request
import urllib.error

BASE = "http://127.0.0.1:5000/api/auth"


def call(path, payload=None, token=None):
    headers = {"Content-Type": "application/json"}
    if token:
        headers["Authorization"] = "Bearer " + token
    data = json.dumps(payload).encode("utf-8") if payload is not None else None
    req = urllib.request.Request(
        BASE + path,
        data=data,
        headers=headers,
        method="POST" if payload is not None else "GET",
    )
    try:
        with urllib.request.urlopen(req) as resp:
            return resp.status, json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read().decode("utf-8"))


status, body = call("/login", {"email": "test@example.com", "password": "secret123"})
print("1. Login:", status, "| token received:", "token" in body)

token = body.get("token")
print("2. /me with token:", call("/me", token=token))
print("3. /me without token:", call("/me"))
print("4. /me with fake token:", call("/me", token="abc.def.ghi"))