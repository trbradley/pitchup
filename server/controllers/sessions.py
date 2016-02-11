#################
#### imports ####
#################

from flask import url_for, request
from flask.ext.restful import Resource, fields, marshal, reqparse
from server import api, db, session
from server.models.user import User
# from flask.ext.httpauth import HTTPBasicAuth

# auth = HTTPBasicAuth()
################
#### routes ####
################

SECRET_KEY = 'super_secret'

class Sessions(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('username')
        self.reqparse.add_argument('password')
        super(Sessions, self).__init__()

    def post(self):
        args = self.reqparse.parse_args()
        user = User.query.filter_by(username = args['username']).first()
        session.clear()
        if user:
            if User.verify_password(user, args['password']):
                session['id'] = user.id
                return 'Logged in successfully', 200
        return 'Invalid username or password', 400

    def delete(self):
        if 'id' in session:
            session.clear()
            return 'Logged out successfully', 200
        return 'You are not logged in', 400

api.add_resource(Sessions, '/sessions', endpoint='sessions')
