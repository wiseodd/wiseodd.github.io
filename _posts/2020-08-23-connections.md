---
layout:     post
title:      "Connections, Covariant Derivatives, and Parallel Transport"
subtitle:   "Build upon the problem of taking directional derivatives of vector fields on manifolds, we discuss very important concepts in Riemannian geometry: connections, covariant derivatives, and parallel transport. They will play a major role in our eventual discussion about curvatures."
date:       2020-08-23 09:00
author:     "wiseodd"
header-img: "img/manifold.svg"
category:   techblog
tags:       [math]
---


Previously, we studied [Lie derivatives]({% post_url 2020-08-16-lie-derivative %}), which can be used to compute the directional derivative of a vector field in the direction of another. However, as it turns out, Lie derivatives are not suitable for taking directional derivatives of vector fields along _curves_:


**Example 1.** Let $V := \partial/\partial x$ and $W := \partial/\partial x + y \, \partial/\partial y$ and $Y := \partial/\partial y$ be vector fields on $\R^2$ with the standard coordinate system. It is clear that along the $x$-axis, i.e. at $(x, 0) \, \forall x \in \R$, we have $V = W = \partial/\partial x$. Our intuition expects that both the Lie derivatives $\mathcal{L}\_V(Y)$ and $\mathcal{L}\_W(Y)$ coincides along the $x$-axis. However, a computation using the formula in Proposition 5 in [the previous post]({% post_url 2020-08-09-lie-bracket %}) reveals that

$$
\begin{align}
    \mathcal{L}_V(Y) &= [V, Y] = \left( V(Y^1) - Y(V^1) \right) \frac{\partial}{\partial x} + \left( V(Y^2) - Y(V^2) \right) \frac{\partial}{\partial y} \\
        &= \left( V(0) - Y(1) \right) \frac{\partial}{\partial x} + \left( V(1) - Y(0) \right) \frac{\partial}{\partial y} \\
        &= 0 ,
\end{align}
$$

and

$$
\begin{align}
    \mathcal{L}_W(Y) &= [W, Y] = \left( W(Y^1) - Y(W^1) \right) \frac{\partial}{\partial x} + \left( W(Y^2) - Y(W^2) \right) \frac{\partial}{\partial y} \\
        &= \left( W(0) - Y(1) \right) \frac{\partial}{\partial x} + \left( W(1) - Y(y) \right) \frac{\partial}{\partial y} \\
        &= 0 - \frac{\partial y}{\partial y} \frac{\partial}{\partial y} \\[5pt]
        &= - \frac{\partial}{\partial y} .
\end{align}
$$

Thus, along $(x, 0)$, we have $\mathcal{L}\_V(Y) \neq \mathcal{L}\_W(Y)$. This is because the Lie derivative considers the vector fields $V, W$ at the neighboring points _around_ the $x$-axis. Meanwhile, the expectation that both the derivatives of $Y$ coincides requires us to only consider points _exactly_ at the $x$-axis.

//
{:.right}


In this post, we will study a structure called _connection_ which enables us to take well-defined directional derivatives along curves (the $x$-axis in Example 1 can be seen as a curve).


<h2 class="section-heading">Connections</h2>

Let us begin with directional derivatives of vector fields on $\R^n$ with the standard coordinates, which we are familiar with from calculus. Given $Y \in \mathfrak{X}(M)$ and $v \in T_p \R^n$, we define the **_Euclidean directional derivative_** of $Y$ in the direction $v$ by

$$
    \bar{\nabla}_v Y = v(Y^i) \left.\frac{\partial}{\partial x^i}\right\vert_p ,
$$

where for each $i$, the expression $v(Y^i)$ is the result of applying the tangent vector $v$ (seen as a derivation) to the component function $Y^i$:

$$
    v(Y^i) = v^j \frac{\partial Y^i}{\partial x^j} (p) .
$$

If $X$ is another vector field on $\R^n$, we define a new vector field $\bar{\nabla}\_X Y$ by evaluating $\bar{\nabla}\_{X_p} Y$ at each point $p$:

