from flask import Flask
from flask_app import app
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt(app)
from flask import render_template, redirect, request, session, jsonify
from flask_app.models import user, hack
# Source: https://rasyue.com/full-stack-react-with-python-flask/
import pprint


# Route to process registration data
@app.route("/register", methods=["POST"])
def process_registration():
    # Redirect to registration page if not a valid email
    pp = pprint.PrettyPrinter(indent=4)
    formData = request.get_json()
    print(formData)
    # Source: https://docs.python.org/3/library/pprint.html
    #if not user.User.validate_registration(formData):
    #    return redirect("/register")
    # Create the hash of the password
    pw_hash = bcrypt.generate_password_hash(formData["password"])
    pw_hash_confirm = bcrypt.generate_password_hash(formData["confirm_password"])
    print(pw_hash)
    print(pw_hash_confirm)
    # Create a user dictionary
    data = {
        "first_name": formData["first_name"],
        "last_name": formData["last_name"],
        "email": formData["email"],
        "birthdate": formData["birthdate"],
        "location": formData["location"],
        "username": formData["username"],
        "password": pw_hash,
        "confirm_password": pw_hash_confirm
    }
    # Call the new_user method to add the user to the database
    user_id = user.User.new_user(data)
    # Redirect after submit
    response = jsonify({"message":"successfully registered"})
    return response
# Solution source: https://stackoverflow.com/questions/26980713/solve-cross-origin-resource-sharing-with-flask

# Route to process login
@app.route("/login", methods=["POST"])
def process_login():
    formData = request.get_json()
    print("FORM DATA:", formData)
    # Check if email exists in database
    username_data = {
        "username": formData["username"]
    }
    user_in_db = user.User.get_by_username(username_data)
    # Redirect home if not a valid email
    if not user.User.validate_login(formData, user_in_db):
        return redirect("/login") 
    # Save session info
    session["first_name"] = user_in_db.first_name
    session["id"] = user_in_db.id
    # Create user object
    user_from_db = {
        "firstName": user_in_db.first_name,
        "lastName": user_in_db.last_name,
        "id": user_in_db.id,
        "username": user_in_db.username,
    }
    # Redirect after submit
    response = jsonify({"message":"successfully logged in", "user" :user_from_db})
    return response

# Route to logout
@app.route("/logout")
def process_logout():
    session.clear()
    response = jsonify({"message":"successfully logged out"})
    return response


