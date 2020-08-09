---
layout:     post
title:      "Towards de Rham Cohomology, Part II: Differential Forms and the Exterior Derivative"
subtitle:   "In this three-part series, we will built our intuition towards de Rham cohomology. Particularly, in this article, we begin by studying the generalization of covector fields on smooth manifolds: the differential forms. We then talk about the exterior derivative which is the centerpiece of the future article on de Rham cohomology."
date:       2020-04-17 15:00
author:     "wiseodd"
header-img: "img/VectorField.svg"
category:   techblog
tags:       [math]
---

A tensor, i.e. a multilinear map, can be symmetric or alternating, covariant or contravariant. Here, we focus on alternating covariant tensors. "Covariant" means that they take vectors as arguments and output a real number. "Alternating" means that this real number changes sign whenever two of those arguments are interchanged. These tensors are important and has special name: **_$k$-covectors_**.

We will begin by studying an important tool for manipulating $k$-covectors on $V$: the wedge product. We will then see how can we generalize $k$-covectors in smooth manifold setting, in the form of differential forms. The key of this article (and de Rham cohomology) is the exterior derivative of differential forms. As always, this is article is based on Lee's smooth manifold book [1].


<h2 class="section-heading">Covector fields on smooth manifolds</h2>

Let $V$ be a finite-dimensional vector space and denote the space of $k$-covectors on $V$ by $\Lambda^k(V^\*)$. If $T^k(V^\*)$ denotes the space of $k$-tensors (both alternating and symmetric), then we can define the projection $\mathrm{Alt}: T^k(V^\*) \to \Lambda^k(V^\*)$, called **_alternation_**, by

$$
    (\mathrm{Alt} \, \alpha)(v_1, \dots, v_k) := \frac{1}{k!} \sum_{\sigma \in S_k} (\mathrm{sgn} \, \sigma) \, \alpha(v_{\sigma(1)}, \dots, v_{\sigma(k)}) \, ,
$$

where $S_k$ is the symmetric group (consisting of permutations) of $k$ elements, $\alpha \in T^k(V^\*)$, and $v_1, \dots v_k \in V$. When $k = 2$, we get the familiar formula:

$$
    (\mathrm{Alt} \, \beta)(v, w) = \frac{1}{2} \left( \beta(v, w) - \beta(w, v) \right) \, ,
$$

where $\beta$ is a 2-tensor. Compare this to the symmetric-antisymmetric decomposition of matrices in linear algebra!

Let $V$ be a finite-dimensional vector space. Given $\omega \in \Lambda^k(V^\*)$ and $\eta \in \Lambda^l(V^\*)$, we define their **_wedge product_** to be the following $(k+l)$-covector:

$$
    \omega \wedge \eta := \frac{(k + l)!}{k!l!} \mathrm{Alt}(\omega \otimes \eta) \, .
$$

In words, it is the alternated tensor product of $\omega$ and $\eta$, times some coefficient that depends on the ranks of $\omega$ and $\eta$. The wedge product is bilinear, associative, anticommutative, and is characterized by

$$
    \omega^1 \wedge \dots \wedge \omega^k(v_1, \dots, v_k) := \mathrm{det} \, (\omega^j(v_i)) \, ,
$$

where $\omega^i, \dots, \omega^k$ are arbitrary covectors; $v_1, \dots, v_k$ are vectors; and $(\omega^j(v_i))$ is the matrix which coefficients are $\omega^j(v_i)$ for all $i, j$.


<h2 class="section-heading">Differential forms and exterior derivatives</h2>

We now apply what we know about $k$-covectors to smooth manifolds. Roughly, instead of any dual space of a finite dimensional vector space $V$, we are now working on the cotangent bundle $T^\*M$ of a smooth manifold $M$. Let the space of the covariant alternating $k$-tensors on $M$ be denoted by

$$
    \Lambda^k T^*M := \coprod_{p \in M} \Lambda^k(T^*_pM) \, .
$$

A **_differential $k$-form_** is defined as a continuous tensor field on $M$ whose value at each point is an element of $\Lambda^k(T^\*\_pM)$. We furthermore denote the vector space of smooth $k$-forms by $\Omega^k(M)$ and define the wedge product pointwise by $(\omega \wedge \eta)\_p := \omega_p \wedge \eta_p$. In any smooth chart, a $k$-form $\omega$ can be written locally as

