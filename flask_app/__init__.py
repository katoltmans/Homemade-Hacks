from flask import Flask
from controllers import users
from controllers import hacks
from controllers import base

app = Flask(__name__,
            static_url_path='/static', 
            static_folder='/static',
            template_folder='/templates')
app.secret_key = "noneshallpass"