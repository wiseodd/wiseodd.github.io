---
layout:     post
title:      "Hessian and Curvatures in Machine Learning: A Differential-geometric View"
subtitle:   "In machine learning, especially in neural networks, the Hessian matrix is often treated synonymously with curvatures. But, from calculus alone, it is not clear why can one say so. Here, we will view the loss landscape of a neural network as a hypersurface and apply a differential-geometric analysis on it."
date:       2020-11-02 12:00
author:     "wiseodd"
header-img: "img/manifold.svg"
category:   techblog
tags:       [math]
---


In machine learning, especially in neural networks, the Hessian matrix is often treated synonymously with curvatures, in the following sense. Suppose $f: \R^n \times \R^d \to \R$ defined by $(x, \theta) \mapsto f(x; \theta) =: f_\theta(x)$ is a (real-valued) neural network, mapping an input $x$ to the output $f(x; \theta)$ under the parameter $\theta$. Given a dataset $\D$, we can define a loss function $\ell: \R^d \to \R$ by $\theta \mapsto \ell(\theta)$ such as the mean-squared-error or cross-entropy loss. (We do not explicitly show the dependency of $\ell$ to $f$ and $\D$ for brevity.) Assuming the standard basis for $\R^d$, from calculus we know that the second partial derivatives of $\ell$ at a point $\theta \in \R^d$ form a matrix called the Hessian matrix at $\theta$.

Often, one calls the Hessian matrix the "curvature matrix" of $L$ at $\theta$ [1, 2, etc.]. Indeed, it is well-justified since as we have learned in calculus, the eigenspectrum of this Hessian matrix represents the curvatures of the _loss landscape_ of $\ell$ at $\theta$. It is, however, not clear from calculus alone what is the precise geometric meaning of these curvatures. In this post, we will use tools from differential geometry---especially the hypersurface theory---to study the geometric interpretation of the Hessian matrix.


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


![Pushforward]({{ site.baseurl }}/img/2020-11-01-hessian-curvatures/pushforward.png){:width="80%"}


Let $g: U \to \R$ is a smooth real-valued function over an open subset $U \subseteq \R^n$, then the **_graph_** of $g$ is the subset $M := \\{ (u, g(u)) : u \in  U \\} \subseteq \R^{n+1}$ which is a hypersurface in $\R^{n+1}$. In this case, we can describe $M$ via the so-called **_graph parametrization_** which is a function $X: U \to \R^{n+1}$ defined by $X(u) := (u, g(u))$.

Coming back to our neural network setting, assuming that the loss $\ell$ is smooth, the graph $L := \\{ (\theta, \ell(\theta)) : \theta \in \R^d \\}$ is a Euclidean hypersurface of $\R^{d+1}$ with parametrization $Z: \R^d \to \R^{d+1}$ defined by $Z(\theta) := (\theta, \ell(\theta))$. Furthermore, the metric of $L$ is given by the Jacobian of the parametrization $Z$ and the standard dot product on $\R^{d+1}$, as before. Thus, the loss landscape of $\ell$ can indeed be amenable to geometric analysis.


![Loss landscape]({{ site.baseurl }}/img/2020-11-01-hessian-curvatures/graph_hypersurface.png){:width="80%"}



<h2 class="section-heading">The Second Fundamental Form and Shape Operator</h2>

Consider vector fields $X$ and $Y$ on the hypersurface $L \subseteq \R^{d+1}$. We can view them as vector fields on $\R^{d+1}$ and thus the directional derivative $\nabla_X Y$ on $\R^{d+1}$ is well-defined at all points in $L$. That is, at every $p \in L$, $\nabla_X Y$ is a $(d+1)$-dimensional vector "rooted" at $p$. This vector can be decomposed as follows:

$$
    \nabla_X Y = (\nabla_X Y)^\top + (\nabla_X Y)^\perp ,
$$

where $(\cdot)^\top$ and $(\cdot)^\perp$ are the orthogonal projection operators onto the tangent/normal space of $L$ at $p$. We define the **_second fundamental form_** as the map $\mathrm{II}$ that takes two vector fields on $L$ and yielding normal vector fields of $L$, as follows:

