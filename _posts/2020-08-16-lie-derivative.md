---
layout:     post
title:      "Geometric Intuition of Lie Brackets"
subtitle:   "We have discussed the abstract definition of Lie bracket. However, its geometric meaning is still unclear. In this post, armed with integral curves and flows, we attempt to answer this question."
date:       2020-08-16 09:00
author:     "wiseodd"
header-img: "img/VectorField.svg"
category:   techblog
tags:       [math]
---


_**Disclaimer.** This post is my study notes on Lee's geometry books [1, 2], containing a condensed (in terms of topics) yet more verbose (in terms of details e.g. in the proofs) version of Lee's writings along with my personal interpretation and commentaries._
<br/><br/>


[The Lie bracket]({% post_url 2020-03-14-covector-field %}) is a useful operator for combining two smooth vector fields on a smooth manifold. However, even after seeing its definition and properties, at this point its geometric meaning is still unclear. But before we can attempt to answer this question, we need to study two prerequisites: integral curves and flows. As always, the Einstein's summation convention is employed.


<h2 class="section-heading">Quick Preliminary: Velocity Vectors of Curves</h2>

If $M$ is a smooth $n$-manifold, we define a **_curve_** in $M$ to be the continuous map $\gamma: I \to M$ where $I \subseteq \R$ is an interval. The **_velocity_** of $\gamma$ at an arbitrary $t_0 \in I$ is the tangent vector

$$
    \gamma'(t_0) = d\gamma\left( \left.\frac{d}{dt}\right\vert_{t=t_0} \right) \in T_{\gamma(t_0)} M,
$$

where $d\gamma$ is the differential operator mapping tangent vectors on $I$ (seen as a smooth manifold) to tangent vectors on $M$ and $d/dt \vert_{t=t_0}$ is the standard coordinate basis vector in $T_{t_0}\R$. This velocity vector acts on smooth functions by

$$
    \gamma'(t_0)f = d\gamma\left( \left.\frac{d}{dt}\right\vert_{t=t_0} \right) f = \left.\frac{d}{dt}\right\vert_{t=t_0} (f \circ \gamma) = (f \circ \gamma)'(t_0) .
$$

Intuitively, $\gamma'(t_0)$ is the derivation at $\gamma(t_0)$ obtained by taking the derivative of a function along $\gamma$.


<h2 class="section-heading">Integral Curves</h2>

Let $M$ be a smooth $n$-manifold. If $V$ is a vector field on $M$ and $I \subseteq \R$ is an interval containing $0$, an **_integral curve_** of $V$ is a differentiable curve $\gamma: I \to M$ whose velocity at each point is equal to the value of $V$ at that point. That is,

$$
    \gamma'(t) = V_{\gamma(t)} \qquad \forall \, t \in I ,
$$

Furthermore, we call $\gamma(0)$ as the **_starting point_** of $\gamma$. Intuitively, given a bunch of arrows on a manifold, we follow those arrow such that at any given point, the arrow attached onto that point is tangent to our path.

**Example 1.** Let $(x, y)$ be the Cartesian coordinates on $\R^2$ and let $V = \partial/\partial x$ a vector field. The integral curves of $V$ are the straight lines parallel to the $x$-axis: $\gamma(t) = (a + t, b)$ for some constants $a, b$.

//
{:.right}

Finding integral curves boils down to solving a system of ODEs. Let $V \in \mathfrak{X}(M)$ be a smooth vector field and $\gamma: I \to M$ a smooth curve. In a smooth coordinate chart $(U, (x^i))$, we can write the curve as $\gamma(t) = \left( \gamma^1(t), \dots, \gamma^n(t) \right)$. Then the condition for $\gamma$ to be an integral curve of $V$ in the definition above can be written as

$$
    \left. \dot{\gamma}^i(t) \frac{\partial}{\partial x^i} \right\vert_{\gamma(t)} = \left. V^i(\gamma(t)) \frac{\partial}{\partial x^i} \right\vert_{\gamma(t)} \, .
$$

(Recall that $V^i: U \to \R$ is the $i$-th component function of $V$.) Thus, we have the following autonomous ODEs

$$
    \dot{\gamma}^i(t) = V^i \left( \gamma^1(t), \dots, \gamma^n(t) \right), \qquad i = 1, \dots, n .
$$

The nomenclature "integral curve" is in fact arises from this ODEs formulation, since solving ODEs can be thought as an integration problem. Here is an example.

