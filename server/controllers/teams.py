#################
#### imports ####
#################

from flask import Blueprint, url_for, request
from flask.ext.restful import Resource, fields, marshal, reqparse
from server import api, db
from server.models.team import Team

################
#### config ####
################

team_blueprint = Blueprint('team', __name__,)
team_fields = {
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

    def put(self, id):
        pass

    def delete(self, id):
        pass


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
            help='No capacity team provided'
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

# @team_blueprint.route('/teams')
# def get_teams():
#     teams = Team.query.all()
#     for team in teams:
#         print(team.name)
#     return 'teams'
#
# @team_blueprint.route('/teams', methods=['POST'])
# def post_teams():
#     team = Team(
#             name='squadra',
#             capacity=10,
#             number_players=7
#         )
#     db.session.add(team)
#     db.session.commit()
#     return 'teams'
#
# @team_blueprint.route('/teams')
# def get_team():
#     team = Team.query.get(1)
#     print(team.name)
#     return 'team'


# @user_blueprint.route('/login', methods=['GET', 'POST'])
# def login():
#     form = LoginForm(request.form)
#     if form.validate_on_submit():
#         user = User.query.filter_by(email=form.email.data).first()
#         if user and bcrypt.check_password_hash(
#                 user.password, request.form['password']):
#             login_user(user)
#             flash('You are logged in. Welcome!', 'success')
#             return redirect(url_for('user.members'))
#         else:
#             flash('Invalid email and/or password.', 'danger')
#             return render_template('user/login.html', form=form)
#     return render_template('user/login.html', title='Please Login', form=form)
#
#
# @user_blueprint.route('/logout')
# @login_required
# def logout():
#     logout_user()
#     flash('You were logged out. Bye!', 'success')
#     return redirect(url_for('main.home'))
#
#
# @user_blueprint.route('/members')
# @login_required
# def members():
#     return render_template('user/members.html')
