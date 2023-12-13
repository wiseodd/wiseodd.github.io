---
layout:     post
title:      "Volume Forms and Probability Density Functions Under Change of Variables"
subtitle:   "From elementary probability theory, it is well known that a probability density function (pdf) is not invariant under an arbitrary change of variables (reparametrization). In this article we'll see that pdf are actually invariant when we see a pdf in its entirety, as a volume form and a Radon-Nikodym derivative in differential geometry."
date:       2023-12-13 00:00
author:     "wiseodd"
header-img: "img/manifold2.svg"
category:   techblog
---

Suppose we have $\R^n$ equipped with the Cartesian **_coordinates_**; the latter represents a point in $\R^n$ with $x = (x^1, \dots, x^n)$, an $n$-tuple of numbers via the identity function $\mathrm{Id}_{\R^n}$---this is because $\R^n$ itself is already defined as the space of tuples of $n$ numbers.
(Note that $v^i$ is not a power, but just indexing; we write e.g. $(v^i)^2$ if we need to take the power.)

![Coordinates]({{ site.baseurl }}/img/2023-12-13-volume-form/01_coords.jpg){:width="50%"}

Here are some interesting objects to study in this setting.


<h2 class="section-heading">Riemannian Metrics</h2>

In $\R^d$, we usually have the standard Euclidean inner product $\inner{v, w} = \sum_{i=1}^n v^i w^i$ where $v = (v^1, \dots, v^n)$ and $w = (w^1, \dots, w^n)$ are two vectors.
We can write an inner product in terms of an inner product matrix $\inner{v, w} = v^\top G w$.

![Metric]({{ site.baseurl }}/img/2023-12-13-volume-form/02_metric.jpeg){:width="50%"}

The matrix $G$, which is symmetric positive definite, is called (the matrix representation of) a **_Riemannian metric_**.
In the case of the Euclidean inner product, we have $G = I$, the identity $n \times n$ matrix.


<h2 class="section-heading">Volume Forms</h2>

Another interesting object is the **_volume form_** $dx$.
This is a differential form of degree $n$, meaning that it takes $n$ vectors as arguments and returns a number.
There is a deeper meaning in the notation, but for the purpose of this post, it suffices to say that $dx$ measures the volume of a parallelepiped spanned by $n$ vectors.
Indeed, the evaluation $dx(v_1, \dots, v_n)$ on vectors $v_1, \dots, v_n$ is obtained by computing a determinant of the matrix obtained by stacking the tuples $v_1, \dots, v_n$.
An important fact is that if $f: \R^n \to \R$ is any continuous function on $\R^n$, then $f \, dx$ is also a volume form.

![Metric]({{ site.baseurl }}/img/2023-12-13-volume-form/03_dx.jpeg){:width="50%"}

The Riemannian metric $G$ and the volume form $dx$ can be combined to obtain a special volume form

$$
  dV_G = \sqrt{\abs{\det{G}}} \, dx
$$

called the **_Riemannian volume form_**.
In the case of $\R^n$ with the Cartesian coordinates and the standard dot product, $G = I$, so, $dV_G = dx$ is a special case.
The idea here is that non-identity $G$ "distort" the Cartesian grids and thus the volume changes proportionally to the distortion.
For this reason, $dV_G$ is _the_ natural volume form for any choice of metric and any manifold in general.
Indeed, technically speaking, it is the unique volume form that evaluates to one on parallelepipeds spanned by orthonormal basis vectors.


<h2 class="section-heading">Volume Forms and Measures</h2>

A differential form $f \, dx$ induces a measure via $\mu(A) = \int_A f \, dx$ for $A$ Borel measurable subset of $\R^n$.
One can then see that $dx$ is the volume form corresponding to the Lebesgue measure $\mu(A) = \int_A dx$.

Suppose we have a probability measure (with support in $\R^n$) and assume that it can be expressed as $P(A) = \int_A p \, dx$.
Then, $p$ is the probability density function (pdf) of $P$ under the reference measure $dx$, i.e., it is positive everywhere $p > 0$ and it integrates to one under $dx$, that is, $\int_{\R^n} p \, dx = 1$.

Another way to define $p$ as a pdf is via the Radon-Nikodym derivative

$$
  p = \frac{p \, dx}{dx} .
$$

Then it's clear that we can take any volume form as the reference measure, not just $dx$.
E.g., we can take

$$
  p_G := \frac{p \, dx}{dV_G} = \frac{p \, dx}{\sqrt{\abs{\det{G}}} \, dx} = p \, \abs{\det{G}}^{-\frac{1}{2}} ,
$$

which is a pdf under $dV_G$ since it's still positive (note that $G$ is positive-definite) and

