from flask.ext.testing import TestCase

from server import app, db


class BaseTestCase(TestCase):

    def create_app(self):
        app.config['PRESERVE_CONTEXT_ON_EXCEPTION'] = False
        app.config.from_object('server.config.TestingConfig')
        return app

    def setUp(self):
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
