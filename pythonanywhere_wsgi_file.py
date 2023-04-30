import sys
path = '/home/katoltmans/Homemade-Hacks/'
if path not in sys.path:
    sys.path.append(path)

from flask_app import app as application  # noqa
# this part is IMPORTANT for avoiding a circular reference with the __init__.py file
from flask_app import flask_app