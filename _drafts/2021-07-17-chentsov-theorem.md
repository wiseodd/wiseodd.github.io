---
layout:     post
title:      "Chentsov's Theorem"
subtitle:   "[WIP]"
date:       2021-07-17 08:00
author:     "wiseodd"
header-img: "img/manifold.svg"
category:   techblog
tags:       [math]
---

Let $p_\theta(x)$ be a probability density on $\R^n$, parametrized by $\theta \in \R^d$. The **_Fisher information_** is defined by

$$
    \I_{ij}(\theta) := \E_{p_\theta(x)} \left( \partial_i \log p_\theta(x) \, \partial_j \log p_\theta(x) \right)
$$

where $\partial_i := \partial/\partial \theta^i$ for each $i = 1, \dots, d$. Note that the Fisher information is positive semi-definite because one can see it as an outer-product of the gradient of the log-density.


<h2 class="section-heading">The Fisher Information under Sufficient Statistics</h2>

Let $T : \R^n \to \R^n$ with $x \mapsto y$ be a bijective transformation of the r.v. $x \sim p_\theta(x)$. By the [Fisher-Neyman factorization](https://en.wikipedia.org/wiki/Sufficient_statistic#Fisher%E2%80%93Neyman_factorization_theorem), $T$ is a **_sufficient statistic_** for the parameter $\theta$ if there exist non-negative functions $g_\theta$ and $h$, where $g_\theta$ depends on $\theta$ while $h$ does not, such that we can write the density $p_\theta(x)$ as follows:

$$
    p_\theta(x) = g_\theta(T(x)) h(x) .
$$

The following proposition shows the behavior of $\I$ under sufficient statistics.

**Proposition 1.** The Fisher information is **_invariant_** under sufficient statistics.

_Proof._ Let $T$ be a sufficient statistic and so $p_\theta(x) := g_\theta(T(x)) h(x)$. Notice that this implies

$$
    \partial_i \log g_\theta(T(x)) = \partial_i \log p_\theta(x) .
$$

So, the Fisher information $\I(\theta; T)$ under $T$ is

$$
\begin{align}
    \I(\theta; T) &= \E \left( \partial_i \log (g_\theta(T(x)) h(x)) \, \partial_j \log (g_\theta(T(x)) h(x)) \right) \\
        %
        &= \E \left( \partial_i \log g_\theta(T(x)) \, \partial_j \log g_\theta(T(x)) \right) \\
        %
        &= \E \left( \partial_i \log p_\theta(x) \, \partial_j \log p_\theta(x) \right) \\
        %
        &= \I(\theta) .
\end{align}
$$

We conclude that $\I$ is invariant under sufficient statistics.

\\( \square \\)
{:.right}



<h2 class="section-heading">The Fisher Information as a Riemannian Metric</h2>

Let

$$
    M := \{ p_\theta(x) : \theta \in \R^d \}
$$

be the set of the parametric densities $p_\theta(x)$. We can treat $M$ as a smooth $d$-manifold by imposing a global coordinate chart $p_\theta(x) \mapsto \theta$. Thus, we can identify a point $p_\theta(x)$ on $M$ with its parameter $\theta$ interchangeably.

When $\I$ is positive-definite, then we can use it as (the coordinates representation of) a Riemannian metric for $M$. This is because $\I$ is a *covariant* 2-tensor.

**Proposition 2.** The component functions $\I_{ij}$ of $\I$ follows the covariant transformation rule.

_Proof._ Let $\theta \mapsto \varphi$ be a change of coordinates and let $\ell(\varphi) := \log p_\varphi(x)$. The component function $\I_{ij}(\theta)$ in the "old" coordinates is expressed in terms of the "new" ones, as follows:

$$
\begin{align}
    \I_{ij}(\theta) &= \E \left( \frac{\partial \ell}{\partial \theta^i} \, \frac{\partial \ell}{\partial \theta^j} \right) \\
        %
        &= \E \left( \frac{\partial \ell}{\partial \varphi^i} \frac{\partial \varphi^i}{\partial \theta^i} \, \frac{\partial \ell}{\partial \varphi^j} \frac{\partial \varphi^j}{\partial \theta^j} \right) \\
        %
        &= \frac{\partial \varphi^i}{\partial \theta^i} \frac{\partial \varphi^j}{\partial \theta^j} \E \left( \frac{\partial \ell}{\partial \varphi^i} \, \frac{\partial \ell}{\partial \varphi^j} \right) \\
        %
        &= \frac{\partial \varphi^i}{\partial \theta^i} \frac{\partial \varphi^j}{\partial \theta^j} \I_{ij}(\varphi) ,
\end{align}
$$

where the second equality follows from the standard chain rule. We conclude that $\I$ is covariant since the Jacobian $\partial \varphi/\partial \theta$ of the transformation multiplies the "new" component functions $\I_{ij}(\varphi)$ of $\I$ to obtain the "old" ones.

\\( \square \\)
{:.right}



<h2 class="section-heading">Chentsov's Theorem</h2>


The previous two results are useful since the Fisher information metric is invariant under sufficient statistics. In this sense $\I$ has a statistical invariance property. But this is not a strong enough reason for arguing that $\I$ is a "natural" or "the best" metric for $M$.

Here, we shall see a stronger statement, due to Chentsov in 1972, about the Fisher metric: It is the *unique* statistically-invariant metric for $M$ (up to a scaling constant). This makes $\I$ stands out over any other metric for $M$.

While generalizations to arbitrary density functions exists (Ay et al, 2021), originally Chentsov's theorem is described on discrete probability distributions. We follow the latter. To do so, we need the concept of coarse graining.


<!-- <h4 class="section-subheading">Coarse Graining</h4>

Consider $S_n$, the $n$-dimensional probability simplex. We can see it as a family of discrete probability distributions of a r.v. $x$ taking values in $A := \\{ 0, 1, \dots, n \\}$. Let us denote such a probability distribution by a vector $\pi \in S_n$ of $(n+1)$ elements. Furthermore, let us partition $A$ into $m+1$ subsets $A_0, \dots, A_m$, where $n \geq m$.

Now, let $y$ be a r.v. taking values in $\{0, \dots, m\}$, where $y = j$ implies that $x$ belongs to $A_j$. Since it is also a discrete r.v., we can represent its distribution with a length-$m$ probability vector $\gamma \in S_m$, which can be expressed in terms of $\pi$ as follows:

$$
    \gamma_j = \sum_{i \in A_j} \pi_i \qquad \forall \, j = 0, \dots, m .
$$

In this case, we say that $(y, \gamma)$ is a **_coarse graining_** of $(x, \pi)$ by partition $\\{ A_0, \dots, A_m \\}$.

Let us define $f: S_n \to S_m$ via the above by,

$$
    \textstyle
    f(\pi) := \left( \sum_{i \in A_0} \pi_i, \dots, \sum_{i \in A_m} \pi_i \right) .
$$

Moreover, let

$$
    r_{ij} := \mathrm{Prob}(x = i \mid y = j)
$$

be an arbitrary conditional probability table of $x$ given $y$. Note that, for $y = j$ fixed, $r_{:j}$ is in $S_n$, where the notation $r_{:j}$ means the $j$-th column of $r$---in particular, $r_{:j}$ sums to one. We define $h: S_m \to S_n$ by

$$
    \textstyle
    h(\gamma) := \left( \sum_j r_{0j} \gamma_j, \dots, \sum_j r_{nj} \gamma_j \right) .
$$

Note that $h$ is a right inverse of $f$ since

$$
\begin{align}
    \textstyle
    f \circ h(\gamma) &= f\left( \left[ \sum_j r_{0j} \gamma_j, \dots, \sum_j r_{nj} \gamma_j \right] \right) \\
        %
        &= \left( \sum_{i \in A_0} \sum_j r_{0j} \gamma_j, \dots, \sum_{i \in A_m} \sum_j r_{nj} \gamma_j \right)
\end{align}
$$ -->


**Theorem 1.** The Fisher information of the Categorical distribution in $S_{n-1}$ is a unique Riemannian metric, up to a constant factor, that is invariant under sufficient statistics.

_Proof._ Let $x$ be a Categorical r.v. taking value in $A := \\{ 1, \dots, n \\}$. Assume that $x$ is expressed using the one-hot encoding. Its distribution $p_\theta(x)$ with $\theta \in S_{n-1}$ is defined by

$$
    p_\theta(x) = \prod_{i=1}^n \left(\theta^i\right)^{(x^i)} ,
$$

where $\theta^i$ and $x^i$ are the $i$-th components of $\theta$ and the one-hot vector $x$, respectively.

Let us compute its Fisher information. First the score function is given by

$$
\partial_i \log p_\theta(x) = \partial_i \sum_{i=1}^n x^i \log \theta^i = \sum_{i=1}^n x^i \frac{1}{\theta^i} \delta_{ij} = \frac{x^i}{\theta^i} ,
$$

for each $i = 1, \dots n$. Hence, using the fact that $x$ is one-hot:

$$
\begin{align}
    \I_{ii}(\theta) &= \E \left( \frac{x^i}{\theta^i} \, \frac{x^i}{\theta^i} \right) \\
        %
        &= \frac{1}{(\theta^i)^2} \sum_{i=1}^n (x^i)^2 \theta^i \\
        %
        &= \frac{1}{(\theta^i)^2} \theta^i \\
        %
        &= \frac{1}{\theta^i} .
\end{align}
$$

Using similar step, we can show that $\I_{ij}(\theta) = 0$ for $i \neq j$ because $x^i x^j$ is always zero.

Now, we show that $\I$, as a Riemannian metric $g$ for $S_{n-1}$, is invariant under sufficient statistics. Note that sufficient statistics in this case are simply permutations of the sample space $A$, or, equivalently, permutations of index of $\theta$. This is because by definition, a bijection from a finite set to itself is a permutation.

Let $\tilde{\theta} \in S_{n-1}$ be arbitrary and let $u, v \in T_{\tilde{\theta}} S_{n-1}$ be tangent vectors. Their inner product w.r.t. $g = \I$ is

$$
    \inner{u, v} = g_{ij} u^i v^j = \I_{ii} u^i v^i = \sum_{i=1}^n \frac{1}{\theta^i} u^i v^i .
$$

If $T(i)$ is a permutation of index, then it is clear that

$$
    \sum_{i=1}^n \frac{1}{\theta^{T(i)}} u^{T(i)} v^{T(i)} = \sum_{i=1}^n \frac{1}{\theta^i} u^i v^i .
$$

Thus, the inner product is preserved under permutations of index.


\\( \square \\)
{:.right}
