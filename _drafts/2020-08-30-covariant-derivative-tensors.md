---
layout:     post
title:      "Covariant Derivatives of Tensor Fields"
subtitle:   "We have seen the definition of covariant derivatives of vector fields in the previous post. It turns out a connection in the tangent bundle of a smooth manifold also induces covariant derivatives of tensor fields on the manifold. In this post, we will study this."
date:       2020-08-30 06:00
author:     "wiseodd"
header-img: "img/manifold.svg"
category:   techblog
tags:       [math]
---


_**Disclaimer.** This post is my study notes on Lee's geometry books [1, 2], containing a condensed (in terms of topics) yet more verbose (in terms of details e.g. in the proofs) version of Lee's writings along with my personal interpretation and commentaries._
<br/><br/>


We have seen the definition of covariant derivatives of vector fields in the previous post. It turns out a connection in the tangent bundle of a smooth manifold also induces covariant derivatives of tensor fields on the manifold. In this post, we will study this. However, before we begin, we will first review tensors, which are essential for our discussion---not to mention that they are fundamental in Riemannian geometry.


<h2 class="section-heading">Tensors</h2>

To people in applied math and engineering fields, tensors seem to mean "multi-dimensional arrays" (I am looking at you, deep learning). However, it actually has more abstract interpretation than that: tensors are simply multilinear maps. This is somewhat similar to what matrices are to linear maps.

Suppose $V_1, \dots, V_k$ and $W$ are (real) vector spaces. A map $F: V_1 \times \dots \times V_k \to W$ is said to be **_multilinear_** if it is linear as a function of each variable separately when all the others are held fixed. That is:

$$
    F(v_1, \dots, \alpha v_i + \beta v_i', \dots, v_k) = \alpha F(v_1, \dots, v_i, \dots, v_k) + \beta F(v_1, \dots, v_i', \dots, v_k) .
$$

If $V$ is a finite-dimensional vector space, a **_covariant $k$-tensor_** on $V$ is a multilinear map

$$
    F: \underbrace{V \times \dots \times V}_{k \text{ times}} \to \R ,
$$

while a **_contravariant $k$-tensor_** on $V$ is a multilinear map

$$
    F: \underbrace{V^* \times \dots \times V^*}_{k \text{ times}} \to \R .
$$


Suppose $V$ is a vector space, and $\omega, \eta \in V^\*$ are covectors. The **_tensor product of covectors_** $\omega$ and $\eta$ is the function $\omega \otimes \eta: V \times V \to \R$ defined by

$$
    \omega \otimes \eta(v_1, v_2) := \omega(v_1)\eta(v_2) ,
$$

where the product in the r.h.s. is just a multiplication of real numbers, since a covector in $V^\*$ is just a function $V \to \R$. One can easily check that $\omega \otimes \eta$ is a tensor.

The names "covariant" and "contravariant" stem from the fact that they can be written as $k$-fold tensor product of $k$ covariant (i.e. covector) and contravariant (i.e. the usual vector) vectors, respectively. (The difference between covariant and contravariant vectors can be seen [here]({% post_url 2019-02-17-riemannian-geometry %}))

We can actually have mixed the types of a tensor. A **_mixed tensor_** of type $(k, l)$ is a multilinear map

$$
    F: \underbrace{V^* \times \dots \times V^*}_{k \text{ times}} \times \underbrace{V \times \dots \times V}_{l \text{ times}} \to \R .
$$

That is, the tensor has $k$ contravariant and $l$ covariant arguments. The **_rank_** of a tensor is the number of arguments it takes. Thus, a covariant/contravariant $k$-tensor has rank $k$, while a mixed $(k, l)$-tensor has rank $k+l$. By convention, a $0$-tensor is a real number.

We can also generalize the tensor product between covectors defined above. If $F \in T^{(k, l)}(V)$ and $G \in T^{(p, q)}(V)$, the **_tensor product_** of $F$ and $G$ is the tensor $F \otimes G \in T^{(k+p, l+q)}(V)$ defined by

$$
\begin{align}
    F \otimes G(\omega^1, &\dots, \omega^{k+p}, v_1, \dots, v_{l+q}) = \\
        &F(\omega^1, \dots, \omega^k, v_1, \dots, v_l)G(\omega^{k+1}, \dots, \omega^{k+p}, v_{l+1}, \dots, v_{l+q}) .
\end{align}
$$

Let $V$ be an $n$-dimensional vector space. If $(b_i)\_{i=1}^n$ and $(\beta^j)\_{i=1}^n$ are bases for $V$ and $V^\*$, respectively, then a basis for $T^{(k, l)}(V)$ is given by the set of all tensors of the form

$$
    b_{i_1} \otimes \dots \otimes b_{i_k} \otimes \beta^{j_1} \otimes \dots \otimes \beta^{j_l} ,
$$

where the indices $i_p$ and $j_q$ range from $1$ to $n$. In other words, a basis for $T^{(k, l)}(V)$ can be obtained by picking $k$ basis vectors from $(b_i)$ and $l$ basis covectors from $(\beta^j)$, and take their tensor product.

Every tensor $F \in T^{(k, l)(V)}$ can be written in terms of this basis as (note the usage of the Einstein summation convention)

$$
    F = F^{i_1, \dots, i_k}_{j_1, \dots, j_l} \, b_{i_1} \otimes \dots \otimes b_{i_k} \otimes \beta^{j_1} \otimes \dots \otimes \beta^{j_l} ,
$$

where the coefficient is

$$
    F^{i_1, \dots, i_k}_{j_1, \dots, j_l} := F(\beta^{i_1}, \dots, \beta^{i_k}, b_{j_1}, \dots, b_{j_l}) .
$$


The spaces of tensors on $V$ of various types are denoted by

$$
\begin{align}
    T^k(V^*) &:= \{ \text{covariant $k$-tensors on $V$} \} , \\
    T^k(V) &:= \{ \text{contravariant $k$-tensors on $V$} \} , \\
    T^{(k, l)}(V) &:= \{ \text{mixed $(k, l)$-tensors on $V$} \} ,
