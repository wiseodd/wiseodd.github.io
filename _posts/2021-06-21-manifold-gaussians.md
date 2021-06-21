---
layout:     post
title:      "The Curvature of the Manifold of Gaussian Distributions"
subtitle:   "The Gaussian probability distribution is central in statistics and machine learning. As it turns out, by equipping the set of all Gaussians p.d.f. with a Riemannian metric given by the Fisher information, we can see it as a Riemannian manifold. In this post, we will prove that this manifold can be covered by a single coordinate chart and has a constant negative curvature."
date:       2021-06-21 08:00
author:     "wiseodd"
header-img: "img/manifold.svg"
category:   techblog
tags:       [math]
---

The (univariate) Gaussian distribution is defined by the following p.d.f.:

$$
    \N(x \mid \mu, \sigma) := \frac{1}{\sigma \sqrt{2 \pi}} \exp\left( - \frac{(x-\mu)^2}{2 \sigma^2} \right) .
$$

Let $M := \\{ \N(x \mid \mu, \sigma) : (\mu, \sigma) \in \R \times \R_{> 0} \\}$ be the set of all Gaussian p.d.f.s. We would like to treat this set as a smooth manifold and then, additionally, as a Riemannian manifold.

First, let's define a coordinate chart for $M$. Let $\theta : M \to \R \times \R_{>0}$, defined by $\N(x \mid \mu, \sigma) \mapsto (\mu, \sigma)$ be such a chart. That is, the coordinate chart $\theta$ maps $M$ to the open Euclidean upper half-plane $\{ (x, y) : y > 0 \}$. Note that $\theta$ is a _global_ chart since the Gaussian distribution is uniquely identified by its location and scale (i.e. its mean and standard-deviation). Thus, we can interchangeably write $p \in M$ or $\theta := (\mu, \sigma) \in \R \times \R_{>0}$ with a slight abuse of notation. From here, it is clear that $M$ is of dimension $2$ because $\theta$ gives a homeomorphism from $M$ to $\R \times \R_{>0} \simeq \R^2$.

Now let us equip the smooth manifold $M$ with a Riemannian metric, say $g$. The standard choice for $g$ for probability distributions is the Fisher information metric. I.e., in coordinates, it is defined by

$$
\begin{align}
    g_{ij} &= g_{ij}(\theta) := \E_{\N(x \mid \mu, \sigma)} \left( \frac{\partial \log \N(x \mid \mu, \sigma)}{\partial \theta^i} \, \frac{\partial \log \N(x \mid \mu, \sigma)}{\partial \theta^i}^\top \right) \\
        %
        &= -\E_{\N(x \mid \mu, \sigma)} \left( \frac{\partial^2 \log \N(x \mid \mu, \sigma)}{\partial \theta^i \, \partial \theta^j} \right) .
\end{align}
$$

