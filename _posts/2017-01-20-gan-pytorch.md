---
layout:     post
title:      "Generative Adversarial Networks (GAN) in Pytorch"
subtitle:   "Pytorch is a new Python Deep Learning library, derived from Torch. Contrary to Theano's and TensorFlow's symbolic operations, Pytorch uses imperative programming style, which makes its implementation more \"Numpy-like\"."
date:       2017-01-20 04:00
author:     "wiseodd"
header-img: "img/code.png"
category:   techblog
tags:       [machine learning, pytorch]
---

This week is a really interesting week in the Deep Learning library front. There are two new Deep Learning libraries being open sourced: Pytorch and Minpy.

Those two libraries are different from the existing libraries like TensorFlow and Theano in the sense of how we do the computation. In TensorFlow and Theano, we have to symbolically construct our computational graph first before running it. In a sense, it is like writing a whole program before running it. Hence, the degree of freedom that we have in those libraries are limited. For example, doing loop, one need to use `tf.while_loop()` function in TensorFlow or `scan()` in Theano. Those approaches are less intuitive compared to imperative programming.

Enter Pytorch. It is a Torch's port for Python. The programming style of Pytorch is imperative, meaning that if we've already familiar using Numpy to code our alogrithm up, then jumping to Pytorch should be a breeze. One does not need to learn symbolic mathematical computation, like in TensorFlow and Theano.

With that being said, let's try Pytorch by implementing Generative Adversarial Networks (GAN). As a reference point, here is the [TensorFlow version]({% post_url 2016-09-17-gan-tensorflow %}).

Let's start by importing stuffs:

{% highlight python %}
import torch
import torch.nn.functional as nn
import torch.autograd as autograd
import torch.optim as optim
import numpy as np
from torch.autograd import Variable


mnist = input_data.read_data_sets('../MNIST_data', one_hot=True)
mb_size = 64
Z_dim = 100
X_dim = mnist.train.images.shape[1]
y_dim = mnist.train.labels.shape[1]
h_dim = 128
lr = 1e-3
{% endhighlight %}

Now let's construct our Generative Network \\( G(z) \\):

{% highlight python %}
def xavier_init(size):
    in_dim = size[0]
    xavier_stddev = 1. / np.sqrt(in_dim / 2.)
    return Variable(torch.randn(*size) * xavier_stddev, requires_grad=True)


Wzh = xavier_init(size=[Z_dim, h_dim])
bzh = Variable(torch.zeros(h_dim), requires_grad=True)

Whx = xavier_init(size=[h_dim, X_dim])
bhx = Variable(torch.zeros(X_dim), requires_grad=True)


def G(z):
    h = nn.relu(z @ Wzh + bzh.repeat(z.size(0), 1))
    X = nn.sigmoid(h @ Whx + bhx.repeat(h.size(0), 1))
    return X
{% endhighlight %}

It is awfully similar to the TensorFlow version, what is the difference then? It is subtle without more hints, but basically those variables `Wzh, bzh, Whx, bhx` are real tensor/ndarray, just like in Numpy. That means, if we evaluate it with `print(Wzh)` the value is immediately shown. Also, the function `G(z)` is a real function, in the sense that if we input a tensor, we will immediately get the return value back. Try doing those things in TensorFlow or Theano.

Next is the Discriminator Network \\( D(X) \\):

{% highlight python %}
Wxh = xavier_init(size=[X_dim, h_dim])
bxh = Variable(torch.zeros(h_dim), requires_grad=True)

Why = xavier_init(size=[h_dim, 1])
bhy = Variable(torch.zeros(1), requires_grad=True)


def D(X):
    h = nn.relu(X @ Wxh + bxh.repeat(X.size(0), 1))
    y = nn.sigmoid(h @ Why + bhy.repeat(h.size(0), 1))
    return y
{% endhighlight %}

Attentive readers will notice that unlike in TensorFlow or Numpy implementation, adding bias to the equation is non-trivial in Pytorch. It is a workaround since Pytorch has not implemented Numpy-like broadcasting mechanism yet. If we do not use this workaround, the `X @ W + b` will fail because while `X @ W` is `mb_size x h` dimensional tensor, `b` is only `1 x b` vector!

