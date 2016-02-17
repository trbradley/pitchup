from flask import Flask
# from flaskext.mail import Mail, Message
from flask_mail import Mail, Message


app.config.update(
	DEBUG=True,
	#EMAIL SETTINGS
	MAIL_SERVER='smtp.gmail.com',
	MAIL_PORT=465,
	MAIL_USE_SSL=True,
	MAIL_USERNAME = 'pitchuphelp@gmail.com',
	MAIL_PASSWORD = 'giamir1234'
	)

mail=Mail(app)

@app.route("/send-mail/")
def index():
	msg = Message(
              'Hello',
	       sender='pitchuphelp@gmail.com',
	       recipients=
               ['tmgree@outlook.com'])
	msg.body = "This is the email body"
	msg.html = "<b>This is the email body</b>"
	mail.send(msg)
	return "Sent"

if __name__ == "__main__":
    app.run()