$$
    \bar{\nabla}_X Y = X(Y^i) \frac{\partial}{\partial x^i} .
$$

More generally, suppose $M \subseteq \R^n$ is an embedded submanifold, $Y \in \mathfrak{X}(M)$, and $v \in T_p M$. In this setting, the directional derivative $\bar{\nabla}\_v Y$ might not be tangent to $M$. Thus, if $\pi^\top : T_p \R^n \to T_p M$ is the **_tangential projection_** at $p$ and $\tilde{Y}$ is the smooth **_extension_** of $Y$ on an open subset of $\R^n$, then we can define the **_tangential directional derivative_** of Y in the direction $v$ to be

$$
    \nabla^\top_v Y := \pi^\top \left( \bar{\nabla}_v \tilde{Y} \right) .
$$

(One can intuitively think of $\tilde{Y}$ as viewing $Y$ from the point-of-view of $\R^n$.) However, this definition relies on the fact that $M$ is an embedded submanifold, and thus $\nabla^\top$ relies on the existence of the ambient space. What we are looking for, instead, is an intrinsic definition of directional derivative of vector fields on arbitrary Riemannian manifolds.

Let $M$ be a smooth $n$-manifold. A **_connection_** on $M$ (or in $TM$) is a map

$$
    \nabla: \mathfrak{X}(M) \times \mathfrak{X}(M) \to \mathfrak{X}(M) ,
$$

defined by $(X, Y) \mapsto \nabla_X Y$, satisfying the following properties:

(i) $\nabla_X Y$ is linear over $C^\infty(M)$ in $X$. That is, for $f_1, f_2 \in C^\infty(M)$ and $X_1, X_2 \in \mathfrak{X}(M)$,

$$
    \nabla_{f_1 X_1 + f_2 X_2} Y = f_1 \nabla_{X_1} Y + f_2 \nabla_{X_2} Y .
$$

(ii) $\nabla_X Y$ is linear over $\R$ in $Y$. That is, for $a_1, a_2 \in \R$ and $Y_1, Y_2 \in \mathfrak{X}(M)$,

$$
    \nabla_X (a_1 Y_1 + a_2 Y_2) = a_1 \nabla_X Y_1 + a_2 \nabla_X Y_2 .
$$

(iii) $\nabla$ satisfies the product rule: for $f \in C^\infty(M)$,

$$
    \nabla_X (f Y) = f \, \nabla_X Y + (X f) \, Y .
$$

The expression $\nabla_X Y$ is called the **_covariant derivative_** of $Y$ in the direction $X$. Note that we can show that the expression $\nabla_v Y$ for some $v \in T_p M$ do make sense---unlike the Lie derivative (cf. Example 1). To evaluate it, we let $X$ be a vector field on the neighborhood of $p$ whose value at $p$ is $v$, and then we set $\nabla_v Y := \nabla_X Y \vert_p$.

Let us examine how a connection appears in term of a [local frame]({% post_url 2020-08-09-lie-bracket %}). Let $(E_i)$ be a smooth local frame for $TM$ on an open subset $U \subseteq M$. For any indices $i, j$, we can expand the vector field $\nabla_{E_i} E_j$ as

$$
    \nabla_{E_i} E_j = \Gamma^k_{ij} \, E_k .
$$

This defines $n^3$ smooth component functions $\Gamma^k_{ij}: U \to \R$, called the **_connection coefficients_** of $\nabla$ w.r.t. $(E_i)$. The connection $\nabla$ is completely determined in $U$ by its connection coefficients.


**Proposition 2.** _Let $M$ be a smooth $n$-manifold, $\nabla$ be a connection on $M$, the tuple $(E_i)$ be a smooth local frame over an open subset $U \subseteq M$, and $\\{\Gamma\_{ij}^k\\}$ be the connection coefficients of $\nabla$ w.r.t. $(E_i)$. For any $X, Y \in \mathfrak{X}(U)$, written in terms of the frame as $X = X^i E_i$ and $Y= Y^i E_i$, respectively, we have_

