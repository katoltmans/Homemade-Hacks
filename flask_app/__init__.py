from flask import Flask

app = Flask(__name__,
            static_url_path='/static', 
            static_folder='/static',
            template_folder='/templates')
app.secret_key = "noneshallpass"
app.logger.warning("INIT SUCCESS")