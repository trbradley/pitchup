import unittest

from flask.ext.testing import TestCase
from base import BaseTestCase

from server import app, db


class Main(BaseTestCase):
    def test_post_team(self):
        """it serves on the index route the angular index view"""
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main()