$$
    \nabla_X Y = \left( X(Y^k) + X^i \, Y^j \, \Gamma^k_{ij} \right) E_k .
$$

_Proof._ By definition of connection---in particular the product rule and the linearity of $\nabla$ on $X$ (remember that $X^i, Y^i$ are smooth functions)---we have

$$
\begin{align}
    \nabla_X Y &= \nabla_X \left( Y^j E_j \right) \\[5pt]
        &= Y^j \, \nabla_{X^i E_i} E_j + X \left( Y^j \right) E_j \\[5pt]
        &= X^i \, Y^j \, \nabla_{E_i} E_j + X \left( Y^j \right) E_j \\[5pt]
        &= X^i \, Y^j \, \Gamma^k_{ij} \, E_j + X \left( Y^j \right) E_j .
\end{align}
$$

Then, we just need to simply rearrange and rename the dummy indices to match the claim.

$\square$
{:.right}


**Example 3.** The directional derivative $\bar{\nabla}$ in $T\R^n$ defines the **_Euclidean connection_**. Its connection coefficients in the standard coordinate frame are all zero, since for any $i, j$,

$$
    \bar{\nabla}_{\partial_i} \partial_j = \partial_i (\partial_j^k) \frac{\partial}{\partial x^k} ,
$$

and the coefficients $\partial_j^k$ of the coordinate vector field $\partial_j$ are all constant, which implies that $\Gamma^k_{ij} = \partial_i(\partial^k_j) = 0$.

One can also check that the tangential directional derivative $\nabla^\top$ on an embedded submanifold $M \subseteq \R^n$ is also a connection, called the **_tangential connection_**.

//
{:.right}


The following lemma shows that on every manifold that admits a global frame (e.g. a manifold that is covered by a single coordinate chart), we can construct a connection by picking $n^3$ functions $\\{ \Gamma^k_{ij} \\}$. Thus, there are many connections on these manifolds.


**Lemma 4.** _Let $M$ be a smooth $n$-manifold. Suppose $M$ admits a global frame $(E_i)$. The formula from Proposition 2 gives a one-to-one correspondence between connections in $TM$ and choices of $n^3$ smooth real-valued functions $\Gamma^k\_{ij}$ on $M$._

_Proof._ ($\implies$) Every connection determines $n^3$ functions $\\{ \Gamma^k_{ij} \\}$ as we have seen before. Those functions satisfy the formula in Proposition 2.

($\impliedby$) Given smooth real-valued functions $\\{ \Gamma^k_{ij} \\}$, we can define $\nabla_X Y$ by the formula in Proposition 2. Note that by this formula, $\nabla_X Y$ is smooth if $X, Y$ are smooth (their component functions $X^i, Y^i$ are smooth). Now, we need to check the three defining properties of a connection. For any $a_1, a_2 \in \R$ and $Y_1, Y_2 \in \mathfrak{X}(M)$:

$$
\begin{align}
    \nabla_X (a_1 Y_1 + a_2 Y_2) &= \left( X(a_1 Y_1^k + a_2 Y_2^k) + X^i \, (a_1 Y_1^j + a_2 Y_2^j) \, \Gamma^k_{ij} \right) E_k \\[5pt]
        &= \left( a_1 X(Y_1^k) + a_1 X^i \, Y_1^j \, \Gamma^k_{ij} + a_2 X(Y_2^k) + a_2 X^i \, Y_2^j \, \Gamma^k_{ij} \right) E_k \\[5pt]
        &= a_1 \nabla_X Y_1 + a_2 \nabla_X Y_2 ,
\end{align}
$$

thus $\nabla_X Y$ is linear over $\R$ in $Y$ (ii). Furthermore, for $f_1, f_2 \in C^\infty(M)$ and $X_1, X_2 \in \mathfrak{X}(M)$, we have

