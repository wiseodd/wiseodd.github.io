---
layout:     post
title:      "Introduction to Annealed Importance Sampling"
subtitle:   "An introduction and implementation of Annealed Importance Sampling (AIS)."
date:       2017-12-23 07:00
author:     "wiseodd"
header-img: "img/bayes.png"
category:   techblog
tags:       [machine learning, bayesian]
---

Suppose we have this distribution:

$$ p(x) = \frac{1}{Z} f(x) $$

where \\( Z = \sum_x f(x) \\). In high dimension, this summation is intractable as there would be exponential number of terms. We are hopeless on computing \\( Z \\) and in turn we can't evaluate this distribution.

Now, how do we compute an expectation w.r.t. to \\( p(x) \\), i.e.:

$$ \mathbb{E}_{p(x)}[x] = \sum_x x p(x) $$

It is impossible for us to do this as we don't know \\( p(x) \\). Our best hope is to approximate that. One of the popular way is to use importance sampling. However, importance sampling has a hyperparameter that is hard to adjust, i.e. the proposal distribution \\( q(x) \\). Importance sampling works well if we can provide \\( q(x) \\) that is a good approximation of \\( p(x) \\). It is problematic to find a good \\( q(x) \\), and this is one of the motivations behind Annealed Importance Sampling (AIS) [1].

<h2 class="section-heading">Annealed Importance Sampling</h2>

The construction of AIS is as follows:

