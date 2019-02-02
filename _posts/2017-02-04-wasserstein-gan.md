---
layout:     post
title:      "Wasserstein GAN implementation in TensorFlow and Pytorch"
subtitle:   "Wasserstein GAN comes with promise to stabilize GAN training and abolish mode collapse problem in GAN."
date:       2017-02-04 03:10
author:     "wiseodd"
header-img: "img/code.png"
category:   techblog
tags:       [machine learning, gan]
---

GAN is very popular research topic in Machine Learning right now. There are two types of GAN researches, one that applies GAN in interesting problems and one that attempts to stabilize the training.

Indeed, stabilizing GAN training is a very big deal in the field. The original GAN suffers from several difficulties, e.g. mode collapse, where generator collapse into very narrow distribution that only covers a single mode in data distribution. The implication of mode collapse is that generator can only generate very similar samples (e.g. a single digit in MNIST), i.e. the samples generated are not diverse. This problem of course violates the spirit of GAN.

Another problem in GAN is that there is no metric that tells us about the convergence. The generator and discriminator loss do not tell us anything about this. Of course we could monitor the training progress by looking at the data generated from generator every now and then. However, it is a strictly manual process. So, it would be great to have an interpretable metric that tells us about the training progress.

Note, code could be found here: <https://github.com/wiseodd/generative-models>

<h2 class="section-heading">Wasserstein GAN</h2>

Wasserstein GAN (WGAN) is a newly proposed GAN algorithm that promises to remedy those two problems above.

For the intuition and theoritical background behind WGAN, redirect to [this excellent summary](https://paper.dropbox.com/doc/Wasserstein-GAN-GvU0p2V9ThzdwY3BbhoP7) (credits to the author).

The overall algorithm is shown below:

![WGAN]({{ site.baseurl }}/img/2017-02-04-wasserstein-gan/00.png)

We could see that the algorithm is quite similar to the original GAN. However, to implement WGAN, we should notice few things from the above:

1. No \\( \log \\) in the loss. The output of \\( D \\) is no longer a probability, hence we do not apply sigmoid at the output of \\( D \\)
2. Clip the weight of \\( D \\)
3. Train \\( D \\) more than \\( G \\)
4. Use RMSProp instead of ADAM
5. Lower learning rate, the paper uses \\( \alpha = 0.00005 \\)

<h2 class="section-heading">WGAN TensorFlow implementation</h2>

The base implementation of GAN could be found in [the past post]({% post_url 2016-09-17-gan-tensorflow %}). We need only to modify traditional GAN with respect to those items above. So first, let's update our \\( D \\):

``` python
""" Vanilla GAN """
def discriminator(x):
    D_h1 = tf.nn.relu(tf.matmul(x, D_W1) + D_b1)
    out = tf.matmul(D_h1, D_W2) + D_b2
    return tf.nn.sigmoid(out)

""" WGAN """
def discriminator(x):
    D_h1 = tf.nn.relu(tf.matmul(x, D_W1) + D_b1)
    out = tf.matmul(D_h1, D_W2) + D_b2
    return out
```

Next, we modify our loss by simply removing the \\( \log \\):

``` python
""" Vanilla GAN """
D_loss = -tf.reduce_mean(tf.log(D_real) + tf.log(1. - D_fake))
G_loss = -tf.reduce_mean(tf.log(D_fake))

""" WGAN """
D_loss = tf.reduce_mean(D_real) - tf.reduce_mean(D_fake)
G_loss = -tf.reduce_mean(D_fake)
```

We then clip the weight of \\( D \\) after each gradient descent update:

``` python
# theta_D is list of D's params
clip_D = [p.assign(tf.clip_by_value(p, -0.01, 0.01)) for p in theta_D]
```

Lastly, we train \\( D \\) more:

``` python
D_solver = (tf.train.RMSPropOptimizer(learning_rate=5e-5)
            .minimize(-D_loss, var_list=theta_D))
G_solver = (tf.train.RMSPropOptimizer(learning_rate=5e-5)
            .minimize(G_loss, var_list=theta_G))

for it in range(1000000):
    for _ in range(5):
        X_mb, _ = mnist.train.next_batch(mb_size)

        _, D_loss_curr, _ = sess.run(
            [D_solver, D_loss, clip_D],
            feed_dict={X: X_mb, z: sample_z(mb_size, z_dim)}
        )

    _, G_loss_curr = sess.run(
        [G_solver, G_loss],
        feed_dict={z: sample_z(mb_size, z_dim)}
    )
```

And that is it.

<h2 class="section-heading">WGAN Pytorch implementation</h2>

The base implementation of original GAN could be found in [the past post]({% post_url 2017-01-20-gan-pytorch %}). Similar to the TensorFlow version, the modifications are quite straight forward. Note the codes below are inside each training iteration.

First, update \\( D \\):

``` python
""" Vanilla GAN """
D = torch.nn.Sequential(
    torch.nn.Linear(X_dim, h_dim),
    torch.nn.ReLU(),
    torch.nn.Linear(h_dim, 1),
    torch.nn.Sigmoid()
)

""" WGAN """
D = torch.nn.Sequential(
    torch.nn.Linear(X_dim, h_dim),
    torch.nn.ReLU(),
    torch.nn.Linear(h_dim, 1),
)
```

Modifying loss:

``` python
""" Vanilla GAN """
# During discriminator forward-backward-update
D_loss = torch.mean(torch.log(D_real) - torch.log(1- D_fake))
# During generator forward-backward-update
G_loss = -torch.mean(torch.log(D_fake))

""" WGAN """
# During discriminator forward-backward-update
D_loss = -(torch.mean(D_real) - torch.mean(D_fake))
# During generator forward-backward-update
G_loss = -torch.mean(D_fake)
```

Weight clipping:

``` python
D_loss.backward()
D_solver.step()

for p in D.parameters():
    p.data.clamp_(-0.01, 0.01)
```

Train \\( D \\) more:

``` python
G_solver = optim.RMSprop(G.parameters(), lr=5e-5)
D_solver = optim.RMSprop(D.parameters(), lr=5e-5)

for it in range(1000000):
    for _ in range(5):
        """ Dicriminator forward-loss-backward-update """

    """ Generator forward-loss-backward-update """
```

<h2 class="section-heading">References</h2>

1. <https://arxiv.org/abs/1701.07875>
2. <https://paper.dropbox.com/doc/Wasserstein-GAN-GvU0p2V9ThzdwY3BbhoP7>
