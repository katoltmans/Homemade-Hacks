from flask_app import app
from flask import render_template, redirect, request, session

@app.route("/")
def display_base():
    return render_template("index.html")