$$
\begin{align}
    \omega &= \sum_{i_1 < \dots < i_k} \omega_{i_1 \dots i_k} \, dx^{i_1} \wedge \dots \wedge dx^{i_k} \\
            &=: \sum_I \omega_I \, dx^I \, .
\end{align}
$$

Some familiar examples of differential forms are: a continuous real-valued function (0-form or scalar field) and covector field (1-form).

Since a smooth 0-forms is just a smooth real-valued functions, we can ask ourselves whether there is a generalization of the concept of differentiation of a function to smooth $k$-forms. The answer is yes and it is called the exterior derivative. The motivation of the exterior derivative is based on the [previous post]({% post_url 2020-03-14-covector-field %}) in this series.

Recall that not all 1-forms are differentials of functions. If $\omega$ is a 1-form, necessary condition for the existence of a smooth function $f$ s.t. $\omega = df$ is that $\omega$ be closed, i.e. its partial derivatives commutes in every coordinate chart. That is,

$$
    \frac{\partial \omega_j}{\partial x^i} - \frac{\partial \omega_i}{\partial x^j} = 0
$$

in every coordinate chart $x$. Notice that in general, the l.h.s. above is antisymmetric in the indices $i$ and $j$, so it can be seen as the $ij$-th component of an alternating 2-tensor field (2-form). We can define a 2-form $d\omega$ locally in each smooth chart by

$$
    d\omega = \sum_{i < j} \left( \frac{\partial \omega_j}{\partial x^i} - \frac{\partial \omega_i}{\partial x^j} \right) dx^i \wedge dx^j \, .
$$

So, $\omega$ is closed if and only if $d\omega = 0$ in each chart. It turns out that $d\omega$ is well-defined globally, independent to the choice of the coordinate chart, and can be generalized to differential forms of all degrees. For every smooth manifold $M$, there is a differential operator $d: \Omega^k(M) \to \Omega^{k+1}(M)$ satisfying $d(d\omega) = 0$ for all $k$-form $\omega$, which we will define after the construction on Euclidean space.

On Euclidean space, we can define $d$ as follows. Let

$$
    \omega := \sum_J \omega_J \, dx^J

$$

be a smooth $k$-form on an open subset $U \subseteq \R^n$, we define its **_exterior derivative_** $d\omega$ to be the following $(k+1)$-form:

$$
    d\omega := \sum_J \sum_i \frac{\partial \omega_J}{\partial x^i} dx^i \wedge dx^{j_1} \dots \wedge dx^{j_k} \, .
$$

This is indeed a generalization of the previous equation for 2-form since if $\omega$ is a 1-form, we have that

$$
\begin{align}
    d(\omega_j \, dx^j) &= \sum_{i,j} \frac{\partial \omega_j}{\partial x^i} dx^i \wedge dx^j \\
            &= \sum_{i < j} \frac{\partial \omega_j}{\partial x^i} dx^i \wedge dx^j + \sum_{i > j} \frac{\partial \omega_j}{\partial x^i} dx^i \wedge dx^j \\
            &= \sum_{i < j}  \left( \frac{\partial \omega_j}{\partial x^i} - \frac{\partial \omega_i}{\partial x^j} \right) dx^i \wedge dx^j \, ,
\end{align}
$$

where the last equality is obtained by interchanging $i$ and $j$ in the second sum and use the alternating property $dx^j \wedge dx^i = -dx^i \wedge dx^j$. Moreover, if $f$ is a smooth real-valued function (i.e. a smooth $0$-form), we have

$$
    df = \frac{\partial f}{\partial x^i} \, dx^i \,
$$

which is familiar to us, since it is just the differential of $f$.

**Proposition 1 (Some properties of $d$ on $\R^n$).** _Let $d$ be the exterior derivative defined above. Then $d$ is linear over $\R$ and $d \circ d \equiv 0$._

_Proof._ Let $\omega, \nu$ be smooth $k$-forms, $x$ be a coordinate chart, and $a, b \in \R$ be constants. For brevity, let $z^i := dx^i \wedge dx^{j_1} \dots \wedge dx^{j_k}$ By definition of $d$:

