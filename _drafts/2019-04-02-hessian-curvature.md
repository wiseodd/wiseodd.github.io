---
layout:     post
title:      "Hessian and Curvature: An Extrinsic Geometric Point of View"
subtitle:   "This article is a collection of small notes on Riemannian geometry that I find useful as references. It is largely based on Lee's books on smooth and Riemannian manifolds."
date:       2019-04-02 12:00
author:     "wiseodd"
header-img: "img/manifold.svg"
category:   techblog
tags:       [math]
---

**Disclaimer.** _This article is a personal note on my problem-solving attempts. It is not peer-reviewed, and thus should not be used as a reference. Please let me know if there are errors, via <kristiadi@pm.me>._

In calculus, we know that we can measure the curvature of a graph of real-valued function $$f: \R^n \to \R$$ by its $$n \times n$$ Hessian matrix $$H_{ij} := f_{x^i x^j}$$ for all $$i,j = 1, \dots, n$$. The justification comes from the second-order Taylor expansion: Locally, the Hessian gives us the best quadratic approximation of $$f$$. That is, for all $$p \in \R^n$$, there is an open neighborhood $$U \subset \R^n$$ containing $$p$$, such that the following holds:

$$
    f(p+d) = f(p) + d^\T \nabla f + \frac{1}{2} d^\T H d + O(d^3) \, .
$$

We would like to generalize this idea by viewing the Hessian and curvature from geometric point of view. The advantage is that we are not constrained to a function from $$\R^n \to \R$$ anymore. Indeed, we can assume the function $$f$$ to be a map between any arbitrary manifolds $$\M$$ and $$\N$$. We start from the simplest case, where $$M = \R^n$$ and $$N = \R$$, i.e. as in the calculus case.


<h2 class="section-heading">Graphs as Euclidean hypersurfaces</h2>

Let $$f: \R^n \to \R$$. We know that the graph of $$f$$, given by

$$
    \S := \{ (x, f(x)) : x \in \R^n \} \subseteq \R^{n+1} \, ,
$$

is a hypersurface (submanifold with codimension $$1$$) in $$\R^{n+1}$$. It has a global parametrization $$x: \R^n \to \R^{n+1}$$ called a **_graph parametrization_**, given by $$x(u) := (u, f(u) =: v)$$. The corresponding coordinate functions $$(u^1, \dots, u^n, v)$$ on $$\R^{n+1}$$ is called **_graph coordinates_**.

To measure the curvature of $$\S$$, we need to compute the shape operator $$s$$. First, we define $$F: \R^{n+1} \to \R$$ by

$$
    F(u, v) := f(u) - v \, ,
$$

as an extension of $$f$$ to $$\R^{n+1}$$. Then $$\S$$ can be written as the regular zero level set of $$F$$, i.e. $$\S = F^{-1}(0)$$. That is, $$F$$ is a **_defining function_** of $$\S$$. This implies that the normal field $$N$$ can be obtained using the gradient of $$F$$:

$$
    N = \frac{\grad{F}}{\norm{\grad{F}}} \, .
$$

If $$\left \{ \frac{\partial}{\partial u^1}, \dots, \frac{\partial}{\partial u^n}, \frac{\partial}{\partial v} \right \}$$ is the basis of $$T\R^{n+1}$$, the gradient of $$F$$ is given by

$$
\begin{align}
    \grad{F} &= \sum_i^{n} \frac{\partial f}{\partial u^i} \frac{\partial}{\partial u^i} - \frac{\partial}{\partial v} \\
             &= \grad{f} - \frac{\partial}{\partial v} \, ,
\end{align}
$$

with length

$$
    \norm{\grad{F}} = \sqrt{\norm{\grad{f}}^2 + 1} \, .
$$

Hence the normal field is given by

$$
    N = \frac{\grad{f} + \frac{\partial}{\partial v}}{\sqrt{\norm{\grad{f}}^2 + 1}} \, .
$$

By definition, the shape operator $$s$$ of a hypersurface is given by the extrinsic covariant derivative of a normal field. Thus, let $$\bar{\nabla}$$ be the Euclidean connection on $$\R^{n+1}$$ and let $$X \in \mathfrak{X}(\R^{n+1})$$ tangent to $$\S$$, then

$$
\begin{align}
    sX &= \bar{\nabla}_X \, N \\
       &= \frac{\bar{\nabla}_X \, \grad{f} + \bar{\nabla}_X \, \frac{\partial}{\partial v}}{\sqrt{\norm{\grad{f}}^2 + 1}}  \\[5pt]
       &= \frac{\bar{\nabla}_X \, \grad{f}}{\sqrt{\norm{\grad{f}}^2 + 1}}  \, .
