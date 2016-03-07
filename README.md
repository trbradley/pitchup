# ![Alt text](http://i.imgur.com/Xj6MEei.png) [![Build Status](https://travis-ci.org/trbradley/pitchup.svg?branch=master)](https://travis-ci.org/trbradley/pitchup) [![Coverage Status](https://coveralls.io/repos/github/trbradley/pitchup/badge.svg?branch=master)](https://coveralls.io/github/trbradley/pitchup?branch=master)

## Mission Statement
“Our mission is to provide sports enthusiasts with the platform to connect to sports teams in order to play at a time and a place that suits them. Our app/website will allow players to take part in their favourite hobby, make exercise more fun and competitive, and furthermore help inspire our users find a new passion for sport".

![Alt text](http://i.imgur.com/qps4j6N.jpg)

## Installation Instructions

You can try the app remotely:
>[http://pitchup.herokuapp.com/](http://pitchup.herokuapp.com/)

or install it locally:

Clone down from github and cd into the directory

```
$ git clone git@github.com:trbradley/pitchup.git
$ cd pitchup
```
Follow this pill to setup your python environment:<br>
💊 [Setup Python backend environment on MAC](docs/setup_backend.md)

Install any dependencies then run the app

```
$ pip install
$ npm install
$ npm start
```

Visit `http://localhost:5000` to join a team.

## Technologies

### Frontend
* Angular js
* angular-google-maps
* angular-animate
* Tested with Jasmine, Karma and Protractor

### Backend (API)
* Python
* Flask
* Flask-restful
* PostgreSQL
* Tested with Flask unittest


### User Stories
```
As a busy professional,
So that I can see which teams need players,
I would like to be able to see a list of teams.

As a busy professional,
So that I can play football in my area,
I would like to be able to join a team.

As a busy professional,
So that I know how many extra players I can bring,
I would like to be able to see the team's player capacity.

As a coach/team captain,
So that users can know that I need players,
I would like to be able to create a team.

As a coach/team captain,
So that I can get enough players in my team,
I would like to be able to search for individual players.

As a coach/team captain,
So that I can get my team to full capacity,
I would like to see how many extra people a player could bring.

```

## Contributions

Feel free to get involved! Our waffleboard is available at https://waffle.io/trbradley/pitchup.

## Contributors

* [Giamir Buoncristiani](https://github.com/giamir)
* [Andrew Htun](https://github.com/Htunny)
* [Tom Bradley](https://github.com/trbradley)
* [Tony Young](https://github.com/TY231618)
* [Tom Green](https://github.com/Tmgree)
