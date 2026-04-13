from pathlib import Path

from flask import Flask, jsonify, request, send_from_directory

app = Flask(__name__)
dist_folder = Path(__file__).parent / "dist" / "simple-crud-angular"

users = [
    {"id": 1, "name": "Thomas", "age": 25},
    {"id": 2, "name": "Anna", "age": 22},
    {"id": 3, "name": "John", "age": 35},
    {"id": 4, "name": "Monique", "age": 23},
    {"id": 5, "name": "Xavier", "age": 34},
]
next_id = 6


@app.route("/api/users", methods=["GET"])
def get_users():
    return jsonify(users), 200


@app.route("/api/users", methods=["POST"])
def add_user():
    global next_id

    data = request.get_json(silent=True) or {}
    name = str(data.get("name", "")).strip()
    age = data.get("age")

    if not name or age is None:
        return jsonify({"error": "Name and age are required"}), 400

    try:
        age = int(age)
    except (TypeError, ValueError):
        return jsonify({"error": "Age must be a number"}), 400

    user = {"id": next_id, "name": name, "age": age}
    users.append(user)
    next_id += 1
    return jsonify(user), 201


@app.route("/api/users/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    data = request.get_json(silent=True) or {}
    name = str(data.get("name", "")).strip()
    age = data.get("age")

    if not name or age is None:
        return jsonify({"error": "Name and age are required"}), 400

    try:
        age = int(age)
    except (TypeError, ValueError):
        return jsonify({"error": "Age must be a number"}), 400

    for user in users:
        if user["id"] == user_id:
            user["name"] = name
            user["age"] = age
            return jsonify(user), 200

    return jsonify({"error": "User not found"}), 404


@app.route("/api/users/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    for user in users:
        if user["id"] == user_id:
            users.remove(user)
            return jsonify({"message": "User deleted"}), 200

    return jsonify({"error": "User not found"}), 404


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def frontend(path):
    if not dist_folder.exists():
      return jsonify({"message": "Frontend is not built yet"}), 200

    file_path = dist_folder / path

    if path and file_path.exists() and file_path.is_file():
        return send_from_directory(dist_folder, path)

    return send_from_directory(dist_folder, "index.html")


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5050, debug=False)
