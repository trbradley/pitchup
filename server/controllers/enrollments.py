from flask.ext.restful import Resource, marshal, reqparse
from server import api, db
from server.models.enrollment import Enrollment
from server.helpers.sessions import current_user
# from server.helpers.emails import new_enrollment_email


class EnrollmentsAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('number_players')
        super(EnrollmentsAPI, self).__init__()

    def post(self, team_id):
        if not current_user():
            return 'You need to be logged in', 403
        args = self.reqparse.parse_args()
        args['team_id'] = team_id
        try:
            enrollment = Enrollment(args)
            db.session.add(enrollment)
            db.session.commit()
        except Exception as e:
            return str(e), 400
        new_enrollment_email(team_id)
        return 'Enrolled successfully', 201


api.add_resource(
    EnrollmentsAPI,
    '/teams/<int:team_id>/enrollments',
    endpoint='enrollments'
    )
