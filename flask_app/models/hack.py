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
        self.hd_img = data["hd_img"]
        self.user_id = data["user_id"]
        self.first_name = data["first_name"]
        self.last_name = data["last_name"]
        self.creator = None
        self.users = []
        self.favorite_count = 0
        
    # Method to add a hack (create)
    @classmethod
    def add_hack(cls, data):
        query = "INSERT INTO homemade_hacks.hacks (title, supplies, instructions, category_id, user_id) \
        VALUES (%(title)s, %(supplies)s, %(instructions)s, %(category_id)s, %(user_id)s);"
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
        #print(results)
        category_query = "SELECT * FROM categories;"
        category_results = connectToMySQL(cls.schema).query_db(category_query)
        all_categories = []
        results_object = {}
        if not category_results or len(category_results) == 0:  
            print("no results")
            return results_object
        else:
            
            for row_from_db in category_results:
                
                one_category = {
                    "id": row_from_db["id"],
                    "name": row_from_db["name"],
                    "cat_img": row_from_db["cat_img"],
                    "hd_img": row_from_db["hd_img"]
                }
                all_categories.append(one_category)
        results_object["all_categories"] = all_categories
        all_hacks = []
        # Return None if no hacks are registered
        if not results or len(results) == 0:  
            print("no results")
            return results_object
        else:
            
            for row_from_db in results:
                
                one_hack = cls(row_from_db)
                all_hacks.append(one_hack)
        
        results_object["all_hacks"] = all_hacks
        
        return results_object
    
    # Method to view details of one hack
    @classmethod
    def view_details(cls, data):
        query = """SELECT *, homemade_hacks.categories.name as category_name FROM homemade_hacks.hacks 
        LEFT JOIN homemade_hacks.categories ON homemade_hacks.categories.id = homemade_hacks.hacks.category_id 
        LEFT JOIN homemade_hacks.users ON users.id = hacks.user_id
        WHERE hacks.id = %(id)s;"""
        results = connectToMySQL(cls.schema).query_db(query, data)
        print(results)
        this_hack = cls(results[0])
        return this_hack
    
    
    
    # Method to update a hack
    @classmethod
    def update_hack(cls, data):
        query = "UPDATE homemade_hacks.hacks SET title=%(title)s, supplies=%(supplies)s, instructions=%(instructions)s, category_id=%(category_id)s, updated_at=NOW() WHERE id=%(id)s;"
        return connectToMySQL(cls.schema).query_db(query, data)
    
    
    # Method to delete a hack
    @classmethod
    def delete_hack_record(cls, data):
        query = "DELETE FROM homemade_hacks.hacks WHERE id=%(id)s;"
        results = connectToMySQL(cls.schema).query_db(query, data)
        print(results)
        return results

    
    # Method to favorite a hack 
    @classmethod
    def add_favorite(cls, data):
        query = "INSERT INTO homemade_hacks.favorites (user_id, hack_id) \
        VALUES ( %(user_id)s,  %(hack_id)s);"
        results = connectToMySQL(cls.schema).query_db(query, data)
        print(results)
        return results
    
    # Method to unfavorite a hack 
    @classmethod
    def unfavorite(cls, data):
        query = "DELETE FROM homemade_hacks.favorites \
        WHERE user_id = %(user_id)s and hack_id = %(hack_id)s;"
        results = connectToMySQL(cls.schema).query_db(query, data)
        print(results)
        return results
    
    # Method to display favorite hacks
    @classmethod
    def get_all_favorited_hacks_with_category_and_user(cls, data):
        query = """SELECT *, homemade_hacks.favorites.user_id AS favorites_user_id, homemade_hacks.categories.name AS category_name FROM homemade_hacks.favorites
        LEFT JOIN homemade_hacks.hacks ON homemade_hacks.favorites.hack_id = homemade_hacks.hacks.id
        LEFT JOIN homemade_hacks.categories ON homemade_hacks.categories.id = homemade_hacks.hacks.category_id
        LEFT JOIN homemade_hacks.users ON users.id = homemade_hacks.favorites.user_id
        WHERE users.id = %(user_id)s;"""
        results = connectToMySQL(cls.schema).query_db(query, data)
        print(results)
        category_query = "SELECT * FROM categories;"
        category_results = connectToMySQL(cls.schema).query_db(category_query)
        all_categories = []
        results_object = {}
        all_hacks = []
        # Return None if no hacks are registered
        if not results or len(results) == 0:  
            print("no hack results")
            return ""
        else:
            
            for row_from_db in results:
                
                one_hack = cls(row_from_db)
                all_hacks.append(one_hack)
        if not category_results or len(category_results) == 0:  
            print("no category results")
            return ""
        else:
            
            for row_from_db in category_results:
                
                one_category = {
                    "id": row_from_db["id"],
                    "name": row_from_db["name"],
                    "cat_img": row_from_db["cat_img"],
                    "hd_img": row_from_db["hd_img"]
                }
                all_categories.append(one_category)
        results_object["all_hacks"] = all_hacks
        results_object["all_categories"] = all_categories
        
        return results_object
    
    
    # Static methods to validate hack entry
    @staticmethod
    def validate_hack_entry(form_data):
        # Array to hold all error messages
        errorMessages = []
        
        # Check if all fields contain data
        if len(form_data['title']) < 1 or len(str(form_data['category_id'])) < 1 \
            or len(form_data['supplies']) < 1 or len(form_data['instructions']) < 1:
            print("Missing data")
            errorMessages.append("All fields are required to create a hack. Please try again.")
        # Check to make sure species has at least 5 characters
        if len(form_data['title']) < 2:
            print("title name too short")
            errorMessages.append("Title must be at least 2 characters long.")
        # Check to make sure location has at least 2 characters
        if len(str(form_data['category_id'])) < 1:
            print("category not selected")
            errorMessages.append("Please select a category.")
        # Check to make sure location has at least 2 characters
        if len(form_data['supplies']) < 20 :
            print("supplies too short")
            errorMessages.append("Please enter the supplies (with quantity) necessary for this hack.")
        # Check to make sure location has at least 2 characters
        if len(form_data['instructions']) < 10:
            print("instructions too short")
            errorMessages.append("Instructions must be at least 10 characters long.")
        return errorMessages