from flask import Flask
from flask_app.controllers import users
from flask_app.controllers import hacks
from flask_app.controllers import base

app = Flask(__name__,
            static_url_path='/static', 
            static_folder='/static',
            template_folder='/templates')
app.secret_key = "noneshallpass"
app.logger.warning("INIT SUCCESS")