from server import db
from passlib.apps import custom_app_context as pwd_context
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
        return pwd_context.verify(password, self.password_hash)

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
        return pwd_context.encrypt(password_hash)

    def __repr__(self):
        return '<id {}>'.format(self.id)