$$
    \mathrm{II}(X,Y) := (\nabla_X Y)^\perp .
$$

See the following figure for an intuition.


![The second fundamental form]({{ site.baseurl }}/img/2020-11-01-hessian-curvatures/II.png){:width="60%"}


Since $L$ is a $d$-dimensional hypersurface of $(d+1)$-dimensional Euclidean space, the normal space $N_pL$ at each point $p$ of $L$ has dimension one, and there exist only two ways of choosing a unit vector field normal to $L$. Any choice of the unit vector field thus automatically gives a basis for $N_pL$ for all $p \in L$. One of the choices is the following normal vector field which is oriented _outward_ relative to $L$.


![Unit normal field]({{ site.baseurl }}/img/2020-11-01-hessian-curvatures/unit_normal.png){:width="60%"}


Another choice is the same unit normal field but oriented _inward_ relative to $L$.

Fix a unit normal field $N$. We can replace the vector-valued second fundamental form $\mathrm{II}$ with a simpler scalar-valued form. We define the **_scalar second fundamental form_** of $M$ to be

$$
    h(X, Y) := \inner{N, \mathrm{II}(X,Y)} .
$$

Furthermore, we define the **_shape operator_** of $L$ as the map $W_N$, mapping a vector field to another vector field on $L$, characterized by

$$
    \inner{s(X), Y} = h(X,Y) .
$$

Based on the characterization above, we can alternatively view $s$ as an operator obtained by raising an index of $h$, i.e. multiplying the matrix of $h$ with the inverse-metric.

Note that, at each point $p \in L$, the shape operator at $p$ is a linear endomorphism of $T_p L$, i.e. it defines a map from the tangent space to itself. Furthermore, we can show that $\mathrm{II}(X,Y) = \mathrm{II}(Y,X)$ and thus $h(X,Y)$ is symmetric. This implies that $s$ is self-adjoint since we can write

$$
    \inner{s(X), Y} = h(X,Y) = h(Y,X) = \inner{s(Y), X} = \inner{X, s(Y)} .
$$

Altogether, this means that at each $p \in L$, the shape operator at $p$ can be represented by a symmetric $d \times d$ matrix.


<h2 class="section-heading">Principal Curvatures</h2>

The previous fact about the matrix of $s$ says that we can apply eigendecomposition on $s$ and obtain $n$ real eigenvalues $\kappa_1, \dots, \kappa_n$ and an orthonormal basis for $T_p L$ formed by the eigenvectors $(b_1, \dots, b_n)$ corresponding to these eigenvalues. We call these eigenvalues the **_principal curvatures_** of $L$ at $p$ and the corresponding eigenvectors the **_principal directions_**. Moreover, we also define the **_Gaussian curvature_** as $\det s = \prod_{i=1}^d \kappa_i$ and the **_mean curvature_** as $\frac{1}{d} \mathrm{tr}\,s = \frac{1}{d} \sum_{i=1}^d \kappa_i$.


![Unit normal field]({{ site.baseurl }}/img/2020-11-01-hessian-curvatures/curvature_plane_curv.png){:width="60%"}


The intuition of the principal curvatures and directions in $\R^3$ is shown in the preceding figure. Suppose $M$ is a surface in $\R^3$. Choose a tangent vector $v \in T_pM$. Together with the choice of our unit normal vector $N_p$ at $p$, we obtain a plane $\varPi$ passing through $p$. The intersection of $\varPi$ and the neighborhood of $p$ in $M$ is a plane curve $\gamma \subseteq \varPi$ containing $p$. We can now compute the curvature of this curve at $p$ as usual, in the calculus sense (the reciprocal of the radius of the osculating circle at $p$). Then, the principal curvatures of $M$ at $p$ are the minimum and maximum curvatures obtained this way. The corresponding vectors in $T_p M$ that attain the minimum and maximum are the principal directions.

Principal and mean curvatures are not intrinsic to a hypersurface. There are two hypersurfaces that are isometric, but have different principal curvatures and hence different mean curvatures. Consider the following two surfaces.


