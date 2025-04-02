from flask import Flask, render_template, request, redirect, jsonify
from models import Task
import validators

app = Flask(__name__)
app.config.from_object(config.Config)
db.init_app(app)

@app.route('/', methods =['GET', 'POST'])
def index():
    if request.method == 'POST:':
        New_Tasks = request.form.get('url')
        #add logic to save and contain the new task 