**Example 2.** Let $V = x \partial/\partial y - y \partial/\partial x$ be a vector field on $\R^2$ with the standard coordinates. If $\gamma: \R \to \R^2$ with $\gamma(t) = (x(t), y(t))$ is a smooth curve, then the condition for $\gamma$ to be an integral curve of $V$ is

$$
    x'(t) \left. \frac{\partial}{\partial x} \right\vert_{\gamma(t)} + y'(t) \left. \frac{\partial}{\partial y} \right\vert_{\gamma(t)} = x(t) \left. \frac{\partial}{\partial y} \right\vert_{\gamma(t)} - y(t) \left. \frac{\partial}{\partial x} \right\vert_{\gamma(t)} .
$$

This means that we have the following system of ODEs:

$$
\begin{align}
    x'(t) &= -y(t),\\[5pt]
    y'(t) &= x(t).
\end{align}
$$

//
{:.right}


Here are two properties of integral curves regarding affine reparametrizations.


**Lemma 3 (Rescaling Lemma).** _Let $M$ be a smooth $n$-manifold and $V \in \mathfrak{X}(M)$. Let $I \subseteq \R$ be an interval and $\gamma: I \to M$ be an integral curve of $V$. Then, for any $\alpha \in \R$, the curve $\tilde{\gamma}: \tilde{I} \to M$ defined by $\tilde{\gamma}(t) := \gamma(\alpha t)$ is an integral curve of $\alpha V$ with $\tilde{I} := \\{ t: \alpha t \in I \\}$_

_Proof._ First recall the definition of the velocity vectors of a curve. Then, by (i) the chain rule, (ii) the definition of the action of velocity vectors on smooth functions above, and (iii) the fact that $\gamma$ is an integral curve of $V$, we have that

$$
\begin{align}
    \tilde{\gamma}'(t_0)f &= \left.\frac{d}{dt}\right\vert_{t=t_0} (f \circ \tilde{\gamma})(t) = \left.\frac{d}{dt}\right\vert_{t=t_0} (f \circ \gamma)(\alpha t) \\[10pt]
        &= \alpha (f \circ \gamma)'(\alpha t_0) \\[5pt]
        &= \alpha \gamma'(\alpha t_0) f \\[5pt]
        &= \alpha V_{\gamma(\alpha t_0)} f = \alpha V_{\tilde{\gamma}(t_0)} f.
\end{align}
$$

This result implies that $\tilde{\gamma}'(t_0) = \alpha V_{\tilde{\gamma}(t_0)}$ and thus $\tilde{\gamma}$ is an integral curve of $\alpha V$.

$\square$
{:.right}


**Lemma 4 (Translation Lemma).** _Let $M$ be a smooth $n$-manifold and $V \in \mathfrak{X}(M)$. Let $I \subseteq \R$ be an interval and $\gamma: I \to M$ be an integral curve of $V$. Then, for any $\beta \in \R$, the curve $\tilde{\gamma}: \tilde{I} \to M$ defined by $\tilde{\gamma}(t) := \gamma(\beta + t)$ is also an integral curve of $V$, with $\tilde{I} := \\{ t: \beta + t \in I \\}$_

_Proof._ We use the same technique as the previous proof. That is, we let $f$ be a smooth function defined in a neighborhood of $\tilde{\gamma}(t_0)$ for some $t_0$. Then, the action of the velocity vector $\tilde{\gamma}'(t_0)$ on $f$ is given by

$$
\begin{align}
    \tilde{\gamma}'(t_0)f &= \left.\frac{d}{dt}\right\vert_{t=t_0} (f \circ \gamma)(\beta + t) \\[10pt]
        &= (f \circ \gamma)'(\beta + t_0) \\[5pt]
        &= \gamma'(\beta + t_0) f \\[5pt]
        &= V_{\gamma(\beta + t_0)} f \\[5pt]
        &= \alpha V_{\tilde{\gamma}(t_0)} f.
\end{align}
$$

This implies that $\tilde{\gamma}'(t_0) = V_{\tilde{\gamma}(t_0)}$ and thus $\tilde{\gamma}$ is an integral curve of $V$.

$\square$
{:.right}


<h2 class="section-heading">Flows</h2>

We will now consider not just a single integral curve, but the _family_ of integral curves associated with a vector field. We will first show the abstract definition and show the connection to integral curves of a vector field afterwards.

