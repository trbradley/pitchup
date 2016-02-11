import unittest

from flask import url_for
from flask.ext.testing import TestCase
from base import BaseTestCase

from server import app, db
from server.models.user import User

class TestUser(BaseTestCase):
    def test_create_user(self):
        """create a user in database"""
        response = self.client.post(url_for('users'),
                                    data={
                                    'username': 'test',
                                    'email': 'test@test.com',
                                    'password': '123456'
                                    })
        self.assertEqual(response.status_code, 201)
        self.assertIn(b'User created successfully', response.data)
        self.assertEqual(db.session.query(User).count(), 1)

    def test_cannot_create_user_without_username(self):
        """do not create a user with invalid username"""
        with self.assertRaises(Exception) as context:
            self.client.post(url_for('users'),
                            data={
                            'username': '',
                            'email': 'test@test.com',
                            'password': '123456'
                            })
            self.assertTrue('Username cannot be empty.' in context.exception)
            self.assertEqual(db.session.query(User).count(), 0)

    def test_cannot_create_user_without_valid_email(self):
        """do not create a user with invalid email"""
        with self.assertRaises(Exception) as context:
            self.client.post(url_for('users'),
                            data={
                            'username': 'test',
                            'email': 'testtest.com',
                            'password': '123456'
                            })
            self.assertTrue('Eamil address must contain an @ sign.' in context.exception)
            self.assertEqual(db.session.query(User).count(), 0)

    def test_cannot_create_user_without_password(self):
        """do not create a user with empty password"""
        with self.assertRaises(Exception) as context:
            self.client.post(url_for('users'),
                            data={
                            'username': 'test',
                            'email': 'test@test.com',
                            'password': ''
                            })
            self.assertTrue('Password cannot be empty.' in context.exception)
            self.assertEqual(db.session.query(User).count(), 0)

    def test_cannot_create_user_with_short_password(self):
        """do not create a user with password less than 6 characters"""
        with self.assertRaises(Exception) as context:
            self.client.post(url_for('users'),
                            data={
                            'username': 'test',
                            'email': 'test@test.com',
                            'password': '12345'
                            })
            self.assertTrue('Password must be longer than 6 characters' in context.exception)
            self.assertEqual(db.session.query(User).count(), 0)
