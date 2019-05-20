---
layout:     post
title:      "Optimization and Gradient Descent on Riemannian Manifolds"
subtitle:   "One of the most ubiquitous applications in the field of geometry is the optimization problem. In this article we will discuss the familiar optimization problem on Euclidean spaces by focusing on the gradient descent method, and generalize them on Riemannian manifolds."
date:       2019-02-22 12:00
author:     "wiseodd"
header-img: "img/manifold.svg"
category:   techblog
tags:       [math]
---

Geometry can be seen as a generalization of calculus on Riemannian manifolds. Objects in calculus such as gradient, Jacobian, and Hessian on $\R^n$ are adapted on arbitrary Riemannian manifolds. This fact let us also generalize one of the most ubiquitous problem in calculus: the optimization problem. The implication of this generalization is far-reaching: We can make a more general and thus flexible assumption regarding the domain of our optimization, which might fit real-world problems better or has some desirable properties.

In this article, we will focus on the most popular optimization there is, esp. in machine learning: the gradient descent method. We will begin with a review on the optimization problem of a real-valued function on $\R^n$, which we should have been familiar with. Next, we will adapt the gradient descent method to make it work in optimization problem of a real-valued function on an arbitrary Riemannian manifold $(\M, g)$. Lastly, we will discuss how [natural gradient descent]({% post_url 2018-03-14-natural-gradient %}) method can be seen from this perspective, instead of purely from the second-order optimization point-of-view.


<h2 class="section-heading">Optimization problem and the gradient descent</h2>

Let $\R^n$ be the usual Euclidean space (i.e. a Riemannian manifold $(\R^n, \bar{g})$ where $\bar{g}\_{ij} = \delta_{ij}$) and let $f: \R^n \to \R$ be a real-valued function. An (unconstrained) optimization problem on this space has the form

$$
    \min_{x \in \R^n} f(x) \, .
$$

That is we would like to find a point $\hat{x} \in \R^n$ such that $f(\hat{x})$ is the minimum of $f$.

One of the most popular numerical method for solving this problem is the gradient descent method. Its algorithm is as follows.

**Algorithm 1 (Euclidean gradient descent).**
1. Pick arbitrary $x_{(0)} \in \R^n$ and let $\alpha \in \R$ with $\alpha > 0$
2. While the stopping criterion is not satisfied:
    1. Compute the gradient of $f$ at $x_{(t)}$, i.e. $h_{(t)} := \gradat{f}{x_{(t)}}$
    2. Move in the direction of $-h_{(t)}$, i.e. $x_{(t+1)} = x_{(t)} - \alpha h_{(t)}$
    3. $t = t+1$
3. Return $x_{(t)}$

//
{:.right}

The justification of the gradient descent method is because of the fact that the gradient is the direction in which $f$ is increasing fastest. Its negative therefore points to the direction of steepest descent.

**Proposition 1.** _Let $f: \R^n \to \R$ be a real-valued function on $\R^n$ and $x \in \R^n$. Among all unit vector $v \in \R^n$, the gradient $\grad f \, \vert_x$ of $f$ at $x$ is the direction in which the directional derivative $D_v \, f \, \vert_x$ is greatest. Furthermore, $\norm{\gradat{f}{x}}$ equals to the value of the directional derivative in that direction._

_Proof._ First, note that, by our assumption, $\norm{v} = 1$. By definition of the directional derivative and dot product on $\R^n$,

$$
\begin{align}
    D_v \, f \, \vert_x &= \grad f \, \vert_x \cdot v \\
                            &= \norm{\gradat{f}{x}} \norm{v} \cos \theta \\
                            &= \norm{\gradat{f}{x}} \cos \theta \, ,
\end{align}
$$

