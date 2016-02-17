#################
#### imports ####
#################

import os

from flask import Flask, send_from_directory, session
from flask.ext.session import Session
from flask.ext.restful import Api
from flask.ext.sqlalchemy import SQLAlchemy
from flask_mail import Mail, Message


################
#### config ####
################

app = Flask(__name__, static_folder='../public')
app.config.from_object('server.' + os.environ['APP_SETTINGS'])


####################
#### extensions ####
####################

Session(app)
api = Api(app)
db = SQLAlchemy(app)


#####################
#### controllers ####
#####################

import server.controllers.users
import server.controllers.teams
import server.controllers.sessions
import server.controllers.enrollments


app.config.update(
	DEBUG=True,
	#EMAIL SETTINGS
	MAIL_SERVER='smtp.gmail.com',
	MAIL_PORT=465,
	MAIL_USE_SSL=True,
	MAIL_USERNAME = 'pitchuphelp@gmail.com',
	MAIL_PASSWORD = 'tombradley1234'
	)

mail=Mail(app)

@app.route("/send-mail/")
def index():
	msg = Message(
              'Hello',
	       sender='pitchuphelp@gmail.com',
	       recipients=
               ['tmgree@outlook.com'])
	msg.body = "This is the email body"
	msg.html = "<b>This is the email body</b>"
	mail.send(msg)
	return "Sent"










@app.route('/')
def serve_client():
    angular = os.path.join(
        os.path.dirname(os.path.abspath(__file__)),
        "..", "public", "views"
    )
    return send_from_directory(angular, 'index.html')
