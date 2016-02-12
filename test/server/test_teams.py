import unittest

from flask import url_for
from flask.ext.testing import TestCase
from base import BaseTestCase

from server import app, db, session
from server.models.team import Team


class TestTeamsAPI(BaseTestCase):

    def test_post_team(self):
        """POST request to create team in database"""
        response = self.client.post(url_for('teams'),
                                    data={
                                        'name': 'test team',
                                        'capacity': 11,
                                        'number_players': 6
                                        })
        self.assertEqual(response.status_code, 201)
        self.assertIn(b'Team created successfully', response.data)
        self.assertEqual(db.session.query(Team).count(), 1)

    def test_cannot_post_invalid_team(self):
        """POST request to create team with invalid parameters"""
        response = self.client.post(url_for('teams'),
                                    data={
                                        'capacity': 10,
                                        'number_players': 6
                                        })
        self.assertEqual(response.status_code, 400)

    def test_get_list_teams(self):
        """GET request to view list of teams"""
        args = {
            'name': 'test team',
            'capacity': '11',
            'number_players': '6'
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
            'number_players': '6'
        }
        team = Team(args)
        db.session.add(team)
        db.session.commit()
        response = self.client.get('/teams/1')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'test team', response.data)

    def test_capacity_cannot_be_empty(self):
        """capacity cannot be a empty"""
        with self.assertRaises(Exception) as context:
            self.client.post(
                url_for('teams'),
                data={
                    'name': 'team',
                    'capacity': 'hello',
                    'number_players': '1'
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
                    'number_players': 'hello'
                }
            )
            self.assertTrue('Number players must be a number' in context.exception)
            self.assertEqual(db.session.query(Team).count(), 0)

if __name__ == '__main__':
    unittest.main()