In a matrix form, it is (see [here](https://en.wikipedia.org/wiki/Normal_distribution))

$$
    G := (g_{ij}) = \begin{pmatrix}
            \frac{1}{\sigma^2} & 0 \\
            0 & \frac{2}{\sigma^2}
        \end{pmatrix} .
$$

Its inverse, denoted by upper indices, $(g^{ij}) = G^{-1}$ is given by

$$
    g^{ij} = \begin{pmatrix}
            \sigma^2 & 0 \\
            0 & \frac{\sigma^2}{2}
        \end{pmatrix} .
$$

Note in particular that the matrix $G$ is positive definite for any $(\mu, \sigma)$ and thus gives a notion of inner product in the tangent bundle of $M$. Therefore, the tuple $(M, g)$ is a Riemannian manifold.

One more structure is needed for computing the curvature(s) of $M$. We need to equip $(M, g)$ with an affine connection. Here, we will use the Levi-Civita connection $\nabla$ of $g$. Now we are ready to investigate the curvature of $(M, g)$.

**Note.** _We will use the Einstein summation convention from now on. For example, $\Gamma^k\_{ij} \Gamma^l\_{km} = \sum_k \Gamma^k\_{ij} \Gamma^l\_{km}$._


<h2 class="section-heading">Christoffel Symbols</h2>

The first order of business is to determine the connection coefficients of $\nabla$---the Christoffel symbols of the second kind. In coordinates, it is represented by the $3$-dimensional array $(\Gamma^k_{ij}) \in \R^{2 \times 2 \times 2}$, and is given by the following formula

$$
    \Gamma^k_{ij} := \frac{1}{2} g^{kl} \left( \frac{\partial g_{jl}}{\partial \theta^i} + \frac{\partial g_{il}}{\partial \theta^j} - \frac{\partial g_{ij}}{\partial \theta^l} \right) .
$$

Moreover, due to the symmetric property of the Levi-Civita connection, the lower indices of $\Gamma$ is symmetric, i.e. $\Gamma^k_{ij} = \Gamma^k_{ji}$ for all $i, j, k = 1, 2$.

Let us begin with $k = 1$. For $i,j = 1$, we have

$$
\begin{align}
    \Gamma^1_{11} &= \frac{1}{2} g^{11} \left( \frac{\partial g_{11}}{\partial \theta^1} + \frac{\partial g_{11}}{\partial \theta^1} - \frac{\partial g_{11}}{\partial \theta^1} \right) + \frac{1}{2} \underbrace{g^{12}}_{=0} \left( \frac{\partial g_{12}}{\partial \theta^1} + \frac{\partial g_{12}}{\partial \theta^1} - \frac{\partial g_{11}}{\partial \theta^2} \right) \\
        %
        &= \frac{1}{2} \sigma^2 \frac{\partial}{\partial \mu} \left( \frac{1}{\sigma^2} \right) = 0 .
\end{align}
$$

Similarly, we have $\Gamma^1\_{22} = 0$. For $\Gamma^1\_{12} = \Gamma^1\_{21}$, we have

$$
\require{cancel}
%
\begin{align}
    \Gamma^1_{12} = \Gamma^1_{21} &= \frac{1}{2} g^{11} \left( \cancel{\frac{\partial g_{21}}{\partial \theta^1}} + \frac{\partial g_{11}}{\partial \theta^2} - \cancel{\frac{\partial g_{12}}{\partial \theta^1}} \right) + \frac{1}{2} \underbrace{g^{12}}_{=0} \dots  \\
        %
        &= \frac{1}{2} \sigma^2 \frac{\partial}{\partial \sigma} \left( \frac{1}{\sigma^2} \right) \\
        %
        &= -\frac{1}{\sigma} .
\end{align}
$$

Note that in the above, we can immediately cross out partial derivatives that depend on $\theta^1 = \mu$ since we know that $g_{ij}$ does not depend on $\mu$ for all $i, j = 1, 2$. Meanwhile, we know immediately that the second term is zero because $g$ is diagonal---in particular $g^{ij} = 0$ for $i \neq j$.

Now, for $k=2$, we can easily show (the hardest part is to keep track the indices) that $\Gamma^2\_{12} = \Gamma^2\_{21} = \Gamma^2\_{22} = 0$. Meanwhile,

$$
\begin{align}
    \Gamma^2_{11} &= \frac{1}{2} \underbrace{g^{21}}_{0} \dots + \frac{1}{2} g^{22} \left( \cancel{\frac{\partial g_{12}}{\partial \theta^1}} + \cancel{\frac{\partial g_{12}}{\partial \theta^1}} - \frac{\partial g_{11}}{\partial \theta^2} \right) \\
        %
        &= -\frac{1}{2} \frac{\sigma^2}{2} \frac{\partial}{\partial \sigma} \left( \frac{1}{\sigma^2} \right) \\
        %
        &= \frac{1}{2\sigma} .
\end{align}
$$

So, all in all, $\Gamma$ is given by

$$
    \Gamma^k = \begin{cases}
        \begin{pmatrix}
            0 & -\frac{1}{\sigma} \\
            -\frac{1}{\sigma} & 0
        \end{pmatrix} & \text{if } k = 1 \\[3pt]
        %
        \begin{pmatrix}
            \frac{1}{2\sigma} & 0 \\
            0 & 0
        \end{pmatrix} & \text{if } k = 2  .
    \end{cases}
$$


<h2 class="section-heading">Sectional Curvature</h2>

Now we are ready to compute the curvature of $M$. There are different notions of curvatures, e.g. the Riemann, Ricci curvature tensor, or the scalar curvature. In this post, we focus on the sectional curvature, which is a generalization of the Gaussian curvature in classical surface geometry (i.e. the study of embedded $2$-dimensional surfaces in $\R^3$).

Let $v, w$ in $T_pM$ be two basis vectors for $T_pM$. The formula of the sectional curvature $\text{sec}(v, w)$ under $v, w$ is as follows:

$$
    \text{sec}(v, w) := \frac{Rm(v, w, w, v)}{\inner{v, v} \inner{w, w} - \inner{v, w}^2} ,
$$

where $Rm$ is the Riemann curvature tensor, and $\inner{\cdot, \cdot}$ denotes the inner product w.r.t. $g$. Note that $\text{sec}(v, w)$ is independent of the choice of $(v,w)$, i.e. given another pair of basis vectors $(v_0, w_0)$ of $T_pM$, we have that $\text{sec}(v_0, w_0) = \text{sec}(v, w)$.

The partial derivative operators $\frac{\partial}{\partial \theta^1} =: \partial_1$ and $\frac{\partial}{\partial \theta^2} =: \partial_2$ under the coordinates $\theta$ form a basis for $T_pM$. So, let us use them to compute the sectional curvature of $M$. In this case, the formula reads as

$$
    \text{sec}(\partial_1, \partial_2) = \frac{Rm(\partial_1, \partial_2, \partial_2, \partial_1)}{\inner{\partial_1, \partial_1} \inner{\partial_2, \partial_2} - \inner{\partial_1, \partial_2}^2} .
$$

But the definition of $Rm$ implies that $Rm(\partial_1, \partial_2, \partial_2, \partial_1) = R_{1221}$, i.e. the element $1,2,2,1$ of the multidimensional array representation of $Rm$ in coordinates. Moreover, by definition, $g_{ij} = \inner{\partial_1, \partial_2}$. And so:

$$
    \text{sec}(\partial_1, \partial_2) = \frac{R_{1221}}{\inner{g_{11} g_{22} - g_{12}^2}} = \frac{R_{1221}}{\det g} ,
$$

since $g$ is symmetric. Note that this is but the definition of the Gaussian curvature---indeed, in dimension $2$, the sectional and the Gaussian curvatures coincide.

We are now ready to compute $\text{sec}(\partial_1, \partial_2)$. The denominator is easy from our definition of $G$ at the beginning of this post:

$$
    \det g = \frac{1}{\sigma^2} \frac{2}{\sigma^2} = \frac{2}{\sigma^4} .
$$

For the numerator, we can compute $R_{ijkl}$ via the metric and the Christoffel symbols:

$$
    R_{ijkl} = g_{lm} \left( \frac{\partial \Gamma^m_{jk}}{\partial \theta^i} - \frac{\partial \Gamma^m_{ik}}{\partial \theta^j} + \Gamma^p_{jk} \Gamma^m_{ip} - \Gamma^p_{ik} \Gamma^m_{jp} \right) .
$$

So, we have

$$
\begin{align}
    R_{1221} &= g_{1m} \left( \frac{\partial \Gamma^m_{22}}{\partial \theta^1} - \frac{\partial \Gamma^m_{12}}{\partial \theta^2} + \Gamma^p_{22} \Gamma^m_{1p} - \Gamma^p_{12} \Gamma^m_{2p} \right) \\
        %
        &= g_{1m} \left( \frac{\partial \Gamma^m_{22}}{\partial \mu} - \frac{\partial \Gamma^m_{12}}{\partial \sigma} + \left( \Gamma^1_{22} \Gamma^m_{11} + \Gamma^2_{22} \Gamma^m_{12} \right) - \left( \Gamma^1_{12} \Gamma^m_{21} + \Gamma^2_{12} \Gamma^m_{22} \right) \right) \\
        %
        &= g_{11} \left( \frac{\partial \Gamma^1_{22}}{\partial \mu} - \frac{\partial \Gamma^1_{12}}{\partial \sigma} + \left( \Gamma^1_{22} \Gamma^1_{11} + \Gamma^2_{22} \Gamma^1_{12} \right) - \left( \Gamma^1_{12} \Gamma^1_{21} + \Gamma^2_{12} \Gamma^1_{22} \right) \right) + \underbrace{g_{12}}_{=0} \dots .
\end{align}
$$

Now, we can cross out the partial derivative term w.r.t. $\mu$ since we know already that none of the $\Gamma^k_{ij}$ depend on $\mu$. Moreover, recall that the Christoffel symbols are given by $\Gamma^1\_{12} = \Gamma^1\_{21} = -\frac{1}{\sigma}$ and $\Gamma^2\_{11} = \frac{1}{2\sigma}$, and $0$ otherwise. Hence,

$$
\begin{align}
    R_{1221} &= g_{11} \left( - \frac{\partial \Gamma^1_{12}}{\partial \sigma} - \Gamma^1_{12} \Gamma^1_{21} \right) \\
        %
        &= \frac{1}{\sigma^2} \left( -\frac{\partial}{\partial \sigma} \left( -\frac{1}{\sigma} \right) - \left( -\frac{1}{\sigma} \right)^2 \right) \\
        %
        &= \frac{1}{\sigma^2} \left( -\frac{2}{\sigma^2} - \frac{1}{\sigma^2} \right) \\
        %
        &= -\frac{2}{\sigma^4} .
\end{align}
$$

Thus, the sectional curvature is given by

$$
    \text{sec}(\partial_1, \partial_2) = \frac{-\frac{2}{\sigma^4}}{\frac{2}{\sigma^4}} = -1 .
$$

Note in particular that this sectional curvature does not depend on both $\mu$ and $\sigma$, i.e. it is constant. Hence, $M$ is a manifold of constant negative curvature. I.e., we can think of $M$ as a saddle surface.


<h2 class="section-heading">Visualization</h2>

Thanks to the amazing [`geomstats`](https://github.com/geomstats/geomstats) package, we can visualize $M$ in coordinates easily. The idea is by visualizing the contours of the distances from points in $\R \times \R_{>0}$ to $(0, 1)$, i.e. corresponding to $\N(x \mid 0, 1)$---the standard normal.

![Manifold of Gaussians]({{ site.baseurl }}/img/2021-06-21-manifold-gaussians/gaussians_geo.png){:width="80%"}

Above, red points are the discretized steps of geodesics from $\N(x \mid 0, 1)$ to other Gaussians with different mean and variance. Indeed, geodesics of $M$ behave similarly like in the Poincaré half-space model---one of the poster children of the hyperbolic geometry.
