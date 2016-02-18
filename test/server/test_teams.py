import unittest

from flask import url_for
from flask.ext.testing import TestCase
from base import BaseTestCase

from server import app, db, session
from server.models.team import Team


class TestTeamsAPI(BaseTestCase):

    def test_post_team(self):
        """POST request to create a valid team in database"""
        response = self.client.post(url_for('teams'),
                                    data={
                                        'name': 'test team',
                                        'capacity': 11,
                                        'number_players': 6,
                                        'pitch_postcode': 'E1 6LT',
                                        'time': '2019-01-01 13:00'
                                        })
        self.assertEqual(response.status_code, 201)
        self.assertIn(b'Team created successfully', response.data)
        self.assertEqual(db.session.query(Team).count(), 1)

    def test_get_list_teams(self):
        """GET request to view list of teams"""
        args = {
            'name': 'test team',
            'capacity': '11',
            'number_players': '6',
            'pitch_postcode': 'E1 6LT',
            'time': '2019-01-01 13:00'
        }
        team = Team(args)
        db.session.add(team)
        db.session.commit()
        response = self.client.get('/teams')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'test team', response.data)

    def test_get_individual_team(self):
        """GET request to view individual team"""
        args = {
            'name': 'test team',
            'capacity': '11',
            'number_players': '6',
            'pitch_postcode': 'E1 6LT',
            'time': '2019-01-01 13:00'
        }
        team = Team(args)
        db.session.add(team)
        db.session.commit()
        response = self.client.get('/teams/1')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'test team', response.data)

    def test_name_must_be_present(self):
        """POST request to create team with no name"""
        response = self.client.post(url_for('teams'),
                                    data={
                                        'capacity': 10,
                                        'number_players': 6,
                                        'pitch_postcode': 'E1 6LT',
                                        'time': '2019-01-01 13:00'
                                        })
        self.assertEqual(response.status_code, 400)

    def test_capacity_cannot_be_empty(self):
        """capacity cannot be a empty"""
        with self.assertRaises(Exception) as context:
            self.client.post(
                url_for('teams'),
                data={
                    'name': 'team',
                    'capacity': 'hello',
                    'number_players': '1',
                    'pitch_postcode': 'E1 6LT',
                    'time': '2019-01-01 13:00'
                }
            )
            self.assertTrue('Capacity must be a number' in context.exception)
            self.assertEqual(db.session.query(Team).count(), 0)

    def test_player_number_cannot_be_empty(self):
        """player number cannot be a empty"""
        with self.assertRaises(Exception) as context:
            self.client.post(
                url_for('teams'),
                data={
                    'name': 'team',
                    'capacity': '5',
                    'number_players': 'hello',
                    'pitch_postcode': 'E1 6LT',
                    'time': '2019-01-01 13:00'
                }
            )
            self.assertTrue('Number players must be a number' in context.exception)
            self.assertEqual(db.session.query(Team).count(), 0)

    def test_pitch_postcode_cannot_be_empty(self):
        """pitch_postcode cannot be a empty"""
        with self.assertRaises(Exception) as context:
            self.client.post(
                url_for('teams'),
                data={
                    'name': 'team',
                    'capacity': '11',
                    'number_players': '1',
                    'pitch_postcode': '',
                    'time': '2019-01-01 13:00'
                }
            )
            self.assertTrue('Postcode must be present' in context.exception)
            self.assertEqual(db.session.query(Team).count(), 0)

        def test_pitch_postcode_length(self):
            """pitch_postcode must be fewer than 8 character"""
            with self.assertRaises(Exception) as context:
                self.client.post(
                    url_for('teams'),
                    data={
                        'name': 'team',
                        'capacity': '11',
                        'number_players': '1',
                        'pitch_postcode': 'somewhereE1 6LT',
                        'time': '2019-01-01 13:00'
                    }
                )
                self.assertTrue('Postcode must be fewer than 8 characters' in context.exception)
                self.assertEqual(db.session.query(Team).count(), 0)

    def test_time_must_be_valid(self):
        """time must be in a valid format"""
        with self.assertRaises(Exception) as context:
            self.client.post(
                url_for('teams'),
                data={
                    'name': 'team',
                    'capacity': '11',
                    'number_players': '1',
                    'pitch_postcode': 'E1 6LT',
                    'time': '2019-01-01-01 at 13:00'
                }
            )
            self.assertTrue('Time must be a valid format' in context.exception)
            self.assertEqual(db.session.query(Team).count(), 0)

    def test_complete_teams_not_returned(self):
        """GET teams doesn't include completed teams"""
        args = {
            'name': 'incomplete team',
            'capacity': '11',
            'number_players': '6',
            'pitch_postcode': 'E1 6LT',
            'time': '2019-01-01 13:00'
        }
        team1 = Team(args)
        db.session.add(team1)
        db.session.commit()
        args = {
            'name': 'finished team',
            'capacity': '11',
            'number_players': '11',
            'pitch_postcode': 'E2 6LT',
            'time': '2019-01-01 13:00'
        }
        team2 = Team(args)
        db.session.add(team2)
        db.session.commit()
        response = self.client.get('/teams')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'incomplete team', response.data)
        self.assertNotIn(b'finished team', response.data)


if __name__ == '__main__':
    unittest.main()
