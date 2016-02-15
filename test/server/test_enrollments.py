import unittest

from flask import url_for
from flask.ext.testing import TestCase
from base import BaseTestCase

from server import app, db, session
from server.models.enrollment import Enrollment
from server.models.team import Team
from server.helpers.sessions import current_user


class TestEnrollmentsAPI(BaseTestCase):

    def test_post_enrollment(self):
        """POST request to create an enrollment"""

        team = Team(dict(
                id='1',
                name='test team',
                capacity='11',
                number_players='6',
                pitch_postcode='E1 6LT',
                time='2019-01-01 13:00',
                created_by='2'
        ))

        db.session.add(team)
        db.session.commit()

        response = self.client.post(url_for(team.id + '/enrollments'),
                                    data={
                                        # 'team_id': team.id,
                                        'number_players': '1'
                                    })
        self.assertEqual(response.status_code, 201)
        self.assertIn(b'Enrolled successfully', response.data)
        self.assertEqual(db.session.query(Enrollment).count(), 1)

if __name__ == '__main__':
    unittest.main()
