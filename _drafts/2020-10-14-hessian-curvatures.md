---
layout:     post
title:      "Hessian and Curvatures in Machine Learning"
subtitle:   "One of the most ubiquitous applications in the field of differential geometry is the optimization problem. In this article we will discuss the familiar optimization problem on Euclidean spaces by focusing on the gradient descent method, and generalize them on Riemannian manifolds."
date:       2020-10-14 12:00
author:     "wiseodd"
header-img: "img/manifold.svg"
category:   techblog
tags:       [math]
---


In machine learning, especially in neural networks optimization, the Hessian matrix is often treated synonymously with curvatures, in the following sense. Suppose $f: \R^n \times \R^d \to \R$ defined by $(x, \theta) \mapsto f(x; \theta) =: f_\theta(x)$ is a (real-valued) neural network, mapping an input $x$ to the output $f(x; \theta)$ under the parameter $\theta$. Given a dataset $\D$, we can define a loss function $\ell: \R^d \to \R$ by $\theta \mapsto \ell(\theta)$. Assuming the standard basis for $\R^d$, from calculus we know that the second partial derivatives of $\ell$ at a point $\theta \in \R^d$ form a matrix called the Hessian matrix at $\theta$. Often, one calls this Hessian matrix the "curvature matrix" of $L$ at $\theta$ [1, 2, etc.]. Indeed, it is well-justified since the eigenspectrum of this Hessian matrix represent the curvatures of the _loss landscape_ of $L$ at $\theta$. It is, however, not clear from calculus alone what is the precise geometric meaning of these curvatures. In this post, we will use tools from differential geometry---especially hypersurface theory---to study the geometric interpretation of the Hessian matrix.


<h2 class="section-heading">Loss Landscapes as Hypersurfaces</h2>

We begin by formalizing what exactly is a _loss landscape_ via the Euclidean hypersurface theory. We call an $n$-dimensional manifold $M$ a **_(Euclidean) hypersurface_** of $\R^{n+1}$ if $M$ is a subset of $\R^{n+1}$ (equipped with the standard basis) and the inclusion $\iota: M \hookrightarrow \R^{n+1}$ is a smooth topological embedding. Since $\R^{n+1}$ is equipped with a metric in the form of the standard dot product, we can equip $M$ with an induced metric characterized at each point $p \in M$ by

$$
    \langle v, w\rangle_p = (d\iota)_p(v) \cdot (d\iota)_p(w) ,
$$

for all tangent vectors $v, w \in T_pM$. Here, $\cdot$ represents the dot product and $(d\iota)\_p: T_pM \to T_{\iota(p)}\R^{n+1} \simeq \R^{n+1}$ is the differential of $\iota$ at $p$ which is represented by the Jacobian matrix of $\iota$ at $p$. In matrix notation this is

$$
    \inner{v, w}_p = (J_p v)^\top (J_p w) .
$$

Intuitively, the induced inner product on $M$ at $p$ is obtained by "pushing forward" tangent vectors $v$ and $w$ using the Jacobian $J_p$ at $p$ and compute their dot product on $\R^{n+1}$.

Let $g: U \to \R$ is a smooth real-valued function over an open subset $U \subseteq \R^n$, then the **_graph_** of $g$ is the subset $M := \\{ (u, g(u)) : u \in  U \\} \subseteq \R^{n+1}$ which is a hypersurface in $\R^{n+1}$. In this case, we can describe $M$ via the so-called **_graph parametrization_** which is a function $X: U \to \R^{n+1}$ defined by $X(u) := (u, g(u))$.

Coming back to our neural network setting, assuming that the loss $\ell$ is smooth, the graph $L := \\{ (\theta, \ell(\theta)) : \theta \in \R^d \\}$ is a Euclidean hypersurface of $\R^{d+1}$ with parametrization $Z: \R^d \to \R^{d+1}$ defined by $Z(\theta) := (\theta, \ell(\theta))$. Furthermore, the metric of $L$ is given by the Jacobian of the parametrization $Z$ and the standard dot product on $\R^{d+1}$, as before. Thus, the loss landscape of $\ell$ can indeed be amenable to geometric analysis.


<h2 class="section-heading">The Second Fundamental Form and Shape Operator</h2>

Consider vector fields $X$ and $Y$ on the hypersurface $L \subseteq \R^{d+1}$. We can view them as vector fields on $\R^{d+1}$ and thus the directional derivative $\nabla_X Y$ on $\R^{d+1}$ is well-defined at all points in $L$. That is, at every $p \in L$, $\nabla_X Y$ is a $(d+1)$-dimensional vector "rooted" at $p$. This vector can be decomposed as follows:

