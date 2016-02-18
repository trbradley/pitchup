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
    MAIL_USERNAME = 'pitchuphelp@gmail.com',
    MAIL_PASSWORD = ''
    )

mail=Mail(app)

def new_enrollment_email(team_id):
    team = Team.query.filter_by(id=team_id).first()
    print(team)
    creator_id = team.created_by
    creator = User.query.filter_by(id=creator_id).first()
    creator_email = creator.email
    # user_email = creator_email(team_id)
    msg = Message(
                'Hello',
                sender='pitchuphelp@gmail.com',
                recipients=[creator_email])
    msg.body = "This is the email body"
    msg.html = "<b>This is the email body</b>"
    mail.send(msg)
    return "Sent"
#
# def creator_email(team_id):
#     team = Team.query.filter_by(id=team_id).first()
#     print(team)
#     creator_id = team.created_by
#     print(creator_id)
#     creator = User.query.filter_by(id=creator_id).first()
#     print(creator)
#     creator_email_addr = creator.email
#     print(creator_email_addr)
#     return creator_email_addr
