from server import db
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.orm import validates


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String())
    email = db.Column(db.String())
    password_hash = db.Column(db.String())

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password_hash = password

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    @validates('email')
    def validate_email(self, key, email):
        if '@' not in email:
            raise ValueError('Email address must contain an @ sign.')
        return email

    @validates('username')
    def validate_username(self, key, username):
        if not username:
            raise ValueError('Username cannot be empty.')
        return username

    @validates('password_hash')
    def validate_password(self, key, password_hash):
        if not password_hash:
            raise ValueError('Password cannot be empty.')
        if len(password_hash) < 6:
            raise ValueError('Password must be longer than 6 characters')
        return generate_password_hash(password_hash)

    def __repr__(self):
        return '<id {}>'.format(self.id)
