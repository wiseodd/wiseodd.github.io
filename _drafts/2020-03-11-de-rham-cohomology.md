---
layout:     post
title:      "De Rham Cohomology"
subtitle:   "One of the most ubiquitous applications in the field of geometry is the optimization problem. In this article we will discuss the familiar optimization problem on Euclidean spaces by focusing on the gradient descent method, and generalize them on Riemannian manifolds."
date:       2019-03-11 12:00
author:     "wiseodd"
header-img: "img/manifold.svg"
category:   techblog
tags:       [math]
---

In vector calculus, we know that a vector field $V: U \to \R^3$ defined on an open subset $U \subseteq \R^3$ is called conservative if there exists $f \in C^1(U)$ such that

$$
    V = \nabla f \, .
$$

This kind of vector field is important since it (i) has zero curl (i.e. irrotational) and (ii) a line integral w.r.t. to this vector field is easy to compute. In term of dynamical systems, having zero (or less) curl could be beneficial since it can potentially converge to an equilibrium point faster.

Because of the reasons above, it is important to have an easy way to check whether a given vector field is conservative or not, other than proving that the function $f$ itself exists or not. In this article, we will see a more general view of vector fields on a smooth manifold and attempt to answer this question in this setting. Important ingredients for this are differential forms and de Rham cohomology groups.

We will begin by re-interpreting Euclidean vector fields as covector fields on a smooth manifold. We will then re-define the term ''conservative'' in this context. A necessary condition for a covector field to be conservative will then be presented. Finally, we devote a bit of our time in constructing de Rham cohomology groups, which we will use to answer the reverse direction of the previous statement.


<h2 class="section-heading">Covector fields on smooth manifolds</h2>

For any smooth manifold $M$, the disjoint union

$$
    T^*M := \coprod_{p \in M} T^*_p M
$$

is called the **_cotangent bundle_** of $M$ (see [the notes on Riemannian geometry]({% post_url 2019-02-17-riemannian-geometry %})). A **_covector field_** (also known as a differential 1-form) is a function $M \to T^\*M$ defined by $p \mapsto \omega(p) \in T^*_pM$. That is, a covector field assigns at each point a covector in the cotangent space of that point. Covector fields is the dual of vector field: whereas vector fields can be thought as assigning each point of $M$ with an arrow, covector fields can be thought as assigning at each point of $M$ a function that "measure" the corresponding arrow.

One important application of covector fields is that they generalize the notion of gradient vector field in the Euclidean space to smooth manifolds. To see this, let $f \in C^\infty(M)$. We define a covector field $df$, called the **_differential of f_**, by

$$
    df_p(v) = vf \qquad \text{for} \enspace v \in T_pM
$$

for each point $p \in M$. That is, at each point $p$, the differential $df_p(v)$ is just the directional derivative of $f$ in the direction $v$. Given coordinates $(x^i) := (x^1, \dots, x^n)$, on an open subset $U \subseteq M$ of an $n$-dimensional manifold $M$, the differential $df$ is represented point-wise by

$$
    df_p = \frac{\partial f}{\partial x^i}(p) \, dx^i \vert_p \, .
$$

(Note we use the Einstein summation convention.) That is each component of $df_p$ is just the partial derivative of $f$ evaluated at $p$. Notice that this is the definition of the gradient in the Euclidean space. So, in general, a "vector" consisting of all partial derivative of a function is not a gradient, but a differential. And it is not a vector field either, but a covector field. This distinction is important if we are in the non-Euclidean setting.


<h2 class="section-heading">Line integrals</h2>

Another application of covector fields is for generalizing the notion of a line integral that we learn in calculus to smooth manifolds. If $M$ is a smooth manifold, we define a **_smooth curve segment_** in $M$ by a continuous curve $\gamma: [a, b] \to M$ where $[a, b] \subset \R$ is a compact interval regarded as a smooth manifold with boundary. It is a **_piecewise smooth curve segment_** if there exists a finite partition $a = a_0 < a_1 < \dots < a_k = b$ of $[a, b]$ such that the restriction $\gamma \vert_{[a_{i-1}, a_i]}$ is smooth for each $i$.

