from server import db


class Team(db.Model):
    __tablename__ = 'teams'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    capacity = db.Column(db.Integer())
    number_players = db.Column(db.Integer())
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    def __init__(self, name, capacity, number_players, user_id):
        self.name = name
        self.capacity = capacity
        self.number_players = number_players
        self.user_id = user_id

    def __repr__(self):
        return '<Team {}>'.format(self.id)
