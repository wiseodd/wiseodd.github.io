---
layout:     post
title:      "Developing Blog with Wagtail"
subtitle:   "My experience on building this blog using Wagtail CMS, with zero Django knowledge. Let’s code our blog!"
date:       2015-06-22 12:51:00
author:     "wiseodd"
header-img: "img/2015-06-21-wagtail-dev-env/wagtail.jpg"
category:   techblog
tags:       [python, programming, web]
---

Now that we’ve set our Wagtail development environment up, we’re ready to actually write our code. Now, Wagtail is unlike Wordpress and such, where all you have to do is just use their admin panel, and everything will be set up for you. Wagtail is actually just give you foundation, and how you build your site/blog is entirely up to you. There are of course pros and cons. On one side, you have so much flexibility and customizability. On the other side, if you’re not familiar with Django or web development in general, the learning curve could be a bit steep. Nevertheless, actually I really like how Wagtail provide us developers bare minimum CMS that could be extended and customize as we like. Let’s get started!

Oh, before you started run the development server first!


``` bash
./manage.py runserver
```


Wagtail Page
One of Wagtail’s building block is the Page class. You’ll need to extend it to create your desired page. In this tutorial, we’ll create our home page, blog page, and a generic page for everything else.

First, we’ll create our generic page class as home page class is already created by default when we started Wagtail project.


``` python
# core/models.py

from wagtail.wagtailcore.models import Page
from wagtail.wagtailcore.fields import RichTextField
from wagtail.wagtailadmin.edit_handlers import FieldPanel
from wagtail.wagtailsearch import index

# We’re deriving our GenericPage from Page class, so that our GenericPage also has Page’s field, e.g. title
class GenericPage(Page):
    # Let’s create our custom field, named body which is a rich text
    body = RichTextField()

    # Index the body field, so that it will be searchable
    search_fields = Page.search_fields + (index.SearchField(‘body'),)

    # To show our body field in admin panel, we have to wrap it with FieldPanel and add it to Page’s field panel
    content_panels = Page.content_panels + [FieldPanel('body', classname=‘full’)]
```

For explanation about every fields and panels in Wagtail, I suggest you to read the Wagtail documentation.

Let’s see the result in the admin panel. Fire up your browser, and go to <http://localhost:8000/admin> and login using the superuser account you already created before. You’ll see there are two fields there, title and body. Title is a field derived from the base class, Page. Body is a field that we created before.

![Generic Page]({{ site.baseurl }}/img/2015-06-22-developing-wagtail/00.jpg)

![Generic Page]({{ site.baseurl }}/img/2015-06-22-developing-wagtail/01.jpg)

Success! We’ve created our first page! Try to put some content there, and then publish it. But wait… Why can’t we publish it? Turns out, our database don’t have the table to save the page content yet. So now our task is to create the table, which in Django, is really easy. You don’t have to get your hand dirty with SQL code, or migration code, Django does it for you. Django kinda reverse engineer your models, then creates the appropriate migration scripts. So let’s do that.


``` bash
./manage.py makemigrations
./manage.py migrate
```

Try again to publish our GenericPage content. It will actually work! But, we are one step short from having our content actually published. We need to create a template to show the page content. One page will need to have one template. So, our GenericPage will need generic_page.html template.


```django
{% raw %}
# core/templates/generic_page.html

{% extends "base.html" %}
{% load static core_tags wagtailcore_tags wagtailimages_tags %}
{% block body_class %}template-{{ self.get_verbose_name|slugify }}{% endblock %}

{% block content %}
    <article>
        <h3>{{ self.title }}</h3>
        {{ self.body|richtext }}
    </article>
{% endblock %}
{% endraw %}
```

We first define our template to extend base.html, which means that every stylesheet, script, that is included in the base.html will be available to your `generic_page.html`. Then we load some tag to be used in our HTML, for example richtext tag from core_tags module. Our content will be rendered inside the `{% raw %}{% block content %}{% endraw %}`. Everything inside that block will be inserted into content block in the base.html. The pattern is: put every static things into base.html, and put dynamic things inside page template. The examples of static element are header, footer, and general style.

We can access our model’s field, variable, or function in our template by enclosing them using double curly bracket. Every field could also be passed to a function called filter.


``` django
{% raw %}
# Pass the value of body field into richtext filter
{{ self.body|richtext }}
{% endraw %}
```

Now, if you try to open your page again, it will actually rendered in your browser.

![Generic Page Template]({{ site.baseurl }}/img/2015-06-22-developing-wagtail/02.jpg)

So to sum up on how to create a page:

1. Create a class extending Page
2. Make and run the migration
3. Write the template

<h2 class="section-heading">Creating Blog Page</h2>

Now that we understand the know-how of creating a page in Wagtail, we will create our blog page. The basics are just the same. However, the page’s fields will be more complex to accommodate our need.

We want to create a separate app for our blog. The rationale, our project is a website, and a website could consist of some app, for example landing page, blog, etc. So to start thing off, we’ll create our blog app.