![Unit normal field]({{ site.baseurl }}/img/2020-11-01-hessian-curvatures/principal_curvatures_extrinsic.png){:width="80%"}


The first (left) surface is the plane described by the parametrization $(x,y) \mapsto \\{ x, y, 0 \\}$ for $0 < x < \pi$ and $0 < y < \pi$. The second one is the half cylinder $(x,y) \mapsto \\{ x, y, \sqrt{1-y^2} \\}$ for $0 < x < \pi$ and $\abs{y} < 1$. It is clear that they have different principal curvatures since the plane is a flat while the half-cylinder is "curvy". Indeed, assuming a downward pointing normal, we can see that $\kappa_1 = \kappa_2 = 0$ for the plane and $\kappa_1 = 0, \kappa_2 = 1$ for the half-cylinder and thus their mean curvatures differ. However, they are actually isometric to each other---from the point of view of Riemannian geometry, they are the same. Thus, both principal and mean curvatures depend on the choice of the parametrization and not intrinsic.

Remarkably, the Gaussian curvature is intrinsic: All isometric hypersurfaces of dimension $\geq 2$ have the same Gaussian curvature (up to sign). Using the previous example: the plane and half-cylinder have the same Gaussian curvature of $0$. In 2D surfaces, this is a classic result which Gauss named _Theorema Egregium_. For hypersurfaces with dimension $> 2$, it can be shown that the Gaussian curvature is intrinsic up to sign [5, Ch. 7, Cor. 23].


<h2 class="section-heading">The Loss Landscape's Hessian</h2>

Now we are ready to draw a geometric connection between principal curvatures and the Hessian of $\ell$. Let $Z: \R^d \to \R^{d+1}$ be graph parametrization of the loss landscape $L$. The coordinates $(\theta^1, \dots, \theta^d) \in \R^d$ thus give local coordinates for $L$. The coordinate vector field $\partial/\partial \theta^1, \dots, \partial/\partial \theta^d$, push forward to vector fields $dZ(\partial/\partial \theta^1), \dots, dZ(\partial/\partial \theta^d)$ on $\R^{d+1}$, via the Jacobian of $Z$. At each $p \in L$, these vector fields form a basis for $T_p L$, viewed as a collection of $d$ vectors in $\R^{d+1}$.

If we think of $Z(\theta) = (Z^1(\theta), \dots, Z^{d+1}(\theta))$ as a vector-valued function of $\theta$, then by definition of Jacobian, these push-forwarded coordinate vector fields can be written for every $\theta \in \R^d$ as

$$
    dZ_\theta \left( \frac{\partial}{\partial \theta^i} \right) = \frac{\partial Z}{\partial \theta^i} (\theta) =: \partial_i Z(\theta) ,
$$

for each $i = 1, \dots, d$.

Let us suppose we are given a unit normal field to $L$. Then we have the following result.


**Proposition 1.** _Suppose $L \subseteq \R^{d+1}$ is the loss landscape of $\ell$, $Z: \R^d \to \R^{d+1}$ is the graph parametrization of $L$. Suppose further that $\partial_1 Z, \dots, \partial_d Z$ are the vector fields determined by $Z$ which restriction at each $p \in L$ is a basis for $T_pL$, and suppose $N$ is a unit normal field on $L$. Then the scalar second fundamental form is given by_

$$
    h(\partial_i Z, \partial_j Z) = \left\langle \frac{\partial^2 Z}{\partial \theta^i \partial \theta^d} , N \right\rangle = N^{d+1} \frac{\partial^2 \ell}{\partial \theta^i \partial \theta^j}.
$$

_Where $N^{d+1}$ is the last component of the unit normal field._

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


Finally, we show the connection between the principal curvatures with the scalar second fundamental form, and hence the principal curvatures with the Hessian. The following proposition says that at a critical point, the unit normal vector can be chosen as $(0, \dots, 0, 1)$ and thus the scalar second fundamental form coincides with the Hessian of $\ell$. Furthermore, by orthonormalizing the basis for the tangent space at that point, we can show that the matrix of the scalar second fundamental form in this case is exactly the matrix shape operator at $p$ and thus the Hessian encodes the principal curvatures at that point.


