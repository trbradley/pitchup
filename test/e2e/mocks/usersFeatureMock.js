module.exports = [
  {
    request: {
      path: '/users/2',
      method: 'GET'
    },
    response: {
      data: {
        "user": {
          "username": "random",
          "id": 2,
          "email": "random@example.com"
        }
      }
    }
  },
  {
    request: {
      path: '/users',
      method: 'POST'
    },
    response: {
      data: 'User created successfully',
      status: 201
    }
  }
];
