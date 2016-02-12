import unittest

from flask import url_for
from flask.ext.testing import TestCase
from base import BaseTestCase

from server import app, db, session
from server.models.user import User

class TestSessions(BaseTestCase):
    def test_user_login(self):
        """logs in a user"""
        response = self.client.post(
            url_for('sessions'),
            data={
                'username': 'test',
                'password': 'password'
            }
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Logged in successfully', response.data)

    def test_user_invalid_username_login(self):
        """cannot log in with invalid credentials"""
        response = self.client.post(url_for('sessions'))
        self.assertEqual(response.status_code, 400)
        self.assertIn(b'Invalid username or password', response.data)

    def test_user_invalid_password_login(self):
        """cannot log in with invalid password"""
        response = self.client.post(
            url_for('sessions'),
            data={
                'username': 'test',
                'password': ''
            }
        )
        self.assertEqual(response.status_code, 400)
        self.assertIn(b'Invalid username or password', response.data)

    def test_user_logout(self):
        """logs out a user"""
        response = self.client.delete(url_for('sessions'))
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Logged out successfully', response.data)

    def test_user_already_loggedout(self):
        """cannot log out a user who has already logged out"""
        self.client.delete(url_for('sessions'))
        response = self.client.delete(url_for('sessions'))
        self.assertEqual(response.status_code, 400)
        self.assertIn(b'You are not logged in', response.data)
