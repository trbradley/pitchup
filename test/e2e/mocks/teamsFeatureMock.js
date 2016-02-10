module.exports = [
  {
    request: {
      path: '/teams',
      method: 'GET'
    },
    response: {
      data: {
        "teams": [
          {
            "capacity": 5,
            "id": 10,
            "name": "Manchester United",
            "number_players": 2
          }
        ]
      }
    }
  },
  {
    request: {
      path: '/teams/10',
      method: 'GET'
    },
    response: {
      data: {
        "team": {
          "capacity": 5,
          "id": 10,
          "name": "Manchester United",
          "number_players": 2
        }
      }
    }
  },
  {
    request: {
      path: '/teams',
      method: 'POST'
    },
    response: {
      data: 'Team created successfully',
      status: 201
    }
  }
];
