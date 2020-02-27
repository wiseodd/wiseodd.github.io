---
layout:     post
title:      "Gibbs Sampling"
subtitle:   "Example of Gibbs Sampling implementation in Python to sample from a Bivariate Gaussian."
date:       2015-10-09 17:01:00
author:     "wiseodd"
header-img: "img/bayes.png"
category:   techblog
tags:       [machine learning, programming, python]
---

After so many months struggling with Gibbs Sampling, now I conquered it! Well, kind of.

This week's been a renaissance on MCMC. I decided to open up again those Machine Learning Summer School (MLSS) Cambridge 2009, and absent mindedly opened that lecture about MCMC by Iain Murray. Oh boy, did I hit the jackpot? That lecture was really great. Here, help yourself, watch the lecture <http://videolectures.net/mlss09uk_murray_mcmc/>.

So, full of confidence and revelation after watching that lecture, I decided to implement the Gibbs Sampler. Now, I won't dive deep on what is Gibbs Sampling and what not, but if you want to know deeper about it, I suggest you to read this tutorial: Gibbs Sampling for the Uninitiated.

Gibbs Sampling is a MCMC method to draw samples from a potentially really really complicated, high dimensional distribution, where analytically, it's hard to draw samples from it. The usual suspect would be those nasty integrals when computing the normalizing constant of the distribution, especially in Bayesian inference. Now Gibbs Sampler can draw samples from any distribution, provided you can provide all of the conditional distributions of the joint distribution analitically.

In this example I will use Gibb Sampler to draw sampler from a Bivariate Gaussian with mu of `[5, 5]` and sigma/covariance matrix of `[[1, 0.9], [0.9, 1]]`. The exact distribution should look like this:

![Gibbs]({{ site.baseurl }}/img/2015-10-09-gibbs-sampling/00.png)

Now, pretend that this distribution is really complicated and very hard to sample (I know, I know, but please bear with me). We don't know how to sample from this directly, and we don't even know the shape of the distribution. However, because of some mathematical convenience, or maybe by just sheer luck, we know the conditional distributions: `P(X|Y)` and `P(Y|X)`. By now, it screams "Gibbs Sampling!".

The derivation of conditional distribution of Multivariate Gaussian could be found here: <http://fourier.eng.hmc.edu/e161/lectures/gaussianprocess/node7.html>.

Let's inspect the Gibbs Sampler code, shall we.


{% highlight python %}
import numpy as np
import seaborn as sns


def p_x_given_y(y, mus, sigmas):
    mu = mus[0] + sigmas[1, 0] / sigmas[0, 0] * (y - mus[1])
    sigma = sigmas[0, 0] - sigmas[1, 0] / sigmas[1, 1] * sigmas[1, 0]
    return np.random.normal(mu, sigma)


def p_y_given_x(x, mus, sigmas):
    mu = mus[1] + sigmas[0, 1] / sigmas[1, 1] * (x - mus[0])
    sigma = sigmas[1, 1] - sigmas[0, 1] / sigmas[0, 0] * sigmas[0, 1]
    return np.random.normal(mu, sigma)


def gibbs_sampling(mus, sigmas, iter=10000):
    samples = np.zeros((iter, 2))
    y = np.random.rand() * 10

    for i in range(iter):
        x = p_x_given_y(y, mus, sigmas)
        y = p_y_given_x(x, mus, sigmas)
        samples[i, :] = [x, y]

    return samples


if __name__ == '__main__':
    mus = np.array([5, 5])
    sigmas = np.array([[1, .9], [.9, 1]])

    samples = gibbs_sampling(mus, sigmas)
    sns.jointplot(samples[:, 0], samples[:, 1])
{% endhighlight %}

Really really really simple. The main algorithm is just what, 10 line of codes? Including whitespaces.

The potentially complicated thing would be to derive the conditional distribution. For popular distributions, you can find those derivations easily on Google. There, in `p_x_given_y` and `p_y_given_x`, the conditional distribution of a Bivariate Normal is Univariate Gaussian, with mean depends on the conditional.

After get a hold on those conditional distributions, the rest is easy. Just plug those conditionals in to the sampler, which iteratively sample from all conditional distributions. At each iteration, Gibbs Sampler will sample from each conditional distribution in turn, and use the new value to sample the other conditional distributions.

After a lot of iteration, it will then converge to approximately the exact distribution we're sampling. From there, you could just take the integral (mean, median, etc), or, if you're like me who like pretty things, visualize the samples.

Here's the result of that Gibbs Sampler:

![Gibbs]({{ site.baseurl }}/img/2015-10-09-gibbs-sampling/01.png)

Pretty good, huh?

Gibbs Sampling is one hell of algorithm. It's so simple, yet took me a long time to get the intuition. It's an integral algorithm in Bayesian Inference landscape. One of the popular implementation of Gibbs Sampling would be in Mallet, where David Mimno uses Gibbs Sampler to do inference for LDA. I haven't studied Variational Bayes method, but based on my observation, LDA result using Gibbs Sampling is a lot better than the one using Variational method. I observe this in the case of Mallet vs Gensim implementation of LDA.

For closing note, I really really really suggest you to watch this lecture <http://videolectures.net/mlss09uk_murray_mcmc/>. What an excellent lecture, that is.