``` bash
./manage.py startapp blog
```

This will create a blog folder in our project, with its respective models and migrations. We will create our BlogPage class inside it.


``` python
# blog/models.py

from django.db import models

from wagtail.wagtailcore import blocks
from wagtail.wagtailcore.models import Page
from wagtail.wagtailcore.fields import StreamField
from wagtail.wagtailadmin.edit_handlers import FieldPanel, StreamFieldPanel
from wagtail.wagtailimages.edit_handlers import ImageChooserPanel
from wagtail.wagtailsearch import index


class BlogPage(Page):
    intro = models.CharField(max_length=250)
    main_image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )
    body = StreamField([
        ('rich_text', blocks.RichTextBlock(icon='doc-full', label='Rich Text')),
        ('html', blocks.RawHTMLBlock(icon='site', label='HTML'))
    ])

    search_fields = Page.search_fields + (
        index.SearchField('intro'),
        index.SearchField('body')
    )

    content_panels = Page.content_panels + [
        ImageChooserPanel('main_image'),
        FieldPanel('intro'),
        StreamFieldPanel('body')
    ]
```

I will introduce you to Wagtail unique feature: StreamField. StreamField is a page component that enables you to build your own page structure, just like LEGO! When we’re creating a StreamField, we will need to specify, which blocks (think about LEGO block) are available for the editor to use. In the example above, we specify that our StreamField could be built with RichText or RawHTML. The we could use arbitrary number of blocks in building our StreamField. Also the structure is free, as long as we only use the blocks that we’ve specified in our model. For more about StreamField, be sure to check Wagtail’s documentation.

For the main image of the blog post, we could make a reference to Wagtail’s image table. Hence, we specified that our main_image is a foreign key to wagtailimages.Image model.

Now, as always, make the migration script, then migrate it to our DB. After that, let’s create our template.


``` django
{% raw %}
{% extends "base.html" %}
{% load static core_tags wagtailcore_tags wagtailimages_tags %}
{% block body_class %}template-{{ self.get_verbose_name|slugify }}{% endblock %}

{% block content %}
    <article id="blog-post">
        <h3>{{ self.title }}</h3>
        <p class="post-meta">By {{ self.owner }} at {{ self.first_published_at }}</p>
        {{ self.body }}
    </article>
{% endblock %}
{% endraw %}
```

There, it’s super simple to use. It’s very similar with generic_page template. However, when we use StreamField, we don’t have to apply the value to richtext filter. If you want to have greater control over the StreamField, however, you could iterate over it to get each block, like this.


``` django
{% raw %}
{% for block in self.body %}
    {{ block }}
{% endfor %}
{% endraw %}
```

To see our blog page model, let’s fire up the Wagtail admin interface.

![Admin Page]({{ site.baseurl }}/img/2015-06-22-developing-wagtail/03.jpg)

Check out the body part. We’ll be given two building block that we’ve specified before. We could add RichText for the first blog, then another RichText for the second blog, or anything we want!


<h2 class="section-heading">Extending StreamField Block</h2>

The best part about using StreamField is that we could create our own block by extending the existing block. Because I wanted to make a programming blog, and Wagtail doesn’t provide code or quote block, which are very important in that kind of blog, I’ve to create it myself. It’s relatively easy and painless though!


``` python
# blog/models.py

class CodeBlock(blocks.TextBlock):
    class Meta:
        template = 'blocks/code.html'
        icon = 'code'
        label = 'Code'


class QuoteBlock(blocks.TextBlock):
    class Meta:
        template = 'blocks/quote.html'
        icon = 'openquote'
        label = ‘Quote'

body = StreamField([
    ('rich_text', blocks.RichTextBlock(icon='doc-full', label='Rich Text')),
    ('code', CodeBlock(icon='code')),
    ('quote', QuoteBlock(icon='openquote')),
    ('html', blocks.RawHTMLBlock(icon='site', label='HTML'))
])
```

Here, we specified two new blocks, CodeBlock and QuoteBlock. They’re extending Wagtail own TextBlock, because, code and quote are just a text really, with different markup in HTML. Code is enclosed with `<pre>` and `<code>` tags, and quote is enclosed by `<blockquote>` tag. So, all that matter now is just how we define our block template. Yes, block, like page need template. Because, template is basically is how your model looks like. So let’s make it.


``` django
{% raw %}
# blog/code.html
<pre>
    <code>
        {{ self }}
    </code>
</pre>

# blog/quote.html
<blockquote>
    {{ self }}
</blockquote>
{% endraw %}
```

There you have it! Really easy right? After you finished creating the custom blocks, we now can use it in our StreamField. Just like any other block, we just add it to list parameter of the StreamField.

Now, in your blog page admin panel, you’ll see code and quote blocks there, which you can use.

![Code and Quote]({{ site.baseurl }}/img/2015-06-22-developing-wagtail/04.jpg)

So, there you go, a blog page ready to use! What left to do is to style our blog. But, I will leave it to you and your creative mind! See you later!
