---
layout:     post
title:      "Natural Gradient Descent"
subtitle:   "Intuition and derivation of natural gradient descent."
date:       2018-03-14 07:00
author:     "wiseodd"
header-img: "img/bayes.png"
category:   techblog
tags:       [machine learning]
---

[Previously]({% post_url 2018-03-09-fisher-information %}), we looked at the Fisher Information Matrix. We saw that it is equal to the negative expected Hessian of log likelihood. Thus, the immediate application of Fisher Information Matrix is as drop-in replacement of Hessian in second order optimization algorithm. In this article, we will look deeper at the intuition on what excatly is the Fisher Information Matrix represents and what is the interpretation of it.

<h2 class="section-heading">Distribution Space</h2>

As per previous article, we have a probabilistic model represented by its likelihood \\( p(x \vert \theta) \\). We want to maximize this likelihood function to find the most likely parameter \\( \theta \\). Equivalent formulation would be to minimize the loss function \\( \mathcal{L}(\theta) \\), which is the negative log likelihood.

Usual way to solve this optimization is to use gradient descent. In this case, we are taking step which direction is given by \\( -\nabla_\theta \mathcal{L}(\theta) \\). This is the steepest descent direction around the local neighbourhood of the current value of \\( \theta \\) in the parameter space. Formally, we have

$$
\frac{-\nabla_\theta \mathcal{L}(\theta)}{\lVert \nabla_\theta \mathcal{L}(\theta) \rVert} = \lim_{\epsilon \to 0} \frac{1}{\epsilon} \mathop{\text{arg min}}_{d \text{ s.t. } \lVert d \rVert \leq \epsilon} \mathcal{L}(\theta + d) \, .
$$

The above expression is saying that the steepest descent direction in parameter space is to pick a vector \\( d \\), such that the new parameter \\( \theta + d \\) is within the \\( \epsilon \\)-neighbourhood of the current parameter \\( \theta \\), and we pick \\( d \\) that minimize the loss. Notice the way we express this neighbourhood is by the means of Euclidean norm. Thus, the optimization in gradient descent is dependent to the Euclidean geometry of the parameter space.

Meanwhile, if our objective is to minimize the loss function (maximizing the likelihood), then it is natural that we taking step in the space of all possible likelihood, realizable by parameter \\( \theta \\). As the likelihood function itself is a probability distribution, we call this space distribution space. Thus it makes sense to take the steepest descent direction in this distribution space instead of parameter space.

Which metric/distance then do we need to use in this space? A popular choice would be KL-divergence. KL-divergence measure the "closeness" of two distributions. Although as KL-divergence is non-symmetric and thus not a true metric, we can use it anyway. This is because as \\( d \\) goes to zero, KL-divergence is asymptotically symmetric. So, within a local neighbourhood, KL-divergence is approximately symmetric [1].

We can see the problem when using only Euclidean metric in parameter space from the illustrations below. Consider a Gaussian parameterized by only its mean and keep the variance fixed to 2 and 0.5 for the first and second image respectively:

![Param1]({{ site.baseurl }}/img/2018-03-14-natural-gradient/param_space_dist.png)

![Param2]({{ site.baseurl }}/img/2018-03-14-natural-gradient/param_space_dist2.png)

In both images, the distance of those Gaussians are the same, i.e. 4, according to Euclidean metric (red line). However, clearly in distribution space, i.e. when we are taking into account the shape of the Gaussians, the distance is different in the first and second image. In the first image, the KL-divergence should be lower as there is more overlap between those Gaussians. Therefore, if we only work in parameter space, we cannot take into account this information about the distribution realized by the parameter.

The other nice property of working in distribution space instead of parameter space is that in distribution space, it is invariant to parameterization of the distribution. As an illustration, consider a Gaussian. We can parametrize it with its covariance matrix or precision matrix. Covariance and precision matrix are different to each other (up to special condition, e.g. identity matrix), even though it induces the same Gaussian. Thus, a single point in distribution space are possibly mapped into two different points in the parameter space. If we work in distribution space, then we only care about the resulting Gaussian.

<h2 class="section-heading">Fisher and KL-divergence</h2>

One question still needs to be answered is what exactly is the connection between Fisher Information Matrix and KL-divergence? It turns out, Fisher Information Matrix defines the local curvature in distribution space for which KL-divergence is the metric.

