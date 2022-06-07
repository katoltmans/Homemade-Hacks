from flask import Flask
from flask_app import app  # Import the app itself
from flask_app.controllers import users
from flask_app.controllers import base
#from flask_app.controllers import users, hacks # Import controllers for the project
#app = Flask(__name__,
#            static_url_path='/static', 
#            static_folder='flask_app/client/dist',
#            template_folder='flask_app/templates')

if __name__=="__main__":  #Code to run in development mode
    app.run(debug=True)