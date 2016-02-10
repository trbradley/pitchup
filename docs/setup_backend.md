## Setup Python backend environment on MAC
This is a very quick (and not detailed) walkthrough to have Python and Flask up and running in your local machine.<br>
It assumes you are using ZSH on your terminal / Iterm2 and its target is strictly related to pitchup (you can anyway easily adapt this for your own app).


In your terminal type:
```
$ brew install python
$ brew install python3

$ pip install virtualenv
$ pip install virtualenvwrapper

$ mkdir ~/.virtualenvs
$ virtualenv ~/.virtualenvs/pitchup
$ source ~/.virtualenvs/pitchup/bin/activate

$ touch ~/.virtualenvs/pitchup/bin/postactivate
```

In your ```~/.virtualenvs/pitchup/bin/postactivate``` add the following:
```
#!/bin/bash
# This hook is run after this virtualenv is activated.

cd ~/[path_to_your_pitchup_project]/pitchup
export APP_SETTINGS="config.DevelopmentConfig"
export DATABASE_URL="postgresql://localhost/pitchup_development"
```

In your ```~/.zshrc``` add the following before any PATH definition:
```
# user configuration
export PATH=/usr/local/bin:$PATH
```

In your ```~/.zshrc``` append the following:
```
# Setting up the VirtualEnv
export WORKON_HOME=$HOME/.virtualenvs
export VIRTUALENVWRAPPER_PYTHON=/usr/local/bin/python
export VIRTUALENVWRAPPER_VIRTUALENV_ARGS='--no-site-packages'
export PIP_VIRTUALENV_BASE=$WORKON_HOME
export PIP_RESPECT_VIRTUALENV=true

if [[ -r /usr/local/bin/virtualenvwrapper.sh ]]; then
    source /usr/local/bin/virtualenvwrapper.sh
else
    echo "WARNING: Can't find virtualenvwrapper.sh"
fi

# pip should only run if there is a virtualenv currently activated
export PIP_REQUIRE_VIRTUALENV=true

gpip(){
   PIP_REQUIRE_VIRTUALENV="" pip "$@"
}
```
Now source ```~/.zshrc``` from your terminal
```
$ source ~/.zshrc
```

Make sure you have postgresql installed and running
```
$ brew install postgresql
$ postgres -D /usr/local/var/postgres
```
You should have now running postrgres sql in the terminal.<br>
Open a new terminal window and let's create the databases we need.<br>
If it is the first time you are running postgres create your username database typing this:
```
$ createdb $whoami
```
and then create our development and test databases:
```
$ psql
# CREATE DATABASE pitchup_development;
# CREATE DATABASE pitchup_test;
# \q
```

You should be able now to activate your python environment typing:
```
$ workon pitchup
```
Now you should be in your pitchup project folder and you should see that you are in the pitchup environment looking at the very left of your prompt.<br>
Let's install our project python dependencies running:
```
$ pip install -r requirements.txt
```
Let's now upgrade our databases writing (init should not be necessary cause migrations has already been setup):
```
$ python manage.py db migrate
$ python manage.py db upgrade
```
Now you should be able to run the flask server typing:
```
$ python manage.py runserver
```
And you should be able to run the flask tests typing:
```
$ python manage.py test
```
Let's now try to deactivate the pitchup environment:
```
$ deactivate
```
To reactivate that use
```
workon pitchup
```

### Credits
[Giamir Buoncristiani](https://github.com/giamir)<br>
Feel free to contribute and improve this walkthrough. 👍