Now let's define the optimization procedure:

{% highlight python %}
G_params = [Wzh, bzh, Whx, bhx]
D_params = [Wxh, bxh, Why, bhy]
params = G_params + D_params

G_solver = optim.Adam(G_params, lr=1e-3)
D_solver = optim.Adam(D_params, lr=1e-3)
{% endhighlight %}

While at this point, in TensorFlow we just need to run the graph with `G_solver` and `D_solver` as the entry points, in Pytorch we need to tell the program what to do with those instances. So, just like in Numpy, we run the "forward-loss-backward-update" loop:

{% highlight python %}
for it in range(100000):
    # Sample data
    z = Variable(torch.randn(mb_size, Z_dim))
    X, _ = mnist.train.next_batch(mb_size)
    X = Variable(torch.from_numpy(X))

    # Dicriminator forward-loss-backward-update
    ## some codes

    # Generator forward-loss-backward-update
    ## some codes
{% endhighlight %}

So first, let's define the \\( D(X) \\)'s "forward-loss-backward-update" step. First, the forward step:

{% highlight python %}
    # D(X) forward and loss
    G_sample = G(z)
    D_real = D(X)
    D_fake = D(G_sample)

    D_loss_real = nn.binary_cross_entropy(D_real, ones_label)
    D_loss_fake = nn.binary_cross_entropy(D_fake, zeros_label)
    D_loss = D_loss_real + D_loss_fake
{% endhighlight %}

Nothing fancy, it is just a Numpy-like operations. Next, the backward and update step:

{% highlight python %}
    D_loss.backward()
    D_solver.step()
{% endhighlight %}

That is it! Notice, when we were constructing all the `W`s and `b`s, we wrapped them with `Variable(..., requires_grad=True)`. That wrapping is basically telling Pytorch that we cares about the gradient of those variables, and consequently `pytorch.autograd` module will calculate their gradients automatically, starting from `D_loss`. We could inspect those gradients by inspecting `grad` instance of the variables, e.g. `Wxh.grad`.

Of course we could code up our own optimizer. But Pytorch has built-in optimizers ready in `pytorch.optim` module. What it does is to abstract the update process and at each iteration, we just need to call `D_solver.step()` to update our variables, now that `grad` instance in those variables has been computed by `backward()` function.

As we have two different optimizers, we need to clear up the computed gradient in our computational graph as we do not need it anymore. Also, it is necessary so that the gradients won't mix up with the subsequent call of `backward()` as `D_solver` shares some subgraphs with `G_solver`.

{% highlight python %}
def reset_grad():
    for p in params:
        p.grad.data.zero_()
{% endhighlight %}

We do similar things to implement the "forward-loss-backward-update" for \\( G(z) \\):

{% highlight python %}
    # Housekeeping - reset gradient
    reset_grad()

    # Generator forward-loss-backward-update
    z = Variable(torch.randn(mb_size, Z_dim))
    G_sample = G(z)
    D_fake = D(G_sample)

    G_loss = nn.binary_cross_entropy(D_fake, ones_label)

    G_loss.backward()
    G_solver.step()

    # Housekeeping - reset gradient
    reset_grad()
{% endhighlight %}

And that is it, really.

But we might ask, why do all of those things matter? Why not to just use TensorFlow or Theano? The answer is when we want to inspect or debug inside the computation graph, thing could be hairy in symbolic computation. Think of it like this: we are given a compiled program and what we can do is to run it. How do we debug a specific suboperation inside that program? Granted in TensorFlow we could inspect any variable by returning it once the computation is done, but still, we could only inspect it at the end of the computation not before.

In contrast, in imperative computation, we could just use `print()` function basically anywhere and anytime we want and immediately it will display the value. Doing other "non-trivial" operations like loop and conditional are also become much more easier in Pytorch, just like the good old Python. Hence, one could argue that this way of programming is more "natural".

The full code is available in my Github repo: <https://github.com/wiseodd/generative-models>.
