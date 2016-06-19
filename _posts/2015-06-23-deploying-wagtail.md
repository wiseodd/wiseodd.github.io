---
layout:     post
title:      "Deploying Wagtail App"
subtitle:   "In this post, I'll show you how to deploy our blog and how to solve some common problems when deploying Wagtail app."
date:       2015-06-23 01:39:00
author:     "wiseodd"
header-img: "img/2015-06-21-wagtail-dev-env/wagtail.jpg"
category:   tech
tags:       [python, programming, wagtail, web]
---

Today we'll talk about deployment. Yay? We software developers often don't like to deal with deployment. Let the dev ops do that! Our job is to code, not dealing with the production server! Yes? Well, no. We, software developers, should be a T shaped person. Meaning that we should have a broad knowledge, but we are specialized in one or two skills. So, actually, being able to deploy our application on our own is a very good thing, even we might not the best person to do it.

Ok, let's get started. Oh, before that, I'll make some disclaimer. Because this is about my experience developing and deploying this blog using Wagtail, the tools and systems that I use in this post will be a reflection of what I used when I built this blog.

First, we need to prepare our system. For this, I use cloud VPS. After investigated some of cloud providers out there, I chose DigitalOcean because it's so simple and so cheap. For the basic tier, you'll be charged just 5 bucks a month. Granted there are more powerful cloud provider out there, with Amazon AWS being the prime example. Unfortunately it doesn't have the simplicity DigitalOcean has. AWS's pricing is so convoluted and sophisticated I feel, and also it's directed to power user like devops guys.

To prepare the production environment, I'm strongly urge you to follow this guide: <https://www.digitalocean.com/community/tutorials/how-to-serve-django-applications-with-uwsgi-and-nginx-on-ubuntu-14-04>.

When everything (nginx, uwsgi) is ready, we can begin to really deploy our blog in the cloud. Here's the workflow that I use whenever I made some code change to this blog:

1. Pull the latest code from git
2. Change the virtualenv
3. Install Python dependencies:  `pip install -r requirements.txt`
4. Migrate the DB: `./manage.py migrate`
5. Run `./manage.py bower install`, because I use Bower to manage my Javascript & CSS dependencies.
6. Collect the static file: `./manage.py collectstatic`
7. Compress the static file, to minimize CSS & JS file size: `./manage.py compress`
8. Restart the application server (uwsgi): `sudo service uwsgi restart`

I think two thinks that need some explanation are number 5 and 7. Number 5 is needed because in production environment (whenever `DEBUG = False` in Django config), we have to serve the static file ourselves. Meaning that we need to put those files directly behind the web server, because it will be faster as serving static files via Django would be slower, which is not an ideal condition for production setting.

For number 7, we need to restart uwsgi because when uwsgi started, it will "compile" our Python files into .pyc files. And uwsgi will use those .pyc files. If we don't restart uwsgi, our changes in .py and .html files won't be served.

We already know that Django has multiple setting files: base.py, dev.py, and production.py. In our production environment we surely want to use production.py file to override our base.py. To make our life easier, we can put a script to automatically pick which setting file we have to use depending on what environment we are in. To do this, we'll edit our `__init__.py` inside the settings directory.


``` python
# settings/__init__.py

import os

ENV = os.getenv('MYBLOG_ENV', 'dev')

if ENV == 'dev':
    from .dev import *
elif ENV == 'prod':
    from .production import *
```

First, we find an environment variable named 'MYBLOG_ENV' in our operating system, with 'dev' as the default value. If that environment variable value is 'dev', we use dev.py, otherwise we use production.py. As simple as that. To create the environment variable, there are two ways, first by add it directly to the system, or put it in uwsgi. I will go with the second option because, just like the use of virtualenv, it aligns with our spirit of software environment isolation. This this line to your uwsgi config file, and restart uwsgi to apply the change:


```
env=MYBLOG_ENV=prod
```

Now, our Wagtail app in the production server will always use production.py, and whenever we open it in our development machine, it will use dev.py setting. Neat!



<h2 class="section-header">Common Problems</h2>

I spent a lot of time trying to figure out how to deploy this blog. I'd say most of my time creating this blog is here, in the deployment stage, debugging things that didn't work. Here's the list of some problems that I encountered while trying to make this blog up and running:

*Error 400:* Check your setting, make sure you've added your domain/IP in "allowed_sites" field
*Error 500:* Don't forget to do all of the above steps! I encountered this problem because I didn't compress my static files
Cannot upload image: The root cause is you don't have libjpeg and libpng in your machine

``` bash
sudo apt-get install libjpeg-dev libpng12-dev
pip uninstall pillow
pip install PIL --allow-external PIL --allow-unverified PIL
pip install pillow
```

Images, CSS, JS won't load: In production setting, we have to serve our static files ourselves. Probably you forgot to serve the "static" directory in the nginx. Check out your nginx sites-availables:


``` nginx
location /static/ {
    root /your/project/path;
}

location /media/ {
    root /your/project/path;
}
```

Probably also because the nginx doesn't have the permission to access the directories.


``` bash
chmod 664 -R static
chmod 664 -R media
chown -R yourusername:www-data static
chown -R yourusername:www-data media
```

Aaaaaand that's it! Now your Wagtail site should be up and running nicely in the production server!

Obviously, this is my limited first time experience deploying Django app. If you see there's more room for improvement, please let me know! I'll be eager to improve it!