where $\theta$ is the angle between $\gradat{f}{x}$ and $v$. As $\norm{\cdot} \geq 0$ and $-1 \leq \cos \theta \leq 1$, the above expression is maximized whenever $\cos \theta = 1$. This implies that the particular vector $\hat{v}$ that maximizes the directional derivative points in the same direction as $\gradat{f}{x}$. Furthermore, plugging in $\hat{v}$ into the above equation, we get

$$
    D_{\hat{v}} \, f \, \vert_x = \norm{\gradat{f}{x}} \, .
$$

Thus, the length of $\gradat{f}{x}$ is equal to the value of $D_{\hat{v}} \, f \, \vert_x$.

$\square$
{:.right}

<h2 class="section-heading">Gradient descent on Riemannian manifolds</h2>

**Remark.** _These [notes about Riemannian geometry]({% post_url 2019-02-17-riemannian-geometry %}) are useful as references. We shall use the Einstein summation convention: Repeated indices above and below are implied to be summed, e.g. $v^i w\_i \implies \sum\_i v^i w_i$ and $g\_{ij} v^i v^j \implies \sum\_{ij} g\_{ij} v^i v^j$. By convention the index in $\partder{}{x^i}$ is thought to be a lower index._

We now want to break the confine of the Euclidean space. We would like to generalize the gradient descent algorithm on a function defined on a Riemannian manifold. Based on Algorithm 1, at least there are two parts of the algorithm that we need to adapt, namely, (i) the gradient of $f$ and (ii) the way we move between points on $\M$.

Suppose $(\M, g)$ is a $n$-dimensional Riemannian manifold. Let $f: \M \to R$ be a real-valued function (scalar field) defined on $\M$. Then, the optimization problem on $\M$ simply has the form

$$
    \min_{p \in \M} f(p) \, .
$$

Although it seems innocent enough (we only replace $\R^n$ with $\M$ from the Euclidean version), some difficulties exist.

First, we shall discuss about the gradient of $f$ on $\M$. By definition, $\grad{f}$ is a vector field on $\M$, i.e. $\grad{f} \in \mathfrak{X}(\M)$ and at each $p \in \M$, $\gradat{f}{p}$ is a tangent vector in $T_p \M$. Let the differential $df$ of $f$ be a one one-form, which, in given coordinates $\vx_p := (x^1(p), \dots, x^n(p))$, has the form

$$
    df = \partder{f}{x^i} dx^i \, .
$$

Then, the gradient of $f$ is obtained by raising an index of $df$. That is,

$$
    \grad{f} = (df)^\sharp \, ,
$$

and in coordinates, it has the expression

$$
    \grad{f} = g^{ij} \partder{f}{x^i} \partder{}{x^j} \, .
$$

At any $p \in \M$, given $v \in T_x \M$, it is characterized by the following equation:

$$
    \inner{\gradat{f}{p}, v}_g = df(v) = vf \, .
$$

That is, pointwise, the inner product of the gradient and any tangent vector is the action of derivation $v$ on $f$. We can think of this action as taking directional derivative of $f$ in the direction $v$. Thus, we have the analogue of Proposition 1 on Riemannian manifolds.

**Proposition 2.** _Let $(\M, g)$ be a Riemannian manifold and $f: \M \to \R$ be a real-valued function on $\M$ and $p \in \M$. Among all unit vector $v \in T_p \M$, the gradient $\gradat{f}{p}$ of $f$ at $p$ is the direction in which the directional derivative $vf$ is greatest. Furthermore, $\norm{\gradat{f}{p}}$ equals to the value of the directional derivative in that direction._

_Proof._ We simply note that by definition of inner product induced by $g$, we have

$$
    \inner{u, w}_g = \norm{u}_g \norm{w}_g \cos \theta \qquad \forall \, u, w \in T_p \M \, ,
$$

where $\theta$ is again the angle between $u$ and $w$. Using the characteristic of $\gradat{f}{p}$ we have discussed above and by substituting $vf$ for $D_v \, f \, \vert_p$ in the proof of Proposition 1, we immediately get the desired result.

