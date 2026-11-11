import json
import urllib.request
import urllib.error

BASE = "http://127.0.0.1:5000/api"


def call(method, path, payload=None, token=None):
    headers = {"Content-Type": "application/json"}
    if token:
        headers["Authorization"] = "Bearer " + token
    data = json.dumps(payload).encode("utf-8") if payload is not None else None
    req = urllib.request.Request(BASE + path, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req) as resp:
            return resp.status, json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read().decode("utf-8"))


status, body = call("POST", "/auth/login", {"email": "test@example.com", "password": "secret123"})
token = body["token"]
print("1. Login:", status)

status, body = call("POST", "/resumes", {
    "title": "Test Resume",
    "content": {"fullName": "Disha", "summary": "Test summary", "skills": ["Python", "React"]},
}, token)
print("2. Create:", status, body)
resume_id = body["resume"]["id"]

print("3. List:", call("GET", "/resumes", token=token))
print("4. Get one:", call("GET", f"/resumes/{resume_id}", token=token))
print("5. Without token:", call("GET", "/resumes"))
print("6. Delete:", call("DELETE", f"/resumes/{resume_id}", token=token))
print("7. Get after delete:", call("GET", f"/resumes/{resume_id}", token=token))