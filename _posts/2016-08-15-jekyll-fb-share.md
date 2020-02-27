---
layout:     post
title:      "How to Use Specific Image and Description when Sharing Jekyll Post to Facebook"
subtitle:   "Normally, random subset of pictures and the site's description will be picked when we shared our Jekyll blog post URL to Facebook. This is how to force Facebook to use the specific image and description for our blog post!"
date:       2016-08-15 13:52
author:     "wiseodd"
header-img: "img/code-front-end.jpg"
category:   techblog
tags:       [programming, jekyll]
---

Often times, when we share our blog post to Facebook, disappointments will arise. Our hard work reduced to zero just because Facebook picks undesireable image and description. Our perfectly written and beautifully arranged blog post looks really bad in the Facebook post... The horror!

However, there is a quick remedy for that, and if you're using Jekyll, you just need to modify once, and forget about it for the rest of your life. Here's how!

First, check the front matter format of your blog post's markdown. Here's mine for example:

```
---
layout:     post
title:      "Deriving LSTM Gradient for Backpropagation"
subtitle:   "Deriving neuralnet gradient is an absolutely great exercise to understand backpropagation and computational graph better. In this post we will walk through the process of deriving LSTM net gradient so that we can use it in backpropagation."
date:       2016-08-12 12:34
author:     "wiseodd"
header-img: "img/code.png"
category:   techblog
tags:       [machine learning, programming, python, neural networks, rnn, lstm]
---
```

So, in my case, I want the image and the description that are displayed in my Facebook post to be the value of `header-img` and `subtitle` variables respectively. You can use any variable though, as this is just an example.

Now, open your `_include/head.html` template, and this piece of code inside the `<head>` tag.

{% highlight html %}
{% raw %}
{% if page.header-img %}
    <meta property="og:image" content="{{ site.url }}/{{ page.header-img }}" />
{% endif %}

<meta property="og:description" content="{{ page.subtitle }}" />
{% endraw %}
{% endhighlight %}

And voila! The next time you share your blog post to Facebook, the post's `header-img` and `subtitle` will be used!

![FB Share]({{ site.baseurl }}/img/2016-08-15-jekyll-fb-share/share.png)

To update the already shared posts so that they follow the above schema, you should head to <https://developers.facebook.com/tools/debug/>, enter your URL, click "Debug", and click "Scrape Again".

Now, try to re-share the post. It should be updated now.

We have to do this because Facebook caches the scraped URL. It is especially true if the URL is somewhat recently shared.

Credit due to front-end ninja <http://timotiusnc.github.io>!