$\square$
{:.right}

Proposition 2 therefore provides us with a justification of just simply substituting the Euclidean gradient with the Riemannian gradient in Algorithm 1.

To make this concrete, we do the computation in coordinates. In coordinates, we can represent $df$ by a row vector $d$ (i.e. a sequence of numbers in the sense of linear algebra) containing all partial derivatives of $f$:

$$
    d := \left( \partder{f}{x^1}, \dots, \partder{f}{x^n} \right) \, .
$$

Given the matrix representation $G$ of the metric tensor $g$ in coordinates, the gradient of $f$ is represented by a column vector $h$, such that

$$
    h = G^{-1} d^\T \, .
$$

**Example 1. (Euclidean gradient in coordinates).** Notice that in the Euclidean case, $\bar{g}\_{ij} = \delta_{ij}$, thus it is represented by an identity matrix $I$, in coordinates. Therefore the Euclidean gradient is simply

$$
    h = I^{-1} d^\T = d^\T \, .
$$

//
{:.right}

The second modification to Algorithm 1 that we need to find the analogue of is the way we move between points on $\M$. Notice that, at each $x \in \R^n$, the way we move between points in the Euclidean gradient descent is by following a straight line in the direction $\gradat{f}{x}$. We know by triangle inequality that straight line is the path with shortest distance between points in $\R^n$.

On Riemannian manifolds, we move between points by the means of curves. There exist a special kind of curve $\gamma: I \to \M$, where $I$ is an interval, that are "straight" between two points on $\M$, in the sense that the covariant derivative $D_t \gamma'$ of the velocity vector along the curve itself, at any time $t$ is $0$. The intuition is as follows: Although if we look at $\gamma$ on $\M$ from the outsider's point-of-view, it is not straight (i.e. it follows the curvature of $\M$), as far as the inhabitants of $\M$ are concerned, $\gamma$ is straight, as its velocity vector (its direction and length) is the same everywhere along $\gamma$. Thus, geodesics are the generalization of straight lines on Riemannian manifolds.

For any $p \in \M$ and $v \in T_p \M$, we can show that there always exists a geodesic starting at $p$ with initial velocity $v$, denoted by $\gamma_v$. Furthermore, if $c, t \in \R$ we can rescale any geodesic $\gamma_v$ by

$$
    \gamma_{cv}(t) = \gamma_v (ct) \, ,
$$

and thus we can define a map $\exp_p(v): T_p \M \to \M$ by

$$
    \exp_p(v) = \gamma_v(1) \, ,
$$

called the exponential map. The exponential map is the generalization of "moving straight in the direction $v$" on Riemannian manifolds.

