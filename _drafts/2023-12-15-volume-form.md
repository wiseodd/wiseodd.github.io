---
layout:     post
title:      "Volume Forms and Why MAP Estimation is Invariant Under Change of Variables"
subtitle:   "From elementary probability theory, it is well known that a probability density function (pdf) is _not_ invariant under an arbitrary change of variables (reparametrization). In this article we'll see that pdf are actually invariant when we see a pdf in its entirety, as a volume form in differential geometry."
date:       2023-02-09 00:00
author:     "wiseodd"
header-img: "img/manifold.svg"
category:   techblog
---

Suppose we have $\R^n$ equipped with the Cartesian coordinates; the latter represent a point in $\R^n$ with $x = (x^1, \dots, x^n)$, an $n$-tuple of numbers.
(Note that $v^i$ is not a power, but just indexing; we write $(v^i)^2$ if we need to take the power.)
Here are some interesting objects to study in this setting.


<h2 class="section-heading">Riemannian Metrics</h2>

We have the standard Euclidean inner product $\inner{v, w} = \sum_{i=1}^n v^i w^i$ where $v = (v^1, \dots, v^n)$ and $w = (w^1, \dots, w^n)$ are two vectors.
Then we can write this inner product in terms of an inner product matrix $(g_{ij} = \delta_{ij})$ where $\delta_{ij}$ is the Kronecker delta, i.e., $\inner{v, w} = \sum_{i=1}^n \sum_{j=1}^n g_{ij} v^i w^j$; or, using the matrix form $\inner{v, w} = v^\top G w$.
The matrix $G$, with the components $[g_{ij}]_{i,j=1}^n$ is called (the matrix representation of) a Riemannian metric.


<h2 class="section-heading">Volume Forms</h2>

Another interesting object is the _volume form_ $dx$.
This is a differential form of degree $n$, meaning that it takes $n$ vectors as arguments and returning a number.
There is a deeper meaning in the notation, but for the purpose of this post, it suffices to say that $dx$ measures the volume of a paralleliped spanned by $n$ vectors.
Indeed, the evaluation $dx(v_1, \dots, v_n)$ on vectors $v_1, \dots, v_n$ is obtained by computing a determinant of the matrix obtained by stacking $v_1, \dots, v_n$.
An important fact is that if $f: \R^n \to \R$ is any continuous function on $\R^n$, then $f \, dx$ is also a volume form.

The Riemannian metric $G$ and the volume form $dx$ can be combined to obtain a special volume form

$$
  dV_G = \sqrt{\abs{\det{G}}} \, dx
$$

called the Riemannian volume form.
In the case of $\R^n$ with the Cartesian coordinates and the standard dot product, $G = I$, the $n \times n$ identity matrix.
So, $dV_G = dx$ as a special case.
The idea here is that non-identity $G$ "distort" the space and thus the volume changes proportionally to the distortion.
For this reason, $dV_G$ is _the_ natural volume form for any choice of metric and any manifold in general---technically speaking, it is the unique volume form that evaluates to one on parallelepipeds spanned by orthonormal basis vectors.


<h2 class="section-heading">Volume Forms and Measures</h2>

A differential form $f \, dx$ induces a measure via $\mu(A) = \int_A f \, dx$ for $A$ Borel measurable subset of $\R^n$.
One can then see that $dx$ is the volume form corresponds to the Lebesgue measure $\mu(A) = \int_A dx$.

Suppose we have a probability measure (with support in $\R^n$) and assume that it can be expressed as $P(A) = \int_A p \, dx$.
Then, $p$ is the probability density function (pdf) of $P$ under the reference measure $dx$, i.e., it is positive everywhere $p > 0$ and it integrates to one under $dx$, that is, $\int_{\R^n} p \, dx = 1$.

Another way to define $p$ as a pdf is via the Radon-Nikodym derivative

$$
  p = \frac{p \, dx}{dx} .
$$

Then it's clear that we can take any volume form as the reference, not just $dx$.
E.g., we can take

$$
  p_G := \frac{p \, dx}{dV_G} = \frac{p \, dx}{\sqrt{\abs{\det{G}}} \, dx} = p \, \abs{\det{G}}^{-\frac{1}{2}} ,
$$

which is a pdf under $dV_G$ since it's still positive (note that $G$ is positive-definite) and it integrates to one under $dV_G$:

$$
  \require{cancel}
  \int_{\R^n} p \, \abs{\det{G}}^{-\frac{1}{2}} \, dV_G = \int_{\R^n} p \, \cancel{\abs{\det{G}}^{-\frac{1}{2}}} \, \cancel{\abs{\det{G}}^{\frac{1}{2}}} \, dx = 1 .
$$



<h2 class="section-heading">Change of Variables</h2>

Now, assume that we have another coordinates for $\R^n$, say, representing each element of $\R^n$ with $y = (y^1, \dots, y^n)$.
The change of coordinates function, mapping $x \mapsto y$ is a diffeomorphism---a differentiable function with differentiable inverse---let's call it $\varphi$.