$$
  \require{cancel}
  \int_{\R^n} p \, \abs{\det{G}}^{-\frac{1}{2}} \, dV_G = \int_{\R^n} p \, \cancel{\abs{\det{G}}^{-\frac{1}{2}}} \, \cancel{\abs{\det{G}}^{\frac{1}{2}}} \, dx = 1 ,
$$

i.e., it integrates to one under $dV_G$.



<h2 class="section-heading">Change of Variables</h2>

Now, assume that we have another coordinates for $\R^n$, say, representing each element of $\R^n$ with $y = (y^1, \dots, y^n)$ instead.
The change of coordinates function, mapping $x \mapsto y$ is a diffeomorphism---a differentiable function with a differentiable inverse.
Let's call it $\varphi$; and call its $n \times n$ Jacobian matrix $J = [\partial y^i / \partial x^j]\_{i,j=1}^n$ with inverse $J^{-1} = [\partial x^i / \partial y^j]_{ij=1}^n$.

![Change of coordinates]({{ site.baseurl }}/img/2023-12-13-volume-form/04_cov.jpeg){:width="60%"}

Here are some rules for transforming a metric and a volume form.

If $G$ is a matrix representation of a Riemannian metric in $x$-coordinates, then

$$
  \widehat{G} = (J^{-1})^\top G J^{-1}
$$

is the matrix representation of the same metric in $y$-coordinates.
Consequently, the determinant of the metric $\abs{\det G}$ transforms into $\abs{\det G} \, \abs{J^{-1}}^2$.
This transformation rule ensure if $\hat{v}, \hat{w}$ are the representations of $v, w$ in $y$-coordinates, then $\hat{v}^\top \widehat{G} \hat{w} = v^\top G w$.
That is, the value of the inner product is independent of the choice of coordinates.
In other words, this rule is to make sure we are referring to the same abstract object (in this case inner product, which is an abstract function) even when we use a different representation.

Now, if $f \, dx$ is a volume form in $x$-coordinates, then

$$
  (f \circ \varphi^{-1}) \, \abs{\det J^{-1}} \, dy
$$

is the same volume form in $y$-coordinates.
In particular, we have the relation $dx = \abs{\det J^{-1}} \, dy$ [2, Corollary 14.21].
Again, this rule is to ensure coordinate independence.

![Volume form under change of coordinates]({{ site.baseurl }}/img/2023-12-13-volume-form/05_dx-cov.jpeg){:width="75%"}

As a consequence, integrals are also invariant under a change of coordinates:

$$
  \int_{\varphi(A)} (f \circ \varphi) \, \underbrace{\abs{\det{J^{-1}}} \, dy}_{=dx} = \int_A f \, dx \,,
$$

where $A \subseteq \R^n$.
Notice that this is just the standard change-of-variable rule in calculus.
But one thing to keep in mind is that the Jacobian-determinant term is part of the transformation of $dx$, not the function $f$ itself.


<h2 class="section-heading">Pdfs Under Change of Variables</h2>

From elementary probability theory, we have the transformation of a pdf $p_x$ (defined w.r.t. $dx$):

$$
  p_y = (p_x \circ \varphi^{-1}) \, \abs{\det{J^{-1}}} \, ,
$$

and this is known to be problematic because of the additional Jacobian-determinant term.

![Pdf under change of coordinates]({{ site.baseurl }}/img/2023-12-13-volume-form/06_density-cov.jpeg){:width="70%"}

For instance, the mode $\argmax p_y$ of $p_y$ doesn't correspond to the mode $\argmax p_x$ of $p_x$.
That is, modes of pdfs are not coordinate-independent.
_Maximum a posterior_ (MAP) estimation, which is the standard estimation method for neural networks is thus pathological since an arbitrary reparametrization/change of variables will yield a different MAP estimate, see e.g. [1, Sec. 5.2.1.4]
Or are they?

The reason for the above transformation rule between $p_x$ and $p_y$ is to ensure invariance in the integration, to ensure that $p_y$ is a valid pdf w.r.t. $dy$:

$$
\begin{align}
  \int_{\varphi(\R^n)} p_y \, dy &= \int_{\varphi(\R^n)} (p_x \circ \varphi^\inv) \, \underbrace{\abs{\det J^{-1}} \, dy}_{= dx} \\
    %
    &= \int_{\R^n} p_x \, dx \\[5pt]
    %
    &= 1 .
\end{align}
$$

However, as we have seen before, $\abs{\det J^{-1}}$ is part of the transformation of $dx$, i.e. $dx = \abs{\det J^{-1}} dy$!
So, the problem in pdf maximization is actually because we attribute the Jacobian-determinant to the wrong part of the volume measure $p_x \, dx$.
This can only be detected if we see things holistically as the transformation of the whole volume form, and not just view it as the transformation of the function $p_x$ independently.

