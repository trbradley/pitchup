from flask.ext.testing import TestCase

from server import app, db, session
from server.models.user import User


class BaseTestCase(TestCase):

    def create_app(self):
        app.config['PRESERVE_CONTEXT_ON_EXCEPTION'] = False
        app.config.from_object('server.config.TestingConfig')
        return app

    def setUp(self):
        args = {
            'username': 'test',
            'password': 'password',
            'email': 'test@test.com'
        }
        db.create_all()
        user = User(args)
        db.session.add(user)
        db.session.commit()
        session['user_id'] = user.id
        with self.client as c:
            with c.session_transaction() as sess:
                sess['user_id'] = user.id

    def tearDown(self):
        db.session.remove()
        db.drop_all()