We define a **_global flow_** of $M$ to be a continuous map $\theta: \R \times M \to M$ satisfying the following properties for all $s, t \in \R$ and $p \in M$:

$$
    \theta(t, \theta(s, p)) = \theta(s + t, p), \qquad \theta(0, p) = p.
$$

Given a global flow $\theta$ on $M$, we can define two collections of maps as above. First, for each $t \in \R$, we define a continuous map $\theta_t: M \to M$ by

$$
    \theta_t(p) := \theta(t, p).
$$

Using this definition, the properties of global flow above can therefore be written as

$$
    \theta_t \circ \theta_s = \theta_{s + t} \, , \qquad \theta_0 = \text{Id}_M.
$$

Second, for each $p \in M$, we define a curve $\theta^{(p)}: \R \to M$ by

$$
    \theta^{(p)}(t) := \theta(t, p).
$$

Let $\theta: \R times M \to M$ be a smooth global flow. For each $p \in M$ we define a tangent vector $V_p \in T_p M$ by

$$
    V_p := {\theta^{(p)}}'(0).
$$

That is, at each $p \in M$, we set $V_p$ to be the velocity vector of the curve $\theta^{(p)}$ at the starting point $p$. Considering _all_ points in $M$, we have the assignment $p \mapsto V_p$, which is a vector field on $M$. We call it the **_infinitesimal generator of_** $\theta$.

The following proposition shows that every smooth global flow is derived from the integral curves of some smooth vector field.

**Proposition 5.** _Let $\theta: \R \times M \to M$ be a smooth global flow on a smooth manifold $M$. The infinitesimal generator $V$ of $\theta$ is a smooth vector field on $M$, and each curve $\theta^{(p)}$ is an integral curve of $V$._

_Proof._ First, for the smoothness of $V$, it suffices to show that the function $Vf$ is smooth for every smooth real-valued function $f$ defined on an open subset $U \subseteq M$. Let $f$ as above and $p \in M$ be arbitrary. Then by definition,

$$
\begin{align}
    (Vf)(p) &= V_p f = {\theta^{(p)}}'(0) f \\[5pt]
        &= \left.\frac{d}{dt}\right\vert_{t=0} \left(f \circ \theta^{(p)} \right)(t) \\[10pt]
        &= \left.\frac{d}{dt}\right\vert_{t=0} f(\theta^{(p)}(t)) \\[10pt]
        &= \left.\frac{\partial}{\partial t}\right\vert_{t=0} f(\theta(t, p))
\end{align}
$$

Since $\theta$ and $f$ are smooth, the composition $f(\theta(t, p))$ is smooth function of $(t, p)$ and therefore also its partial derivative w.r.t. $t$, which is a function of $p$. This implies that $Vf$ is a smooth function and thus $V$ is smooth.

Second, we will show that $\theta^{(p)}$ is an integral curve of $V$. This means we have to show that ${\theta^{(p)}}'(t) = V_{\theta^{(p)}(t)}$ for all $p \in M$ and $t \in \R$. Let $t_0 \in \R$ be arbitrary and let $q := \theta^{(p)}(t_0) = \theta_{t_0}(p)$. We have to show that ${\theta^{(p)}}'(t_0) = V_q$. By definition of global flow, for all $t$,

$$
\begin{align}
    \theta^{(q)}(t) &= \theta_t(q) = \theta_t(\theta_{t_0}(p)) = (\theta_t \circ \theta_{t_0})(p) = \theta_{t_0 + t}(p) \\[5pt]
        &= \theta^{(p)}(t_0 + t).
\end{align}
$$

Therefore, for any smooth real-valued function $f$ defined in a neighborhood of $q$, we have that

$$
\begin{align}
    V_q f &= {\theta^{(q)}}'(0) f = \left.\frac{d}{dt}\right\vert_{t=0} f(\theta^{(q)}(t)) \\[10pt]
        &= \left.\frac{d}{dt}\right\vert_{t=0} f(\theta^{(p)}(t_0 + t)) \\[10pt]
        &= {\theta^{(p)}}'(t_0) f .
\end{align}
$$

This implies that ${\theta^{(p)}}'(t_0) = V_q$.

$\square$
{:.right}


**Example 6.** The vector fields in Examples 1 and 2 have integral curves defined for all $t \in \R$, so they generate global flows:

