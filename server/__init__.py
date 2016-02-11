#################
#### imports ####
#################

import os

from flask import Flask, send_from_directory
from flask.ext.restful import Api
# from flask import Flask, render_template
# from flask.ext.login import LoginManager
# from flask.ext.bcrypt import Bcrypt
from flask.ext.sqlalchemy import SQLAlchemy


################
#### config ####
################

app = Flask(__name__, static_folder='../public')
app.config.from_object('server.' + os.environ['APP_SETTINGS'])


####################
#### extensions ####
####################

# login_manager = LoginManager()
# login_manager.init_app(app)
# bcrypt = Bcrypt(app)
api = Api(app)
db = SQLAlchemy(app)

from server.models.team import Team
from server.models.user import User

@app.route('/')
def serve_client():
    angular = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                                 "..", "public", "views")
    return send_from_directory(angular, 'index.html')

import server.controllers.users
import server.controllers.teams


###################
### flask-login ####
###################
#
# from project.server.models import User
#
# login_manager.login_view = "user.login"
# login_manager.login_message_category = 'danger'
#
#
# @login_manager.user_loader
# def load_user(user_id):
#     return User.query.filter(User.id == int(user_id)).first()


########################
#### error handlers ####
########################

# @app.errorhandler(403)
# def forbidden_page(error):
#     return render_template("errors/403.html"), 403
#
#
# @app.errorhandler(404)
# def page_not_found(error):
#     return render_template("errors/404.html"), 404
#
#
# @app.errorhandler(500)
# def server_error_page(error):
#     return render_template("errors/500.html"), 500
