---
layout:     post
title:      "The Geometry of the Probability Simplex"
subtitle:   "The Fisher information is often the default choice of the Riemannian metric for manifolds of probability distributions. In this post, we study Chentsov's theorem, which justifies this choice. It says that the Fisher information is the unique Riemannian metric (up to a scaling constant) that is invariant under sufficient statistics. This fact makes the Fisher metric stands out from other choices."
date:       2021-07-23 00:00
author:     "wiseodd"
header-img: "img/manifold.svg"
category:   techblog
tags:       [math]
---

The (interior of) **_probability $n$-simplex_**

$$
\Delta^{n} := \left\{ x \in \R^{n+1}_{>0} : x^i > 0 \enspace\forall i = 1, \dots, n+1; {\textstyle \sum_{i=1}^{n+1} x^i = 1} \right\}
$$

is important in statistics since it is the space of discrete (Categorical) distributions. (Here we restrict our discussion to the interior of the probability simplex for simplicity, since otherwise we have to talk about manifolds with boundary.) It is also the manifold in which Chentsov originally proved the fact that the Fisher information, as a Riemannian metric, is the unique invariant metric under sufficient statistics. In this article, we will study the geometry of $\Delta^n$. We begin with its *extrinsic* geometry, viewed as a submanifold of $\R^{n+1}\_{>0}$, showing that it is isometric to a sphere. Then, we will study its *intrinsic* geometry, where we pull the invariant metric on $\R^{n+1}\_{>0}$ back to $\Delta^n$ itself. Using this construction, we then compute its sectional curvature in dimension $2$, to verify that $\Delta^n$ indeed has a constant positive curvature.


<h2 class="section-heading">Extrinsic Geometry</h2>

A variant of Chentsov's theorem, due to Campbell (1986), shows that the invariant metric on $\Delta^n$, seen as a submanifold of $\R^{n+1}\_{>0}$ is given by

$$
g_{ij}(\theta) := \I_{ij}(\theta) := \delta_{ij} \frac{1}{\theta^i}  \qquad \theta \in \Delta^n \subset \R^{n+1}_{>0}
$$


What is the geometry $\Delta^n$ under this metric? It turns out, we can easily answer this because of the following result (Kass, 1989).


**Theorem 1.** _Let $\mathbb{S}^n(2) \subset \R^{n+1}$ be the $n$-sphere of radius $2$, equipped with the Euclidean metric of $\R^{n+1}$. The diffeomorphism $F: \Delta^n \to \mathbb{S}^n(2)$ is an isometry._

_Proof._ This proof is due to Åström, et al. (2017). Let $x(\theta) = \theta$ be the coordinates of $\R^{n+1}\_{>0}$. Let $\theta \in \Delta^n$, and $v, w \in T_\theta \Delta^n$. The pushforward of the coordinate basis $\partial_i \vert_\theta$ of $T_\theta \Delta^n$is given by the Jacobian matrix of $F$:

$$
    F_* \partial_i \vert_\theta = \delta_{ij} \frac{1}{\sqrt{\theta^i}} \, \partial_j \vert_{F(\theta)} .
$$

We need to show that $\inner{v, w}\_\theta = \inner{F_* v, F_* w}\_{F(\theta)}$---this is the definition of isometry. Note that

$$
    F_* v = \delta_{ij} \frac{1}{(\theta^i)^2} v^i \partial_j \vert_{F(\theta)} = \frac{v^j}{\sqrt{\theta^j}} \partial_j \vert_{F(\theta)} ,
$$

and analogously for $F_* w$. Furthermore, the inner product of at $F(\theta) \in \R^{n+1}$ is given by the Euclidean inner product, i.e. $g_{ij}(F(\theta)) = \delta_{ij}$. Therefore,

$$
\begin{align}
    \inner{F_* v, F_* w}_{F(\theta)} &= \delta_{ij} \frac{v^i}{\sqrt{\theta^i}} \frac{w^j}{\sqrt{\theta^j}} \\
        %
        &= \delta_{ij} \frac{1}{\theta^i} v^i w^j \\
        %
        &= g_{ij}(\theta) v^i w^j \\
        %
        &= \inner{v, w}_\theta .
\end{align}
$$

\\( \square \\)
{:.right}


This result shows that $\Delta^n$, with the Fisher information metric, is isometric to the $n$-sphere of radius $2$. In particular, the geometry of $\Delta^n$ is the same as the geometry of $\mathbb{S}(2)$. Therefore, $\Delta^n$ has a constant positive curvature, among other things.


<h2 class="section-heading">Intrinsic Geometry</h2>


We focus on $n = 2$ for simplicity. To study the intrinsic geometry of $\Delta^2$, we must provide a chart for it. This can simply be done by dropping the last vector component of any $\theta \in \Delta^2$, i.e. $(\theta^1, \theta^2, \theta^3) \mapsto (\theta^1, \theta^2)$. This is because $\theta^3$ is fully determined by the others by via $\theta^3 = 1-\theta^1-\theta^2$.

The inverse of the previous map, say $F: \nabla^2 \to \R^3\_{>0}$ with $(\theta^1, \theta^2) \mapsto (\theta^1, \theta^2, 1-\theta^1-\theta^2)$, is an embedding of $\nabla^2$ in $\R^3\_{>0}$. Since we also want to have an invariant metric on $\Delta^2$, we assume that $\R^3\_{>0}$ is equipped with the invariant metric $g$. Our goal is therefore to pull this metric back to $\Delta^2$ via $F$.

The pullback metric is given by mapping tangent vectors of $\Delta^2$ with the pushforward (i.e. Jacobian) of $F$:

$$
    \widetilde{g}_{ij} = \frac{\partial F^k}{\partial \theta^i} \frac{\partial F^l}{\partial \theta^j} g_{kl} = \frac{\partial F^k}{\partial \theta^i} \frac{\partial F^l}{\partial \theta^j} \delta_{kl} \frac{1}{\theta^k} .
$$

In matrix notation, this is

$$
    \widetilde{G} = J^\top \mathrm{diag}\left( \frac{1}{\theta^1}, \frac{1}{\theta^2}, \frac{1}{\theta^3} \right) J ,
$$

where

$$
    J := \begin{pmatrix}
        1 & 0 \\
        0 & 1 \\
        -1 & -1
    \end{pmatrix}
$$

is the Jacobian matrix of $F$. Hence,

$$
    \widetilde{G} = \begin{pmatrix}
        \frac{1}{x^1} + \frac{1}{x^3} & \frac{1}{x^3} \\
        \frac{1}{x^3} & \frac{1}{x^2} + \frac{1}{x^3}
    \end{pmatrix} ,
$$

and therefore

$$
    \widetilde{G}^{-1} = \frac{1}{\sum_{i=1}^3 x^i} \begin{pmatrix}
        x^1 x^2 + x^1 x^3 & -x^1 x^2 \\
        -x^1 x^2 & x^1 x^2 + x^2 x^3
    \end{pmatrix} .
$$


<h2 class="section-heading">References</h2>

1. Chentsov, N. N. "Statistical Decision Rules and Optimal Deductions." (1972).
2. Campbell, L. Lorne. "An extended Čencov characterization of the information metric." Proceedings of the American Mathematical Society 98, no. 1 (1986): 135-141.
2. R.E. Kass, The Geometry of Asymptotic Inference, Statistical Science 4 (1989), no. 3, 188–234.
3. Åström, Freddie, et al. "Image labeling by assignment." Journal of Mathematical Imaging and Vision 58.2 (2017): 211-238.