The flow of $V := \partial/\partial x$ in $\R^2$ (Example 1) is the map $\theta: \R \times \R^2 \to \R^2$ given by

$$
    \theta^{(x, y)}(t) := (x + t, y).
$$

This is because by Proposition 5 and the definition of global flows, for each $p = (x, y) \in \R^2$, the curve $\theta^{p}$ is an integral curve starting at $p$.

Meanwhile, from Example 2, we have the vector field $V := x \, \partial/\partial y - y \, \partial/\partial x$. The integral curve of $V$ is the given by the solutions of the system of ODEs in Example 2, which are

$$
    x(t) = a \, \cos t - b \, \sin t, \qquad y(t) = a \, \sin t + b \, \cos t,
$$

for some constants $a, b$.

So, the flow of $V$ is the map $\theta: \R \times \R^2 \to \R^2$ given by

$$
    \theta^{(x, y)}(t) = (x \, \cos t - y \, \sin t, x \, \sin t + y \, \cos t),
$$

One can easily check that the integral curve $\theta^{(x, y)}$ starts at $(x, y)$ since $\theta^{(x, y)}(0) = (x, y)$.

//
{:.right}


<h2 class="section-heading">Lie Derivatives</h2>

What is the directional derivative of a _vector field_?

In calculus, given a smooth vector field $W$ on $\R^n$ and a vector $v \in \R^n$, the directional derivative of $W$ in the direction of $v$ is given by the vector

$$
    D_v W(p) = \left.\frac{d}{dt}\right\vert_{t=0} W_{p + tv} = \lim_{t \to 0} \frac{W_{p + tv} - W_p}{t}.
$$

However, this definition does not work in arbitrary manifolds since it relies on the assumption that $\R^n$ is a vector space, thus the tangent vector $W_{p+tv}$ and $W_p$ can be both viewed as elements of $\R^n$.

One can perhaps fix this issue by replacing the expression $p + tv$ with a curve $\gamma(t)$ that starts at $p$ and whose initial velocity is $v$. Even then, the expression $W_{\gamma(t)} - W_{\gamma(0)}$ still does not make sense since $W_{\gamma(t)}$ and $W_{\gamma(0)}$ come from two different vector spaces $T_{\gamma(t)}M$ and $T_{\gamma(0)}M$, respectively. We do not suffer this issue in Euclidean space since there is a canonical identification of each tangent space with $\R^n$ itself---there is no such thing on general manifolds.

We can circumvent this problem by replacing the directional vector $v \in T_p M$ with a vector field $V \in \mathfrak{X}(M)$ and use the flow of $V$ to push values of $W$ back to $p$ and then differentiate. Here is the definition.

Let $M$ be a smooth $n$-manifold, $V \in \mathfrak{X}(M)$, and let $\theta$ be the flow of $V$. For any $W \in \mathfrak{X}(M)$, we define a vector field $\mathcal{L}\_V W$ on $M$ called the **_Lie derivative_** of $W$ with respect to $V$ by

$$
\begin{align}
    (\mathcal{L}_V W)_p &:= \left.\frac{d}{dt}\right\vert_{t=0} d(\theta_{-t})_{\theta_t(p)} \left( W_{\theta_t(p)} \right) \\[10pt]
        &= \lim_{t = 0} \frac{d(\theta_{-t})_{\theta_t(p)} \left( W_{\theta_t(p)} \right) - W_p}{t},
\end{align}
$$

provided the derivative exists. Recall that $\theta_{-t}$ maps $M \to M$, so its differential at $d(\theta_{-t})\_{\theta_t(p)}$ at $\theta_t(p)$ maps $T_{\theta_t(p)} M \to T_{\theta_{-t}(\theta_t(p))} M = T_p M$ (in coordinates it is represented by the Jacobian matrix of $\theta_{-t}$). For small $t \neq 0$, the subtraction above makes sense since $\theta_t$ is defined in a neighborhood of $p$ and $\theta_{-t}$ is the inverse of $\theta_t$, so both $d(\theta_{-t})\_{\theta_t(p)} \left( W\_{\theta_t(p)} \right)$ and $W_p$ are elements of $T_p M$.

The definition of $\mathcal{L}\_V W$ above is not very useful for computations since typically the flow is impossible to write down explicitly (one has to solve system of ODEs!). And here is where the Lie bracket comes in.


