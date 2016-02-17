from server import app
from flask_mail import Mail, Message

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

def new_enrollment_email():
    msg = Message(
                'Hello',
                sender='pitchuphelp@gmail.com',
                recipients=['bradleytomr@gmail.com'])
    msg.body = "This is the email body"
    msg.html = "<b>This is the email body</b>"
    mail.send(msg)
    return "Sent"
