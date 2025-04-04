from flask import request, jsonify
from app import app, db
from models import Task
from datetime import datetime


@app.route("/create_task", methods=[ "POST"])
def create_task():
    data = request.json
    new_task = Task(
        name=data["name"], 
        due_date=data["due_date"],  # ✅ FIXED: Missing comma
        created_at=datetime.now().strftime("%Y-%m-%d %H:%M:%S"), 
        status="ongoing"
    )
    db.session.add(new_task)
    db.session.commit()
    return jsonify({"message": "Task created successfully", "task": new_task.to_dict()}), 201


@app.route("/tasks", methods=["GET"])
def get_tasks():
    tasks = Task.query.all()  # ✅ FIXED: Corrected `.query.all()`
    return jsonify([task.to_dict() for task in tasks])


@app.route("/tasks/<int:task_id>", methods=["PUT"])
def update_task(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify({"error": "Task not found"}), 404
    
    task.status = "completed"
    db.session.commit()
    return jsonify({"message": "Task updated successfully", "task": task.to_dict()})


@app.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify({"error": "Task not found"}), 404
    
    db.session.delete(task)
    db.session.commit()
    return jsonify({"message": "Task deleted successfully"})


@app.route("/complete-task/<int:task_id>", methods=["PUT"])
def complete_task(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify({"error": "Task not found"}), 404
    
    task.status = "completed"
    db.session.commit()
    
    return jsonify({"message": "Task marked as complete", "task": task.to_dict()})
