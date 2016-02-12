from flask import url_for, request
from flask.ext.restful import Resource, fields, marshal, reqparse
from server import api, db, session
from server.models.user import User

user_fields = {
    'id': fields.Integer,
    'username': fields.String,
    'email': fields.String
}


class UserAPI(Resource):
    def get(self, id):
        user = User.query.get(id)
        if not user:
            return 'User not found', 404
        return {'user': marshal(user, user_fields)}


class UsersAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('username')
        self.reqparse.add_argument('email')
        self.reqparse.add_argument('password')
        super(UsersAPI, self).__init__()

    def post(self):
        args = self.reqparse.parse_args()
        try:
            user = User(args)
            db.session.add(user)
            db.session.commit()
            session['user_id'] = user.id
        except ValueError as e:
            return str(e), 400
        return 'User created successfully', 201


api.add_resource(UserAPI, '/users/<int:id>', endpoint='user')
api.add_resource(UsersAPI, '/users', endpoint='users')
