---
layout:     post
title:      "Scrapy as a Library in Long Running Process"
subtitle:   "Scrapy is a great web crawler framework, but it's tricky to make it runs as a library in a long-running process. Here's how!"
date:       2016-06-10 03:37
author:     "wiseodd"
header-img: "img/code.png"
category:   techblog
tags:       [scrapy, python, programming]
---

There's no denying that Scrapy is one of the best crawler frameworks for Python, if not the best. Scrapy's developers designed Scrapy as a standalone process, i.e. in a different instance from our main program, and using database for communication between them.

Sometimes, we want to integrate Scrapy in our own framework. It's a little bit tricky because it's not what Scrapy designed for. In the documentation page, there are some information on how to run Scrapy from our own script: <http://doc.scrapy.org/en/latest/topics/practices.html>.

It's sufficient if our goal is to use Scrapy from our own script for one time crawling, i.e. execute the script, retrieve the result, then terminate it. However, it won't work if our goal is to make Scrapy run from our own long-running worker instance. After the first execution, it will raise `twisted.internet.error.ReactorNotRestartable` error.

There's a workaround for this, and in my experience, this solution is quite robust: I haven't encountered a single failure since I implemented this solution. The workaround is to use `multiprocessing` module in Python's standard library.

Let's define our crawler module. I'll assume that we've already had our spiders defined.

{% highlight python %}
from scrapy import signals
from scrapy.crawler import CrawlerProcess, Crawler
from scrapy.settings import Settings


class CustomCrawler(object):

    def crawl(self, spider):
        crawled_items = []

        def add_item(item):
            crawled_items.append(item)

        process = CrawlerProcess()

        crawler = Crawler(spider, self.settings)
        crawler.signals.connect(add_item, signals.item_scraped)
        process.crawl(crawler)

        process.start()

        return crawled_items
{% endhighlight %}

Here, we're creating the `CustomCrawler` just as advised by the official Scrapy documentation. We use Scrapy's `signals` to get the crawled item, and add it to a list that stores our crawled items. So, each time an item is crawled, it will send a signal. If we caught such signal, then we add the said crawled item to the list. In the end of this method, we'll have a list that contains all of the items we've crawled.

This solution alone will suffice if our goal is to create a script for one-time-and-terminate crawler job. To make it works as long-running crawler job, we have to wrap the `CustomCrawler` class with Python's `multiprocessing` library.

{% highlight python %}
import multiprocessing as mp


def crawl():
    def _crawl(queue):
        crawler = CustomCrawler()
        # Assume we have a spider class called: WebSpider
        res = crawler.crawl(WebSpider)
        queue.put(res)

    q = mp.Queue()
    p = mp.Process(target=_crawl, args=(q))
    p.start()
    res = q.get()
    p.join()

    return res
{% endhighlight %}

One thing to note though, we have to execute this line: `res = q.get()` **before** `p.join()`. This is a known issue for this implementation. If you know what's up with this, drop a comment or reply in this Stackoverflow thread: <http://stackoverflow.com/questions/35810024/python-multiprocessing-queue-behavior>

Having wrapped our `CustomCrawler` class, we then could use it inside our long-running worker.

{% highlight python %}
import time


while True:
    items = crawl()
    # do something with crawled items ...
    time.sleep(3600)
{% endhighlight %}

And, that's it! Now our worker will do the crawling job periodically without ever terminating!
