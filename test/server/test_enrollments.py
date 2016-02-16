import unittest

from flask import url_for
from flask.ext.testing import TestCase
from base import BaseTestCase

from server import app, db, session
from server.models.enrollment import Enrollment
from server.models.team import Team
from server.models.user import User
from server.helpers.sessions import current_user


class TestEnrollmentsAPI(BaseTestCase):

    def test_post_enrollment(self):
        """POST request to create an enrollment"""
        team = Team(dict(
                name='test team',
                capacity='11',
                number_players='6',
                pitch_postcode='E1 6LT',
                time='2019-01-01 13:00',
        ))
        db.session.add(team)
        db.session.commit()

        user2 = User(dict(
                username='test user 2',
                password='testpassword',
                email='test2@email.com'
        ))
        db.session.add(user2)
        db.session.commit()
        with self.client as c:
            with c.session_transaction() as sess:
                sess['user_id'] = user2.id

        response = self.client.post('/teams/1/enrollments',
                                    data={
                                        'number_players': 1
                                    })
        self.assertEqual(response.status_code, 201)
        self.assertIn(b'Enrolled successfully', response.data)
        self.assertEqual(db.session.query(Enrollment).count(), 2)

    def test_post_logged_out_enrollment(self):
        """POST request to create an enrollment whilst logged out"""
        team = Team(dict(
                name='test team',
                capacity='11',
                number_players='6',
                pitch_postcode='E1 6LT',
                time='2019-01-01 13:00',
        ))
        db.session.add(team)
        db.session.commit()

        with self.client as c:
            with c.session_transaction() as sess:
                sess.clear()

        response = self.client.post('/teams/1/enrollments',
                                    data={
                                        'number_players': 1
                                    })
        self.assertEqual(response.status_code, 403)
        self.assertIn(b'You need to be logged in', response.data)
        self.assertEqual(db.session.query(Enrollment).count(), 1)

if __name__ == '__main__':
    unittest.main()
