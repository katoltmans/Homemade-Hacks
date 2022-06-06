from flask_app import app  # Import the app itself
#from flask_app.controllers import users, hacks # Import controllers for the project


if __name__=="__main__":  #Code to run in development mode
    app.run(debug=True)