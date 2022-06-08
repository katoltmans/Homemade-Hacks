from flask import flash
from flask_app.config.mysqlconnection import connectToMySQL
from flask_app import app
from flask_app.models import user
import re

class Hack:
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
        self.user_id = data["user_id"]
        self.creator = None
        self.users = []
        self.user_count = 0
        
    # Method to add a hack (create)
    @classmethod
    def add_hack(cls, data):
        query = "INSERT INTO homemade_hacks (title, supplies, instructions category_id) \
        VALUES (%(title)s, %(supplies)s, %(instructions)s, %(category_id)s);"
        # Will need to fix category
        results = connectToMySQL(cls.schema).query_db(query, data)
        print(results)
        return results
    
    # Method to display all hacks with categories
    @classmethod
    def display_all_hacks_with_category_and_user(cls, data):
        query = """SELECT * FROM homemade_hacks.hacks LEFT JOIN homemade_hacks.categories ON categories.id = hacks.category_id;"""
        results = connectToMySQL(cls.schema).query_db(query, data)
        print(results)
        all_hacks = []
        # Return None if no hacks are registered
        if not results or len(results) == 0:  
            print("no results")
            return None
        else:
            
            for row_from_db in results:
                
                one_hack = cls(row_from_db)
                one_hack_creator = {
                    "id" : row_from_db["users.id"],
                    "title": row_from_db["title"],
                    "supplies": row_from_db["supplies"],
                    "instructions": row_from_db["instructions"],
                    "created_at": row_from_db["created_at"],
                    "updated_at": row_from_db["hacks.updated_at"],
                    "name": row_from_db["name"],
                }
                # Creates a user object and associates the creator with the hack
                one_hack.creator = user.User(one_hack_creator)
                # Access the single visitor_count value from the row
                one_hack.visitor=_count = row_from_db["visitor_count"]
                # Each hack that is created is appended to the all_hacks list
                all_hacks.append(one_hack)
                # TODO: THIS NEEDS HELP!!!!!!!
                
        return all_hacks