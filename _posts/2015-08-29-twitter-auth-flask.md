---
layout:     post
title:      "Twitter Authentication with Tweepy and Flask"
subtitle:   "A tutorial on how to do Twitter OAuth authentication in Flask web application."
date:       2015-08-29 09:46:00
author:     "wiseodd"
header-img: "img/code.png"
category:   techblog
tags:       [python, programming, web]
---

Recently, I created an app using Flask for the first time. The app uses Twitter API to get the data, where user could log in with her Twitter account, and she will get the report she needs. Here's the app: <http://responsetime.thirdworldnomad.com>.

I was wondering, how do I do the OAuth authentication flow? Turned out, it's really easy!

First, create an Flask route to redirect the user to Twitter login page:


{% highlight python %}
consumer_key = ''
consumer_secret = ''
callback = 'http://yourdoamain.com/callback'

@app.route('/auth')
def auth():
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret, callback)
    url = auth.get_authorization_url()
    session['request_token'] = auth.request_token
    return redirect(url)
{% endhighlight %}

What it does is to create an authentication handler according to your Twitter app's keys, and your predefined callback. This callback URL should point to your another Flask endpoint that I'll describe after this. Then, you'll need to redirect your user to the authorization URL that Tweepy constructed for you. Here, we save the `request_token` to the session because we need it to get the user's access token in the next endpoint. Session is a great way to handle states between requests.

Next, let's handle the case after user has logged in via Twitter. Twitter will redirect the user to your predefined callback URL.


{% highlight python %}
@app.route('/callback')
def twitter_callback():
    request_token = session['request_token']
    del session['request_token']

    auth = tweepy.OAuthHandler(consumer_key, consumer_secret, callback)
    auth.request_token = request_token
    verifier = request.args.get('oauth_verifier')
    auth.get_access_token(verifier)
    session['token'] = (auth.access_token, auth.access_token_secret)

    return redirect('/app')
{% endhighlight %}

Here, we get the `request_token` that we've saved from the previous request on `/auth`. As session is unique per user, it's guaranteed that there's no token mixup between users. Because the `request_token` won't be used anymore, it's recommended to delete it.

Next, we have to reconstruct the Tweepy's authentication handler again, using the same parameters. It will be rejected if the parameters are different. Twitter will append an query param `oauth_verifier` when requesting our callback endpoint. We'll use that token to be exchanged with the real access token.

The next is simple, just call Tweepy's `get_access_token` function and pass the token we get from the query param. Tweepy will exchange it for user's access token and secret token. You can store it in the database, or just save it in the session. Using session is simpler, but it won't persist, as it could expire.

Now that we have user's access token and secret token, we can use it to call Twitter API.


{% highlight python %}
@app.route('/app')
def request_twitter:
    token, token_secret = session['token']
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret, callback)
    auth.set_access_token(token, token_secret)
    api = tweepy.API(auth)

    return api.me()
{% endhighlight %}

To use the token, we'll need to get it from the session, then pass it to Tweepy `OAuthHandler` object, and create an API object based on that. Then, we could use the API object to request the Twitter REST and Streaming API.

So, that's it. It's surprising how easy it is to do OAuth authentication using Tweepy. On another web framework, like Django or Bottle, the principle and the flow is similar.

