import unittest

from flask import url_for
from flask.ext.testing import TestCase
from base import BaseTestCase

from server import app, db, session
from server.models.user import User

class TestUser(BaseTestCase):
    def test_create_user(self):
        """create a user in database"""
        session.clear()
        response = self.client.post(
            url_for('users'),
            data={
                'username': 'test user',
                'email': 'testuser@test.com',
                'password': '123456'
            }
        )
        self.assertEqual(response.status_code, 201)
        self.assertIn(b'User created successfully', response.data)
        self.assertEqual(db.session.query(User).count(), 2)

    def test_get_user(self):
        """can find a user in database"""
        response = self.client.get('users/1')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'user', response.data)

    def test_user_not_found(self):
        """cannot find a user in database"""
        response = self.client.get('users/3')
        self.assertEqual(response.status_code, 404)
        self.assertIn(b'User not found', response.data)

    def test_cannot_create_user_without_username(self):
        """do not create a user with invalid username"""
        with self.assertRaises(Exception) as context:
            self.client.post(
                url_for('users'),
                data={
                    'username': '',
                    'email': 'test@test.com',
                    'password': '123456'
                }
            )
            self.assertTrue('Username cannot be empty.' in context.exception)
            self.assertEqual(db.session.query(User).count(), 1)

    def test_cannot_create_user_if_username_already_exists(self):
        """cannot create a user if username already exists"""
        with self.assertRaises(Exception) as context:
            self.client.post(
                url_for('users'),
                data={
                    'username': 'test',
                    'email': 'test@test.com',
                    'password': '123456'
                }
            )
            self.assertTrue('Username already exists.' in context.exception)
            self.assertEqual(db.session.query(User).count(), 0)

    def test_cannot_create_user_if_email_already_exists(self):
        """cannot create a user if email already exists"""
        with self.assertRaises(Exception) as context:
            self.client.post(
                url_for('users'),
                data={
                    'username': 'testtest',
                    'email': 'test@test.com',
                    'password': '123456'
                }
            )
            self.assertTrue('Email already exists.' in context.exception)
            self.assertEqual(db.session.query(User).count(), 0)

    def test_cannot_create_user_without_valid_email(self):
        """do not create a user with invalid email"""
        with self.assertRaises(Exception) as context:
            self.client.post(
                url_for('users'),
                data={
                    'username': 'testtest',
                    'email': 'testtest.com',
                    'password': '123456'
                }
            )
            self.assertTrue('Eamil address must contain an @ sign.' in context.exception)
            self.assertEqual(db.session.query(User).count(), 1)

    def test_cannot_create_user_without_password(self):
        """do not create a user with empty password"""
        with self.assertRaises(Exception) as context:
            self.client.post(
                url_for('users'),
                data={
                    'username': 'testtest',
                    'email': 'testtest@test.com',
                    'password': ''
                })
            self.assertTrue('Password cannot be empty.' in context.exception)
            self.assertEqual(db.session.query(User).count(), 1)

    def test_cannot_create_user_with_short_password(self):
        """do not create a user with password less than 6 characters"""
        with self.assertRaises(Exception) as context:
            self.client.post(
                url_for('users'),
                data={
                    'username': 'testtest',
                    'email': 'testtest@test.com',
                    'password': '12345'
                }
            )
            self.assertTrue('Password must be longer than 6 characters' in context.exception)
            self.assertEqual(db.session.query(User).count(), 1)
