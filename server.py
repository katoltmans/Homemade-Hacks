"""from flask import Flask

app = Flask(__name__,
           static_url_path='/static', 
           static_folder='flask_app/static')
app.secret_key = "noneshallpass"
app.schema = "homemade_hacks"
app.connection = {
    'host' : 'localhost',
    'user' :'root',
    'password' : 'root'
}
from flask_app.controllers import users, hacks, base

if __name__=="__main__":  #Code to run in development mode
    app.run(debug=True)
"""
import sys
import os
path = '.'
if path not in sys.path:
    sys.path.append(path)

from flask_app import app as application  # noqa
from flask import send_from_directory
static_folder = os.path.join(os.path.dirname(__file__), 'flask_app','static')
application._static_folder = static_folder
application.logger.warning(application._static_folder)
# application.root_path = 'flask_app'
application.connection = {
    'host' : 'localhost',
    'user' :'root',
    'password' : 'root'
}

@application.route('/')
def _home():
  return send_from_directory(static_folder, 'index.html')
# this part is IMPORTANT for avoiding a circular reference with the __init__.py file
from flask_app import flask_app
if __name__=="__main__":  #Code to run in development mode
    application.run(debug=True)