Suppose $\omega$ is a covector field on $M$ and $\gamma:[a, b] \to M$ is a smooth curve segment on $M$. The **_line integral of $\omega$ over $\gamma$_** is the real number

$$
    \int_\gamma \omega = \int^b_a \omega_{\gamma(t)}(\gamma'(t)) \, dt \, .
$$

Moreover, if $\gamma$ is piecewise smooth, then

$$
    \int_\gamma \omega = \sum_{i=1}^k \int_{a_{i-1}}^{a_i} \omega_{\gamma(t)}(\gamma'(t)) \, dt \, .
$$

In the case where the covector field $\omega$ is a differential $df$ of some real-valued function $f$ on $M$, the computation of the line integral is trivial. This result is known as _the fundamental theorem for line integrals_.

**Theorem 1 (Fundamental Theorem for Line Integrals).** _Let $M$ be a smooth manifold. Suppose $f$ is a smooth real-valued function on $M$ and $\gamma: [a, b] \to M$ is a piecewise smooth curve segment in $M$. Then_

$$
    \int_\gamma df = f(\gamma(b)) - f(\gamma(a)) \, .
$$

_Proof._ By definition above,

$$
    \int_\gamma df = \int_a^b df_{\gamma(t)} (\gamma'(t)) \, dt \, .
$$

Furthermore, we can show that

$$
    \int_a^b df_{\gamma(t)} (\gamma'(t)) \, dt = \int_a^b (f \circ \gamma)'(t) \, dt \, .
$$

Since $(f \circ \gamma)'$ is the derivative of the real-valued function $f \circ \gamma$ on $[a, b]$, therefore, by the fundamental theorem of calculus, $\int_\gamma df = f\circ\gamma(b) - f\circ\gamma(a)$.

Since $\gamma$ is piecewise smooth, let $a = a_0 < \dots < a_k = b$ be the endpoints of the sub-intervals of $\gamma$ s.t. for each $i$, the restriction $\gamma \vert_{[a_{i-1}, a_i]}$ is smooth. Hence,

$$
\begin{align}
    \int_\gamma df &= \sum_{i=1}^k f \circ \gamma(a_i) - f \circ \gamma(a_{i-1}) = f \circ \gamma(b) - f \circ \gamma(a) \, ,
\end{align}
$$

since in the summation, everything cancels out except the terms $-f \circ \gamma(a)$ and $f \circ \gamma(b)$.

$\square$
{:.right}


<h2 class="section-heading">Conservative covector fields</h2>

We say a smooth covector field $\omega$ on $M$ is **_exact_** if there is a function $f \in C^\infty(M)$ such that $\omega = df$. Because of the theorem above, it is therefore important to be able to identify covector fields that are exact. In other words, we want to know both necessary and sufficient conditions for a covector field to be exact. The theorem above provides a hint: If $\gamma$ is a **_closed curve segment_**, i.e. $\gamma(a) = \gamma(b)$, then $\int_\gamma df = 0$ for any $f \in C^\infty(M)$. Formally, we say a covector field $\omega$ is **_conservative_** if for every piecewise smooth closed curve $\gamma$, the line integral $\int_\gamma \omega$ is zero. The following result shows that conservativeness is equivalent to exactness.

**Theorem 2.** _Let $M$ be a smooth manifold. A smooth covector field on $M$ is conservative if and only if it is exact._

_Proof._ See [1], Theorem 11.42.

$\square$
{:.right}

There is a necessary condition for a covector field to be exact (and hence conservative). First we need another definition. A smooth covector field $\omega$ is **_closed_** if its components in _every_ smooth chart satisfy

$$
    \frac{\partial \omega_j}{\partial x^i} = \frac{\partial \omega_i}{\partial x^j} \, .
$$

(Note that, in the Euclidean case, this implies that the Jacobian of $\omega$ is symmetric.)

**Proposition 3.** _Every exact covector field is closed._

_Proof._ Let $\omega$ be an arbitrary exact covector field. Let $f \in C^\infty(M)$ s.t. $\omega = df$ and let $(U, (x^i))$ be any smooth chart on $M$. By [Schwarz's theorem](https://en.wikipedia.org/wiki/Symmetry_of_second_derivatives#Schwarz's_theorem), $f$ satisfies

$$
    \frac{\partial^2 f}{\partial x^i \partial x^j} = \frac{\partial^2 f}{\partial x^j \partial x^i}
$$

on $U$. Furthermore, since $\omega = df$, its component $\omega_i$ is equal to $\partial f/ \partial x^i$ for all $i$, by the definition of $df$. Plugging it back to the previous equation, we have

$$
    \frac{\partial}{\partial x^j} \left( \frac{\partial f}{\partial x^i} \right) = \frac{\partial}{\partial x^i} \left( \frac{\partial f}{\partial x^j} \right) \iff \frac{\partial \omega_i}{\partial x^j} = \frac{\partial \omega_j}{\partial x^i}  \, .
$$

Thus, $\omega$ is closed as required.

$\square$
{:.right}


Proposition 3 along with Theorem 2 therefore imply that we now have a necessary condition for a covector field to be conservative. The only thing left is the reverse direction: What are the conditions for any covector to be conservative? Here is a motivating example why this question might not be trivial to answer.

**Example 4.** Let $M = \R^2 \setminus \\{ 0 \\}$ and let $\omega$ be the covector field on $M$ given by

$$
    \omega := \frac{x \, dy - y \, dx}{x^2 + y^2} \, .
$$

Let $\gamma: [0, 2\pi] \to M$ be the curve segment defined by $\gamma(t) := (\cos t, \sin t)$. Therefore $\gamma'(t) = (-\sin t \, dt, \cos t \, dt)$ and the line integral can be written as

$$
\begin{align}
    \int_0^{2\pi} \omega_{\gamma(t)} (\gamma'(t)) dt &= \int_0^{2\pi} \frac{\cos t \, (\cos t \, dt) - \sin t \, (\sin t \, dt)}{\cos^2 t + \sin^2 t} \\
        &= \int_0^{2\pi} \cos^2 t \, dt + \sin^2 t \, dt = \int_0^{2\pi} (\cos^2 t + \sin^2 t) \, dt \\
        &= \int_0^{2\pi} dt = 2\pi \, .
\end{align}
$$

We can see that $\gamma$ is the counterclockwise unit circle and thus is a closed curve segment. However as we have just seen, the line integral is non-zero. Thus, $\omega$ is not conservative on $\R^2 \setminus \\{ 0 \\}$. But, $\omega$ is a closed covector field since

$$
    \frac{\partial \omega_1}{\partial x} = \frac{y^2 - x^2}{(x^2 + y^2)^2} = \frac{\partial \omega_2}{\partial y} \, .
$$

Therefore, this shows that in $\R^2 \setminus \\{ 0 \\}$, closedness does not necessarily imply exactness.

What if we restrict the domain of $\omega$ to be the right half-plane $U := \\{ (x, y): x > 0 \\}$ of $\R^2$? There, if we define $f: U \to \R$ by $\tan^{-1} y/x$, which is a smooth function on $U$, we can verify that $\omega = df$. Thus, in this case $\omega$ is exact and therefore conservative by Theorem 2.

As a further note, this problem can be seen more clearly if we think $f$ as the angle function $\theta = \tan^{-1} y/x$ of polar coordinates. On $\R^2 \setminus \\{ 0 \\}$, there are some discontinuities in $\theta$ which makes it non-smooth. One such discontinuities is at $\theta = 0$, since in this case either $y$ or both $y$ and $x$ must be zero.

//
{:.right}

<h2 class="section-heading">References</h2>

1. Lee, John M. "Smooth manifolds." Introduction to Smooth Manifolds. Springer, New York, NY, 2013. 1-31.
2. Lee, John M. Riemannian manifolds: an introduction to curvature. Vol. 176. Springer Science & Business Media, 2006.
