from server import db
from sqlalchemy.orm import validates
from server.models.team import Team
from server.models.user import User
from server.helpers.sessions import current_user


class Enrollment(db.Model):
    __tablename__ = 'enrollments'

    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), primary_key=True)
    team_id = db.Column(db.Integer, db.ForeignKey('teams.id', ondelete='CASCADE'), primary_key=True)
    number_players = db.Column('number_players', db.Integer)
    team = db.relationship("Team")
    user = db.relationship("User")

    def __init__(self, args):
        self.number_players = args['number_players']
        if 'team_id' in args:
            self.team = Team.query.get(args['team_id'])
            self._update_team()
        else:
            self.team = args['team']
        self._append_to_user()

    def _append_to_user(self):
        user = User.query.get(current_user().id)
        user.teams.append(self)

    def _update_team(self):
        players = int(self.team.number_players) + int(self.number_players)
        self.team.number_players = str(players)

    def __repr__(self):
        return '<Enrollment {}>'.format(self.id)
