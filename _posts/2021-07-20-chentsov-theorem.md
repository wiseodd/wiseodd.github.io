---
layout:     post
title:      "Chentsov's Theorem"
subtitle:   "The Fisher information is often the default choice of the Riemannian metric for manifolds of probability distributions. In this post, we study Chentsov's theorem, which justifies this choice. It says that the Fisher information is the unique Riemannian metric (up to a scaling constant) that is invariant under sufficient statistics. This fact makes the Fisher metric stands out from other choices."
date:       2021-07-20 00:00
author:     "wiseodd"
header-img: "img/manifold.svg"
category:   techblog
tags:       [math]
---

Let $p_\theta(x)$ be a probability density on $\R^n$, parametrized by $\theta \in \R^d$. The **_Fisher information_** is defined by

$$
    \I_{ij}(\theta) := \E_{p_\theta(x)} \left( \partial_i \log p_\theta(x) \, \partial_j \log p_\theta(x) \right)
$$

where $\partial_i := \partial/\partial \theta^i$ for each $i = 1, \dots, d$. Note that $\I(\theta)$ is positive semi-definite because one can see it as the (expected) outer-product of the gradient of the log-density.


<h2 class="section-heading">The Fisher Information under Sufficient Statistics</h2>

Let $T : \R^n \to \R^n$ with $x \mapsto y$ be a bijective transformation of the r.v. $x \sim p_\theta(x)$. By the [Fisher-Neyman factorization](https://en.wikipedia.org/wiki/Sufficient_statistic#Fisher%E2%80%93Neyman_factorization_theorem), $T$ is a **_sufficient statistic_** for the parameter $\theta$ if there exist non-negative functions $g_\theta$ and $h$, where $g_\theta$ depends on $\theta$ while $h$ does not, such that we can write the density $p_\theta(x)$ as follows:

$$
    p_\theta(x) = g_\theta(T(x)) h(x) .
$$

The following proposition shows the behavior of $\I$ under sufficient statistics.

**Proposition 1.** The Fisher information is invariant under sufficient statistics.

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

Let us assume that $\I$ is positive-definite everywhere, and each $\I_{ij}$ is smooth. Then we can use it as (the coordinates representation of) a Riemannian metric for $M$. This is because $\I$ is a covariant 2-tensor. (Recall the definition of a Riemannian metric.)

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


The previous two results are useful since the Fisher information metric is invariant under sufficient statistics. In this sense, $\I$ has a statistical invariance property. But this is not a strong enough reason for arguing that $\I$ is a "natural" or "the best" metric for $M$.

Here, we shall see a stronger statement, due to Chentsov in 1972, about the Fisher metric: It is the *unique* statistically-invariant metric for $M$ (up to a scaling constant). This makes $\I$ stands out over any other metric for $M$.

Originally, Chentsov's theorem is described on the space of Categorical probability distributions over the sample space $\Omega := \\{ 1, \dots, n \\}$, i.e. the probability simplex. We use the result of Campbell (1986) as a stepping stone. To do so, we need to define the so-called *Markov embeddings*.

Let $\\{ A_1, \dots, A_m \\}$ be a partition $\Omega$, where $2 \leq n \leq m$. We define a conditional probability table $Q$ of size $n \times m$ where

$$
\begin{align}
    q_{ij} &= 0 \quad \text{if } j \not\in A_i \\
    q_{ij} &> 0 \quad \text{if } j \in A_i \\
    & {\textstyle\sum_{j=1}^n} q_{ij} = 1 .
\end{align}
$$

That is, the $i$-th row of $Q$ gives probabilities signifying the membership of each $j \in \Omega$ in $A_i$. Based on this, we define a map $f: \R^n_{> 0} \to \R^m_{>0}$ by

$$
    y_j := \sum_{i=1}^n q_{ij} x_i \qquad \forall\enspace j = 1, \dots, m .
$$

We call this map a **_Markov embedding_**. The name suggests that $f$ embeds $\R^n_{> 0}$ in a higher-dimensional space $\R^m_{> 0}$.

The result of Campbell (1986) characterizes the form of the Riemannian metric in $\R^n_{>0}$ that is invariant under any Markov embedding.


**Lemma 3 (Campbell, 1986).** _Let $g$ be a Riemannian metric on $\R^m\_{>0}$ where $m \geq 2$. Suppose that every Markov embedding on $(\R^m\_{>0}, g)$ is an isometry. Then_

$$
    g_{ij}(x) = A(\abs{x}) + \delta_{ij} \frac{\abs{x} B(\abs{x})}{x_i} ,
$$

_where $\abs{x} = \sum\_{i=1}^m x\_i$, $\delta\_{ij}$ is the Kronecker delta, and $A, B \in C^\infty(\R\_{>0})$ satisfying $B > 0$ and $A + B > 0$._

_Proof._  See Campbell (1986) and Amari (2016, Sec. 3.5).

\\( \square \\)
{:.right}


Lemma 3 is a general statement about the invariant metric in $\R^n_{>0}$ and it does not say anything about sufficient statistics and probability distributions. To get the main result, we restrict ourselves to the $(n-1)$-**_probability simplex_** $\S^{n-1} \subset \R^n_{>0}$, which is the space of (Categorical) probability distribution.

The fact that the Fisher information is the unique invariant metric under sufficient statistics follows from the fact that when $n = m$, the Markov embedding reduces to a permutation of the components of $x \in \R^n_{>0}$---i.e. the permutation of $\Omega$. This is because permutations of $\Omega$ are sufficient statistics for Categorical distribution.

Let us, therefore, connect the result in Lemma 3 with the Fisher information on $\S^{n-1}$. We give the latter in the following lemma.


**Lemma 4.** _The Fisher information of a Categorical distribution $p\_\theta(z)$ where $z$ takes values in $\Omega = \\{ 1, \dots, n \\}$ and $\theta = \\{ \theta^1, \dots, \theta^n \\} \in \S^{n-1}$ is given by_

$$
    \I_{ij}(\theta) = \delta_{ij} \frac{1}{\theta^i} .
$$

_That is, $\I(\theta)$ is an $(n \times n)$ diagonal matrix with $i$-th entry $1/\theta^i$._

_Proof._ By definition,

$$
    p_\theta(z) = \prod_{i=1}^n \left(\theta^i\right)^{(z^i)} ,
$$

where we assume that $z$ is one-hot encoded. Its score function is given by

$$
\partial_i \log p_\theta(x) = \partial_i \sum_{i=1}^n z^i \log \theta^i = \sum_{i=1}^n z^i \frac{1}{\theta^i} \delta_{ij} = \frac{z^i}{\theta^i} ,
$$

for each $i = 1, \dots n$. Hence, using the fact that $z$ is one-hot:

$$
\begin{align}
    \I_{ii}(\theta) &= \E \left( \frac{z^i}{\theta^i} \, \frac{z^i}{\theta^i} \right) \\
        %
        &= \frac{1}{(\theta^i)^2} \sum_{i=1}^n (z^i)^2 \theta^i \\
        %
        &= \frac{1}{(\theta^i)^2} \theta^i \\
        %
        &= \frac{1}{\theta^i} .
\end{align}
$$

Using similar step, we can show that $\I_{ij}(\theta) = 0$ for $i \neq j$ because $z^i z^j$ is always zero.

\\( \square \\)
{:.right}


Now we are ready to state the main result.


**Theorem 5 (Chentsov, 1972).** _The Fisher information is the unique Riemannian metric on $\S^{n-1}$ that is invariant under sufficient statistics, up to a multiplicative constant._

_Proof._ By Lemma 2, the invariant metric under Markov embeddings in $\R^n_{> 0}$ is given by

$$
    g_{ij}(x) = A(\abs{x}) + \delta_{ij} \frac{\abs{x} B(\abs{x})}{x_i} ,
$$

for any $x \in \R^n_{> 0}$. Therefore, this is the form of the invariant metric under sufficient statistics in $\S^{n-1} \subset R^n_{>0}$, i.e. when $n=m$ in the Markov embedding.


[Image Here!]

Let us therefore restrict $g$ to $\S^{n-1}$. For each $\theta \in \S^{n-1}$, the tangent space $T_\theta \S^{n-1}$ is orthogonal to the line $x^1 = x^2 = \dots = x^n$, which direction is given by the vector $\mathbf{1} = (1, \dots, 1) \in R^n_{>0}$. This is a vector normal to $\S^{n-1}$, implying that any $v \in T_\theta \S^{n-1}$ satisfies $\inner{\mathbf{1}, v}\_g = 0$, i.e. $\sum_{i=1}^n v^i = 0$.

Moreover, if $\theta \in \S^{n-1}$, then $\abs{\theta} = \sum_{i=1}^n \theta^i = 1$ by definition. Thus, $A(1)$ and $B(1)$ are constants. So, if $v, w \in T_\theta \S^{n-1}$, we have:

$$
\begin{align}
    \inner{v, w}_{\theta} &= \sum_{i=1}^n \sum_{j=1}^n g_{ij} v^i w^j = A(1) \sum_{i = 1}^n \sum_{j = 1}^n v^i w^j + B(1) \sum_{i=1}^n \frac{v^i w^i}{\theta^i} \\
        %
        &= A(1) \underbrace{\left(\sum_{i = 1}^n v^i\right)}_{=0} \underbrace{\left(\sum_{j = 1}^n w^j\right)}_{=0} + B(1) \sum_{i=1}^n \frac{v^i w^i}{\theta^i} .
\end{align}
$$

Therefore $A(1)$ does not contribute to the inner product and we may, w.l.o.g., write the metric as a diagonal matrix:

$$
    g_{ij}(\theta) = \delta_{ij} \frac{B(1)}{\theta_i} .
$$

Recalling that $B(1)$ is a constant, by Lemma 2, we have $g_{ij}(\theta) \propto \I_{ij}(\theta)$.

\\( \square \\)
{:.right}


Generalizations to this (original) version Chentsov's theorem exists. For instance, Ay et al. (2015) showed Chentsov's theorem for arbitrary, parametric probability distributions. Dowty (2018) stated Chentsov's theorem for exponential family distributions.


<h2 class="section-heading">References</h2>

1. Chentsov, N. N. "Statistical Decision Rules and Optimal Deductions." (1972).
2. Campbell, L. Lorne. "An extended Čencov characterization of the information metric." Proceedings of the American Mathematical Society 98, no. 1 (1986): 135-141.
2. Amari, Shun-ichi. Information geometry and its applications. Vol. 194. Springer, 2016.
3. Ay, Nihat, Jürgen Jost, Hông Vân Lê, and Lorenz Schwachhöfer. "Information geometry and sufficient statistics." Probability Theory and Related Fields 162, no. 1-2 (2015): 327-364.
4. Dowty, James G. "Chentsov’s theorem for exponential families." Information Geometry 1, no. 1 (2018): 117-135.
