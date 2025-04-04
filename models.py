from flask_sqlalchemy import sqlAlchemy

db = SQLAlchemy 

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    new_task = db.Column(db.Text, nullable=False)
    #add more logic as 