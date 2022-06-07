from flask_app import app
from flask import render_template, redirect, request, session

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def display_base(path):
    return render_template("index.html")
#Source: https://codeburst.io/full-stack-single-page-application-with-vue-js-and-flask-b1e036315532