![Pdf under change of coordinates, correctly]({{ site.baseurl }}/img/2023-12-13-volume-form/07_density-cov-correct.jpeg){:width="70%"}

This leads to a very straightforward solution to the non-invariance problem.
Simply transform $p_x$ into $p_y = (p_x \circ \varphi^{-1})$.
This is just the transformation rule of standard function, so its extrema will always be coordinate-independent.
It is still a pdf w.r.t. $dy$, just don't forget to add a Jacobian-determinant term as part of the transformation from $dx$ to $dy$.


<h2 class="section-heading">Riemannian Pdfs Under Change of Variables</h2>

What about a Riemannian pdf $p_G = p_x \, \abs{\det{G}}^{-\frac{1}{2}}$ under the Riemannian volume form $dV_G$?
First, recall that $\abs{\det{\widehat{G}}} = \abs{\det{G}} \, \abs{\det J^{-1}}^2$.
So,

$$
  p_{\widehat{G}} = (p_x \circ \varphi^{-1}) \, \abs{\det{G}}^{-\frac{1}{2}} \, \abs{\det J^{-1}}^{-1} .
$$

This seems problematic since now we have the Jacobian determinant term again, just like the "incorrect" transformation of pdf in the previous section.
It actually is!
Just look at the following integral that attempts to show that $p_{\widehat{G}}$ integrates to one under $dV_{\widehat{G}}$.

$$
\begin{align}
  \int_{\varphi(\R^n)} p_{\widehat{G}} \, dV_{\widehat{G}} &= \int_{\varphi(\R^n)} (p_x \circ \varphi^{-1}) \, \cancel{\abs{\det{G}}^{-\frac{1}{2}}} \, \cancel{\abs{\det J^{-1}}^{-1}} \, \cancel{\abs{\det J^{-1}}} \, \cancel{\abs{\det G}^{\frac{1}{2}}} \, dy \\
    %
    &= \int_{\varphi(\R^n)} (p_x \circ \varphi^{-1}) \, dy .
\end{align}
$$

We now don't have the $\abs{\det{J^{-1}}}$ term anymore.
So we can't apply the relation $dx = \abs{\det{J^{-1}}} \, dy$ to complete the steps.
What gives?

This is actually because there is a Jacobian-determinant term that we forgot about because we don't see things as a whole.
The complete way to see a pdf is in terms of the Radon-Nikodym derivative.
So, let's see, in $x$-coordinates, we have:

$$
  p_G = \frac{p_x \, dx}{\abs{\det{G}}^{\frac{1}{2}} \, dx} .
$$

Now in $y$-coordinates, we have the following by transforming both the volume forms in the numerator and the denominator:

$$
  p_{\widehat{G}} = \frac{(p_x \circ \varphi^{-1}) \, \abs{\det{J^{-1}}} \, dy}{\abs{\det{G}}^{\frac{1}{2}} \, \abs{\det{J^{-1}}} \, dy} = (p_x \circ \varphi^{-1}) \, \abs{\det{G}}^{-\frac{1}{2}} .
$$

Compare this to before: we now don't have the Jacobian-determinant term!
Performing the integration as before:

$$
\begin{align}
  \int_{\varphi(\R^n)} p_{\widehat{G}} \, dV_{\widehat{G}} &= \int_{\varphi(\R^n)} (p_x \circ \varphi^{-1}) \, \cancel{\abs{\det{G}}^{-\frac{1}{2}}} \, \cancel{\abs{\det G}^{\frac{1}{2}}} \, \underbrace{\abs{\det J^{-1}} \, dy}_{=dx} \\
    %
    &= \int_{\R^n} p_x \, dx \\
    %
    &= 1 .
\end{align}
$$

And therefore, we have shown that $(p_x \circ \varphi^{-1}) \, \abs{\det{G}}^{-\frac{1}{2}}$ is the correct transformation of $p_G$.
Notice that this is again just a transformation of standard function and so the modes are coordinate-independent.


<h2 class="section-heading">Conclusion</h2>

Two take-aways from this post.
First, be aware of the correct transformation of objects.
In particular, for a volume form $f \, dx$, the Jacobian-determinant is part of the transformation of $dx$, not the function $f$.
This way, we don't have any problem with MAP estimation.

Second, it's best to see things as a whole to avoid confusion.
For pdfs, write them holistically as Radon-Nikodym derivatives.
Then, the correct transformations can easily be applied without confusion.


<h2 class="section-heading">References</h2>

1. Murphy, Kevin P. Machine learning: a probabilistic perspective. MIT Press, 2012.
2. Lee, John M. Introduction to Smooth Manifolds. 2003.
