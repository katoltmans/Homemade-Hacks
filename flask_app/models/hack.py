from flask import flash
from flask_app.config.mysqlconnection import connectToMySQL
from flask_app import app
from flask_app.models import user
import re
class Hack():
    # Assign schema
    schema = "homemade_hacks"
    
    def __init__(self, data):  # Attributes of hack class
        self.id = data["id"]
        self.title = data["title"]
        self.supplies = data["supplies"]
        self.instructions = data["instructions"]
        self.created_at = data["created_at"]
        self.updated_at = data["updated_at"]
        self.category_id = data["category_id"]
        self.category_name = data["category_name"]
        self.cat_img = data["cat_img"]
        self.user_id = data["user_id"]
        self.first_name = data["first_name"]
        self.last_name = data["last_name"]
        self.creator = None
        self.users = []
        self.favorite_count = 0
        
    # Method to add a hack (create)
    @classmethod
    def add_hack(cls, data):
        query = "INSERT INTO homemade_hacks (title, supplies, instructions category_id) \
        VALUES (%(title)s, %(supplies)s, %(instructions)s, %(category_id)s);"
        # Will need to fix category
        results = connectToMySQL(cls.schema).query_db(query, data)
        print(results)
        return results
    
    # Method to get all hacks with categories
    @classmethod
    def get_all_hacks_with_category_and_user(cls):
        query = """SELECT *, homemade_hacks.categories.name as category_name FROM homemade_hacks.hacks 
	LEFT JOIN homemade_hacks.categories ON homemade_hacks.categories.id = homemade_hacks.hacks.category_id 
    LEFT JOIN homemade_hacks.users ON users.id = hacks.user_id;"""
        results = connectToMySQL(cls.schema).query_db(query)
        print(results)
        category_query = "SELECT * FROM categories;"
        category_results = connectToMySQL(cls.schema).query_db(category_query)
        all_categories = []
        results_object = {}
        all_hacks = []
        # Return None if no hacks are registered
        if not results or len(results) == 0:  
            print("no results")
            return ""
        else:
            
            for row_from_db in results:
                
                one_hack = cls(row_from_db)
                # TODO: THIS NEEDS HELP!!!!!!!
                #one_hack_favorites_user = {
                #    "id" : row_from_db["users.id"],
                #    "first_name": row_from_db["first_name"],
                #    "last_name": row_from_db["last_name"],
                #}
                # Creates a user object and associates the creator with the hack
                #one_hack.creator = user.User(one_hack_creator)
                # Access the single visitor_count value from the row
                #one_hack.user_count = row_from_db["user_count"]
                # Each hack that is created is appended to the all_hacks list
                all_hacks.append(one_hack)
        if not category_results or len(category_results) == 0:  
            print("no results")
            return ""
        else:
            
            for row_from_db in category_results:
                
                one_category = {
                    "id": row_from_db["id"],
                    "name": row_from_db["name"],
                    "cat_img": row_from_db["cat_img"],
                }
                all_categories.append(one_category)
        results_object["all_hacks"] = all_hacks
        results_object["all_categories"] = all_categories
        
        return results_object
    
    # Method to view details of one hack
    @classmethod
    def view_details(cls, data):
        query = """SELECT *, homemade_hacks.categories.name as category_name FROM homemade_hacks.hacks 
        LEFT JOIN homemade_hacks.categories ON homemade_hacks.categories.id = homemade_hacks.hacks.category_id 
        LEFT JOIN homemade_hacks.users ON users.id = hacks.user_id
        WHERE hacks.id = %{id}s;"""
        results = connectToMySQL(cls.schema).query_db(query, db)
        print(results)
        this_hack = cls(results[0])
        return this_hack
        
    
    # Method to update a hack
    
    
    
    # Method to delete a hack
    
    
    # Method to record favorites (?)
    
    
    # Method to display hacks made by a creator (or favorites?)
    
    
    
    # Static methods to validate hack entry
    @staticmethod
    def validate_hack_entry(form_data):
        is_valid = True
        # Check if all fields contain at least 2 characters
        if len(form_data['title']) < 1 or len(form_data['category']) < 1 \
            or len(form_data['supplies']) < 1 or len(form_data['instructions']) < 1:
            print("Missing data")
            flash("All fields are required to create a hack. Please try again.", "tree_entry")
            is_valid = False
        # Check to make sure species has at least 5 characters
        if len(form_data['title']) < 2:
            print("title name too short")
            flash("Please enter a title that contains at least 2 characters.", "tree_entry")
            is_valid = False
        # Check to make sure location has at least 2 characters
        if len(form_data['category']) < 2:
            print("category not selected")
            flash("Please select a category.", "tree_entry")
            is_valid = False
        # Check to make sure location has at least 2 characters
        if len(form_data['supplies']) > 50:
            print("supplies too short")
            flash("We are brief summaries. Please limit your reason to a max of 50 characters.", "tree_entry")
            is_valid = False
        # Check to make sure location has at least 2 characters
        if len(form_data['location']) > 50:
            print("reason too long")
            flash("We are brief summaries. Please limit your reason to a max of 50 characters.", "tree_entry")
            is_valid = False
        return is_valid