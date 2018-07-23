---
layout:     post
title:      "Fisher Information Matrix"
subtitle:   "An introduction and intuition of Fisher Information Matrix."
date:       2018-03-11 07:00
author:     "wiseodd"
header-img: "img/bayes.png"
category:   techblog
tags:       [machine learning]
---

Suppose we have a model parameterized by parameter vector \\( \theta \\) that models a distribution \\( p(x \vert \theta) \\). In frequentist statistics, the way we learn \\( \theta \\) is to maximize the likelihood \\( p(x \vert \theta) \\) wrt. parameter \\( \theta \\). To assess the goodness of our estimate of \\( \theta \\) we define a score function:

$$
s(\theta) = \nabla_{\theta} \log p(x \vert \theta) \, ,
$$

that is, score function is the gradient of log likelihood function. The result about score function below is important building block on our discussion.

**Claim:**
The expected value of score wrt. our model is zero.

_Proof._ &nbsp;&nbsp; Below, the gradient is wrt. \\( \theta \\).

$$
\begin{align}
    \mathop{\mathbb{E}}_{p(x \vert \theta)} \left[ s(\theta) \right] &= \mathop{\mathbb{E}}_{p(x \vert \theta)} \left[ \nabla \log p(x \vert \theta) \right] \\[5pt]
    &= \int \nabla \log p(x \vert \theta) \, p(x \vert \theta) \, \text{d}x \\[5pt]
    &= \int \frac{\nabla p(x \vert \theta)}{p(x \vert \theta)} p(x \vert \theta) \, \text{d}x \\[5pt]
    &= \int \nabla p(x \vert \theta) \, \text{d}x \\[5pt]
    &= \nabla \int p(x \vert \theta) \, \text{d}x \\[5pt]
    &= \nabla 1 \\[5pt]
    &= 0
\end{align}
$$

\\( \square \\)
{:.right}

But how certain are we to our estimate? We can define an uncertainty measure around the expected estimate. That is, we look at the covariance of score of our model. Taking the result from above:

$$
    \mathop{\mathbb{E}}_{p(x \vert \theta)} \left[ (s(\theta) - 0) \, (s(\theta) - 0)^{\text{T}} \right] \, .
$$

We can then see it as an information. The covariance of score function above is the definition of Fisher Information. As we assume \\( \theta \\) is a vector, the Fisher Information is in a matrix form, called Fisher Information Matrix:

$$
    \text{F} = \mathop{\mathbb{E}}_{p(x \vert \theta)} \left[ \nabla \log p(x \vert \theta) \, \nabla \log p(x \vert \theta)^{\text{T}} \right] \, .
$$

However, usually our likelihood function is complicated and computing the expectation is intractable. We can approximate the expectation in \\( \text{F} \\) using empirical distribution \\( \hat{q}(x) \\), which is given by our training data \\( X = \\{ x_1, x_2, \cdots, x_N \\} \\). In this form, \\( \text{F} \\) is called Empirical Fisher:

$$
\begin{align}
    \text{F} &= \frac{1}{N} \sum_{i=1}^{N} \nabla \log p(x_i \vert \theta) \, \nabla \log p(x_i \vert \theta)^{\text{T}} \, .
\end{align}
$$

<h2 class="section-heading">Fisher and Hessian</h2>

One property of \\( \text{F} \\) that is not obvious is that it has the interpretation of being the negative expected Hessian of our model's log likelihood.

**Claim:**
The negative expected Hessian of log likelihood is equal to the Fisher Information Matrix \\( \text{F} \\).

_Proof._ &nbsp;&nbsp; The Hessian of the log likelihood is given by the Jacobian of its gradient:

$$
\begin{align}
    \text{H}_{\log p(x \vert \theta)} &= \text{J} \left( \frac{\nabla p(x \vert \theta)}{p(x \vert \theta)} \right) \\[5pt]
    &= \frac{ \text{H}_{p(x \vert \theta)} \, p(x \vert \theta) - \nabla p(x \vert \theta) \, \nabla p(x \vert \theta)^{\text{T}}}{p(x \vert \theta) \, p(x \vert \theta)} \\[5pt]
    &= \frac{\text{H}_{p(x \vert \theta)} \, p(x \vert \theta)}{p(x \vert \theta) \, p(x \vert \theta)} - \frac{\nabla p(x \vert \theta) \, \nabla p(x \vert \theta)^{\text{T}}}{p(x \vert \theta) \, p(x \vert \theta)} \\[5pt]
    &= \frac{\text{H}_{p(x \vert \theta)}}{p(x \vert \theta)} - \left( \frac{\nabla p(x \vert \theta)}{p(x \vert \theta)} \right) \left( \frac{\nabla p(x \vert \theta)}{p(x \vert \theta)}\right)^{\text{T}} \, ,
\end{align}
$$

where the second line is a result of applying quotient rule of derivative. Taking expectation wrt. our model, we have:

$$
\begin{align}
    \mathop{\mathbb{E}}_{p(x \vert \theta)} \left[ \text{H}_{\log p(x \vert \theta)} \right] &= \mathop{\mathbb{E}}_{p(x \vert \theta)} \left[ \frac{\text{H}_{p(x \vert \theta)}}{p(x \vert \theta)} - \left( \frac{\nabla p(x \vert \theta)}{p(x \vert \theta)} \right) \left( \frac{\nabla p(x \vert \theta)}{p(x \vert \theta)} \right)^{\text{T}} \right] \\[5pt]
    &= \mathop{\mathbb{E}}_{p(x \vert \theta)} \left[ \frac{\text{H}_{p(x \vert \theta)}}{p(x \vert \theta)} \right] - \mathop{\mathbb{E}}_{p(x \vert \theta)} \left[ \left( \frac{\nabla p(x \vert \theta)}{p(x \vert \theta)} \right) \left( \frac{\nabla p(x \vert \theta)}{p(x \vert \theta)}\right)^{\text{T}} \right] \\[5pt]
    &= \int \frac{\text{H}_{p(x \vert \theta)}}{p(x \vert \theta)} p(x \vert \theta) \, \text{d}x \, - \mathop{\mathbb{E}}_{p(x \vert \theta)} \left[ \nabla \log p(x \vert \theta) \, \nabla \log p(x \vert \theta)^{\text{T}} \right] \\[5pt]
    &= \text{H}_{\int p(x \vert \theta) \, \text{d}x} \, - \text{F} \\[5pt]
    &= \text{H}_{1} - \text{F} \\[5pt]
    &= -\text{F} \, .
\end{align}
$$

Thus we have \\( \text{F} = -\mathop{\mathbb{E}}_{p(x \vert \theta)} \left[ \text{H}\_{\log p(x \vert \theta)} \right] \\).

\\( \square \\)
{:.right}

Indeed knowing this result, we can see the role of \\( \text{F} \\) as a measure of curvature of the log likelihood function.

<h2 class="section-heading">Conclusion</h2>

Fisher Information Matrix is defined as the covariance of score function. It is a curvature matrix and has interpretation as the negative expected Hessian of log likelihood function. Thus the immediate application of \\( \text{F} \\) is as drop-in replacement of \\( \text{H} \\) in second order optimization methods.

One of the most exciting results of \\( \text{F} \\) is that it has connection to KL-divergence. This gives rise to natural gradient method, which we shall discuss further in the next article.


<h2 class="section-heading">References</h2>

1. Martens, James. "New insights and perspectives on the natural gradient method." arXiv preprint arXiv:1412.1193 (2014).
2. Ly, Alexander, et al. "A tutorial on Fisher information." Journal of Mathematical Psychology 80 (2017): 40-55.
