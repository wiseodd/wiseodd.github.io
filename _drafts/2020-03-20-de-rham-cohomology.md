---
layout:     post
title:      "De Rham Cohomology"
subtitle:   "In this three-part series, we will built our intuition towards de Rham cohomology. Particularly, in this article, we begin by studying covector fields on smooth manifolds. We then talk about the question of identifying conservative covector fields, which motivates the future article on de Rham cohomology."
date:       2019-03-11 12:00
author:     "wiseodd"
header-img: "img/manifold.svg"
category:   techblog
tags:       [math]
---

<h2 class="section-heading">A brief interlude on exterior derivative</h2>

The differential $d$ has a more general meaning. It is actually a linear map, known as the **_exterior derivative_**, which maps a covector field (1-form) $\omega$ to a 2-form $d\omega$ with coefficient

$$
    \frac{\partial \omega_j}{\partial x^i} - \frac{\partial \omega_i}{\partial x^j}  \qquad \text{for all $i,j$ s.t. $i < j$} \, .
$$

We can see directly from the previous definition of closed covector field that a covector field $\omega$ is closed if and only if $d\omega = 0$.

The exterior derivative has the property that $d \circ d = 0$. In particular, if $f \in C^\infty(M)$, then $d(df) = 0$. To see this, we can write in coordinates

$$
    d(df) = d\left(\frac{\partial f}{\partial x^i} dx^i \right) \, .
$$

By definition above, therefore $d(df)$ has coefficients

$$
    \frac{\partial^2 f}{\partial x^i \partial x^j} - \frac{\partial^2 f}{\partial x^j \partial x^i}  \qquad \text{for all $i,j$ s.t. $i < j$} \, .
$$

Since the second partial derivatives of $f$ commute, for all $i, j$, the above quantity is zero. Thus, $d(df) = 0$ since all its coefficients are zero. This property highlights a _necessary condition_ for a covector field $\omega$ to be exact: Its exterior derivative $d\omega$ must be zero, since if $\omega = df$ for some $f \in C^\infty(M)$ then $d(df) = 0$.

If we denote $\Omega^k(M)$ to be the space of $k$-forms on $M$, in general, the exterior derivative is a linear operator $d: \Omega^k(M) \to \Omega^{k+1}(M)$ and has the property that (among other things) $d \circ d = 0$. One can think of a $k$-form as higher order covector field where at each point on $M$, it takes inputs $k$ tangent vectors and outputs a real number. This definition and intuition should suffice for an introduction to de Rham cohomology. Thus, we will not look deeper into this subject in this post since it requires quite a bit more prerequisites.


<h2 class="section-heading">De Rham cohomology groups</h2>

To recap what we have know so far about closed and exact differential forms: For any $k$, a smooth $k$-form $\omega$ is **_closed_** if $d\omega = 0$, and **_exact_** if it can be written as $d\omega = df$. Since $d \circ d = 0$, as we have seen before, every exact $k$-form is closed. De Rham cohomology will tell us about the opposite implication, whether every closed $k$-form is exact.

Let $M$ be a smooth manifold and let $p$ be a nonnegative integer. Since the exterior derivative $d$ is linear, its kernel and image are linear subspaces. We define the followings:

$$
\begin{align}
    \mathcal{Z}^p(M) &:= \mathrm{Ker} \left( d: \Omega^p(M) \to \Omega^{p+1}(M) \right)
    \, , \\
    \mathcal{B}^p(M) &:= \mathrm{Im} \left( d: \Omega^{p-1}(M) \to \Omega^p(M) \right) \, .
\end{align}
$$

Notice that the kernel of $d: \Omega^p(M) \to \Omega^{p+1}(M)$ is the linear subspace

$$
    \{ \omega \in \Omega^p(M) : d\omega = 0 \}
$$

while the image of $d: \Omega^p(M) \to \Omega^{p+1}(M)$ is the linear subspace

$$
    \{ d\omega \in \Omega^p(M) : \omega \in \Omega^{p-1}(M) \} \, .
$$

Based on our definitions, $\mathcal{Z}^p(M)$ and $\mathcal{B}^p(M)$ are thus the subspace of closed $p$-forms and exact $p$-forms on $M$, respectively. By convention, we consider $\Omega^p(M)$ to be the zero vector space when $p < 0$ or $p > n = \mathrm{dim} \, M$. This implies that, $\mathcal{B}^0(M) = 0$ and $\mathcal{Z}^n(M) = \Omega^n(M)$.

Since every exact form is closed, this suggests that $\mathcal{B}^p \subseteq \mathcal{Z}^p(M)$. We can therefore define the $p$th **_de Rham cohomology group_** of $M$ to be the quotient vector space

$$
    H^p_{\text{dR}}(M) := \frac{\mathcal{Z}^p(M)}{\mathcal{B}^p(M)} \, .
$$

To be more explicit, this means that for each $p$, the quotient space $H^p_{\text{dR}}(M)$ is built by declaring two elements $\omega, \nu$ of $\mathcal{Z}^p(M)$ to be equivalent if their difference $\omega - \nu$ is in $\mathcal{B}^p(M)$. The set of all elements that are equivalent to $\omega$ is denoted by the bracket

$$
    [\omega] := \{ \nu \in \mathcal{Z}^p(M) : \omega - \nu \in \mathcal{B}^p(M) \} \, .
$$

The $p$th de Rham cohomology group of $M$ therefore consists of the equivalence classes in the form of

$$
    H^p_{\text{dR}}(M) = \{ [\omega] : \omega \in \mathcal{Z}^p(M) \}
$$

Since $\Omega^p(M) = 0$ for $p < 0$ or $p > n = \mathrm{dim} \, M$, then $H^p_{\text{dR}}(M) = 0$ in those cases. For $$

<h2 class="section-heading">References</h2>

1. Lee, John M. "Smooth manifolds." Introduction to Smooth Manifolds. Springer, New York, NY, 2013. 1-31.