$$
\begin{align}
    \nabla_{f_1 X_1 + f_2 X_2} Y &= \left( (f_1 X_1 + f_2 X_2)(Y^k) + (f_1 X_1^i + f_2 X_2^i) \, Y^j \, \Gamma^k_{ij} \right) E_k \\[5pt]
        &= \left( (f_1 X_1)(Y^k) + (f_1 X_1^i) \, Y^j \, \Gamma^k_{ij} + (f_2 X_2)(Y^k) + (f_2 X_2^i) \, Y^j \, \Gamma^k_{ij} \right) E_k \\[5pt]
        &= f_1 \nabla_{X_1} Y + f_2 \nabla_{X_2} Y ,
\end{align}
$$

which means that $\nabla_X Y$ is linear over $C^\infty(M)$ in $X$ (i). Lastly, given $f \in C^\infty(M)$, by the product rule of vector fields, we have

$$
\begin{align}
    \nabla_X (f \, Y) &= \left( X(f \, Y^k) + X^i \, (f \, Y^j) \, \Gamma^k_{ij} \right) E_k \\[5pt]
        &= \left( (Xf) \, Y^k + f \, X(Y^k) + f \, X^i \, Y^j \, \Gamma^k_{ij} \right) E_k \\[5pt]
        &= \left( (Xf) \, Y^k + f \, X(Y^k) + f \, X^i \, Y^j \, \Gamma^k_{ij} \right) E_k \\[5pt]
        &= (Xf) \, Y + f \, \nabla_X Y ,
\end{align}
$$

which shows that $\nabla_X Y$ satisfies the product rule (iii).

$\square$
{:.right}


Moreover, the following proposition tells us that there is at least one connection on any smooth manifold.


**Proposition 5.** _The tangent bundle of every smooth manifold admits a connection._

_Proof._ Let $M$ be a smooth $n$-manifold. Suppose we cover $M$ with coordinate charts $\\{ U_b \\}\_{b \in B}$ for some index set $B$. Lemma 4 guarantees the existence of connection $\nabla^b$ on each $U_b$. Choose a partition of unity $\\{ \varphi_b \\}\_{b \in B}$ subordinate to $\\{ U_b \\}$. We then "patch" all $\nabla^b$ together by taking their linear combination:

$$
    \nabla_X Y := \sum_{b \in B} \varphi_b \, \nabla^b_X Y .
$$

By definition of partition of unity, the set of supports of the functions $\\{ \varphi_b \\}$ is locally finite, i.e. every point has a neighborhood that intersects $\mathrm{supp} \, \varphi_b$. This implies that the r.h.s. of the equation above has only finitely many non-zero terms in a neighborhood of each point. Since $\mathfrak{X}(M)$ is a vector space, it follows that $\nabla_X Y$ is a smooth vector field.

Now, we need to check the three defining properties of a connection on $\nabla_X Y$. The first and second properties---the linearity properties---are immediate. For the product rule, given $f \in C^\infty(M)$:

$$
\begin{align}
    \nabla_X (f \, Y) &= \sum_{b \in B} \varphi_b \, \nabla^b_X (f \, Y) \\[5pt]
        &= \sum_{b \in B} \varphi_b \, \left( f \, \nabla^b_X Y + (Xf) \, Y \right) \\[5pt]
        &= f \, \sum_{b \in B} \varphi_b \, \nabla^b_X Y + (Xf) \, Y \sum_{b \in B} \varphi_b \\[5pt]
        &= f \, \nabla_X Y + (Xf) \, Y ,
\end{align}
$$

using the definition of partition of unity that $\sum_b \varphi_b = 1$.

$\square$
{:.right}


Now, we formalize the notion of a connection as a way to take directional derivatives of vector fields along curves (cf. Example 1).

Given a smooth curve $\gamma: I \to M$, a **_vector field along $\gamma$_** is a continuous map $V: I \to TM$ such that $V(t) \in T_{\gamma(t)}M$ for every $t \in I$. The vector field $V$ is smooth if the map $I \to TM$ is. Let $\mathfrak{X}(\gamma)$ denotes the set of all smooth vector fields along $\gamma$. It is a vector space under pointwise vector addition and (real) scalar multiplication. Furthermore, the multiplication with a function $f \in C^\infty(M)$ is defined pointwise:

$$
    (f \, X)(t) = f(t) \, X(t) .
