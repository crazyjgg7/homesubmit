from flask import render_template, request, jsonify
from app.main import main

@main.route('/')
def index():
    return render_template('index.html')
