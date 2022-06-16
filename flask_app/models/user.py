from flask import Flask
from flask_app.config.mysqlconnection import connectToMySQL
from flask_app import app
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt(app)
import re
import datetime

class User:
    # Assign schema
    schema = "homemade_hacks"
    
    # Create regular expressions used to validate emails and passwords
    EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
    PASSWORD_REGEX = re.compile(r'^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]).{8,32}$')
    
    # Set attributes of the User class
    def __init__(self, data):
        self.id = data["id"]
        self.first_name = data["first_name"]
        self.last_name = data["last_name"]
        self.email = data["email"]
        self.birthdate = data["birthdate"]
        self.location = data["location"]
        self.username = data["username"]
        self.password = data["password"]
        self.created_at = data["created_at"]
        self.updated_at = data["updated_at"]
    
    # Method to create a user
    @classmethod
    def new_user(cls, data):
        query = "INSERT INTO homemade_hacks.users (first_name, last_name, email, birthdate, location, username, password, created_at, updated_at) \
        VALUES (%(first_name)s, %(last_name)s, %(email)s, %(birthdate)s, %(location)s, %(username)s, %(password)s, NOW(), NOW());"
        results = connectToMySQL(cls.schema).query_db(query, data)
        print(results)
        return results
    
    # Method to display a user
    @classmethod
    def display_user(cls, data):
        query = "SELECT * FROM homemade_hacks.users WHERE users.id = %(id)s;"
        results = connectToMySQL(cls.schema).query_db(query, data)
        print(results)
        if len(results) == 0: # In case no users are registered
            return None
        this_user = cle(results[0])
        return this_user
    
    # Method to check identify repeats when registering
    @classmethod
    def has_repeats(cls, data):
        query = "SELECT COUNT(*) AS count FROM homemade_hacks.users WHERE email = %(email)s;"
        results = connectToMySQL(cls.schema).query_db(query, data)
        print(results)
        return results[0]['count'] > 0
    
    # Method to check if a user's email is in the database when logging in
    @classmethod
    def get_by_username(cls, data):
        query = "SELECT * FROM homemade_hacks.users WHERE username = %(username)s;"
        results = connectToMySQL(cls.schema).query_db(query, data)
        # Action when no matching username is found
        if len(results) <1: 
            return False
        return cls(results[0])
    
    # Static method to display flash messages for registration
    def validate_registration(form_data):
        is_valid = True
        # print(form_data['first_name'] + str(len(form_data['first_name'])))
        # Validate length of first and last name
        if len(form_data['first_name']) < 2:
            print("First name too short")
            flash("First name must be at least 2 characters long", "register")
            is_valid = False
        if len(form_data['last_name']) < 2:
            print("Last name too short")
            flash("Last name must be at least 2 characters long", "register")
            is_valid = False
        
        # Compare email input to REGEX
        if not User.EMAIL_REGEX.match(form_data['email']):
            print("invalid email")
            flash("Invalid email address. Bummer, try again!", "register")
            is_valid = False
        # Check for repeat emails
        if User.has_repeats(form_data):
            flash("This email is already registered. Would you prefer to login?", "register")
            is_valid = False
            
        
        # Check if birthdate is a valid date
        
        
        # Validate length of city, state & username
        if len(form_data['location']) < 5:
            print("Location too short")
            flash("Location must be at least 5 characters long", "register")
            is_valid = False
        if len(form_data['username']) < 5:
            print("Username name too short")
            flash("Username name must be at least 5 characters long", "register")
            is_valid = False
        
        # Compare password input to REGEX
        if not User.PASSWORD_REGEX.match(form_data['password']):
            print("invalid password")
            flash("Our users require the utmost security. Please use a password with 8-32 characters, 1 uppercase letter, 1 lowercase letter, 1 special character, and 1 number.", "register")
            is_valid - False
        # Confirm reentered password matches
        if form_data['confirm_password'] != form_data['password']:
            print("Password does not match")
            flash("Uh oh, passwords must match. Please try again!", "register")
            is_valid = False
        return is_valid
    
    # Static method to display flash messages for login
    def validate_login(form_data, user_in_db):
        print(form_data)
        is_valid = True
        if user_in_db == False:
            print("Invalid email")
            is_valid = False
        else:
            # Check to see if password matches
            if form_data['password'] == '' or not bcrypt.check_password_hash(user_in_db.password, form_data['password']):
                print("Invalid password")
                is_valid = False
        # If either credential is false
        if not is_valid:
            flash("Invalid credentials", "login")
        return is_valid