\end{align}
$$

Notice that, if in addition $$Y \in \mathfrak{X}(\R^{n+1})$$, the second fundamental form  $$h(X, Y)$$ is given by

$$
\begin{align}
    h(X, Y) &= \inner{sX, Y} = \frac{\inner{\bar{\nabla}_X \, \grad{f}, Y}}{\sqrt{\norm{\grad{f}}^2 + 1}} \\[5pt]
            &= \frac{\Hess{f}(X, Y)}{\sqrt{\norm{\grad{f}}^2 + 1}} \, .
\end{align}
$$

Thus, in this case, the Hessian is proportional to the second fundamental form of the hypersurface induced by $$f$$, which is an extrinsic geometric object. As we are working in Euclidean space with Euclidean metric tensor $$\bar{g}_{ij} := \delta_{ij}$$, in the coordinates, the matrix representation of $$s$$ and $$h$$ coincides. It is given by the Hessian matrix of $$f$$, denoted by $$H$$, times some scalar. Component-wise, we have

$$
    (s)_{ij} = (h)_{ij} = \frac{(H)_{ij}}{\sqrt{\norm{\grad{f}}^2 + 1}} = \frac{1}{\sqrt{\norm{\grad{f}}^2 + 1}} \frac{\partial^2 f}{\partial u^i \partial u^j} \, .
$$

Given this matrix representation, the curvatures can be readily computed. For example, the principal curvatures are its eigenvalues, telling us the magnitude of the curvatures in the direction of its eigenvectors, which we call the principal directions. Note that, it is then coincides with our intuition from calculus: the eigendecomposition of the Hessian matrix tells us about the local curvature information of the graph of a real-valued function on $$\R^n$$.

**Example 1 (Sphere).** If $$u \in \R^{n+1}$$, the function $$F: \R^{n+1} \to \R$$ given by $$F = \norm{u}^2$$ is a defining map for a sphere $$\mathbb{S}^{n+1}(R)$$ with radius $$R$$. That is, it is defined as the level set of $$F$$:

$$
    \mathbb{S}^{n+1}(R) := \{ u : u \in \R^{n+1}, F(u) = R^2 \} \subset \R^{n+1} \, .
$$

The gradient of $$F$$ is

$$
\begin{align}
    \grad{F} &= \sum_{i=1}^{n+1} \frac{\partial F}{\partial u^i} \frac{\partial}{\partial u^i} \\
             &= 2 \sum_{i=1}^{n+1} u^i \frac{\partial}{\partial u^i} \, ,
\end{align}
$$

with length

$$
\begin{align}
    \norm{\grad{F}} &= \sqrt{4 \sum_{i=1}^{n+1} (u^i)^2} \\[5pt]
                    &= 2R \, .
\end{align}
$$

Note that $$\frac{\partial^2 F}{\partial u^i \partial u^j} = 2 \delta_{ij}$$. Thus, the matrix representation of the shape operator is

$$
\begin{align}
    (s) &= \frac{1}{2R} 2I \\[5pt]
             &= \frac{1}{R} I \, .
\end{align}
$$

That is, the shape operator is a diagonal matrix with constant diagonal entries of $$1/R$$. Thus the principal curvatures are all $$1/R$$.

//
{:.right}

**Example 2 (Paraboloid).** Let $$f: \R^n \to R$$ defined by $$f = \norm{u}^2$$. It has gradient

$$
    \grad{F} = 2 \sum_{i=1}^{n+1} u^i \frac{\partial}{\partial u^i} \, ,
$$

with length

$$
\begin{align}
    \norm{\grad{F}} &= \sqrt{4 \sum_{i=1}^{n+1} (u^i)^2 + 1} \\[5pt]
                    &= \sqrt{4 \norm{u}^2 + 1} \, .
\end{align}
$$

The second derivative is again, as in sphere, $$\frac{\partial^2 F}{\partial u^i \partial u^j} = 2 \delta_{ij}$$. Thus the shape operator at $$u$$ is

$$
    (s) = \frac{1}{\sqrt{4 \norm{u}^2 + 1}} I \, ,
$$

implying that each of the principal curvature is a function of $$u$$. In particular, it is constant at every point in $$\{ u : u \in \R^{n}, \norm{u} = c \}$$ for any constant $$c$$. This agrees with our intuition that any level set of the paraboloid $$f$$ is a sphere, which has a constant principal curvature, as we have previously shown.

//
{:.right}


<h2 class="section-heading">References</h2>

1. <https://math.stackexchange.com/questions/242649/second-fundamental-form-proportional-to-the-hessian>, accessed on 01-04-2019.