\end{align}
$$

There are some useful identifications among some of those spaces:

$$
\begin{align}
    T^{(0, 0)}(V) &= T^0(V) = T^0(V^*) = \R, \\
    T^{(1, 0)}(V) &= T^1(V) = V, \\
    T^{(0, 1)}(V) &= T^1(V^*) = V^*, \\
    T^{(k, 0)}(V) &= T^k(V), \\
    T^{(0, k)}(V) &= T^k(V^*) .
\end{align}
$$

**Proposition 1.** _Let $V$ be finite-dimensional vector space. There is a basis-independent isomorphism between $T^{(k+1, l)}(V)$ and the space of multilinear maps_

$$
    \underbrace{V^* \times \dots \times V^*}_{k \text{ times}} \times \underbrace{V \times \dots \times V}_{l \text{ times}} \to V .
$$

_Proof._ Let us begin with the special case of $k = 0$, $l = 1$, i.e. we have

$$
    T^{(1, 1)}(V) = \{ \text{Multilinear functions } V^* \times V \to \R \} .
$$

Suppose $\mathrm{End}(V)$ denotes the space of linear maps $V \to V$ (i.e. the **_endomorphism_** of $V$). Consider the map $\Phi: \mathrm{End}(V) \to T^{(1, 1)}(V)$ defined by letting $\Phi A$ be the $(1, 1)$-tensor defined by

$$
    (\Phi A)(\omega, v) := \omega(Av) .
$$

<!-- We need to show that $\Phi$ is linear, injective, and surjective. Linearity can easily be shown by noting that endomorphisms and covectors are linear maps. For injectivity, suppose $\Phi A = \Phi B$. This means for arbitrary $\omega, v$ we have that $\omega(Av) = \omega(Bv)$. Therefore, $\omega((A-B)v) = 0$ and it follows that $A = B$ by the arbitrariness of $\omega$ and $v$. -->


Furthermore, we define $\Phi': T^{(1, 1)}(V) \to \mathrm{End}(V)$ by defining the action of $\Phi' F$ on $v \in V$ by

