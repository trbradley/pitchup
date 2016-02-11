#################
#### imports ####
#################

from flask import url_for, request
from flask.ext.restful import Resource, fields, marshal, reqparse
from server import api, db
from server.models.team import Team

################
#### config ####
################

team_fields = {
    'id': fields.Integer,
    'name': fields.String,
    'capacity': fields.Integer,
    'number_players': fields.Integer
}

################
#### routes ####
################

class TeamAPI(Resource):
    def get(self, id):
        team = Team.query.get(id)
        return {'team': marshal(team, team_fields)}


class TeamsAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument(
            'name',
            type=str,
            required=True,
            help='No team name provided'
        )
        self.reqparse.add_argument(
            'capacity',
            type=int,
            required=True,
            help='No team capacity provided'
        )
        self.reqparse.add_argument(
            'number_players',
            type=int,
            required=True,
            help='No number of players provided'
        )
        super(TeamsAPI, self).__init__()

    def get(self):
        teams = Team.query.all()
        return {'teams': [marshal(team, team_fields) for team in teams]}

    def post(self):
        args = self.reqparse.parse_args()
        team = Team(
            name=args['name'],
            capacity=args['capacity'],
            number_players=args['number_players']
        )
        db.session.add(team)
        db.session.commit()
        return 'Team created successfully', 201


api.add_resource(TeamAPI, '/teams/<int:id>', endpoint='team')
api.add_resource(TeamsAPI, '/teams', endpoint='teams')