**Example 2. (Exponential map on a sphere).** Let $\mathbb{S}^n(r)$ be a sphere embedded in $\R^{n+1}$ with radius $r$. The shortest path between any pair of points on the sphere can be found by following the [great circle](https://en.wikipedia.org/wiki/Great_circle) connecting them.

Let $p \in \mathbb{S}^n(r)$ and $0 \neq v \in T_p \mathbb{S}^n(r)$ be arbitrary. The curve $\gamma_v: \R \to \R^{n+1}$ given by

$$
    \gamma_v(t) = \cos \left( t\norm{v} \right) p + \sin \left( t\norm{v} \right) r \frac{v}{\norm{v}} \, ,
$$

is a geodesic, as its image is the great circle formed by the intersection of $\mathbb{S}^n(r)$ with the linear subspace of $\R^{n+1}$ spanned by $\left\\{ p, r \frac{v}{\norm{v}} \right\\}$. Therefore the exponential map on $\mathbb{S}^n(r)$ is given by

$$
    \exp_p(v) = \cos \left( \norm{v} \right) p + \sin \left( \norm{v} \right) r \frac{v}{\norm{v}} \, .
$$

//
{:.right}

Given the exponential map, our modification to Algorithm 1 is complete, which we show in Algorithm 2. The new modifications from Algorithm 1 are in <span style="color:blue">blue</span>.

**Algorithm 2 (Riemannian gradient descent).**
1. Pick arbitrary <span style="color:blue">$p_{(0)} \in \M$</span>. Let $\alpha \in \R$ with $\alpha > 0$
2. While the stopping criterion is not satisfied:
    1. Compute the gradient of $f$ at $p_{(t)}$, i.e. <span style="color:blue">$h_{(t)} := \gradat{f}{p_{(t)}} = (df \, \vert_{p_{(t)}})^\sharp$</span>
    2. Move in the direction $-h_{(t)}$, i.e. <span style="color:blue">$p_{(t+1)} = \exp_{p_{(t)}}(-\alpha h_{(t)})$</span>
    3. $t = t+1$
3. Return $p_{(t)}$


<h2 class="section-heading">Approximating the exponential map</h2>

In general, the exponential map is difficult to compute, as to compute a geodesic, we have to solve a system of second-order ODE. Therefore, for a computational reason, we would like to approximate the exponential map with cheaper alternative.

Let $p \in \M$ be arbitrary. We define a map $R_p: T\M \to \M$ called the **_retraction_** map, by the following properties:

1. $R_p(0) = p$
2. $dR_p(0) = \text{Id}\_{T_p \M}$.

The second property is called the **_local rigidity_** condition and it preserves gradients at $p$. In particular, the exponential map is a retraction. Furthermore, if $d_g$ denotes the Riemannian distance and $t \in \R$, retraction can be seen as a first-order approximation of the exponential map, in the sense that

$$
    d_g(\exp_p(tv), R_p(tv)) = O(t^2) \, .
$$

On an arbitrary embedded submanifold $\S \in \R^{n+1}$, if $p \in \S$ and $v \in T_p \S$, viewing $p$ to be a point on the ambient manifold and $v$ to be a point on the ambient tangent space $T_p \R^{n+1}$, we can compute $R_p(v)$ by (i) moving along $v$ to get $p + v$ and then (ii) project the point $p+v$back to $\S$.

**Example 3. (Retraction on a sphere).** Let $\mathbb{S}^n(r)$ be a sphere embedded in $\R^{n+1}$ with radius $r$. The retraction on any $p \in \mathbb{S}^n(r)$ and $v \in T_p \mathbb{S}^n(r)$ is defined by

$$
    R_p(v) = r \frac{p + v}{\norm{p + v}}
$$

//
{:.right}

Therefore, the Riemannian gradient descent in Algorithm 2 can be modified to be


**Algorithm 3 (Riemannian gradient descent with retraction).**
1. Pick arbitrary $p_{(0)} \in \M$. Let $\alpha \in \R$ with $\alpha > 0$
2. While the stopping criterion is not satisfied:
    1. Compute the gradient of $f$ at $p_{(t)}$, i.e. $h_{(t)} := \gradat{f}{p_{(t)}} = (df \, \vert_{p_{(t)}})^\sharp$
    2. Move in the direction $-h_{(t)}$, i.e. <span style="color:blue">$p_{(t+1)} = R_{p_{(t)}}(-\alpha h_{(t)})$</span>
    3. $t = t+1$
3. Return $p_{(t)}$


<h2 class="section-heading">Natural gradient descent</h2>

One of the most important applications of the Riemannian gradient descent in machine learning is for doing optimization of statistical manifolds. We define a statistical manifold $(\R^n, g)$ to be the set $\R^n$ corresponding to the set of parameter of a statistical model $p_\theta(z)$, equipped with metric tensor $g$ which is the Fisher information metric, given by

$$
    g_{ij} = \E_{z \sim p_\theta} \left[ \partder{\log p_\theta(z)}{\theta^i} \partder{\log p_\theta(z)}{\theta^j} \right] \, .
$$

The most common objective function $f$ in the optimization problem on a statistical manifold is the expected log-likelihood function of our statistical model. That is, given a dataset $\D = \\{ z_i \\}$, the objective is given by $f(\theta) = \sum_{z \in \D} \log p_\theta(z)$.

The metric tensor $g$ is represented by $n \times n$ matrix $F$, called the [_Fisher information matrix_]({% post_url 2018-03-09-fisher-information %}). The Riemannian gradient in this manifold is therefore can be represented by a column vector $h = F^{-1} d^\T$. Furthermore, as the manifold is $\R^n$, the construction of the retraction map we have discussed previously tells us that we can simply do addition $p + v$ for any $p \in \R^n$ and $v \in T_p \R^n$. This is well defined as there is a natural isomorphism between $\R^n$ and $T_p \R^n$. All in all, the gradient descent in this manifold is called the [_natural gradient descent_]({% post_url 2018-03-14-natural-gradient %}) and is presented in Algorithm 4 below.

**Algorithm 4 (Natural gradient descent).**
1. Pick arbitrary $\theta_{(0)} \in \R^n$. Let $\alpha \in \R$ with $\alpha > 0$
2. While the stopping criterion is not satisfied:
    1. Compute the gradient of $f$ at $\theta_{(t)}$, i.e. $h_{(t)} := F^{-1} d^\T$
    2. Move in the direction $-h_{(t)}$, i.e. $\theta_{(t+1)} = \theta_{(t)} - \alpha h_{(t)}$
    3. $t = t+1$
3. Return $\theta_{(t)}$


<h2 class="section-heading">Conclusion</h2>

Optimization in Riemannian manifold is an interesting and important application in the field of geometry. It generalizes the optimization methods from Euclidean spaces onto Riemannian manifolds. Specifically, in the gradient descent method, adapting it to a Riemannian manifold requires us to use the Riemannian gradient as the search direction and the exponential map or retraction to move between points on the manifold.

One major difficulty exists: Computing and storing the matrix representation $G$ of the metric tensor are very expensive. Suppose the manifold is $n$-dimensional. Then, the size of $G$ is in $O(n^2)$ and the complexity of inverting it is in $O(n^3)$. In machine learning, $n$ could be in the order of million, so a naive implementation is infeasible. Thankfully, many approximations of the metric tensor, especially for the Fisher information metric exist (e.g. [7]). Thus, even with these difficulties, the Riemannian gradient descent or its variants have been successfully applied on many areas, such as in inference problems [8], word or knowledge graph embeddings [9], etc.


<h2 class="section-heading">References</h2>

1. Lee, John M. "Smooth manifolds." Introduction to Smooth Manifolds. Springer, New York, NY, 2013. 1-31.
2. Lee, John M. Riemannian manifolds: an introduction to curvature. Vol. 176. Springer Science & Business Media, 2006.
3. Fels, Mark Eric. "An Introduction to Differential Geometry through Computation." (2016).
4. Absil, P-A., Robert Mahony, and Rodolphe Sepulchre. Optimization algorithms on matrix manifolds. Princeton University Press, 2009.
5. Boumal, Nicolas. Optimization and estimation on manifolds. Diss. Catholic University of Louvain, Louvain-la-Neuve, Belgium, 2014.
6. Graphics: <https://tex.stackexchange.com/questions/261408/sphere-tangent-to-plane>.
7. Martens, James, and Roger Grosse. "Optimizing neural networks with kronecker-factored approximate curvature." International conference on machine learning. 2015.
8. Patterson, Sam, and Yee Whye Teh. "Stochastic gradient Riemannian Langevin dynamics on the probability simplex." Advances in neural information processing systems. 2013.
9. Suzuki, Atsushi, Yosuke Enokida, and Kenji Yamanishi. "Riemannian TransE: Multi-relational Graph Embedding in Non-Euclidean Space." (2018).
