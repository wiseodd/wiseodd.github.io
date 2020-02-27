---
layout:     post
title:      "Metropolis-Hastings"
subtitle:   "An implementation example of Metropolis-Hastings algorithm in Python."
date:       2015-10-17 01:14:00
author:     "wiseodd"
header-img: "img/bayes.png"
category:   techblog
tags:       [machine learning, programming, python]
---

Metropolis-Hastings algorithm is another sampling algorithm to sample from high dimensional, difficult to sample directly (due to intractable integrals) distributions or functions.

It's an MCMC algorithm, just like Gibbs Sampling. It's MC (Markov Chain) because to get the next sample, one only need to consider the current sample. It's MC (Monte Carlo) because it generates random sample which we could use to compute integrals or numerical results, for example in the probability distribution setting, the integrals we may want to compute are the expected value, mode, median, etc.

The core of the algorithm lies in the distribution `Q(x -> x')`, which is used to suggest the next candidate of the Markov Chain given the current state/sample, and the acceptance probability alpha which is used to decide whether we accept the new sample, or stay with the current sample.

The acceptance probability alpha is found by this equation:


```
alpha = min(1, P(x')/P(x) * Q(x' -> x)/Q(x -> x'))
```


Where `P(x)` is the target distribution, namely the distribution we want to sample from.

When transition distribution `Q(x -> x')` is symmetric, `Q(x -> x') = Q(x' -> x)`, then the ratio will become 1, and the alpha will be just:


```
alpha = min(1, P(x')/P(x))
```


In this case, the Metropolis-Hastings would become just Metropolis. So, Metropolis algorithm is the special case of Metropolis-Hastings algorithm where the transition distribution is symmetric. Take Gaussian for example.

Let's devour the code.


{% highlight python %}
import numpy as np
import scipy.stats as st
import seaborn as sns


mus = np.array([5, 5])
sigmas = np.array([[1, .9], [.9, 1]])


def circle(x, y):
    return (x-1)**2 + (y-2)**2 - 3**2


def pgauss(x, y):
    return st.multivariate_normal.pdf([x, y], mean=mus, cov=sigmas)


def metropolis_hastings(p, iter=1000):
    x, y = 0., 0.
    samples = np.zeros((iter, 2))

    for i in range(iter):
        x_star, y_star = np.array([x, y]) + np.random.normal(size=2)
        if np.random.rand() < p(x_star, y_star) / p(x, y):
            x, y = x_star, y_star
        samples[i] = np.array([x, y])

    return samples


if __name__ == '__main__':
    samples = metropolis_hastings(circle, iter=10000)
    sns.jointplot(samples[:, 0], samples[:, 1])

    samples = metropolis_hastings(pgauss, iter=10000)
    sns.jointplot(samples[:, 0], samples[:, 1])
{% endhighlight %}


In the code, I ignore the min(1, x) term for the alpha calculation, and just calculate `P(x') / P(x),` because we only care about whether or not the ratio is bigger than some uniform random number `[0, 1]`, so when `P(x') / P(x) > 1`, it will then always satisfy the test just as `P(x') / P(x) = 1`, calculated from the `min(1, x)` term.

The first function I'm sampling for is a circle centered in `(1, 2)` with radius of `3`. Let's see the result.

![MH]({{ site.baseurl }}/img/2015-10-17-metropolis-hastings/00.png)

It indeed looks like a circle, doesn't it?

For the second run of Metropolis-Hastings, I'm trying to sample from a Bivariate Normal distribution, exactly the same one I sampled in my Gibbs Sampling post.

![MH]({{ site.baseurl }}/img/2015-10-17-metropolis-hastings/01.png)

The tail of the distribution looks off because the starting point of the Markov Chain I've chosen is `(0, 0)`. It should be discarded if we use burn-in (discard a first few samples) in our Metropolis-Hastings. Other than that, it yielded the same distribution shape as Gibbs Sampling. This is because Gibbs Sampling is derived from Metropolis-Hastings, with special case, i.e. the acceptance probability of Gibbs Sampling is 1, so it will always accept the sample drawn from the conditional distributions.

I'm curious about the performance of Metropolis-Hastings compared to Gibbs Sampling. So I profiled the two algorithms.


{% highlight shell %}
> python -m cProfile gibbs_sampling.py | grep gibbs_sampling
ncalls  tottime  percall  cumtime  percall
10000    0.059    0.000    0.062    0.000 gibbs_sampling.py:5(p_x_given_y)
10000    0.057    0.000    0.059    0.000 gibbs_sampling.py:11(p_y_given_x)
    1    0.022    0.022    0.143    0.143 gibbs_sampling.py:17(gibbs_sampling)

> python -m cProfile metropolis_hastings.py | grep metropolis_hastings
ncalls  tottime  percall  cumtime  percall
20000    0.100    0.000    3.449    0.000 metropolis_hastings.py:10(pgauss)
    1    0.121    0.121    3.658    3.658 metropolis_hastings.py:16(metropolis_hasting)
{% endhighlight %}

As we can see, Gibbs Sampling is really fast as it only need around 0.14 seconds, compared to Metropolis-Hastings 3.6 seconds. Sampling from conditional distribution is really fast, whereas sampling from full joint distribution is slow, as we can observe there when comparing call time of `p_x_given_y`, `p_y_given_x` and `pgauss`.

However, the main advantage of Metropolis-Hastings over Gibbs Sampling is that we don't have to derive the conditional distributions analytically. We just need to know the joint distribution, and no need to derive anything analytically.

