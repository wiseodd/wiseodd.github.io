---
layout:     post
title:      "Variational Autoencoder (VAE) in Pytorch"
subtitle:   "With all of those bells and whistles surrounding Pytorch, let's implement Variational Autoencoder (VAE) using it."
date:       2017-01-24 12:26
author:     "wiseodd"
header-img: "img/code.png"
category:   techblog
tags:       [machine learning, vae, pytorch]
---

This post should be quick as it is just a port of the previous Keras code. For the intuition and derivative of Variational Autoencoder (VAE) plus the Keras implementation, check [this post]({% post_url 2016-09-17-gan-tensorflow %}). The full code is available in my Github repo: <https://github.com/wiseodd/generative-models>.


<h2 class="section-heading">The networks</h2>

Let's begin with importing stuffs.

``` python
import torch
import torch.nn.functional as nn
import torch.autograd as autograd
import torch.optim as optim
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec
import os
from torch.autograd import Variable
from tensorflow.examples.tutorials.mnist import input_data


mnist = input_data.read_data_sets('../MNIST_data', one_hot=True)
mb_size = 64
Z_dim = 100
X_dim = mnist.train.images.shape[1]
y_dim = mnist.train.labels.shape[1]
h_dim = 128
c = 0
lr = 1e-3
```

Now, recall in VAE, there are two networks: encoder \\( Q(z \vert X) \\) and decoder \\( P(X \vert z) \\). So, let's build our \\( Q(z \vert X) \\) first:

``` python
def xavier_init(size):
    in_dim = size[0]
    xavier_stddev = 1. / np.sqrt(in_dim / 2.)
    return Variable(torch.randn(*size) * xavier_stddev, requires_grad=True)


Wxh = xavier_init(size=[X_dim, h_dim])
bxh = Variable(torch.zeros(h_dim), requires_grad=True)

Whz_mu = xavier_init(size=[h_dim, Z_dim])
bhz_mu = Variable(torch.zeros(Z_dim), requires_grad=True)

Whz_var = xavier_init(size=[h_dim, Z_dim])
bhz_var = Variable(torch.zeros(Z_dim), requires_grad=True)


def Q(X):
    h = nn.relu(X @ Wxh + bxh.repeat(X.size(0), 1))
    z_mu = h @ Whz_mu + bhz_mu.repeat(h.size(0), 1)
    z_var = h @ Whz_var + bhz_var.repeat(h.size(0), 1)
    return z_mu, z_var
```

Our \\( Q(z \vert X) \\) is a two layers net, outputting the \\( \mu \\) and \\( \Sigma \\), the parameter of encoded distribution. So, let's create a function to sample from it:

``` python
def sample_z(mu, log_var):
    # Using reparameterization trick to sample from a gaussian
    eps = Variable(torch.randn(mb_size, Z_dim))
    return mu + torch.exp(log_var / 2) * eps
```

Let's construct the decoder \\( P(z \vert X) \\), which is also a two layers net:

``` python
Wzh = xavier_init(size=[Z_dim, h_dim])
bzh = Variable(torch.zeros(h_dim), requires_grad=True)

Whx = xavier_init(size=[h_dim, X_dim])
bhx = Variable(torch.zeros(X_dim), requires_grad=True)


def P(z):
    h = nn.relu(z @ Wzh + bzh.repeat(z.size(0), 1))
    X = nn.sigmoid(h @ Whx + bhx.repeat(h.size(0), 1))
    return X
```

Note, the use of `b.repeat(X.size(0), 1)` is because this [Pytorch issue](https://github.com/pytorch/pytorch/issues/491).

<h2 class="section-heading">Training</h2>

Now, the interesting stuff: training the VAE model. First, as always, at each training step we do forward, loss, backward, and update.

``` python
params = [Wxh, bxh, Whz_mu, bhz_mu, Whz_var, bhz_var,
          Wzh, bzh, Whx, bhx]

solver = optim.Adam(params, lr=lr)

for it in range(100000):
    X, _ = mnist.train.next_batch(mb_size)
    X = Variable(torch.from_numpy(X))

    # Forward
    # ...

    # Loss
    # ...

    # Backward
    # ...

    # Update
    # ...

    # Housekeeping
    for p in params:
        p.grad.data.zero_()
```

Now, the forward step:

``` python
    z_mu, z_var = Q(X)
    z = sample_z(z_mu, z_var)
    X_sample = P(z)
```

That is it. We just call the functions we defined before. Let's continue with the loss, which consists of two parts: reconstruction loss and KL-divergence of the encoded distribution:

``` python
    recon_loss = nn.binary_cross_entropy(X_sample, X, size_average=False)
    kl_loss = 0.5 * torch.sum(torch.exp(z_var) + z_mu**2 - 1. - z_var)
    loss = recon_loss + kl_loss
```

Backward and update step is as easy as calling a function, as we use Autograd feature from Pytorch:

``` python
    # Backward
    loss.backward()

    # Update
    solver.step()
```

After that, we could inspect the loss, or maybe visualizing \\( P(X \vert z) \\) to check the progression of the training every now and then.

The full code could be found here: <https://github.com/wiseodd/generative-models>.