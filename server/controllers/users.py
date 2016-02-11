#################
#### imports ####
#################

from flask import url_for, request
from flask.ext.restful import Resource, fields, marshal, reqparse
from server import api, db
from server.models.user import User

################
#### routes ####
################


class Users(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument(
            'username',
            type=str,
            required=True,
            help='No username name provided'
        )
        self.reqparse.add_argument(
            'email',
            type=str,
            required=True,
            help='No email provided'
        )
        self.reqparse.add_argument(
            'password',
            type=str,
            required=True,
            help='No password provided'
        )
        super(Users, self).__init__()

    def post(self):
        args = self.reqparse.parse_args()
        if User.query.filter_by(username=args['username']).first() is not None:
            return 'Username already exists', 400
        if User.query.filter_by(email=args['email']).first() is not None:
            return 'Email already exists', 400
        user = User(
            username=args['username'],
            email=args['email'],
            password=args['password']
        )
        db.session.add(user)
        db.session.commit()
        return 'User created successfully', 201

api.add_resource(Users, '/users', endpoint='users')
