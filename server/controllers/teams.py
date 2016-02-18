from flask import url_for, request
from flask.ext.restful import Resource, fields, marshal, reqparse
from server import api, db, session
from server.models.team import Team
from server.helpers.sessions import current_user
from datetime import datetime

team_fields = {
    'id': fields.Integer,
    'name': fields.String,
    'capacity': fields.Integer,
    'number_players': fields.Integer,
    'pitch_postcode': fields.String,
    'time': fields.DateTime
}

user_fields = {
    'id': fields.Integer,
    'username': fields.String,
    'email': fields.String
}

enrollment_fields = {
    'number_players': fields.Integer,
    'user': fields.Nested(user_fields)
}

adv_team_fields = {
    'id': fields.Integer,
    'name': fields.String,
    'capacity': fields.Integer,
    'number_players': fields.Integer,
    'pitch_postcode': fields.String,
    'time': fields.DateTime,
    'creator': fields.Nested(user_fields),
    'users': fields.List(fields.Nested(enrollment_fields))
}


class TeamAPI(Resource):
    def get(self, id):
        team = Team.query.get(id)
        return {'team': marshal(team, adv_team_fields)}


class TeamsAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('name')
        self.reqparse.add_argument('capacity')
        self.reqparse.add_argument('number_players')
        self.reqparse.add_argument('pitch_postcode')
        self.reqparse.add_argument('time')
        super(TeamsAPI, self).__init__()

    def get(self):
        teams = Team.query.filter(Team.number_players < Team.capacity, Team.time > datetime.now()).order_by(Team.time)
        return {'teams': [marshal(team, team_fields) for team in teams]}

    def post(self):
        if not current_user():
            return 'You need to be logged in', 403
        args = self.reqparse.parse_args()
        try:
            team = Team(args)
            db.session.add(team)
            db.session.commit()
        except Exception as e:
            return str(e), 400
        return 'Team created successfully', 201


api.add_resource(TeamAPI, '/teams/<int:id>', endpoint='team')
api.add_resource(TeamsAPI, '/teams', endpoint='teams')
