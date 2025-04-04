from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column (db.String(200), nullable=False)
    due_date = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.String(20), nullable=False)
    status = db.Column(db.String(20), default="ongoing")


    def to_dict(self):
        return {
            "id": self.id, 
            "name": self.name, 
            "due_date": self.due_date, 
            "created_at": self.created_at,
            "status": self.status
        }