**Proposition 2.** _Suppose $L \subseteq \R^{d+1}$ is a loss landscape with its graph parametrization and let $\theta\_* \in \R^d$ be a critical point of $\ell$ and $p\_* := (\theta\_*^1, \dots, \theta\_*^d, \ell(\theta\_*)) \in L$. Then the matrix of the shape operator $s$ of $L$ at $p\_*$ is equal to the Hessian matrix of $\ell$ at $\theta\_*$._

_Proof._ We can assume w.l.o.g. that the basis $(E_1, \dots, E_d)$ for $T_{p_\*} L$ is orthonormal by applying the Gram-Schmidt algorithm on $d$ linearly independent tangent vectors in $T_{p_\*} L$. Furthermore pick $(0, \dots, 0, 1) \in \R^{d+1}$ as the choice of the unit normal $N$ at $p_\*$. We can do so since by hypothesis $p_\*$ is a critical point and therefore $(0, \dots, 0, 1)$ is perpendicular to $T_{p_\*} L$.

It follows by Proposition 1 that the matrix of the scalar second fundamental form $h$ of $L$ at $p_\*$ is equal to the Hessian matrix of $\ell$ at $\theta_\*$. Moreover, since we have an orthonormal basis for $T_{p_\*} L$, the metric of $L$ at $p_\*$ is represented by the $d \times d$ diagonal matrix. This implies that the matrix of the shape operator at $p_\*$ is equal to the matrix of the second fundamental form and the claim follows directly.

\\( \square \\)
{:.right}


As a side note, we can actually have a more general statement: At any point in a hypersurface with any parametrization, the principal curvatures give a concise description of the local shape of the hypersurface by approximating it with the graph of a quadratic function. See Prop. 8.24 in [3] for a detailed discussion.


<h2 class="section-heading">Flatness and Generalization</h2>

In deep learning, there have been interesting works connecting the "flatness" of the loss landscape's local minima with the generalization performance of an NN. The conjecture is that the flatter a minimum is, the better the network generalizes. "Flatness" here often refers to the eigenvalues or trace of the Hessian matrix at the minima. However, this has been disputed by e.g. [4] and rightly so.

As we have seen previously, at a minimum, the principal and mean curvature (the eigenvalues and trace of the Hessian of $\ell$, resp.) are not intrinsic. Different parametrization of $L$ can yield different principal and mean curvatures. Just like the illustration with the plane and the half-cylinder above, [4] illustrates this directly in the loss landscape. In particular, we can apply a bijective transformation $\varphi$ to the original parameter space $\R^d$ s.t. the resulting loss landscape is isometric to the original loss landscape and the particular minimum $\theta_\*$ does not change, i.e. $\varphi(\theta_\*) = \theta_\*$. In the figure below, the length of the red curves is the same.


![Unit normal field]({{ site.baseurl }}/img/2020-11-01-hessian-curvatures/reparametrization_curvatures.png){:width="80%"}


It is clear that the principal curvature changes even though functionally, the NN still represents the same function. Thus, we cannot actually connect the notion of "flatness" that are common in literature to the generalization ability of the NN. A definitive connection between them must start with some intrinsic notion of flatness---for starter, the Gaussian curvature, which can be easily computed since it is just the determinant of the Hessian at the minima.


<h2 class="section-heading">References</h2>

1. Martens, James. "New Insights and Perspectives on the Natural Gradient Method." arXiv preprint arXiv:1412.1193 (2014).
2. Dangel, Felix, Stefan Harmeling, and Philipp Hennig. "Modular Block-diagonal Curvature Approximations for Feedforward Architectures." AISTATS. 2020.
3. Lee, John M. Riemannian manifolds: an introduction to curvature. Vol. 176. Springer Science & Business Media, 2006.
4. Dinh, Laurent, et al. "Sharp Minima can Generalize for Deep Nets." ICML, 2017.
5. Spivak, Michael D. A comprehensive introduction to differential geometry. Publish or perish, 1970.