1. Let \\( p_0(x) = p(x) \propto f_0(x) \\) be our target distribution.
2. Let \\( p_n(x) = q(x) \propto f_n(x) \\) be our proposal distribution which only requirement is that we can sample independent point from it. It doesn't have to be close to \\( p_0(x) \\) thus the requirement is more relaxed than importance sampling.
3. Define a sequence of intermediate distributions starting from \\( p_n(x) \\) to \\( p_0(x) \\) call it \\( p_j(x) \propto f_j(x) \\). The requirement is that \\( p_j(x) \neq 0 \\) whenever \\( p_{j-1}(x) \neq 0 \\). That is, \\( p_j(x) \\) has to cover the support of \\( p_{j-1}(x) \\) so that we can take the ratio.
4. Define local transition probabilities \\( T_j(x, x') \\).

Then to sample from \\( p_0(x) \\), we need to:

* Sample an independent point from \\( x_{n-1} \sim p_n(x) \\).
* Sample \\( x_{n-2} \\) from \\( x_{n-1} \\) by doing MCMC w.r.t. \\( T_{n-1} \\).
* \\( \dots \\)
* Sample \\( x_1 \\) from \\( x_2 \\) by doing MCMC w.r.t. \\( T_2 \\).
* Sample \\( x_0 \\) from \\( x_1 \\) by doing MCMC w.r.t. \\( T_1 \\).

Intuitively given two distributions, which might be disjoint in their support, we create intermediate distributions that are "bridging" from one to another. Then we do MCMC to move around these distributions and hope that we end up in our target distribution.

At this point, we have sequence of points \\( x_{n-1}, x_{n-2}, \dots, x_1, x_0 \\). We can use them to compute the importance weight as follows:

$$ w = \frac{f_{n-1}(x_{n-1})}{f_n(x_{n-1})} \frac{f_{n-2}(x_{n-2})}{f_{n-1}(x_{n-2})} \dots \frac{f_1(x_1)}{f_2(x_1)} \frac{f_0(x_0)}{f_1(x_0)} $$

Notice that \\( w \\) is telescoping, and without the intermediate distributions, it reduces to the usual weight used in importance sampling.

With this importance weight, then we can compute the expectation as in importance sampling:

$$ \mathbb{E}_{p(x)}[x] = \frac{1}{\sum_i^N w_i} \sum_i^N x_i w_i $$

where \\( N \\) is the number of samples.

<h2 class="section-heading">Practicalities</h2>

We now have the full algorithm. However several things are missing, namely, the choice of \\( f_j(x) \\) and \\( T_j(x, x') \\).

For the intermediate distributions, we can set it as an annealing between to our target and proposal functions, i.e:

$$ f_j(x) = f_0(x)^{\beta_j} f_n(x)^{1-\beta_j} $$

where \\( 1 = \beta_0 > \beta_1 > \dots > \beta_n = 0 \\). For visual example, annealing between \\( N(0, I) \\) to \\( N(5, I) \\) with 10 intermediate distributions gives us:

![Annealing]({{ site.baseurl }}/img/2017-12-23-annealed-importance-sampling/intermediate_dists.png)


For the transition functions, we can use Metropolis-Hastings with acceptance probability:

$$ A_j(x, x') = \frac{f_j(x')}{f_j(x)} $$

assuming we have symmetric proposal, e.g. \\( N(0, I) \\).


<h2 class="section-heading">Implementation</h2>

To make it more concrete, we can look at the simple implementation of AIS. We first define our target function:

``` python
import numpy as np
import scipy.stats as st
import matplotlib.pyplot as plt


def f_0(x):
    """
    Target distribution: \propto N(-5, 2)
    """
    return np.exp(-(x+5)**2/2/2)
```

Next we define our proposal function and distribution, as we assume we can easily sample independent points from it:

``` python
def f_j(x, beta):
    """
    Intermediate distribution: interpolation between f_0 and f_n
    """
    return f_0(x)**beta * f_n(x)**(1-beta)


# Proposal distribution: 1/Z * f_n
p_n = st.norm(0, 1)
```

Lastly, we define our transition function:

``` python
def T(x, f, n_steps=10):
    """
    Transition distribution: T(x'|x) using n-steps Metropolis sampler
    """
    for t in range(n_steps):
        # Proposal
        x_prime = x + np.random.randn()

        # Acceptance prob
        a = f(x_prime) / f(x)

        if np.random.rand() < a:
            x = x_prime

    return x
```

Then, we are ready to do the sampling:

``` python
x = np.arange(-10, 5, 0.1)

n_inter = 50  # num of intermediate dists
betas = np.linspace(0, 1, n_inter)

# Sampling
n_samples = 100
samples = np.zeros(n_samples)
weights = np.zeros(n_samples)

for t in range(n_samples):
    # Sample initial point from q(x)
    x = p_n.rvs()
    w = 1

    for n in range(1, len(betas)):
        # Transition
        x = T(x, lambda x: f_j(x, betas[n]), n_steps=5)

        # Compute weight in log space (log-sum):
        # w *= f_{n-1}(x_{n-1}) / f_n(x_{n-1})
        w += np.log(f_j(x, betas[n])) - np.log(f_j(x, betas[n-1]))

    samples[t] = x
    weights[t] = np.exp(w)  # Transform back using exp
```

Notice, in the code above we do log-sum-exp trick to avoid underflow when computing \\( w \\).

After the iteration finished, we have with ourselves our samples and their corresponding weights, from which we can compute the expectation as in importance sampling:

``` python
# Compute expectation
a = 1/np.sum(weights) * np.sum(weights * samples)
```

In this example, the result should be very close to the mean of our target Gaussian i.e. \\( -5 \\).


<h2 class="section-heading">Discussion</h2>

AIS is a very interesting and useful way to do importance sampling without having to sweat about the choice of proposal \\( q(x) \\). However, No Free Lunch theorem also applies to AIS: we still need to tune the hyperparameters such as the number of intermediate distributions and the number of MCMC step at each transition. This could potentially very expensive. Moreover, as in other sampling algorithms, it is inherently sequential and can't exploit fully the availability of GPU.

Nevertheless, AIS is powerful and has been used even nowadays. It is a popular choice of algorithms for approximating partition function in RBM [2]. Moreover it has been used for Deep Generative Models (GAN, VAE) [3].

<h2 class="section-heading">References</h2>

1. Neal, Radford M. "Annealed importance sampling." Statistics and computing 11.2 (2001): 125-139.
2. Salakhutdinov, Ruslan. "Learning and evaluating Boltzmann machines." Tech. Rep., Technical Report UTML TR 2008-002, Department of Computer Science, University of Toronto (2008).
APA
3. Wu, Yuhuai, et al. "On the quantitative analysis of decoder-based generative models." arXiv preprint arXiv:1611.04273 (2016).