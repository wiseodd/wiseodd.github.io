---
layout:     post
title:      "Setting Up Wagtail Development Environment"
subtitle:   "My experience on building a blog using Wagtail CMS, with zero Django knowledge. I’ll walk you through from scratch up until the blog is live"
date:       2015-06-21 06:52:00
author:     "wiseodd"
header-img: "img/2015-06-21-wagtail-dev-env/wagtail.jpg"
category:   techblog
tags:       [python, programming, web]
---

Wagtail is a CMS, made on top of Django framework. Why Wagtail, you ask. Well first thing first, Python is my favorite programming language, and naturally I’ll look building a website using Django. I’ve researched a bit about what CMS to use with Django, and I found there are three CMS-es out there that are stand out from the rest: Django-CMS, Mezzanine, and Wagtail. I chose Wagtail simply because I think it has the most modern look, easy to customize, and has this killer feature, StreamField.


First thing first, this post is from a web developer who had essentially ZERO knowledge about Django and Wagtail. So if you’re an seasoned Django dev, please bear with me! Also, I’m mainly using OSX Yosemite and Ubuntu 14.04 for development, so, sadly I can’t comment about Windows.

First let’s install the dependencies: Python, pip, and PostgreSQL

``` bash
Ubuntu:
sudo apt-get install python python-dev postgresql-9.3 postgresql-server-dev-9.3
sudo easy_install pip

OSX:
brew install python pip postgres
```

Now we’ll install virtualenv. This is not necessary, but will improve our development greatly as virtualenv will let us have clean and reproducible Python development environment.

``` bash
sudo pip install virtualenv virtualenvwrapper
```

And then, register virtualenvwrapper to our shell. Add these lines to your `.bashrc` (Ubuntu) or `.zshrc` (OSX).

``` bash
export WORKON_HOME=~/.virtualenv
source /usr/local/bin/virtualenvwrapper.sh
```

Then, you’ll need to log out to apply the change.

Now, we’ll create new virtualenv for our blog, then install Wagtail.

``` bash
mkvirtualenv yourblogname
pip install wagtail==1.0b2
wagtail start yourblogname
```

Now we’ve scaffolded our blog project structure! We can start our development now. However, by default, Wagtail uses SQLite for its database, which is alright for development purpose. For production environment, I strongly recommend to use more heavy duty database, namely PostgreSQL. So let’s make Wagtail uses PostgreSQL.

Open up the requirements.txt on your project directory, then uncomment this line that says `psycopg2==2.5.2`. This will tell pip to install psycopg2 dependency which is needed for Python to interface with PostgreSQL. After that run:

``` bash
pip install -r requirements.txt
```

There are some hurdles though, when using PostgreSQL for the first time. I’m experienced with database, but mainly with Oracle and MySQL. PostgreSQL is a bit different and coming from that MySQL it’s hard at first.

What we want to do is to:

1. Create a user, matching our blog name
2. Create a database, also matching our blog name
3. Give that user access to the database

Of course, you can use whatever name you want, but same name will simplify our live, so hey why not. So, run this:

``` bash
sudo su - postgres
createdb yourblogname
psql yourblogname
```

Now we’re inside PostgreSQL shell. We’ll create the user, then grant the permission to yourblogname database.

``` sql
CREATE ROLE yourblogname WITH PASSWORD ‘yourpassword’
GRANT ALL PRIVILEGES ON DATABASE yourblogname TO yourblogname
```

Then use `CTRL+D` to exit psql and type `exit` to exit user postgres’ shell.

Now we have to tell our blog to use PostgreSQL instead of SQLite. In your `yourblogname/settings/base.py`, comment out SQLite database entry:

``` python
# # SQLite (simplest install)
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': join(PROJECT_ROOT, 'db.sqlite3'),
#     }
# }
```

Then, uncomment PostgreSQL entry, and fill it with our database information:

``` python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'yourblogname',
        'USER': 'yourblogname',
        'PASSWORD': ''yourpassword,
        'HOST': ‘127.0.0.1’,  # Set to empty string for localhost.
        'PORT': '',  # Set to empty string for default.
        'CONN_MAX_AGE': 600,  # number of seconds database connections should persist for
    }
}
```

One of the problem I encountered was because I set `HOST` to be empty, which in turn will use socket connection, and gave me this error:

```
FATAL: Peer authentication failed for user “yourblogname"
```

So, make sure to fill `HOST` with `localhost` or `127.0.0.1`

After that, we’ll write our initial database to PostgreSQL:

``` bash
./manage.py makemigrations
./manage.py migrate
```

Also, don't forget to create an admin account so that we could get inside the admin panel.

``` bash
./manage.py createsuperuser
```

If everything is good, then we have our database ready, and we’re ready to actually code our blog!

In the next post, I’ll guide you to create our blog post model, home page, and the templates.
