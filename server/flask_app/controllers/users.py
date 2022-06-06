from flask_app import app
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt(app)
from flask import render_template, redirect, request, session
from flask_app.models import user # will need to import hack


# Route to process registration data
@app.route("/register", methods=["POST"])
def process_registration():
    # Redirect to registration page if not a valid email
    if not user.User.validate_registration(request.form):
        return redirect("/register")
    # Create the hash of the password
    pw_hash = bcrypt.generate_password_hash(request.form["password"])
    pw_hash_confirm = bcrypt.generate_password_hash(request.form["confirm password"])
    print(pw_hash)
    print(pw_hash_confirm)
    # Create a user dictionary
    data = {
        "first_name": request.form["first_name"],
        "last_name": request.form["last_name"],
        "email": request.form["email"],
        "birthdate": request.form["birthdate"],
        "location": request.form["location"],
        "username": request.form["username"],
        "password": pw_hash,
        "confirm_password": pw_hash_confirm
    }
    # Call the new_user method to add the user to the database
    user_id = user.User.new_user(data)
    # Save session info
    session["first_name"] = request.form["first_name"]
    session["id"] = user_id
    # Redirect after submit
    return redirect("/")  # will need to change to /hacks/explore once made

# Route to process login
@app.route("/login", methods=["POST"])
def process_login():
    # Check if email exists in database
    email_data = {
        "email": request.form["email"]
    }
    user_in_db = user.User.get_by_email(email_data)
    # Redirect home if not a valid email
    if not user.User.validate_login(request.form, user_in_db):
        return redirect("/login") 
    # Save session info
    session["first_name"] = user_in_db.first_name
    session["id"] = user_in_db.id
    # Redirect after submit
    return redirect("/")  # will need to change to /hacks/explore once made

# Route to logout
@app.route("/logout")
def process_logout():
    session.clear()
    return redirect("/")


