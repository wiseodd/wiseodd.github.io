---
layout:     post
title:      "Towards de Rham Cohomology, Part I: Covector Fields"
subtitle:   "In this three-part series, we will built our intuition towards de Rham cohomology. Particularly, in this article, we begin by studying covector fields on smooth manifolds. We then talk about the question of identifying conservative covector fields, which motivates the future article on de Rham cohomology."
date:       2020-03-14 08:00
author:     "wiseodd"
header-img: "img/VectorField.svg"
category:   techblog
tags:       [math]
---

In vector calculus, we know that a vector field $V: U \to \R^3$ defined on an open subset $U \subseteq \R^3$ is called conservative if there exists $f \in C^1(U)$ such that

$$
    V = \nabla f \, .
$$

This kind of vector field is important since it (i) has zero curl (i.e. irrotational) and (ii) a line integral w.r.t. to this vector field is easy to compute. In term of dynamical systems, having zero (or less) curl could be beneficial since it can potentially converge to an equilibrium point faster.

Because of the reasons above, it is important to have an easy way to check whether a given vector field is conservative or not, other than proving that the function $f$ itself exists or not. In this article, we will see a more general view of these concepts on a smooth manifold and attempt to answer this question in this setting. Important ingredients for this are differential forms and de Rham cohomology groups.

We will begin by re-interpreting Euclidean vector fields as covector fields on smooth manifolds. We will then re-define the term ''conservative'' in this context. A necessary condition for a covector field to be conservative will then be presented. Finally, we will see that to identify a conservative covector field, one needs to take global topological properties of the manifold. This post can be seen as a summary of Lee's smooth manifolds book [1] with additional notes from myself.


<h2 class="section-heading">Covector fields on smooth manifolds</h2>

For any smooth manifold $M$, the disjoint union

$$
    T^*M := \coprod_{p \in M} T^*_p M
$$

is called the **_cotangent bundle_** of $M$ (see [the notes on Riemannian geometry]({% post_url 2019-02-17-riemannian-geometry %})). A **_covector field_** (also known as a differential 1-form) is a function $M \to T^\*M$ defined by $p \mapsto \omega(p) \in T^*_pM$. That is, a covector field assigns at each point a covector in the cotangent space of that point. Covector fields is the dual of vector field: whereas vector fields can be thought as assigning each point of $M$ with an arrow, covector fields can be thought as assigning at each point of $M$ a function that "measure" arrows at that point.

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

As a further note, this problem can be seen more clearly if we think $f$ as the angle function $\theta = \tan^{-1} y/x$ of polar coordinates. On $\R^2 \setminus \\{ 0 \\}$, there are some discontinuities in $\theta$ which makes it non-smooth. One such discontinuities is at $\theta = 0$, since in this case $y$ must be zero.

//
{:.right}

This example is the principal motivation of de Rham cohomology, which we will look into in a future article: we need to take into account the global topological properties of the domain of a covector field to answer whether it is exact or not. We can formalize the observation above in the following theorem.

**Theorem 5 (Poincaré Lemma for Covector Fields).** _Let $U$ be a star-shaped open subset of $\R^n$ or $\mathbb{H}^n$. That is, $U$ has the following property: There exists $c \in U$ s.t. for every $x \in U$, the line segment from $c$ to $x$ is entirely contained in $U$. Then every closed covector field on $U$ is exact._

_Proof._ Let $\omega = \omega_i dx^i$ be a closed covector field on $U$. Without loss of generality, we can assume that $c = 0$. For any $x \in U$, let $\gamma_x: [0, 1] \to U$ be the line segment from $0$ to $x$, defined by $\gamma_x(t) := tx$. Since $U$ is star-shape, the image of $\gamma_x$ lies entirely in $U$ for each $x \in U$. Define $f: U \to \R$ by

$$
    f(x) := \int_{\gamma_x} \omega \, .
$$

We need to show that $\omega = df$, i.e. $\partial f / \partial x^j = \omega_j$ for all $j$. We note that

$$
    f(x) = \int_0^1 \omega_{\gamma_x(t)}(\gamma'_x(t)) \, dt = \int_0^1 \left( \sum_{i=1}^n \omega_i(tx) x^i \right) \, dt \, ,
$$

where we have taken a similar step to the computation in Example 4. Now we need to compute the partial derivatives of $f$. Notice that all terms in the integrand are smooth. Hence, by [Leibniz's theorem](https://en.wikipedia.org/wiki/Leibniz_integral_rule), we can exchange the differentiation and integral to obtain

$$
\begin{align}
    \frac{\partial f}{\partial x^j}(x) &= \int_0^1 \left( \sum_{i=1}^n \frac{\partial}{\partial x^j} \omega_i(tx) x^i \right) \, dt \\
        &= \int_0^1 \left( \sum_{i=1}^n \frac{\partial \omega_i}{\partial x^j}(tx) t x^i + \omega_i(tx) \delta^i_j \right) \, dt \\
        &= \int_0^1 \left( \sum_{i=1}^n \frac{\partial \omega_i}{\partial x^j}(tx) t x^i + \omega_j(tx) \right) \, dt \, .
\end{align}
$$

Now, since $\omega$ is closed, we have $\partial \omega_i / \partial x^j = \partial \omega_j / \partial x^i$, and thus

$$
\begin{align}
    \frac{\partial f}{\partial x^j}(x) &= \int_0^1 \left( \sum_{i=1}^n \frac{\partial \omega_j}{\partial x^i}(tx) t x^i + \omega_j(tx) \right) \, dt \\
        &= \int_0^1 \frac{d}{dt}(t \omega_j(tx)) \, dt \\
        &= \left[ t \omega_j(tx) \right]_{t=0}^{t=1} \\
        &= \omega_j(x) \, ,
\end{align}
$$

as required.

$\square$
{:.right}

Here is a corollary of this theorem which states that every closed covector field is _locally_ exact, regardless of the global topology of the space.

**Corollary 6.** _Let $\omega$ be a closed covector field on a smooth manifold $M$. Then every point of $M$ has a neighborhood on which $\omega$ is exact._

_Proof._ We need to show that for every $p \in M$, there exists a neighborhood $U$ containing $p$ s.t. $\omega$ is exact on $U$. Therefore, let $p \in M$ be arbitrary. Since $\omega$ is closed, by definition, we can pick some smooth coordinate ball $U$ containing $p$. Since balls are convex and therefore star-shaped, Theorem 5 implies that $\omega$ is exact on $U$. Since $p$ is arbitrary, this property holds for every $p \in M$. Thus $\omega$ is locally exact.

$\square$
{:.right}

This corollary is useful in e.g. local analysis of a dynamical system around an equilibrium point: To show that the corresponding covector field is conservative, one only needs to show that its mixed partial derivatives commute there.

In the second part of this series of articles, we will generalize the notion of differential. We will talk about the _exterior derivative_ of higher order differential forms. The exterior derivative is an essential ingredient for defining de Rham cohomology, which will be studied in the third and final part of this series.

<h2 class="section-heading">References</h2>

1. Lee, John M. "Smooth manifolds." Introduction to Smooth Manifolds. Springer, New York, NY, 2013. 1-31.