**Claim:**
Fisher Information Matrix \\( \text{F} \\) is the Hessian of KL-divergence between two distributions \\( p(x \vert \theta) \\) and \\( p(x \vert \theta') \\), with respect to \\( \theta' \\), evaluated at \\( \theta' = \theta \\).

**Proof:**
KL-divergence can be decomposed into entropy and cross-entropy term, i.e.:

$$
\text{KL} [p(x \vert \theta) \, \Vert \, p(x \vert \theta')] = \mathop{\mathbb{E}}_{p(x \vert \theta)} [ \log p(x \vert \theta) ] - \mathop{\mathbb{E}}_{p(x \vert \theta)} [ \log p(x \vert \theta') ] \, .
$$

The first derivative wrt. \\( \theta' \\) is:

$$
\begin{align}
    \nabla_{\theta'} \text{KL}[p(x \vert \theta) \, \Vert \, p(x \vert  \theta')] &= \nabla_{\theta'} \mathop{\mathbb{E}}_{p(x \vert \theta)} [ \log p(x \vert \theta) ] - \nabla_{\theta'} \mathop{\mathbb{E}}_{p(x \vert \theta)} [ \log p(x \vert \theta') ] \\[5pt]
        &= - \mathop{\mathbb{E}}_{p(x \vert \theta)} [ \nabla_{\theta'} \log p(x \vert \theta') ] \\[5pt]
        &= - \int p(x \vert \theta) \nabla_{\theta'} \log p(x \vert \theta') \, \text{d}x \, .
\end{align}
$$

The second derivative is:

$$
\begin{align}
    \nabla_{\theta'}^2 \, \text{KL}[p(x \vert \theta) \, \Vert \, p(x \vert \theta')] &= - \int p(x \vert \theta) \, \nabla_{\theta'}^2 \log p(x \vert \theta') \, \text{d}x \\[5pt]
\end{align}
$$

Thus, the Hessian wrt. \\( \theta' \\) evaluated at \\( \theta' = \theta \\) is:

$$
\begin{align}
    \text{H}_{\text{KL}[p(x \vert \theta) \, \Vert \, p(x \vert \theta')]} &= - \int p(x \vert \theta) \, \left. \nabla_{\theta'}^2 \log p(x \vert \theta') \right\vert_{\theta' = \theta} \, \text{d}x \\[5pt]
        &= - \int p(x \vert \theta) \, \text{H}_{\log p(x \vert \theta)} \, \text{d}x \\[5pt]
        &= - \mathop{\mathbb{E}}_{p(x \vert \theta)} [\text{H}_{\log p(x \vert \theta)}] \\[5pt]
        &= \text{F} \, .
\end{align}
$$

The last line follows from [the previous article about Fisher Information Matrix]({% post_url 2018-03-09-fisher-information %}), in which we showed that the negative expected Hessian of log likelihood is the Fisher Information Matrix.

\\( \square \\)
{:.right}

<h2 class="section-heading">Steepest Descent in Distribution Space</h2>

Now we are ready to use the Fisher Information Matrix to enhance the gradient descent. But first, we need to derive the Taylor series expansion for KL-divergence around \\( \theta \\).

**Claim:**
Let \\( d \to 0 \\). The second order Taylor series expansion of KL-divergence is \\( \text{KL}[p(x \vert \theta) \, \Vert \, p(x \vert \theta + d)] \approx \frac{1}{2} d^\text{T} \text{F} d \\).

**Proof:**
We will use \\( p_{\theta} \\) as a notational shortcut for \\( p(x \vert \theta) \\). By definition, the second order Taylor series expansion of KL-divergence is:

$$
\begin{align}
    \text{KL}[p_{\theta} \, \Vert \, p_{\theta + d}] &\approx \text{KL}[p_{\theta} \, \Vert \, p_{\theta}] + (\left. \nabla_{\theta'} \text{KL}[p_{\theta} \, \Vert \, p_{\theta'}] \right\vert_{\theta' = \theta})^\text{T} d + \frac{1}{2} d^\text{T} \text{F} d \\[5pt]
        &= \text{KL}[p_{\theta} \, \Vert \, p_{\theta}] - \mathop{\mathbb{E}}_{p(x \vert \theta)} [ \nabla_\theta \log p(x \vert \theta) ]^\text{T} d + \frac{1}{2} d^\text{T} \text{F} d \\[5pt]
\end{align}
$$

Notice that the first term is zero as it is the same distribution. Furthermore, from the [previous article]({% post_url 2018-03-09-fisher-information %}), we saw that the expected value of the gradient of log likelihood, which is exactly the gradient of KL-divergence as shown in the previous proof, is also zero. Thus the only thing left is:

$$
\begin{align}
    \text{KL}[p(x \vert \theta) \, \Vert \, p(x \vert \theta + d)] &\approx \frac{1}{2} d^\text{T} \text{F} d \, .
\end{align}
$$

\\( \square \\)
{:.right}

Now, we would like to know what is update vector \\( d \\) that minimizes the loss function \\( \mathcal{L} (\theta) \\) in distribution space, so that we know in which direction decreases the KL-divergence the most. This is analogous to the method of steepest descent, but in distribution space with KL-divergence as metric, instead of the usual parameter space with Euclidean metric. For that, we do this minimization:

$$
d^* = \mathop{\text{arg min}}_{d \text{ s.t. } \text{KL}[p_\theta \Vert p_{\theta + d}] = c} \mathcal{L} (\theta + d) \, ,
$$

where \\( c \\) is some constant. The purpose of fixing the KL-divergence to some constant is to make sure that we move along the space with constant speed, regardless the curvature. Further benefit is that this makes the algorithm more robust to the reparametrization of the model, i.e. the algorithm does not care how the model is parametrized, it only cares about the distribution induced by the parameter [3].

If we write the above minimization in Lagrangian form, with constraint KL-divergence approximated by its second order Taylor series expansion and approximate \\( \mathcal{L}(\theta + d) \\) with its first order Taylor series expansion, we get:

$$
\begin{align}
d^* &= \mathop{\text{arg min}}_d \, \mathcal{L} (\theta + d) + \lambda \, (\text{KL}[p_\theta \Vert p_{\theta + d}] - c) \\
    &\approx \mathop{\text{arg min}}_d \, \mathcal{L}(\theta) + \nabla_\theta \mathcal{L}(\theta)^\text{T} d + \frac{1}{2} \lambda \, d^\text{T} \text{F} d - \lambda c \, .
\end{align}
$$

To solve this minimization, we set its derivative wrt. \\( d \\) to zero:

$$
\begin{align}
0 &= \frac{\partial}{\partial d} \mathcal{L}(\theta) + \nabla_\theta \mathcal{L}(\theta)^\text{T} d + \frac{1}{2} \lambda \, d^\text{T} \text{F} d - \lambda c \\[5pt]
    &= \nabla_\theta \mathcal{L}(\theta) + \lambda \, \text{F} d \\[5pt]
    \lambda \, \text{F} d &= -\nabla_\theta \mathcal{L}(\theta) \\[5pt]
    d &= -\frac{1}{\lambda} \text{F}^{-1} \nabla_\theta \mathcal{L}(\theta) \\[5pt]
\end{align}
$$

Up to constant factor of \\( \frac{1}{\lambda} \\), we get the optimal descent direction, i.e. the opposite direction of gradient while taking into account the local curvature in distribution space defined by \\( \text{F}^{-1} \\). We can absorb this constant factor into the learning rate.

**Definition:**
Natural gradient is defined as

$$
\tilde{\nabla}_\theta \mathcal{L}(\theta) = \text{F}^{-1} \nabla_\theta \mathcal{L}(\theta) \, .
$$

\\( \square \\)
{:.right}

As corollary, we have the following algorithm:

**Algorithm: Natural Gradient Descent**
1. Repeat:
    1. Do forward pass on our model and compute loss \\( \mathcal{L}(\theta) \\).
    2. Compute the gradient \\( \nabla_\theta \mathcal{L}(\theta) \\).
    3. [Compute the Fisher Information Matrix]({% post_url 2018-03-09-fisher-information %}) \\( \text{F} \\), or its empirical version (wrt. our training data).
    4. Compute the natural gradient \\( \tilde{\nabla}\_\theta \mathcal{L}(\theta) = \text{F}^{-1} \nabla_\theta \mathcal{L}(\theta) \\).
    5. Update the parameter: \\( \theta = \theta - \alpha \, \tilde{\nabla}\_\theta \mathcal{L}(\theta) \\), where \\( \alpha \\) is the learning rate.
2. Until convergence.

<h2 class="section-heading">Simple Implementation Example</h2>

Let's consider logistic regression problem. The training data is drawn from a mixture of Gaussians centered at \\( (-1, -1) \\) and \\( (1, 1) \\). We assign different labels for each mode. The code is as follows:

``` python
import numpy as np
from sklearn.utils import shuffle

X0 = np.random.randn(100, 2) - 1
X1 = np.random.randn(100, 2) + 1
X = np.vstack([X0, X1])
t = np.vstack([np.zeros([100, 1]), np.ones([100, 1])])

X, t = shuffle(X, t)

X_train, X_test = X[:150], X[:50]
t_train, t_test = t[:150], t[:50]
```

Next, we consider our model. It is a simple linear model (without bias) with sigmoid output. Thus naturally, we use binary cross entropy loss:

``` python
# Initialize weight
W = np.random.randn(2, 1) * 0.01


def sigm(x):
    return 1/(1+np.exp(-x))


def NLL(y, t):
    return -np.mean(t*np.log(y) + (1-t)*np.log(1-y))
```

Inside the training loop, the forward pass looks like:

``` python
# Forward
z = X_train @ W
y = sigm(z)
loss = NLL(y, t_train)

# Loss
print(f'Loss: {loss:.3f}')
```

The gradient of the loss function wrt. parameter \\( w \\) is then as follows:

``` python
dy = (y-t_train)/(m * (y - y*y))
dz = sigm(z)*(1-sigm(z))
dW = X_train.T @ (dz * dy)
```

At this point we are ready to do update step for vanilla gradient descent:

``` python
W = W - alpha * dW
```

For natural gradient descent, we need some extra works. Firstly we need to compute the gradient of log likelihood wrt. \\( w \\), without summing, as we will do this when we compute the covariance.

``` python
grad_loglik_z = (t_train-y)/(y - y*y) * dz
grad_loglik_W = grad_loglik_z * X_train
```

The Empirical Fisher is given by the empirical covariance matrix of the gradient of log likelihood wrt. our training data:

``` python
F = np.cov(grad_loglik_W.T)
```

To do the update step, we need to take the product of \\( \text{F}^{-1} \\) with the gradient of loss:

``` python
W = W - alpha * np.linalg.inv(F) @ dW
```

The complete script to reproduce this can be found at:
<https://gist.github.com/wiseodd/1c9f5006310f5ee03bd4682b4c03020a>.

How good is natural gradient descent compared to the vanilla gradient descent? Below are the comparison of loss value after five iterations, averaged over 100 repetitions.

| Method  | Mean loss  | Std. loss  |
|:---|:---:|:---:|
| Natural Gradient Descent | **0.1823**  | **0.0814**  |
| Vanilla Gradient Descent | 0.4058  | 0.106  |
{:.table-bordered}

At least in this very simple setting, natural gradient descent converges twice as fast as the vanilla counterpart. Furthermore, it converges faster consistently, as shown by the standard deviation.

<h2 class="section-heading">Discussion</h2>

In the above very simple model with low amount of data, we saw that we can implement natural gradient descent easily. But how easy is it to do this in the real world? As we know, the number of parameters in deep learning models is very large, within millions of parameters. The Fisher Information Matrix for these kind of models is then infeasible to compute, store, or invert. This is the same problem as why second order optimization methods are not popular in deep learning.

One way to get around this problem is to approximate the Fisher/Hessian instead. Method like ADAM [4] computes the running average of first and second moment of the gradient. First moment can be seen as momentum which is not our interest in this article. The second moment is approximating the Fisher Information Matrix, but constrainting it to be diagonal matrix. Thus in ADAM, we only need \\( O(n) \\) space to store (the approximation of) \\( \text{F} \\) instead of \\( O(n^2) \\) and the inversion can be done in \\( O(n) \\) instead of \\( O(n^3) \\). In practice ADAM works really well and is currently the *de facto* standard for optimizing deep neural networks.


<h2 class="section-heading">References</h2>

1. Martens, James. "New insights and perspectives on the natural gradient method." arXiv preprint arXiv:1412.1193 (2014).
2. Ly, Alexander, et al. "A tutorial on Fisher information." Journal of Mathematical Psychology 80 (2017): 40-55.
3. Pascanu, Razvan, and Yoshua Bengio. "Revisiting natural gradient for deep networks." arXiv preprint arXiv:1301.3584 (2013).
4. Kingma, Diederik P., and Jimmy Ba. "Adam: A method for stochastic optimization." arXiv preprint arXiv:1412.6980 (2014).
