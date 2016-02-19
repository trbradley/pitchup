import os

from server import app, db
from flask_mail import Mail, Message
from server.models.team import Team
from server.models.user import User


app.config.update(
    DEBUG=True,
    #EMAIL SETTINGS
    MAIL_SERVER='smtp.gmail.com',
    MAIL_PORT=465,
    MAIL_USE_SSL=True,
    MAIL_USERNAME='pitchuphelp@gmail.com',
    MAIL_PASSWORD=os.environ['MAIL_PASSWORD']
    )

mail=Mail(app)

def new_enrollment_email(team_id, current_user):
    creator_id = Team.query.filter_by(id=team_id).first().created_by
    creator_email = User.query.filter_by(id=creator_id).first().email
    user_username = current_user.username
    msg = Message(
                'PitchUp - New Enrollment',
                sender='pitchuphelp@gmail.com',
                recipients=[creator_email])
    msg.body = "#{user_username} has joined your team! \
                Congratulations, your team is now full and ready to play!"
    msg.html = "<b>#{user_username} has joined your team! \
                Congratulations, your team is now full and ready to play!</b>"
    mail.send(msg)
    return "Sent"
