from server import db


class Team(db.Model):
    __tablename__ = 'teams'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    capacity = db.Column(db.Integer())
    number_players = db.Column(db.Integer())

    def __init__(self, name, capacity, number_players):
        self.name = name
        self.capacity = capacity
        self.number_players = number_players

    def __repr__(self):
        return '<id {}>'.format(self.id)