$$
    \nabla_X Y = (\nabla_X Y)^\top + (\nabla_X Y)^\perp ,
$$

where $(\cdot)^\top$ and $(\cdot)^\perp$ are the orthogonal projection operators onto the tangent/normal space of $L$ at $p$. We define the **_second fundamental form_** as the map $\mathrm{II}$ that takes two vector fields on $L$ and yielding normal vector fields of $L$, as follows:

$$
    \mathrm{II}(X,Y) := (\nabla_X Y)^\perp .
$$

See the following figure for a clear intuition.


![The second fundamental form]({{ site.baseurl }}/img/2020-11-01-hessian-curvatures/II.png){:width="60%"}


Since $L$ is a $d$-dimensional hypersurface of $(d+1)$-dimensional Euclidean space, the normal space $N_pL$ at each point $p$ of $L$ has dimension one and there exist only two ways of choosing a unit vector field normal to $L$. Any choice of the unit vector field thus automatically gives a basis for $N_pL$ for all $p \in L$. One of the choice is the following normal vector field which is oriented _outward_ relative to $L$.


![Unit normal field]({{ site.baseurl }}/img/2020-11-01-hessian-curvatures/unit_normal.png){:width="60%"}


Another choice is the same unit normal field but oriented _inward_ relative to $L$.

Fix a unit normal field $N$. We can replace the vector-valued second fundamental form $\mathrm{II}$ by a simpler scalar-valued form. We define the **_scalar second fundamental form_** of $M$ to be

$$
    h(X, Y) := \inner{N, \mathrm{II}(X,Y)} .
$$

Furthermore we define the **_shape operator_** of $L$ as the map $W_N$, mapping a vector field to another vector field on $L$, characterized by

$$
    \inner{s(X), Y} = h(X,Y) .
$$

Note that, at each point $p \in L$, the shape operator at $p$ is a linear endomorphism of $T_p L$, i.e. it defines a map from the tangent space to itself. Furthermore, we can show that $\mathrm{II}(X,Y) = \mathrm{II}(Y,X)$ and thus $h(X,Y)$ is symmetric. This implies that $s$ is self-adjoint since we can write

$$
    \inner{s(X), Y} = h(X,Y) = h(Y,X) = \inner{s(Y), X} = \inner{X, s(Y)} .
$$

Altogether, this means that at each $p \in L$, the shape operator at $p$ can be represented by a symmetric $d \times d$ matrix.


<h2 class="section-heading">Principal Curvatures</h2>

The previous fact about the matrix of $s$ says that we can apply eigendecomposition on $s$ and obtain $n$ real eigenvalues $\kappa_1, \dots, \kappa_n$ and an orthonormal basis for $T_p L$ formed by the eigenvectors $(b_1, \dots, b_n)$ corresponding to these eigenvalues. We call these eigenvalues the **_principal curvatures_** of $L$ at $p$ and the corresponding eigenvectors the **_principal directions_**. Moreover, we also define the **_Gaussian curvature_** as $\det s = \prod_{i=1}^d \kappa_i$ and the **_mean curvature_** as $\frac{1}{d} \mathrm{tr}\,s = \frac{1}{d} \sum_{i=1}^d \kappa_i$.


![Unit normal field]({{ site.baseurl }}/img/2020-11-01-hessian-curvatures/curvature_plane_curv.png){:width="60%"}


The intuition of the principal curvatures and directions in $\R^3$ is shown in the preceding figure. Suppose $M$ is a surface in $\R^3$. Choose a tangent vector $v \in T_pM$. Together with the choice of our unit normal vector $N_p$ at $p$, we obtain a plane $\varPi$ passing through $p$. The intersection of $\varPi$ and the neighborhood of $p$ in $M$ is a plane curve $\gamma \subseteq \varPi$ containing $p$. We can now compute the curvature of this curve at $p$ as usual, in the calculus sense (the reciprocal of the radius of the osculating circle at $p$). Then, the principal curvatures of $M$ at $p$ are the minimum and maximum curvatures obtained this way. The corresponding vectors in $T_p M$ that attain these minimum and maximum are the principal directions.


<h2 class="section-heading">The Loss Landscape's Hessian</h2>

Now we are ready to draw a geometric connection between principal curvatures and the Hessian of $\ell$. Let $Z: \R^d \to \R^{d+1}$ be graph parametrization of the loss landscape $L$. The coordinates $(\theta^1, \dots, \theta^d) \in \R^d$ thus give local coordinates for $L$. The coordinate vector field $\partial/\partial \theta^1, \dots, \partial/\partial \theta^d$, push forward to vector fields $dZ(\partial/\partial \theta^1), \dots, dZ(\partial/\partial \theta^d)$ on $\R^{d+1}$, via the Jacobian of $Z$. At each $p \in L$, these vector fields form a basis for $T_p L$, viewed as a collection of $d$ vectors in $\R^{d+1}$.

