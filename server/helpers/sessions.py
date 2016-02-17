from server import session
from server.models.user import User


def current_user():
    if 'user_id' not in session:
        return None
    return User.query.get(session['user_id'])
