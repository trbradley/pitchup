from server import db
from sqlalchemy import event
from sqlalchemy.orm import validates
from server.helpers.sessions import current_user


class Team(db.Model):
    __tablename__ = 'teams'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    capacity = db.Column(db.Integer())
    number_players = db.Column(db.Integer())
    postcode = db.Column(db.String())
    created_by = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"))

    creator = db.relationship("User", foreign_keys=[created_by])
    users = db.relationship("Enrollment")

    def __init__(self, args):
        self.name = args['name']
        self.capacity = args['capacity']
        self.number_players = args['number_players']
        self.postcode = args['postcode']
        self.created_by = current_user().id
        self.validate_capacity_greater_than_players()
        self._update_enrollments(args)

    def _update_enrollments(self, args):
        args['team'] = self
        enrollment = Enrollment(args)
        db.session.add(enrollment)
        db.session.commit()

    def validate_capacity_greater_than_players(self):
        if int(self.capacity) < int(self.number_players):
            raise ValueError('Capacity have to be greater or equal than number of players')

    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError('Team name cannot be empty')
        return name

    @validates('capacity')
    def validate_capacity(self, key, capacity):
        if not capacity.isdigit():
            raise ValueError('Capacity must be a number')
        return capacity

    @validates('number_players')
    def validate_number_players(self, key, number_players):
        if not number_players.isdigit():
            raise ValueError('Number players must be a number')
        return number_players

    def __repr__(self):
        return '<Team {}>'.format(self.id)


from server.models.enrollment import Enrollment