$$

A smooth vector field $V$ along $\gamma$ is **_extendible_** if there exists a smooth vector field $\tilde{V}$ on a neighborhood of the image of $\gamma$ that is related to $V$ by $V(t) = \tilde{V}\_{\gamma(t)}$. Furthermore, we can write $V = \tilde{V} \circ \gamma$. An example of vector fields along curves is [velocity vectors of curves]({% post_url 2020-08-16-lie-derivative %}).


**Theorem 6 (Covariant Derivative Along a Curve).** _Let $M$ be a smooth $n$-manifold and let $\nabla$ be a connection in $TM$. For each smooth curve $\gamma: I \to M$, the connection determines a unique operator_

$$
    D_t: \mathfrak{X}(\gamma) \to \mathfrak{X}(\gamma) ,
$$

_called the **covariant derivative along $\gamma$**, satisfying the following properties:_

(i) _Linearity over $\R$:_

$$
    D_t(a \, V + b \, W) = a \, D_t V + b \, D_t W \qquad \text{for all } a, b \in \R .
$$

(ii) _Product rule:_

$$
    D_t (f \, V) = f' \, V + f \, D_t V \qquad \text{for all } f \in C^\infty(I) .
$$

(iii) _If $V \in \mathfrak{\gamma}$ is extendible, then for every extension $\tilde{V}$ of $V$:_