$$
\begin{align}
    d(a \omega + b \nu) &= d(a \omega_j \, dx^j + b \nu_j \, dx^j) \\
            &= \sum_J \sum_i \frac{\partial (a \omega_J + b \nu_J)}{\partial x^i} z^i \\
            &= \sum_J \sum_i \left( a \frac{\partial \omega_J}{\partial x^i} + b \frac{\partial \nu_J}{\partial x^i} \right) z^i \\
            &= a \sum_J \sum_i \frac{\partial \omega_J}{\partial x^i} z^i + b \sum_J \sum_i \frac{\partial \nu_J}{\partial x^i} z^i \\
            &= a \, d\omega + b \, d\nu \, ,
\end{align}
$$

which proves the linearity of $d$. For the second statement, we consider first the special case of a $0$-form $f$. We have

$$
\begin{align}
    d(df) &= d\left( \frac{\partial f}{\partial x^j} dx^j \right) = \frac{\partial^2 f}{\partial x^i \partial x^j} dx^i \wedge dx^j \\
            &= \sum_{i < j} \left( \frac{\partial^2 f}{\partial x^i \partial x^j} - \frac{\partial^2 f}{\partial x^j \partial x^i} \right) dx^i \wedge dx^j = 0 \, ,
\end{align}
$$

since the second partial derivatives of $f$ commute.

For the general case, we requires the result that is not discussed in this post (see e.g. Prop. 14.23 (b) of Lee's book), namely: If $\omega$ is a smooth $k$-form and $\nu$ is a smooth $l$-form on an open subset $U$ of $\R^n$, then

$$
    d(\omega \wedge \nu) = d\omega \wedge \nu + (-1)^k \omega \wedge d\nu \, .
$$

Using this result, the linearity of $d$, and keeping in mind that each $\omega_J$ and $x^{j_i}$ are just $0$-forms (real-valued functions), we have:

$$
\begin{align}
    d(d\omega) &= d ( \sum_J d\omega_J \wedge dx^{j_1} \dots \wedge dx^{j_k} ) \\
            &= \sum_J d\left(d\omega_J \wedge (dx^{j_1} \wedge \dots \wedge dx^{j_k}) \right) \\
            &= \sum_J d(d\omega_J) \wedge dx^{j_1} \wedge \dots \wedge dx^{j_k} + d\omega_J \wedge d(dx^{j_1} \wedge \dots \wedge dx^{j_k}) \\
            &= \sum_J d(d\omega_J) \wedge dx^{j_1} \wedge \dots \wedge dx^{j_k} \\
            & \qquad + \sum_{i=1}^k (-1)^i \, d\omega_J \wedge dx^{j_1} \dots \wedge d(dx^{j_i}) \wedge \dots \wedge dx^{j_k} \, .
\end{align}
$$

Applying the previous result for $0$-forms to $d(d\omega_J)$ and $d(dx^{j_i})$ sees the summands are all zero. Thus $d(d\omega) = 0$. (The last equality can be seen more clearly if one write out explicitly what are $d(dx^{j_1} \wedge dx^{j_2})$, $d(dx^{j_1} \wedge dx^{j_2} \wedge dx^{j_3})$, and so on; and by taking into account that the wedge product is associative.)


$\square$
{:.right}


We can then use the above properties to define the exterior derivate on manifolds. Formally, if $M$ is a smooth manifold, the operators $d: \Omega^k(M) \to \Omega^{k+1}(M)$ for all $k$ are called **_exterior differentiation_**, if they satisfy the following four properties:

1. $d$ is linear over $\R$.
2. If $\omega \in \Omega^k(M)$ and $\nu \in \Omega^l(M)$, then $d(\omega \wedge \nu) = d\omega \wedge \nu + (-1)^k \omega \wedge d\nu$. In particular, if $k = 1$, this is similar to the usual Leibniz property.
3. $d \circ d = 0$.
4. For $f \in \Omega^0(M) = C^\infty(M)$, $df$ is the differential of $f$.

Moreover, in any smooth coordinate chart, $d$ is given by the exterior derivative defined before in Euclidean space.

We can extend the terminology we have from the previous post about covector fields. A smooth $k$-form $\omega$ is **_closed_** if $d\omega = 0$, and **_exact_** if there exists a smooth $(k-1)$-form $\nu$ on $M$ s.t. $\omega = d\nu$. Since $d \circ d = 0$, this implies that every exact form is closed.

The exterior differentiation will be the key for studying de Rham cohomology, which is our next and last post in this series.



<h2 class="section-heading">References</h2>

1. Lee, John M. "Smooth manifolds." Introduction to Smooth Manifolds. Springer, New York, NY, 2013. 1-31.