**Theorem 7.** _If $M$ is a smooth $n$-manifold and $V, W \in \mathfrak{X}(M)$, then $\mathcal{L}_V W = [V, W]$._

_Proof._ Suppose $V, W \in \mathfrak{X}(M)$ and $\mathcal{R}(V) \subseteq M$ be the set of points $p \in M$ s.t. $V_p \neq 0$. Note that $\mathcal{R}(V)$ is open in $M$ by continuity of $V$ and its closure is the support of $V$. We will show that $(\mathcal{L}\_V W)\_p = [V, W]\_p$ for all $p \in M$. We have three cases.

_Case 1: $p \in \mathcal{R}(V)$._ In this case, we can choose smooth coordinates $(u^i)$ on a neighborhood $U$ of $p$ in which $V$ has the coordinate representation

$$
    V = \frac{\partial}{\partial u^1} ,
$$

(the reason for this comes from the flowout theory and beyond the scope of this post). In these coordinates, the flow of $V$ is $\theta_t(u) := (u^1 + t, u^2, \dots, u^n)$ (cf. Examples 1 and 6). For each fixed $t$, the Jacobian of $\theta_{-t}$ is therefore an identity matrix, which represents $d(\theta_{-t})\_{\theta_t(u)}$ in these coordinates. So, for any $u \in U$:

$$
\begin{align}
    d(\theta_{-t})_{\theta_t(u)} \left( W_{\theta_t(u)} \right) &= d(\theta_{-t})_{\theta_t(u)} \left( W^j \left( u^1 + t, u^2, \dots, u^n \right) \left.\frac{\partial}{\partial u^j}\right\vert_{\theta_t(u)} \right) \\[10pt]
        &= W^j \left( u^1 + t, u^2, \dots, u^n \right) \left.\frac{\partial}{\partial u^j}\right\vert_{u}.
\end{align}
$$

Using the definition of the Lie derivative and the chain rule, we obtain

$$
\begin{align}
    (\mathcal{L}_V W)_u &= \left.\frac{d}{dt}\right\vert_{t=t_0} W^j \left( u^1 + t, u^2, \dots, u^n \right) \left.\frac{\partial}{\partial u^j}\right\vert_{u} \\[10pt]
        &= \frac{\partial W^j}{\partial u^1} ( u^1, u^2, \dots, u^n) \left.\frac{\partial}{\partial u^j}\right\vert_{u}
\end{align}
$$

On the other hand, from Proposition 5 in [the previous post]({% post_url 2020-03-14-covector-field %}), we have that

$$
\begin{align}
    [V, W]_u &= \left( V^i(u) \frac{\partial W^j}{\partial u^i}(u) - W^i(u) \frac{\partial V^j}{\partial u^i}(u) \right) \left.\frac{\partial}{\partial u}\right\vert_{u} \\[10pt]
        &= \frac{\partial W^j}{\partial u^1}(u) \left.\frac{\partial}{\partial u}\right\vert_{u} .
\end{align}
$$

Thus, $(\mathcal{L}\_V W)\_u = [V, W]\_u$.

_Case 2: $p \in \text{supp }V$._ Since $\text{supp }V$ is the closure of $\mathcal{R}(V)$, the desired result follows by continuity from Case 1.

_Case 3: $p \in M \setminus \text{supp }V$._ In this case $V$ is identically zero on a neighborhood of $p$. This implies that $\theta_t$ is equal to the identity map in a neighborhood of $p$ for all $t$ since the integral curves of $V$ are constant---their starting points. Therefore $d(\theta_{-t})\_{\theta_t(p)} \left( W_{\theta_t(p)} \right) = W_p$ and thus $(\mathcal{L}\_V W)\_p = 0$. Furthermore it is easy to see from the formula of $[V, W]\_u$ above that it is also equal to zero.

Taken all the cases together, we conclude that $\mathcal{L}\_V W = [V, W]$.

$\square$
{:.right}


This theorem gives us a precise geometric interpretation of the Lie bracket of two vector fields $V, W$: It is the directional derivative of $W$ along the flow of $V$. For a visual intuition I recommend this [video by eigenchris](https://www.youtube.com/watch?v=SfOiOPuS2_U).


<h2 class="section-heading">References</h2>

1. Lee, John M. "Smooth manifolds." Introduction to Smooth Manifolds. Springer, New York, NY, 2013. 1-31.
2. <https://www.youtube.com/watch?v=SfOiOPuS2_U>
