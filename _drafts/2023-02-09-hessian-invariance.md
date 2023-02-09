---
layout:     post
title:      "The Invariance of the Hessian"
subtitle:   "Gaussian distributions are very useful in Bayesian inference due to their (many!) convenient properties. In this post we take a look at two of them: the convolution of two Gaussian pdfs and the integral of the probit function w.r.t. a Gaussian measure."
date:       2022-06-25 00:00
author:     "wiseodd"
header-img: "img/manifold.svg"
category:   techblog
---

Let $f: \mathcal{X} \times \Theta \to \R^k$ be a neural network, defined by $(x, \theta) \mapsto f(x; \theta) = f_\theta(x)$.
Suppose $\L: \Theta \to \R$ is a loss function defined on the $d$-dimensional parameter space $\Theta$ of $f$ and let $\theta^*$ be a minimum of $\L$.
Suppose further $\varphi: \Theta \to \Psi$ is a **_reparametrization_**, i.e. a differentiable map with a differentiable inverse, mapping $\theta \mapsto \psi$.

Suppose we transform $\theta^\*$ into $\psi^\* = \varphi(\theta^\*)$.
The consensus in the deep learning field regarding the Hessian matrix $H(\theta^\*)$ of $\L$ at $\theta^*$ is that:

1. The _eigenvalues_ of $H(\theta^*)$ are not invariant.
2. The _determinant_ of $H(\theta^*)$ is not invariant.
3. The _trace_ of $H(\theta^*)$ is not invariant.

In this post, we shall see that these quantities are actually invariant under reparametrization!
Although the argument comes from Riemannian geometry, it will also holds even if we use the default assumption found in calculus---the standard setting assumed by deep learning algorithms and practitioners.

**Note.**
Throughout this post, we use the Einstein summation convention.
That is, we sum two variables together if one has an upper index and the other has a lower index, while omitting the summation symbol.
For example: $v^i w_i$ corresponds to $\sum_i v^i w_i$ and $v^i w^j H_{ij} = \sum_i \sum_j v^i w^j H_{ij}$.

<h2 class="section-heading">The Hessian as a Bilinear Map</h2>

In calculus, the Hessian matrix $H(\theta^*)$ at $\theta^\*$ is defined by

$$
  H_{ij}(\theta^*) = \frac{\partial^2 \L}{\partial \theta^i \theta^j}(\theta^*) \qquad\qquad \text{for all} \qquad i,j = 1, \dots, d .
$$

The Hessian matrix defines a bilinear function, i.e., given arbitrary vectors $v, w$ in $\R^d$, we can write a function $B(v, w) = v^i w^j H_{ij}(\theta^*)$.
For example, this term comes up in the 2nd-order Taylor expansion of $\L$ at $\theta^\*$:

$$
\begin{align}
  \L(\theta) &\approx \L(\theta^*) + (\nabla \L \vert_{\theta^*})^\top d + \frac{1}{2} \underbrace{d^\top H(\theta^*) d}_{=B(d, d)} ,
\end{align}
$$

where we have defined $d = (\theta - \theta^*)$.

Under the reparametrization $\varphi: \theta \mapsto \psi$ with $\psi^* = \varphi(\theta^\*)$, we have $\L \mapsto \varphi^\inv$.
Thus, by the chain and product rules, the Hessian $H_{ij}$ becomes

$$
\begin{align}
  \tilde{H}_{ij} &= \frac{\partial^2 (\L \circ \varphi^{-1})}{\partial \psi^i \partial \psi^j} = \frac{\partial}{\partial \psi^j}\left( \frac{\partial \L}{\partial \theta^m} \frac{\partial \theta^m}{\partial \psi^i} \right) \\
    &= \frac{\partial^2 \L}{\partial \theta^m \partial \theta^n} \frac{\partial \theta^m}{\partial \psi^i} \frac{\partial \theta^n}{\partial \psi^j} + \frac{\partial \L}{\partial \theta^o} \frac{\partial^2 \theta^o}{\partial \psi^i \partial \psi^j} .
\end{align}
$$

However, notice that if we evaluate $\tilde{H}_{ij}$ at a minimum $\psi^* = \varphi(\theta^*)$, the second term vanishes.
And so, we have

$$
  \tilde{H}_{ij}(\psi^*) = \frac{\partial^2 \L}{\partial \theta^m \partial \theta^n}(\varphi^{-1}(\psi^*)) \frac{\partial \theta^m}{\partial \psi^i}(\psi^*) \frac{\partial \theta^n}{\partial \psi^j}(\psi^*) .
