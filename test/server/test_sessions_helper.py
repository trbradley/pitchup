import unittest

from flask import url_for
from flask.ext.testing import TestCase
from base import BaseTestCase

from server.helpers.sessions import current_user
from server import app, db, session

class TestSessionsHelper(BaseTestCase):
    def test_current_user(self):
        session.clear()
        user = current_user()
        self.assertEqual(user, None)