If we think of $Z(\theta) = (Z^1(\theta), \dots, Z^{d+1}(\theta))$ as a vector-valued function of $\theta$, then by definition of Jacobian, these push-forwarded coordinate vector fields can be written for every $\theta \in \R^d$ as

$$
    dZ_\theta \left( \frac{\partial}{\partial \theta^i} \right) = \frac{\partial Z}{\partial \theta^i} (\theta) =: \partial_i Z(\theta) ,
$$

for each $i = 1, \dots, d$.

Let us suppose we are given a unit normal field to $L$. Then we have the following result.


**Proposition.** _Suppose $L \subseteq \R^{d+1}$ is the loss landscape of $\ell$, $Z: \R^d \to \R^{d+1}$ is the graph parametrization of $L$. Suppose further that $\partial_1 Z, \dots, \partial_d Z$ are the vector fields determined by $Z$ which restriction at each $p \in L$ is a basis for $T_pL$, and suppose $N$ is a unit normal field on $L$. Then the scalar second fundamental form is given by_

$$
    h(\partial_i Z, \partial_j Z) = \left\langle \frac{\partial^2 Z}{\partial \theta^i \partial \theta^d} , N \right\rangle \propto \frac{\partial^2 \ell}{\partial \theta^i \partial \theta^j}.
$$

_In particular, at each $p \in L$, the matrix of the $h$ is proportional to the Hessian of $\ell$._

_Proof._ To show the first equality, one can refer to Proposition 8.23 in [1], which works for any parametrization and not just the graph parametrization. Now recall that $Z(\theta) = (\theta^1, \dots, \theta^d, \ell(\theta^1, \dots, \theta^d))$. Therefore for each $i = 1, \dots, d$:

$$
    \frac{\partial Z}{\partial \theta^i} = \left( 0, \dots, 1, \dots, \frac{\partial \ell}{\partial \theta^i} \right) ,
$$

and thus

$$
    \frac{\partial^2 Z}{\partial \theta^i \partial \theta^j} = \left( 0, \dots, 0, \frac{\partial^2 \ell}{\partial \theta^i \partial \theta^j} \right) .
$$

Taking the inner product with the unit normal field $N$, we obtain

$$
    h(\partial_i Z, \partial_j Z) = 0 + \dots + 0 + N^{d+1} \frac{\partial^2 \ell}{\partial \theta^i \partial \theta^j} = N^{d+1} \frac{\partial^2 \ell}{\partial \theta^i \partial \theta^j} ,
$$

where $N^{d+1}$ is the $(d+1)$-st component function (it is a function $\R^{d+1} \to \R$) of the normal field $N$. At each $p \in L$, the matrix of $h$ is therefore $N^{d+1}(p)$ times the Hessian matrix of $\ell$ at $p$.

\\( \square \\)
{:.right}


In applications, we usually assume that the unit normal vector $N_p$ at each $p \in L$ is given by the $(d+1)$-tuple $(0, \dots, 0, 1)$. Thus, in this case, the scalar second fundamental form coincides with the Hessian of $\ell$.

In fact, the equivalence of the $h$ and the Hessian of $\ell$ work with any parametrization. The following theorem gives the precise statement and also the connection between the Hessian of $\ell$, the scalar second fundamental form $h$, and the principal curvatures $\kappa_1, \dots, \kappa_d$ of the loss landscape $L$.


**Theorem 2.** _Let $L \subseteq \R^{d+1}$ be the loss landscape hypersurface of $\ell$. Let $p \in L$ and let $\kappa_1, \dots, \kappa_d$ denote the principal curvatures of $L$ at $p$ w.r.t. some choice of unit normal. Then there is an isometry of $\R^{d+1}$ that takes $p$ to the origin and takes a neighborhood of $p$ in $L$ to a graph of the form $x^{d+1} = f(x^1, \dots, x^d)$, where_

$$
    f(x) = \frac{1}{2} \sum_{i=1}^d \kappa_i \, (x^i)^2 + O(\norm{x}^3) .
$$

_Proof._



<h2 class="section-heading">References</h2>

1. Martens, James. "New Insights and Perspectives on the Natural Gradient Method." arXiv preprint arXiv:1412.1193 (2014).
2. Dangel, Felix, Stefan Harmeling, and Philipp Hennig. "Modular Block-diagonal Curvature Approximations for Feedforward Architectures." AISTATS. 2020.