$$

Meanwhile, if $v = (v^1, \dots, v^d)$ and $w = (w^1, \dots, w^d)$ are vectors at $\theta^* \in \Theta$, their components become

$$
  \tilde{v}^i = v^m \frac{\partial \psi^i}{\partial \theta^m}(\theta^*) \qquad \text{and} \qquad \tilde{w}^j = w^n \frac{\partial \psi^j}{\partial \theta^n}(\theta^*) ,
$$

because the Jacobian of the reparametization (i.e. change of coordinates) $\varphi: \theta \mapsto \psi$ defines a change of basis.

Notice that $\frac{\partial \theta^m}{\partial \psi^i}(\psi^*)$ is the inverse of $\frac{\partial \psi^i}{\partial \theta^m}(\theta^\*) = \frac{\partial \psi^i}{\partial \theta^m}(\varphi^{-1}(\psi^\*))$.
Considering the transformed $H$, $v$, and $w$, the bilinear map $B$ then becomes

$$
\require{cancel}
\begin{align}
  \tilde{B}(\tilde{v}, \tilde{w}) &= \tilde{v}^i \tilde{w}^j \tilde{H}_{ij}(\psi^*) \\
    %
    &= v^m \cancel{\frac{\partial \psi^i}{\partial \theta^m}(\varphi^{-1}(\theta^*))} w^n \cancel{\frac{\partial \psi^j}{\partial \theta^n}(\varphi^{-1}(\theta^*))} \frac{\partial^2 \L}{\partial \theta^m \partial \theta^n}(\varphi^{-1}(\psi^*)) \cancel{\frac{\partial \theta^m}{\partial \psi^i}(\psi^*)} \cancel{\frac{\partial \theta^n}{\partial \psi^j}(\psi^*)} \\
    %
    &= v^m w^n H_{mn}(\varphi^{-1}(\psi^*)) .
\end{align}
$$

under the reparametization $\varphi$.
Since all those indices $m$, $n$ are simply dummy indices, the last expression is equivalent to $v^i w^i H_{ij}(\theta^*)$.
Since $v$ and $w$ and $\varphi$ are arbitrary, this implies that seen as a bilinear map, the Hessian at a minimum $\theta^\*$ is _invariant_ under reparametrization.


<h2 class="section-heading">The Non-Invariance of the Hessian</h2>

While the Hessian as a bilinear map at a minimum is (functionally) invariant, some of its downstream quantities are not.
Let us illustrate this using the determinant---one can also easily show similar results for trace and eigenvalues.

First, recall that the components $H_{ij}(\theta^*)$ of the Hessian transforms into the following under a reparametrization $\varphi$:

$$
  \tilde{H}_{ij}(\psi^*) = \frac{\partial^2 \L}{\partial \theta^m \partial \theta^n}(\varphi^{-1}(\psi^*)) \frac{\partial \theta^m}{\partial \psi^i}(\psi^*) \frac{\partial \theta^n}{\partial \psi^j}(\psi^*) .
$$

In matrix notation, this is $\tilde{\bf{H}} = (\bf{J}^{-1})^\top \bf{H} \bf{J}^{-1}$.
(The dependency on $\psi^*$ is omitted for simplicity.)
Then, the determinant of $\tilde{\bf{H}}$ is

$$
  \det \tilde{\bf{H}} = (\det \bf{J}^{-1})^2 \det \bf{H} .
$$

Thus, in general, $\det \tilde{\bf{H}} \neq \det \bf{H}$.
Hence the determinant of the Hessian is not invariant.
This causes problems in deep learning:
For instance, Dinh et al. 2017 argues that one cannot study the connection between flatness and generalization performance at the minimum of $\L$.


<h2 class="section-heading">The Riemannian Hessian</h2>

asd

\\( \square \\)
{:.right}

<h2 class="section-heading">References</h2>

1. Ng, Edward W., and Murray Geller. "A table of integrals of the error functions." _Journal of Research of the National Bureau of Standards B 73_, no. 1 (1969): 1-20.
2. Gibbs, Mark N. _Bayesian Gaussian processes for regression and classification_. Dissertation, University of Cambridge, 1998.
3. Lu, Zhiyun, Eugene Ie, and Fei Sha. "Mean-Field Approximation to Gaussian-Softmax Integral with Application to Uncertainty Estimation." _arXiv preprint arXiv:2006.07584_ (2020).
