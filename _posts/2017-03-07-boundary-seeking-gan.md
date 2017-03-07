---
layout:     post
title:      "Boundary Seeking GAN"
subtitle:   "Training GAN by moving the generated samples to the decision boundary."
date:       2017-03-07 00:10
author:     "wiseodd"
header-img: "img/code.png"
category:   techblog
tags:       [machine learning, gan]
---

Boundary Seeking GAN (BGAN) is a recently introduced modification of GAN training. Here, in this post, we will look at the intuition behind BGAN, and also the implementation, which consists of one line change from vanilla GAN.

<h2 class="section-heading">Intuition of Boundary Seeking GAN</h2>

Recall, in GAN the following objective is optimized:

![GAN Value Function]({{ site.baseurl }}/img/2016-09-17-gan-tensorflow/obj.png)

Following the objective above, as shown in the original GAN paper [1], the optimal discriminator \\( D^*_G(x) \\) is given by:

$$
D^*_G(x) = \frac{p_{data}(x)}{p_{data}(x) + p_g(x)}
$$

Hence, if we know the optimal discriminator with respect to our generator, \\( D^*_G(x) \\), we are good to go, as we have this following amount by rearranging the above equation:

$$
p_{data}(x) = p_g(x) \frac{D^*_G(x)}{1 - D^*_G(x)}
$$

What does it tell us is that, even if we have non-optimal generator \\( G \\), we could still find the true data distribution by weighting \\( p_g(x) \\), the generator's distribution, with the ratio of optimal discriminator for that generator.

Unfortunately, perfect discriminator is hard to get. But we can work with its approximation \\( D(x) \\) instead. The assumption is that if we train \\( D(x) \\) more and more, it becomes closer and closer to \\( D^*_G(x) \\), and our GAN training becomes better and better.

If we think further at the above equation, we would get \\( p_{data}(x) = p_g(x) \\), i.e. our generator is optimal, if the ratio of the discriminator is equal to one. If that ratio is equal to one, then consequently \\( D(x) \\) must be equal to \\( 0.5 \\). Therefore, the optimal generator is the one that can make make the discriminator to be \\( 0.5 \\) everywhere. Notice that \\( D(x) = 0.5 \\) is the decision boundary. Hence, we want to generate \\( x \sim G(z) \\) such that \\( D(x) \\) is near the decision boundary. Therefore, the authors of the paper named this method _Boundary Seeking GAN_ (BGAN).

That statement has a very intuitive explanation. If we consider the generator to be perfect, \\( D(x) \\) can't distinguish the real and the fake data. In other words, real and fake data are equally likely, as far as \\( D(x) \\) concerned. As \\( D(x) \\) has two outputs (real or fake), then, those outputs has the probability of \\( 0.5 \\) each.

Now, we could modify the generator's objective in order to make the discriminator outputting \\( 0.5 \\) for every data we generated. One way to do it is to minimize the distance between \\( D(x) \\) and \\( 1 - D(x) \\) for all \\( x \\). If we do so, as \\( D(x) \\) is a probability measure, we will get the minimum at \\( D(x) = 1 - D(x) = 0.5 \\), which is what we want.

Therefore, the new objective for the generator is:

$$
\min_{G} \, \mathbb{E}_{z \sim p_z(z)} \left[ \frac{1}{2} (\log D(x) - \log(1 - D(x)))^2 \right]
$$

which is just an \\( L_2 \\) loss. We added \\( \log \\) as \\( D(x) \\) is a probability measure, and we want to undo that, as we are talking about distance, not divergence.


<h2 class="section-heading">Implementation</h2>

This should be the shortest ever implementation note in my blog.

We just need to change the original GAN's \\( G \\) objective from:

``` python
G_loss = -torch.mean(log(D_fake))
```

to:

``` python
G_loss = 0.5 * torch.mean((log(D_fake) - log(1 - D_fake))**2)
```

And we're done. For full code, check out <https://github.com/wiseodd/generative-models>.


<h2 class="section-heading">Conclusion</h2>

In this post we looked at a new GAN variation called Boundary Seeking GAN (BGAN). We looked at the intuition of BGAN, and tried to understand why it's called "boundary seeking".

We also implemented BGAN in Pytorch with just one line of code change.


<h2 class="section-heading">References</h2>

1. Hjelm, R. Devon, et al. "Boundary-Seeking Generative Adversarial Networks." arXiv preprint arXiv:1702.08431 (2017). [arxiv](https://arxiv.org/abs/1702.08431)
2. Goodfellow, Ian, et al. "Generative adversarial nets." Advances in Neural Information Processing Systems. 2014. [arxiv](http://papers.nips.cc/paper/5423-generative-adversarial-nets.pdf)
