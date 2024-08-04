---
title: "Maximizing likelihood is equivalent to minimizing KL-Divergence"
description: "We will show that doing MLE is equivalent to minimizing the KL-Divergence between the estimator and the true distribution."
publishDate: 2017-01-26 03:53
tags: [machine learning, probability]
---

When reading Kevin Murphy's book, I came across this statement: _"... maxmizing likelihood is equivalent to minimizing_ \\( D*{KL}[P(. \vert \theta^{\ast}) \, \Vert \, P(. \vert \theta)] \\)*, where \\( P(. \vert \theta^{\ast}) \\) is the true distribution and \\( P(. \vert \theta) \\) is our estimate ..."\_. So here is an attempt to prove that.

$$
\begin{align}

D_{KL}[P(x \vert \theta^*) \, \Vert \, P(x \vert \theta)] &= \mathbb{E}_{x \sim P(x \vert \theta^*)}\left[\log \frac{P(x \vert \theta^*)}{P(x \vert \theta)} \right] \\[10pt]
        &= \mathbb{E}_{x \sim P(x \vert \theta^*)}\left[\log \, P(x \vert \theta^*) - \log \, P(x \vert \theta) \right] \\[10pt]
        &= \mathbb{E}_{x \sim P(x \vert \theta^*)}\left[\log \, P(x \vert \theta^*) \right] - \mathbb{E}_{x \sim P(x \vert \theta^*)}\left[\log \, P(x \vert \theta) \right] \\[10pt]

\end{align}
$$

If it looks familiar, the left term is the entropy of \\( P(x \vert \theta^\*) \\). However it does not depend on the estimated parameter \\( \theta \\), so we will ignore that.

Suppose we sample \\( N \\) of these \\( x \sim P(x \vert \theta^\*) \\). Then, the [Law of Large Number](https://en.wikipedia.org/wiki/Law_of_large_numbers) says that as \\( N \\) goes to infinity:

$$

-\frac{1}{N} \sum_i^N \log \, P(x_i \vert \theta) = -\mathbb{E}_{x \sim P(x \vert \theta^*)}\left[\log \, P(x \vert \theta) \right]


$$

which is the right term of the above KL-Divergence. Notice that:

$$
\begin{align}

-\frac{1}{N} \sum_i^N \log \, P(x_i \vert \theta) &= \frac{1}{N} \, \text{NLL} \\[10pt]
                                                  &= c \, \text{NLL} \\[10pt]

\end{align}
$$

where NLL is the negative log-likelihood and \\( c \\) is a constant.

Then, if we minimize \\( D\_{KL}[P(x \vert \theta^*) \, \Vert \, P(x \vert \theta)] \\), it is equivalent to minimizing the NLL. In other words, it is equivalent to maximizing the log-likelihood.

Why does this matter, though? Because this gives MLE a nice interpretation: maximizing the likelihood of data under our estimate is equal to minimizing the difference between our estimate and the real data distribution. We can see MLE as a proxy for fitting our estimate to the real distribution, which cannot be done directly as the real distribution is unknown to us.