$$
    (\Phi' F)(v) = F(\cdot, v) .
$$

Note that $F(\cdot, v) = V^\* \to \R$ and thus an element of the double-dual space $V^{\*\*}$, which in turns is naturally isomorphic to $V$ itself. Therefore $\Phi' F$ is indeed an endomorphism.

Now, suppose $A \in \mathrm{End}(V)$. Then

$$
    (\Phi' \Phi A)(v) = (\Phi A)(\cdot, v) .
$$

Seeing $(\Phi' \Phi A)(v)$ as an element of $V^{\*\*}$, its action on $\omega \in V^\*$ is given by

$$
    (\Phi' \Phi A)(v)(\omega) = (\Phi A)(\omega, v) = \omega(\underbrace{A (v)}_{\in V^{* *}}) = A(v)(\omega).
$$

Thus it follows that $(\Phi' \Phi A) = A$.

Conversely, suppose that $F \in T^{(1, 1)}(V)$. Then,

$$
    (\Phi \Phi' F)(\omega, v) = \omega((\underbrace{F(\cdot, v)}_{\in V^{* *}}) = F(\cdot, v)(\omega) = F(\omega, v) .
$$

Thus, we have shown that $\Phi$ and $\Phi'$ are mutually inverse to each other without relying on a choice of basis and therefore $\Phi$ is a natural isomorphism.

The general case is similar: Simply use the $(k+1)$-st contravariant argument of a $(k+1, l)$-tensor as the slot for inserting $\omega$ and use the same argument as above.

$\square$
{:.right}

We can use the result from the previous proposition to define a linear operator called **_trace_** which lowers the rank of a tensor by $2$. In the special case of $(1, 1)$-tensor, the operator $\mathrm{tr}: T^{(1, 1)}(V) \to \R$ is just the trace of $F$ when it is regarded as an endomorphism of $V$, or in other words, the sum of the diagonal entries of any matrix representation of $F$---just like the standard definition in linear algebra. In general, we define the operator $\mathrm{tr}: T^{(k+1, l+1)}(V) \to T^{(k, l)}(V)$ by letting the action $(\mathrm{tr\,} F)(\omega^1, \dots, \omega^k, v_1, \dots, v^k)$ be the trace of the $(1, 1)$-tensor

$$
    F(\omega^1, \dots, \omega^k, \, \cdot \,, v_1, \dots, v_l, \, \cdot \,) \in T^{(1, 1)}(V).
$$

In terms of a basis, the components of $\mathrm{tr\,} F$ are

$$
    (\mathrm{tr\,}F)^{i_1 \dots j_k}_{j_1 \dots j_l} = F^{i_1 \dots j_k \, m}_{j_1 \dots j_l \, m} = \sum_{m=1}^n F^{i_1 \dots j_k \, m}_{j_1 \dots j_l \, m} .
$$

That is, we simply set the last contravariant and covariant indices equal and by the Einstein summation convention, we sum over those indices.

So far, we have only talked about tensors on vector spaces. Now we extend the constructions on each tangent space of a smooth manifold (which is a vector space). Suppose $M$ is a smooth $n$-manifold. At each tangent space $T_p M$, we can define tensors as before, yielding tensors at $p \in M$. The disjoint union of tensor spaces of a particular type at all points on $M$ is called a **_tensor bundle_**. One example is the cotangent bundle $T^\*M$ which we have seen previously. More generally, the **_bundle of $(k, l)$-tensors_** on $M$ is defined as

$$
    T^{(k, l)}TM := \coprod_{p \in M} T^{(k, l)}(T_p M) .
$$

A **_tensor field_** on $M$ is a section of some tensor bundle over $M$, which can be seen as smooth map mapping a point in $M$ to the particular tensor space at that point. We denote the space of all smooth $(k, l)$-tensor fields as $\Gamma(T^{(k, l)} TM)$. In particular, we denote the space of all smooth covariant $k$-tensor fields as $\mathcal{T}^k(M)$.

Let $(E_i) := (E_1, \dots, E_n)$ be any smooth local frame for $TM$ over an open subset $U \subseteq M$. It gives rise to the **_dual coframe_** denoted by $(\epsilon^i) := (\epsilon^1, \dots, \epsilon^n)$, which is a basis for the cotangent bundle $T^\*M$ over $U$. $(\epsilon^i)$ are smooth covector fields satisfying $\epsilon^i(E_j) = \delta^i_j$. In particular, given a coordinate frame $(\partial_i)$, the dual coframe is $(dx^i)$.

In terms of any frame $(E_i)$ and its dual coframe $(\epsilon^i)$, the tensor fields $E_{i_1} \otimes \dots \otimes E_{i_k} \otimes \epsilon^{j_1} \otimes \dots \otimes \epsilon^{j_l}$ form a smooth local frame for $T^{(k, l)}(T^\* M)$. In particular, in local coordinates $(x^i)$, a $(k, l)$-tensor field $F$ has a coordinate expression in the form

$$
    F = F^{i_1 \dots i_k}_{j_1 \dots j_l} \, \partial_{i_1} \otimes \dots \otimes \partial_{i_k} \otimes dx^{j_1} \otimes \dots \otimes dx^{j_l} ,
$$

where each coefficient $F^{i_1 \dots i_k}\_{j_1 \dots j_l}$ is in $C^\infty(U)$.

It is easy to see that tensor fields are linear over $\R$. Even more important, that they are multilinear over $C^\infty(M)$. Let $F \in \Gamma(T^{(k, l)} TM)$ be a smooth tensor field. Given smooth covector fields $\omega^1, \dots, \omega^k$ and smooth vector fields $X_1, \dots, X_l$, the function $F(\omega^1, \dots, \omega^k, X_1, \dots, X_l)$---seen as a scalar field on $M$---is smooth, and thus $F$ induces a map

$$
    \tilde{F}: \underbrace{\mathcal{T}^1(M) \times \dots \mathcal{T}^k(M)}_{k \text{ times}} \times \underbrace{\mathfrak{X}(M) \times \dots \mathfrak{X}(M)}_{l \text{ times}} \to C^\infty(M) .
$$

we can show that $\tilde{F}$ is multilinear over $C^\infty(M)$: For any $f, g \in C^\infty(M)$ and smooth vector or covector fields $\alpha, \beta$, we have that

$$
    \tilde{F}(\dots, f \alpha + g \beta, \dots) = f \tilde{F}(\dots, \alpha, \dots) + g \tilde{F}(\dots, \beta, \dots) .
$$

It is easy to see this by noting

$$
    \tilde{F}(\omega^1, \dots, \omega^k, X_1, \dots, X_l)(p) = F_p (\omega^1 \vert_p, \dots, \omega^k \vert_p, X_1 \vert_p, \dots, X_l \vert_p) ,
$$

together with the coordinate representation of $\tilde{F}$.

Even more important is the converse: every such map that is multilinear over $C^\infty(M)$ defines a tensor field, as the next lemma shows.


**Lemma 2 (Tensor Characterization Lemma).** _A map_

$$
    \mathcal{F}: \underbrace{\mathcal{T}^1(M) \times \dots \times \mathcal{T}^1(M)}_{k \text{ times}} \times \underbrace{\mathfrak{X}(M) \times \dots \times \mathfrak{X}(M)}_{l \text{ times}} \to C^\infty(M)
$$

_is induced by a smooth $(k, l)$-tensor field as above if and only if it is multilinear over $C^\infty(M)$._

_Proof._ Lemma 12.24 in [1]. The proof requires knowledge about vector bundles, which is out of the scope of this post.

$\square$
{:.right}


<h2 class="section-heading">Covariant Derivatives of Tensor Fields</h2>

By definition (which we have seen in the previous post), a connection in $TM$ is a rule for computing covariant derivatives of vector fields. It turns out every connection in $TM$ automatically induces connections in all tensor bundles over $M$. This implies that the connection gives us a way to compute covariant derivatives of tensor fields of any type on $M$. This intuition is captured by the following proposition.

**Note.** we use the notation $\inner{\omega, X}$ to denotes the action of a covector field $\omega$ on a vector field $X$, i.e. $\omega(X)$, or equivalently, the action of vector field $X$ seen point-wise as the element of the double dual $(T_p^\*)^\* M$ on a covector fields $\omega$, i.e. $X(\omega)$.

**Proposition 3.** _Let $M$ be a smooth $n$-manifold and $\nabla$ a connection in $TM$. Then $\nabla$ uniquely determines a connection in each tensor bundle $T^{(k, l)}TM$, also denoted by $\nabla$, such that the following conditions are satisfied:_

_(i) In $T^{(1, 0)}TM = TM$, $\nabla$ agrees with the given connection._

_(ii) In $T^{(0, 0)}TM = M \times \R$ (i.e. a scalar-field/real-valued-function on $M$), $\nabla$ is given by ordinary differentiation of functions: $\nabla_X f = Xf$._

_(iii) $\nabla$ obeys the following product rule w.r.t. tensor products:_

$$
    \nabla_X \, (F \otimes G) = (\nabla_X \, F) \otimes G + F \otimes (\nabla_X \, G).
$$

_(iv) $\nabla$ commutes with the trace operator: $\nabla_X \, (\mathrm{tr\,} F) = \mathrm{tr}(\nabla_X \, F)$._

_This connection also satisfies the following properties:_

_(a) $\nabla$ obeys the following product rule w.r.t. the natural pairing between a covector field $\omega$ and a vector field $Y$:_

$$
    \nabla_X \, \inner{\omega, Y} = \inner{\nabla_X \, \omega, Y} + \inner{\omega, \nabla_X \, Y} .
$$

_(b) For all $F \in \Gamma(T^{(k, l)} TM)$, smooth $1$-forms $\omega^1, \dots, \omega^k$, and smooth vector fields $Y_1, \dots, Y_l$:_

$$
\begin{align}
    (\nabla_X \, F)(\omega^1, \dots, \omega^k, &Y_1, \dots, Y_l) = X(F(\omega^1, \dots, \omega^k, Y_1, \dots, Y_l)) \\[5pt]
        &- \sum_{i=1}^k F(\omega^1, \dots, \nabla_X \, \omega^i, \dots, \omega^k, Y_1, \dots, Y_l) \\[5pt]
        &- \sum_{j=1}^l F(\omega^1, \dots, \omega^k, Y_1, \dots, \nabla_X \, Y_j, \dots, Y_l) .
\end{align}
$$

_Proof._ **Properties (a), (b).** Suppose we are given a family of connections on all tensor bundles satisfying (i)-(iv), all denoted by $\nabla$. First, we note that $\inner{\omega, Y} = \mathrm{tr}(\omega \otimes Y)$ since in coordinates we have that

$$
\begin{align}
    \inner{\omega, Y} &= \omega_i \, dx^i(Y^j \, \partial_j) \\[5pt]
        &= \omega_i \, Y^j \, dx^i(\partial_j) = \omega_i \, Y^j \, \delta^i_j \\[5pt]
        &= \omega_i \, Y^i ,
\end{align}
$$

and $\Gamma(T^{(k, l)}TM) \ni \omega \otimes Y = (\omega_i \, Y^j) \, dx^i \otimes \partial_j$, thus $\mathrm{tr}(\omega \otimes Y) = \omega_i \, Y^i$. Therefore, (i)-(iv) imply

$$
\begin{align}
    \nabla_X \, \inner{\omega, Y} &= \nabla_X \, \mathrm{tr}(\omega \otimes Y) \\[5pt]
        &= \mathrm{tr}(\nabla_X \, (\omega \otimes Y)) \\[5pt]
        &= \mathrm{tr}((\nabla_X \, \omega) \otimes Y + \omega \otimes (\nabla_X \, Y)) \\[5pt]
        &= \mathrm{tr}((\nabla_X \, \omega) \otimes Y) + \mathrm{tr}(\omega \otimes (\nabla_X \, Y)) \\[5pt]
        &= \inner{\nabla_X \, \omega, Y} + \inner{\omega, \nabla_X \, Y} ,
\end{align}
$$

which proved (a). To prove (b), notice that

$$
    F(\omega^1, \dots, \omega^k, Y_1, \dots, Y_l) = \mathrm{tr} \circ \dots \circ \mathrm{tr} (F \otimes \omega^1 \otimes \dots \otimes \omega^k \otimes Y_1 \otimes \dots \otimes Y_l ) ,
$$

where $\mathrm{tr} \circ \dots \circ \mathrm{tr}$ is the composition of $k+l$ trace operators, each acting on an upper index of $F$ and the lower index of the corresponding covector field, or a lower index of $F$ and the upper index of the corresponding vector field. By induction and the same computation as before, we can show (via a tedious computation) that

$$
\begin{align}
    \nabla_X \, (F(\omega^1, \dots, &\omega^k, Y_1, \dots, Y_l)) = (\nabla_X F)(\omega^1, \dots, \omega^k, Y_1, \dots, Y_l) \\[5pt]
        &+ \sum_{i=1}^k F(\omega^1, \dots, \nabla_X \, \omega^i, \dots, \omega^k, Y_1, \dots, Y_l) \\[5pt]
        &+ \sum_{j=1}^l F(\omega^1, \dots, \omega^k, Y_1, \dots, \nabla_X \, Y_j, \dots, Y_l) .
\end{align}
$$

Moving the last two terms in the r.h.s. to the l.h.s. and recalling that

$$
    F(\omega^1, \dots, \omega^k, Y_1, \dots, Y_l) \in C^\infty(M) ,
$$

by (ii) we have that

$$
\begin{align}
    (\nabla_X \, F)(\omega^1, \dots, \omega^k, &Y_1, \dots, Y_l) = X(F(\omega^1, \dots, \omega^k, Y_1, \dots, Y_l)) \\[5pt]
        &- \sum_{i=1}^k F(\omega^1, \dots, \nabla_X \, \omega^i, \dots, \omega^k, Y_1, \dots, Y_l) \\[5pt]
        &- \sum_{j=1}^l F(\omega^1, \dots, \omega^k, Y_1, \dots, \nabla_X \, Y_j, \dots, Y_l) ,
\end{align}
$$

which proved (b).

**Uniqueness.** Assume that $\nabla$ represents a family of connections satisfying (i)-(iv)---and hence by (a) and (b) by the argument above. Observe that (ii) and (a) imply that the covariant derivative of every $1$-form $\omega$ can be computed by

$$
\begin{align}
    (\nabla_X \, \omega)(Y) &= \inner{\nabla_X \, \omega, Y} \\[5pt]
        &= \nabla_X \, \underbrace{\inner{\omega, Y}}_{M \times \R} - \inner{\omega, \nabla_X \, Y} \\[5pt]
        &= X(\omega(Y)) - \omega(\nabla_X \, Y) .
\end{align}
$$

It follows since we have the term $\nabla_X \, Y$ showed up that the connection on $1$-forms is uniquely determined by the original connection in $TM$. Similarly, (b) gives a formula that determines the covariant derivative of every tensor field $F$ in terms of covariant derivatives of vector fields and $1$-forms, so the connection in every tensor bundle is uniquely determined.

**Existence.** First, we define covariant derivatives of $1$-forms as above. Then, we use (b) to define $\nabla$ on all other tensor bundles. We now check that the formula in (b) defines a smooth tensor field by checking the multilinearity over $C^\infty(M)$ in each $\omega^i$ and $Y_j$. (This is due to Lemma 2.) First for $1$-forms: If $f, g \in C^\infty(M)$ and $\nu, \eta$ are $1$-forms, we have

$$
\begin{align}
    (\nabla_X \, F)(\dots, f \, \nu + g \, \eta, \dots) = X(&F(\dots, f \, \nu + g \, \eta, \dots)) \\[5pt]
        &- F(\dots, \nabla_X \, (f \, \nu + g \, \eta), \dots) \\[5pt]
        &- \sum_{i=1}^k F(\dots, f \, \nu + g \, \eta, \dots, \nabla_X \, \omega^i, \dots) \\[5pt]
        &- \sum_{j=1}^l F(\dots, f \, \nu + g \, \eta, \dots, \nabla_X \, Y_j, \dots) .
\end{align}
$$

It is clear by the property of $F$ (see the last part of the previous section) that the last two terms are multilinear over $C^\infty(M)$, so we need to check the first two terms. The first term evaluates as

$$
\begin{align}
    X(F&(\dots, f \, \nu + g \, \eta, \dots)) = X(f \, F(\dots, \nu, \dots)) + X(g \, F(\dots, \eta, \dots)) \\[5pt]
        &= f \, X(F(\dots, \nu, \dots)) + F(\dots, \nu, \dots) \, Xf + g \, X(F(\dots, \eta, \dots)) + F(\dots, \eta, \dots) \, Xg .
\end{align}
$$

Furthermore, the covariant derivative inside the second term evaluates as

$$
\begin{align}
    (\nabla_X \, (f\,\nu + g\,\eta)) (Y) &= X((f\,\nu + g\,\eta)(Y)) - (f\,\nu + g\,\eta)(\nabla_X \, Y) \\[5pt]
        &= X(f\,\nu(Y)) + X(g\,\eta(Y)) - f\,\nu(\nabla_X \, Y) - g\,\eta(\nabla_X \, Y) \\[5pt]
        &= f \, X(\nu(Y)) + \nu(Y) \, Xf - f\,\nu(\nabla_X \, Y) + \dots \\[5pt]
        &= f(X(\nu(Y)) - \nu(\nabla_X \, Y)) + \nu(X) \, Xf + \dots \\[5pt]
        &= f \, (\nabla_X \, \nu)(Y) + \nu(Y) \, Xf + g \, (\nabla_X \, \eta)(Y) + \eta(Y) \, Xg ,
\end{align}
$$

which implies that

$$
    \nabla_X \, (f\,\nu + g\,\eta) = f \, (\nabla_X \, \nu) + \nu \, Xf + g \, (\nabla_X \, \eta) + \eta \, Xg .
$$

Therefore, by multilinearity of $F$ over $C^\infty(M)$, the second term of $\nabla_X \, F$ above evaluates as

$$
\begin{align}
    f\,F(\dots, \nabla_X\,\nu, \dots) + F(\dots, \nu, \dots)\,Xf + g\,F(\dots, \nabla_X\,\eta, \dots) + F(\dots, \eta, \dots)\,Xg .
\end{align}
$$

Thus, the terms $F(\dots, \nu, \dots)\,Xf$ and $F(\dots, \eta, \dots)\,Xg$ will cancel with the ones in the first term and from there, it is not hard to see that $\nabla_X\,F$ is multilinear over $C^\infty(M)$.

Once we know that $\nabla_X \, F$ is a smooth tensor field, we need to check that it satisfies the defining properties of a connection. First up, linearity over $C^\infty(M)$ in $X$ and linearity over $\R$ in $F$ can easily be check (somewhat tediously, like the computation above) by considering the formula in (b) and the one for $\nabla_X \, \omega$, along with the fact that $F$ itself is linear over $\R$. The product rule in $F$ follows easily from the fact that differentiation of functions by $X$ satisfies the product rule.

$\square$
{:.right}


For computation, it is more convenient to work in local coordinates. The following proposition shows how to compute the components of a covariant derivative in terms of a local frame.


**Proposition 4.** _Let $M$ be a smooth $n$-manifold and $\nabla$ a connection in $TM$. Let $(E_i)$ be a local frame, $(\epsilon^j)$ its dual coframe, and $\\{ \Gamma^i\_{jk} \\}$ are the connection coefficient of $\nabla$ w.r.t. this local frame. Let $X \in \mathfrak{X}(M)$ and let $X^i\,E_i$ be its local expression in terms of this frame._

_(a) The covariant derivative of a $1$-form $\omega= \omega_i\,\epsilon^i$ is given locally by_

$$
    \nabla_X\,\omega = \left( X(\omega_k) - X^j \, \omega_i \, \Gamma^i_{jk} \right) \epsilon^k .
$$

_(b) If $F \in \gamma(T^{(k,l)} TM)$ is expressed locally as_

$$
    F = F^{i_1 \dots i_k}_{j_1 \dots j_l} \, E_{i_1} \otimes \dots \otimes E_{i_k} \otimes \epsilon^{j_1} \otimes \dots \otimes \epsilon^{j_l} ,
$$

_then the covariant derivative of $F$ is given locally by_

$$
\begin{align}
    \nabla_X\,F = &\left( X\left( F^{i_1 \dots i_k}_{j_1 \dots j_l} \right) + \sum_{s=1}^k X^m \, F^{i_1 \dots p \dots i_k}_{j_1 \dots j_l} \, \Gamma^{i_s}_{mp} - \sum_{s=1}^l X^m \, F^{i_1 \dots i_k}_{j_1 \dots p \dots j_l} \, \Gamma^p_{m j_s} \right) \times \\[5pt]
        &E_{i_1} \otimes \dots \otimes E_{i_k} \otimes \epsilon^{j_1} \otimes \dots \otimes \epsilon^{j_l} .
\end{align}
$$

_Proof._ We begin with the covariant derivative of $1$-forms. By the formula from the proof of Proposition 3:

$$
\begin{align}
    (\nabla_X\,\omega)(Y) &= X(\omega(Y)) - \omega(\nabla_X\,Y) \\[5pt]
        &= X^i\,E_i(\omega_j\,Y^j) - \omega_k\,\epsilon^k(X^l\,Y^m\,\Gamma^o_{lm}\,E_m + X(Y^m)\,E_m) \\[5pt]
        &= X^i (\omega_j \, E_i(Y^j) +  E_i(\omega_j) \, Y^j) - \omega_k\,(X^l\,Y^k\,\Gamma^o_{lk} + X^p\,E_p(Y^k)) \\[5pt]
        &= X^i \, \omega_j \, E_i(Y^j) + X^i \, E_i(\omega_j) \, Y^j  - \omega_k \, X^l \, \Gamma^o_{lk} \, Y^k - X^p \, \omega_k \, E_p(Y^k) \\[5pt]
        &= X(\omega_j) \, Y^j  - X^l \, \omega_k \, \Gamma^o_{lk} \, Y^k \\[5pt]
        &= X(\omega_k) \, Y^k  - X^j \, \omega_i \, \Gamma^i_{jk} \, Y^k .
\end{align}
$$

The second-to-last step follows since the first and last terms in the previous step cancel each other out. In the last step, we just renamed the dummy indices. Recalling that

$$
    \epsilon^k(Y) = \epsilon^k(Y^i\,E_i) = Y^i\,\delta^k_i = Y^k ,
$$

we conclude that

$$
    \nabla_X\,\omega = \left( X(\omega_k) \, Y^k  - X^j \, \omega_i \, \Gamma^i_{jk} \, Y^k \right) \epsilon^k .
$$

Now we prove for the general $(k, l)$-tensors case. First, we denote the indices with parentheses to mean the $i$-th vector/covector argument. For example:

$$
    Y_{(i)} = Y_{(i)}^j \, E_j \qquad \text{and} \qquad  \omega^{(i)} = \omega^{(i)}_j \, \epsilon^{j} .
$$

We focus on the formula given by (b) of Proposition 3. By induction, the coordinate representation of the first term is:

$$
\begin{align}
     X \left( F^{i_1 \dots i_k}_{j_1 \dots j_l} \, \omega^{(1)}_{i_1} \dots \omega^{(k)}_{i_k} \, Y_{(1)}^{j_1} \dots Y_{(l)}^{j_l} \right) &= X \left( F^{i_1 \dots i_k}_{j_1 \dots j_l} \right) \omega^{(1)}_{i_1} \dots Y_{(l)}^{j_l} +  F^{i_1 \dots i_k}_{j_1 \dots j_l} \, X (\omega^{(1)}_{i_1}) \dots Y_{(l)}^{j_l} \\[5pt]
        &+ \dots + F^{i_1 \dots i_k}_{j_1 \dots j_l} \, \omega^{(1)}_{i_1} \dots X (Y_{(l)}^{j_l}) .
\end{align}
$$

For the second term, using the formula form $1$-form above, together with the linearity of $F$, we have in coordinates that

$$
\begin{align}
    F^{i_1 \dots i_k}_{j_1 \dots j_l} \, X(\omega^{(1)}_{i_1})& \dots Y^{j_l} - F^{i_1 \dots i_k}_{j_1 \dots j_l} \, (X^p \, \omega^{(1)}_{q} \, \Gamma^{q}_{p i_1}) \dots Y_{(l)}^{j_l} + \dots \\[5pt]
        &+ F^{i_1 \dots i_k}_{j_1 \dots j_l} \, \omega^{(1)}_{i_1} \dots X(\omega^{(1)}_{i_k}) \dots Y_{(l)}^{j_l} - F^{i_1 \dots i_k}_{j_1 \dots j_l} \, \omega^{(1)}_{i_1} \dots (X^p \, \omega^{(k)}_{q} \, \Gamma^{q}_{p i_k}) \dots Y_{(l)}^{j_l} .
\end{align}
$$

Likewise, using the formula for covariant derivatives for vector fields, for the last term we have

$$
\begin{align}
    F^{i_1 \dots i_k}_{j_1 \dots j_l} \, \omega^{(1)}_{i_1} \dots X(Y_{(1)}^{j_1})& \dots Y_{(l)}^{j_l} + F^{i_1 \dots i_k}_{j_1 \dots j_l} \, \omega^{(1)}_{i_1} \dots (X^p \, Y_{(1)}^q \, \Gamma^{j_1}_{p q}) \dots Y_{l}^{j_l} + \dots \\[5pt]
        &+ F^{i_1 \dots i_k}_{j_1 \dots j_l} \, \omega^{(1)}_{i_1} \dots X(Y_{(l)}^{j_l}) + F^{i_1 \dots i_k}_{j_1 \dots j_l} \, \omega^{(1)}_{i_1} \dots (X^p \, Y_{(l)}^q \, \Gamma^{j_1}_{p q}) .
\end{align}
$$

Observe that all positive terms in the second formula above cancel with the corresponding terms in the first formula. Furthermore, all odd terms in the last formula cancel with the corresponding terms in the first formula. Thus, we are left with:

$$
\begin{align}
    &X \left( F^{i_1 \dots i_k}_{j_1 \dots j_l} \, \omega^{(1)}_{i_1} \dots \omega^{(k)}_{i_k} \, Y_{(1)}^{j_1} \dots Y_{(l)}^{j_l} \right) \\[5pt]
        &- F^{i_1 \dots i_k}_{j_1 \dots j_l} \, (X^p \, \omega^{(1)}_{q} \, \Gamma^{q}_{p i_1}) \dots Y_{(l)}^{j_l} - \dots - F^{i_1 \dots i_k}_{j_1 \dots j_l} \, \omega^{(1)}_{i_1} \dots (X^p \, \omega^{(k)}_{q} \, \Gamma^{q}_{p i_k}) \dots Y_{(l)}^{j_l} \\[5pt]
            & F^{i_1 \dots i_k}_{j_1 \dots j_l} \, \omega^{(1)}_{i_1} \dots (X^p \, Y_{(1)}^q \, \Gamma^{j_1}_{p q}) \dots Y_{l}^{j_l} + \dots + F^{i_1 \dots i_k}_{j_1 \dots j_l} \, \omega^{(1)}_{i_1} \dots (X^p \, Y_{(l)}^q \, \Gamma^{j_1}_{p q}) ,
\end{align}
$$

for the first, second, and third terms respectively. We can then plug them into the formula in (b) of Proposition 3. Then write the summation compactly and rename the dummy indices. Finally, using the arguments that $E_i(\omega) = \omega_i$ and $\epsilon^i(Y) = Y^i$, we can move all components of the arguments $\omega^{(i)}, \dots, Y_{(l)}$ outside, and introduce the basis $E_{i_1} \otimes \dots \otimes \epsilon^{j_l}$. We have now arrived at the claimed formula.

$\square$
{:.right}


<h2 class="section-heading">Total Covariant Derivatives</h2>


Since the covariant derivative $\nabla_X\,F$ of a tensor field is linear over $C^\infty(M)$ in $X$, the covariant derivatives of $F$ in all directions can be encoded in a single tensor field whose rank is one more than the rank of $F$. This is because that linearity property guarantees that the resulting map will still be multilinear over $C^\infty(M)$ and thus defines a smooth tensor field.


**Proposition 5 (The Total Covariant Derivative).** _Let $M$ be a smooth manifold and $\nabla$ a connection in $TM$. For every smooth tensor field $F \in \Gamma(T^{(k, l)} TM)$, the map_

$$
    \nabla\,F : \underbrace{\mathcal{T}^1(M) \times \dots \times \mathcal{T}^1(M)}_{k \text{ times}} \times \underbrace{\mathfrak{X}(M) \times \dots \times \mathfrak{X}(M)}_{l+1 \text{ times}} \to C^\infty(M)
$$

_given by_

$$
    (\nabla\,F)(\omega^1, \dots, \omega^k, Y_1, \dots, Y_l, X) := (\nabla_X\,F)(\omega^1, \dots, \omega^k, Y_1, \dots, Y_l) ,
$$

_defines a smooth $(k, l+1)$-tensor field on $M$ called the **total covariant derivative** of $F$._

_Proof._ Follows directly from Lemma 2: $\nabla_X\,F$ is a tensor field, so it is multilinear over $C^\infty(M)$ in all of its $k+l$ arguments. The linearity over $C^\infty(M)$ of $\nabla_X\,F$ in $X$ (by definition of a connection) implies that $\nabla\,F$ is multilinear over $C^\infty(M)$ over all its $k + l + 1$ arguments and thus defines a smooth tensor field.

$\square$
{:.right}


When writing the components of a total covariant derivative in terms of a local frame, it is standard practice to use a semicolon to separate indices resulting from differentiation from the preceding indices. For example, if $Y = Y^i\,E_i$ is a vector field (i.e. a $(1,0)$-tensor field), the component of the $(1, 1)$-tensor field $\nabla\,Y$ are written as ${Y^i}\_{;j}$, so that

$$
    \nabla\,Y = {Y^i}_{;j} \, E_i \otimes \epsilon^j  \qquad \text{with } {Y^i}_{;j} := E_j\,Y^i + Y^k\,\Gamma^i_{jk} .
$$

For a covector field $\omega = \omega_i\,\epsilon^j$, we have

$$
    \nabla\,\omega = \omega_{i;j} \, \epsilon^i \otimes \epsilon^j \qquad \text{with } \omega_{i;j} := E_j\,\omega^i - \omega_k\,\Gamma^{k}_{ij} .
$$

In general, the following proposition gives a formula for the components of total covariant derivatives of arbitrary tensor fields.


**Proposition 6.** _Let $M$ be a smooth manifold and let $\nabla$ be a connection in $TM$. Let $(E_i)$ be a smooth local frame for $TM$ and $\\{ \Gamma^i\_{jk} \\}$ the corresponding connection coefficients. The components of the total covariant derivative of a $(k, l)$-tensor field $F$ w.r.t. this frame are given by_

$$
    F^{i_1 \dots i_k}_{j_1 \dots j_l; m} = E_m\left( F^{i_1 \dots i_k}_{j_1 \dots j_l} \right) + \sum_{s=1}^k \, F^{i_1 \dots p \dots i_k}_{j_1 \dots j_l} \Gamma^{i_s}_{m p} - \sum_{s=1}^l \, F^{i_1 \dots i_k}_{j_1 \dots p \dots j_l} \Gamma^p_{m j_s} .
$$

_Proof._ In terms the local frame, we have

$$
    \nabla\,F = F^{i_1 \dots i_k}_{j_1 \dots j_l; m} \, E_{i_1} \otimes \dots \otimes E_{i_k} \otimes \epsilon^{j_1} \otimes \dots \otimes \epsilon^{j_l} \otimes \epsilon^m .
$$

Thus, we have that

$$
    \nabla\,F(\omega^{(1)}, \dots, \omega^{(k)}, Y_{(1)}, \dots, Y_{(l)}, X) = F^{i_1 \dots i_k}_{j_1 \dots j_l; m} \, \omega^{(1)}_{i_1} \dots Y_{(l)}^{(j_l)} \, X^m .
$$

Comparing the r.h.s. to the coordinate formula for the coefficients of $\nabla_X\,F$---while also noticing that $X = X^m\,E_m$, we realize that we must divide the formula for $\nabla_X\,F$ by $X_m$. The claim follows directly.

$\square$
{:.right}


<h2 class="section-heading">Second Covariant Derivatives</h2>

Having defined the tensor field $\nabla\,F$ for a $(k,l)$-tensor field $F$, we can in turn take its total covariant derivative to obtain a $(k, l+2)$-tensor field $\nabla^2\,F := \nabla(\nabla\,F)$. Given $X, Y \in \mathfrak{X}(M)$, we define:

$$
    \nabla^2_{X,Y}\,F(\dots) := \nabla^2\,F(\dots, Y, X) .
$$

Note that we have the order of $X$ and $Y$ reversed. This is because our convention for the total covariant derivative in Proposition 5. Meanwhile, it is conventional to let $\nabla^2_{X,Y}$ stand for differentiating first in the $X$ direction, then in the $X$ direction.

Note that $\nabla^2_{X, Y}\,F$ is not the same as $\nabla_X(\nabla_Y\,F))$ since the former is linear over $C^\infty(M)$ in $Y$, while the latter is not. Proposition 8 will show the relationship between the two, which requires the following lemma.


**Lemma 7.** _Let $M$ be a smooth manifold and $\nabla$ a connection in $TM$. For every smooth $(k, l)$-tensor field $F$ and every vector field $X$,_

$$
    \nabla_X\,F = \mathrm{tr}(\nabla\,F \otimes X) .
$$

_Proof._ Let $(E_i)$ be a smooth local frame for $TM$, $(\epsilon^i)$ its dual coframe, and $\\{ \Gamma^i_{jk} \\}$ the corresponding connection coefficients. In terms of this frame, we can write $X = X^p\,E_p$.

The coordinate formula for $\nabla\,F \otimes X$ is

$$
\begin{align}
    \nabla\,F \otimes X &= F^{i_1 \dots i_k}_{j_1 \dots j_l; m} \, E_{i_1} \otimes \omega^{j_l} \otimes \omega^m \otimes (X^p\,E_p) \\[5pt]
        &= F^{i_1 \dots i_k}_{j_1 \dots j_l; m} \, X^p \, E_{i_1} \otimes \omega^{j_l} \otimes \omega^m \otimes E_p .
\end{align}
$$

By definition of trace, we set the last two indices ($m$ and $p$) as equal and the sum them up (automatically). Thus we have, by Proposition 6, the following component formula for $\mathrm{tr}(\nabla\,F \otimes X)$:

$$
    F^{i_1 \dots i_k}_{j_1 \dots j_l; m} \, X^m = X\left( F^{i_1 \dots i_k}_{j_1 \dots j_l} \right) + \sum_{s=1}^k \, X^m \, F^{i_1 \dots p \dots i_k}_{j_1 \dots j_l} \Gamma^{i_s}_{m p} - \sum_{s=1}^l \, X^m \, F^{i_1 \dots i_k}_{j_1 \dots p \dots j_l} \Gamma^p_{m j_s} .
$$

This is none other than the component formula for $\nabla_X\,F$ shown in Proposition 4 (b).

$\square$
{:.right}


**Proposition 8.** _Let $M$ be a smooth manifold and $\nabla$ a connection in $TM$. For every smooth tensor field $F$,_

$$
    \nabla^2_{X,Y}\,F = \nabla_X(\nabla_Y\,F) - \nabla_{(\nabla_X\,Y)}\,F .
$$

_Proof._ By Lemma 7, we can write

$$
    \nabla_Y\,F = \mathrm{tr}(\nabla\,F \otimes Y) .
$$

Using Lemma 7 again and recalling that $\nabla^2_{X,Y}\,F(\dots) = \nabla^2\,F(\dots, Y, X)$, we can write

$$
    \nabla^2_{X,Y}\,F = \mathrm{tr}(\mathrm{tr}(\nabla^2\,F \otimes X) \otimes Y) .
$$

Therefore, since $\nabla_X$ commutes with trace and satisfies the product rule w.r.t. tensor product (cf. Proposition 3), we have by repeated application of Lemma 7 that

$$
\begin{align}
    \nabla_X(\nabla_Y\,F) &= \nabla_X(\mathrm{tr}(\nabla\,F \otimes Y)) \\[5pt]
        &= \mathrm{tr}(\nabla_X(\nabla\,F \otimes Y)) \\[5pt]
        &= \mathrm{tr}(\nabla\,F \otimes \nabla_X\,Y + \nabla_X(\nabla\,F) \otimes Y) \\[5pt]
        &= \mathrm{tr}(\nabla\,F \otimes \nabla_X\,Y) + \mathrm{tr}(\underbrace{\mathrm{tr}(\nabla^2\,F \otimes X)}_\text{by Lemma 7} \otimes Y) \\[5pt]
        &= \nabla_{(\nabla_X\,Y)}\,F + \nabla^2_{X,Y}\,F .
\end{align}
$$

By rearranging, we obtain the claim.

$\square$
{:.right}


**Example 9 (The Covariant Hessian).** Let $f \in C^\infty(M) = \Gamma(T^{(0, 0)} TM)$. Then

$$
    \nabla\,f \in \Gamma(T^{(0, 1)} TM) = \mathcal{T}^1(M) = \Omega^1(M) ,
$$

is just the $1$-form $df$, i.e. the differential of $f$, because both $\nabla\,f$ and $df$ have the same action on vector fields:

$$
    \nabla\,f(X) = \nabla_X\,f = Xf = df(X) .
$$

The $2$-tensor $\nabla^2\,f = \nabla\,(df)$ is called the **_covariant Hessian_** of $f$. Proposition 3 and 8 show that its action on $X, Y \in \mathfrak{X}(M)$ can be computed by

$$
\begin{align}
    (\nabla^2\,f)(Y, X) &= \nabla^2_{X,Y}\,f = \nabla_X(\nabla_Y\,F) - \nabla_{(\nabla_X\,Y)}\,f \\[5pt]
        &= \nabla_X(Yf) - (\nabla_X\,Y)\,f \\[5pt]
        &= X(Y(f)) - (\nabla_X\,Y)\,f .
\end{align}
$$

In any local coordinates $(x^i)$, it is given by

$$
    \nabla^2\,f = f_{;ij} \, dx^i \otimes dx^j, \qquad \text{with } f_{;ij} := \partial_j \, \partial_i \, f + (\partial_k \, f) \, \Gamma^k_{ij} .
$$

In Euclidean spaces, where $\Gamma^k_{ij} \equiv 0$, the matrix $(f_{;ij})$ is the usual Hessian matrix (collection of second partial derivatives of $f$).

//
{:.right}

<h2 class="section-heading">References</h2>

1. Lee, John M. Introduction to Smooth Manifolds. Springer, New York, NY, 2013. 1-31.
2. Lee, John M. Riemannian Manifolds: An Introduction to Curvature. Vol. 176. Springer Science & Business Media, 2006.