$$
    D_t V(t) = \nabla_{\gamma'(t)} \tilde{V} .
$$

_Proof._ (_Uniqueness._) Suppose $D_t$ the covariant derivative along $\gamma$ and let $t_0 \in I$ be arbitrary. We can show that the value of $D_t V$ at $t_0$ depends only on the values of $V$ in any interval $(t_0 - \epsilon, t_0 + \epsilon)$ containing $t_0$. Now, choose smooth coordinates $(x^i)$ for $M$ in a neighborhood of $\gamma(t_0)$ and write

$$
    V(t) = V^j(t) \, \left. \frac{\partial}{\partial x^j} \right\vert_{\gamma(t)} ,
$$

for $t$ near $t_0$, where $(V^i)$ are smooth real-valued functions defined on some neighborhood of $t_0$ in $I$. By properties (ii) and (iii) of $D_t$, since each coordinate vector field $\partial/\partial x^j$ is extendible, we have

$$
\begin{align}
    D_t V(t) &= D_t \left( V^j(t) \, \left.\frac{\partial}{\partial x^j}\right\vert_{\gamma(t)} \right) \\[5pt]
        &= \dot{V}^j(t) \, \left.\frac{\partial}{\partial x^j}\right\vert_{\gamma(t)} + V^j(t) \, D_t \left.\frac{\partial}{\partial x^j}\right\vert_{\gamma(t)} \\[5pt]
        &= \dot{V}^j(t) \, \left. \frac{\partial}{\partial x^j} \right\vert_{\gamma(t)} + V^j(t) \, \nabla_{\gamma'(t)} \, \left. \frac{\partial}{\partial x^j} \right\vert_{\gamma(t)} \\[5pt]
        &= \dot{V}^j(t) \, \left. \frac{\partial}{\partial x^j} \right\vert_{\gamma(t)} + V^j(t) \, \nabla_{\dot{\gamma}^i(t) \partial_i} \, \left. \frac{\partial}{\partial x^j} \right\vert_{\gamma(t)} \\[5pt]
        &= \dot{V}^j(t) \, \left. \frac{\partial}{\partial x^j} \right\vert_{\gamma(t)} + \dot{\gamma}^i(t) \, V^j(t) \, \nabla_{\partial_i} \, \left. \frac{\partial}{\partial x^j} \right\vert_{\gamma(t)} \\[5pt]
        &= \dot{V}^j(t) \, \left. \frac{\partial}{\partial x^j} \right\vert_{\gamma(t)} + \dot{\gamma}^i(t) \, V^j(t) \, \Gamma^k_{ij}(\gamma(t)) \, \left. \frac{\partial}{\partial x^k} \right\vert_{\gamma(t)} \\[5pt]
        &= \left( \dot{V}^k(t) + \dot{\gamma}^i(t) \, V^j(t) \, \Gamma^k_{ij}(\gamma(t)) \right) \left. \frac{\partial}{\partial x^k} \right\vert_{\gamma(t)} .
\end{align}
$$

(The fifth equality uses the linearity of $\nabla$ over $C^\infty(M)$.) Therefore, such an operator is unique by Lemma 4.

(_Existence._) If $\gamma(I)$ is contained in a single chart, we define $D_t V$ by the previous equation. We need to check that it satisfies the three properties shown in the hypothesis. First, linearity over $\R$. For any $a, b \in \R$ and $V, W \in \mathfrak{X}(\gamma)$, we have

$$
\begin{align}
    D_t(a \, V + b \, W) &= \left( a \, \dot{V}^k(t) + b \, \dot{W}^k(t) + \dot{\gamma}^i(t) \, (a V^j(t) + b W^j(t)) \, \Gamma^k_{ij}(\gamma(t)) \right) \left.\frac{\partial}{\partial x^k}\right\vert_{\gamma(t)} \\[5pt]
        &= a \, D_t V + b \, D_t W .
\end{align}
$$

Next, the product rule. Let $f \in C^\infty(I)$ be arbitrary. By the product rule of ordinary differentiations:

$$
\begin{align}
    D_t (f \, V) &= \left( \left(f(t) \, \dot{V}^k(t) + f'(t) \, V^{k}(t) \right) + \dot{\gamma}^i(t) \, (f(t) \, V^j(t)) \, \Gamma^k_{ij}(\gamma(t)) \right) \left.\frac{\partial}{\partial x^k}\right\vert_{\gamma(t)} \\[5pt]
        &= \left(  f'(t) \, V^{k}(t) + f(t) \, \left( \dot{V}^k(t) + \dot{\gamma}^i(t) \, V^j(t) \, \Gamma^k_{ij}(\gamma(t)) \right) \right) \left.\frac{\partial}{\partial x^k}\right\vert_{\gamma(t)} \\[5pt]
        &= f' \, V + f \, D_t V .
\end{align}
$$

Lastly, suppose $V \in \mathfrak{X}(\gamma)$ is extendible. Let $W$ be an arbitrary extension of $V$. Using the definition that $V(t) = W\_{\gamma(t)} =: W_p$ and that $V = W \circ \gamma$, we have

$$
\begin{align}
    D_t V(t) &= \left( (W^k \circ \gamma)'(t) + \dot{\gamma}^i(t) \, W^j(p) \, \Gamma^k_{ij}(p) \right) \left.\frac{\partial}{\partial x^k}\right\vert_p \\[5pt]
        &= \left( \gamma'(t)(W^k) + \dot{\gamma}^i(t) \, W^j(p) \, \Gamma^k_{ij}(p) \right) \left.\frac{\partial}{\partial x^k}\right\vert_p \\[5pt]
        &= \nabla_{\gamma'(t)} W .
\end{align}
$$

(The second equality is obtained by the definition of an [action of a velocity vector on a smooth function]({% post_url 2020-08-16-lie-derivative %}).) Thus, in this case, we have shown that $D_t$ exists. In the general case, we can cover $\gamma(I)$ with coordinate charts and define $D_t V$ by the formula above in each chart. The uniqueness result above implies that the various definitions agree whenever two or more charts overlap.

$\square$
{:.right}


To recap, we have just proved the existence and uniqueness of the operator $D_t$, which has the coordinates representation

$$
    D_t V(t) = \left( \dot{V}^k(t) + \dot{\gamma}^i(t) \, V^j(t) \, \Gamma^k_{ij}(\gamma(t)) \right) \left. \frac{\partial}{\partial x^k} \right\vert_{\gamma(t)} ,
$$

for any smooth curve $\gamma$ and $V \in \mathfrak{X}(\gamma)$.


<h2 class="section-heading">Parallel Transports</h2>

Here is an application of covariant differentiation along curves, which will be very useful in the future when we talk about curvatures---not to mention that it has a very nice and intuitive geometric interpretation.

Let $M$ be a smooth $n$-manifold and $\nabla$ be a connection in $TM$. A smooth vector field $V$ along a smooth curve $\gamma: I \to M$ is said to be **_parallel_** along $\gamma$ w.r.t. $\nabla$ if $D_t V \equiv 0$.

Given a smooth curve $\gamma$ with a local coordinate representation $\gamma(t)= \left( \gamma^1(t), \dots, \gamma^n(t) \right)$, the coordinates formula of $D_t$ shows that a vector field $V$ is parallel along $\gamma$ if and only if

$$
    \dot{V}^k(t) = -V^j(t) \, \dot{\gamma}^i(t) \, \Gamma^k_{ij}(\gamma(t)) , \qquad k = 1, \dots, n .
$$

This is a system of first-order linear ODEs for the unknown coefficients of the vector field---the functions $\left( V^1(t), \dots, V^n(t) \right)$. The usual theorem for linear ODE guarantees the existence and uniqueness of a solution on the entire parameter interval $I$.

Let $\gamma: I \to M$ be a smooth curve, $t_0 \in I$, and $v \in T_{\gamma'(t_0)}M$. We define the **_parallel transport_** of $v$ along $\gamma$ to be the unique parallel vector field $V$ along $\gamma$ such that $V(t_0) = v$ (existence and uniqueness can be shown using the previous ODEs argument). For each $t_0, t_1 \in I$, we define a map

$$
    P^\gamma_{t_0 t_1} : T_{\gamma(t_0)} M \to T_{\gamma(t_1)} M ,
$$

called the **_parallel transport map_**, by setting

$$
    P^\gamma_{t_0 t_1}(v) = V(t_1) \qquad \text{for each } v \in T_{\gamma(t_0)} M ,
$$

where $V$ is the parallel transport of $v$ along $\gamma$. This map is linear since the ODEs above which defines the parallelism of $V$ is linear. In fact, it is a vector space isomorphism since its inverse is simply $P^\gamma_{t_1 t_0}$.

Given any basis $(b_i)$ for $T_{\gamma(t_0)}M$, we can parallel transport the vectors $b_i$ along $\gamma$, thus obtaining an $n$-tuple of parallel vector fields $(E_1, \dots, E_n)$ along $\gamma$. Because each parallel transport map is an isomorphism, the vector $(E_i(t))$ form a basis for $T_{\gamma(t)}M$ at each point $\gamma(t)$. Such an $n$-tuple of vector fields along $\gamma$ is called a **_parallel frame_** along $\gamma$. Every smooth vector field along $\gamma$ can be expressed in terms of such a frame as $V(t) = V^i(t) \, E_i(t)$. Thus, the properties of covariant derivatives along curves, together with the fact that $(E_i)$ are parallel, imply

$$
\begin{align}
    D_t V(t) &= D_t \left( V^i(t) \, E_i(t) \right) \\[5pt]
        &= \dot{V}^i(t) \, E_i(t) + V^i(t) \, \underbrace{D_t E_i(t)}_{= 0} \\
        &= \dot{V}^i(t) \, E_i(t) .
\end{align}
$$

By definition, if $V$ is parallel along $\gamma$ then $D_t V \equiv 0$, so the derivative $\dot{V}^i(t)$ must be zero for all $t$ and all $i$. Therefore, $V$ is parallel along $\gamma$ if and only if its component functions $(V^i)$ w.r.t. the frame $(E_i)$ are constants.

Here is a geometric intuition of the parallel transport map. It is the means by which a connection "connects" nearby tangent spaces. The next theorem and its corollary show that parallel transport determines covariant differentiation along curves, and therefore the connection itself.


**Theorem 7 (Parallel Transport Determines Covariant Differentiation).** _Let $M$ be a smooth manifold and $\nabla$ be a connection in $TM$. Suppose $\gamma: I \to M$ is a smooth curve and $V$ is a smooth vector field along $\gamma$. Then, for each $t_0 \in I$,_

$$
    D_t V(t_0) = \lim_{t_1 \to t_0} \frac{P^\gamma_{t_1 t_0} V(t_1) - V(t_0)}{t_1 - t_0} .
$$

_Proof._ Let $(E_i)$ be a parallel frame along $\gamma$ and write $V(t) = V^i(t) E_i(t)$ for $t \in I$. The equation $D_t V(t) = \dot{V}^i(t) \, E_i(t)$ above shows that

$$
    D_t V(t_0) = \dot{V}^i(t_0) \, E_i(t_0) .
$$

We need to show that the r.h.s. of the equation in the hypothesis also equals to $\dot{V}^i(t_0) \, E_i(t_0)$. For every fixed $t_1 \in I$, the parallel transport of the vector $V(t_1)$ along $\gamma$ is the constant-coefficient vector field $W(t) = V^i(t) \, E_i(t)$ along $\gamma$, so $P^\gamma_{t_1 t_0} V(t_1) = V^i(t_1) \, E_i(t_0)$. Therefore,

$$
\begin{align}
    \lim_{t_1 \to t_0} \frac{P^\gamma_{t_1 t_0} V(t_1) - V(t_0)}{t_1 - t_0} &= \lim_{t_1 \to t_0} \frac{V^i(t_1) \, E_i(t_0) - V(t_0)}{t_1 - t_0} \\[5pt]
        &= \lim_{t_1 \to t_0} \frac{V^i(t_1) \, E_i(t_0) - V^i(t_0) \, E_i(t_0)}{t_1 - t_0} \\[5pt]
        &= \left( \lim_{t_1 \to t_0} \frac{V^i(t_1) - V^i(t_0)}{t_1 - t_0} \right) E_i(t_0) \\[5pt]
        &= \dot{V}^i(t_0) \, E_i(t_0) .
\end{align}
$$

$\square$
{:.right}


**Corollary 8 (Parallel Transport Determines the Connection).** _Let $M$ be a smooth manifold and $\nabla$ be a connection in $TM$. Suppose $X$ and $Y$ are smooth vector fields on $M$. Then, for every $p \in M$,_

$$
    \nabla_X Y \vert_p = \lim_{h \to 0} \frac{P^\gamma_{h 0} Y_{\gamma(h)} - Y_p}{h} ,
$$

_where $gamma: I \to M$ is any smooth curve s.t. $\gamma(0) = p$ and $\gamma'(0) = X_p$._

_Proof._ Given $p \in M$ and a smooth curve $\gamma$ with $\gamma(0) = p$ and $\gamma'(0) = X_p$, let $V(t)$ denotes the vector field along $\gamma$ determined by $Y$, so $V(t) = Y_{\gamma(t)}$---i.e. $Y$ is an extension of $V$. By property (iii) of Theorem 6,

$$
    \nabla_X Y \vert_p = \nabla_{\gamma'(0)} Y = D_t V(0) .
$$

By Theorem 7, with $t_1 = h$ and $t_0 = 0$, we have

$$
\begin{align}
    \nabla_X Y \vert_p &= D_t V(0) = \lim_{h \to 0} \frac{P^\gamma_{h 0} V(h) - V(0)}{h} \\[5pt]
        &= \lim_{h \to 0} \frac{P^\gamma_{h 0} Y_{\gamma(h)} - Y_{\gamma(0)}}{h} \\[5pt]
        &= \lim_{h \to 0} \frac{P^\gamma_{h 0} Y_{\gamma(h)} - Y_p}{h} .
\end{align}
$$

$\square$
{:.right}


The parallel transport will play a major role in our discussion on curvatures. For an excellent visual guide about the parallel transport, see the following video by eigenchris on Youtube: <https://youtube.com/watch?v=Af9JUiQtV1k>.


<h2 class="section-heading">References</h2>

1. Lee, John M. Introduction to Smooth Manifolds. Springer, New York, NY, 2013. 1-31.
2. Lee, John M. Riemannian Manifolds: An Introduction to Curvature. Vol. 176. Springer Science & Business Media, 2006.
