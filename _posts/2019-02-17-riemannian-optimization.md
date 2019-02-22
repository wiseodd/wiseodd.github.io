---
layout:     post
title:      "Notes on Riemannian Geometry"
subtitle:   "This article is a collection of small notes on Riemannian geometry that I find useful as references. It is largely based on Lee's books on smooth and Riemannian manifolds."
date:       2019-02-22 12:00
author:     "wiseodd"
header-img: "img/manifold.svg"
category:   techblog
tags:       [math]
---

Recently I have been studying differential geometry, including Riemannian geometry. When studying this subject, a lot of _aha_ moments came up due to my previous (albeit informal) exposure to the geometric point-of-view of natural gradient method. I found that the argument from this point-of-view to be very elegant, which motivates me further to study geometry in depth. This writing is a collection of small notes (largely from Lee's Introduction to Smooth Manifolds and Introduction to Riemannian Manifolds) that I find useful as a reference on this subject. Note that, this is by no means a completed article. I will update it as I study further.


<h2 class="section-heading">Manifolds</h2>

We are interested in generalizing the notion of Euclidean space into arbitrary smooth curved space, called smooth manifold. Intuitively speaking, a **_topological $$n$$-manifold_** $$\mathcal{M}$$ is a topological space that locally resembles $$\mathbb{R}^n$$. A **_smooth $$n$$-manifold_** is a topological $$n$$-manifold equipped with locally smooth map $$\phi_p: \mathcal{M} \to \mathbb{R}^n$$ around each point $$p \in \mathcal{M}$$, called the **_local coordinate chart_**.

**Example 1 (Euclidean spaces).** For each $$n \in \mathbb{N}$$, the Euclidean space $$\mathbb{R}^n$$ is a smooth $$n$$-manifold with a single chart $$\phi := \text{Id}_{\mathbb{R}^n}$$, the identity map, for all $$p \in \mathcal{M}$$. Thus, $$\phi$$ is a _global coordinate chart_.

**Example 2 (Spaces of probability distributions).** Let $$\mathcal{M} := \{ p_{\theta}(x) : \theta \in \mathbb{R}^n \}$$, where $$p_{\theta}(x)$$ is a probability distribution over $$x$$, parametrized by $$\theta$$. Define a smooth chart $$p_{\theta}(x) \mapsto \theta$$. Then, $$\mathcal{M}$$ is a smooth $$n$$-manifold.

**Remark 1.** We will drop $$n$$ when referring a smooth $$n$$-manifold from now on, for brevity sake. Furthermore, we will start to use the **_Einstein summation convention_**: repeated indexes above and below are implied to be summed, e.g. $$v_i w^i := \sum_i v_i w^i$$.


<h2 class="section-heading">Tangent vectors and covectors</h2>

At each point $$p \in \mathcal{M}$$, there exists a vector space $$T_p \mathcal{M}$$, called the **_tangent space_** of $$p$$. An element $$v \in T_p \mathcal{M}$$ is called the **_tangent vector_**. Let $$f: \mathcal{M} \to \mathbb{R}$$ be a smooth function. In local coordinate $$\{x^1, \dots, x^n\}$$ defined around $$p$$, the coordinate vectors $$\{ \partial/\partial x^1, \dots, \partial/\partial x^n \}$$ form a **_coordinate basis_** for $$T_p \mathcal{M}$$.

A tangent vector $$v \in T_p \mathcal{M}$$ can also be seen as a **_derivation_**, a linear map $$C^\infty(\mathcal{M}) \to \mathbb{R}$$ that follows Leibniz rule (product rule of derivative), i.e.

$$
    v(fg) = f(p)vg + g(p)vf \enspace \enspace \forall f, g \in C^\infty(\mathcal{M}) \, .
$$

Thus, we can also see $$T_p \mathcal{M}$$ to be the set of all derivations of $$C^\infty(\mathcal{M})$$ at $$p$$.

For each $$p \in \mathcal{M}$$ there also exists the dual space $$T_p^* \mathcal{M}$$ of $$T_p \mathcal{M}$$, called the **_cotangent space_** at $$p$$. Each element $$\omega \in T_p^* \mathcal{M}$$ is called the **_tangent covector_**, which is a linear functional $$\omega: T_p \mathcal{M} \to \mathbb{R}$$ acting on tangent vectors at $$p$$. Given the same local coordinate as above, the basis for the cotangent space at $$p$$ is called the **_dual coordinate basis_** and is given by $$\{ dx^1, \dots, dx^n \}$$, such that $$dx^i(\partial/\partial x^j) = \delta^i_j$$ the Kronecker delta. Note that, this implies that if $$v := v^i \, \partial/\partial x^i$$, then $$dx^i(v) = v^i$$.

Tangent vectors and covectors follow different transformation rules. We call an object with lower index, e.g. the components of tangent covector $$\omega_i$$ and the coordinate basis $$\partial/\partial x^i =: \partial_i$$, to be following the **_covariant_** transformation rule. Meanwhile an object with upper index, e.g. the components a tangent vector $$v^i$$ and the dual coordinate basis $$dx^i$$, to be following the **_contravariant_** transformation rule. These stem from how an object transform w.r.t. change of coordinate. Recall that a vector, when all the basis vectors are scaled up by a factor of $$k$$, the coefficients in its linear combination will be scaled by $$1/k$$, thus it is said that a vector transforms _contra_-variantly (the opposite way to the basis). Analogously, we can show that when we apply the same transformation to the dual basis, the covectors coefficients will be scaled by $$k$$, thus it transforms the same way to the basis (_co_-variantly).

The partial derivatives of a scalar field (real valued function) on $$\mathcal{M}$$ can be interpreted as the components of a covector field in a coordinate-independent way. Let $$f$$ be such scalar field. We define a covector field $$df: \mathcal{M} \to T^* \mathcal{M}$$, called the **_differential_** of $$f$$, by

$$
    df_p(v) := vf \enspace \enspace \text{for} \, v \in T_p\mathcal{M} \, .
$$

Concretely, in smooth coordinates $$\{ x^i \}$$ around $$p$$, we can show that it can be written as

$$
    df_p := \frac{\partial f}{\partial x^i} (p) \, dx^i \, \vert_p \, ,
$$

or as an equation between covector fields instead of covectors:

$$
    df := \frac{\partial f}{\partial x^i} \, dx^i \, .
$$

The disjoint union of the tangent spaces at all points of $$\mathcal{M}$$ is called the **_tangent bundle_** of $$\mathcal{M}$$

$$
    TM := \coprod_{p \in \mathcal{M}} T_p \mathcal{M} \, .
$$

Meanwhile, analogously for the cotangent spaces, we define the **_cotangent bundle_** of $$\mathcal{M}$$ as

$$
    T^*M := \coprod_{p \in \mathcal{M}} T^*_p \mathcal{M} \, .
$$

If $$\mathcal{M}$$ and $$\mathcal{N}$$ are smooth manifolds and $$F: \mathcal{M} \to \mathcal{N}$$ is a smooth map, for each $$p \in \mathcal{M}$$ we define a map

$$
    dF_p : T_p \mathcal{M} \to T_{F(p)} \mathcal{N} \, ,
$$

called the **_differential_** of $$F$$ at $$p$$, as follows. Given $$v \in T_p \mathcal{M}$$:

$$
    dF_p (v)(f) := v(f \circ F) \, .
$$

Moreover, for any $$v \in T_p \mathcal{M}$$, we call $$dF_p (v)$$ the **_pushforward_** of $$v$$ by $$F$$ at $$p$$. It differs from the previous definition of differential in the sense that this map is a linear map between tangent spaces of two manifolds. Furthermore the differential of $$F$$ can be seen as the generalization of the total derivative in Euclidean spaces, in which $$dF_p$$ is represented by the Jacobian matrix.

<h2 class="section-heading">Tensors</h2>

Let $$\{ V_k \}$$ and $$U$$ be real vector spaces. A map $$F: V_1 \times \dots \times V_k \to U$$ is said to be **_multilinear_** if it is linear as a function of each variable separately when the others are held fixed. That is, it is a generalization of the familiar linear and bilinear maps. Furthermore, we write the vector space of all multilinear maps $$ V_1 \times \dots \times V_k \to U $$ as $$ \text{L}(V_1, \dots, V_k; U) $$.

**Example 3 (Multilinear functions).** Some examples of familiar multilinear functions are
1. The _dot product_ in $$ \mathbb{R}^n $$ is a scalar-valued bilinear function of two vectors. E.g. for any $$ v, w \in \mathbb{R}^n $$, the dot product between them is $$ v \cdot w := \sum_i^n v^i w^i $$, which is linear on both $$ v $$ and $$ w $$.
2. The _determinant_ is a real-valued multilinear function of $$ n $$ vectors in $$ \mathbb{R}^n $$.

Let $$\{ W_l \}$$ also be real vector spaces and suppose

$$
\begin{align}
    F&: V_1 \times \dots \times V_k \to \mathbb{R} \\
    G&: W_1 \times \dots \times W_l \to \mathbb{R}
\end{align}
$$

be multilinear maps. Define a function

$$
\begin{align}
    F \otimes G &: V_1 \times \dots \times V_k \times W_1 \times \dots \times W_l \to \mathbb{R} \\
    F \otimes G &(v_1, \dots, v_k, w_1, \dots, w_k) = F(v_1, \dots, v_k) G(w_1, \dots, w_l) \, .
\end{align}
$$

From the multilinearity of $$ F $$ and $$ G $$ it follows that $$ F \otimes G $$ is also multilinear, and is called the **_tensor product of $$ F $$ and $$ G $$_**. I.e. tensors and tensor products are multilinear map with codomain in $$ \mathbb{R} $$.

**Example 4 (Tensor products of covectors).** Let $$ V $$ be a vector space and $$ \omega, \eta \in V^* $$. Recall that they both a linear map from $$ V $$ to $$ \mathbb{R} $$. Therefore the tensor product between them is

$$
\begin{align}
    \omega \otimes \eta &: V \times V \to \mathbb{R} \\
    \omega \otimes \eta &(v_1, v_2) = \omega(v_1) \eta(v_2) \, .
\end{align}
$$

**Example 5 (Tensor products of dual basis).** Let $$ \epsilon^1, \epsilon^2 $$ be the standard dual basis for $$ (\mathbb{R}^2)^* $$. Then, the tensor product $$ \epsilon^1 \otimes \epsilon^2: \mathbb{R}^2 \times \mathbb{R}^2 \to \mathbb{R} $$ is the bilinear function defined by

$$
    \epsilon^1 \otimes \epsilon^2(x, y) = \epsilon^1 \otimes \epsilon^2((w, x), (y, z)) := wz \, .
$$

We use the notation $$  V_1^* \otimes \dots \otimes V_k^* $$ to denote the space $$ \text{L}(V_1, \dots, V_k; \mathbb{R}) $$. Let $$ V $$ be a finite-dimensional vector space. If $$ k \in \mathbb{N} $$, a **_covariant_ $$ k $$-tensor on $$ V $$** is an element of the $$ k $$-fold tensor product $$ V^* \otimes \dots \otimes V^* $$, which is a real-valued multilinear function of $$ k $$ elements of $$ V $$ to $$ \mathbb{R} $$. The number $$ k $$ is called the **_rank_** of the tensor.

Analogously, we define a **_contravariant $$ k $$-tensor on $$ V $$_** to be an element of the element of the $$ k $$-fold tensor product $$ V \otimes \dots \otimes V $$. We can mixed the two types of tensors together: For any $$ k, l \in \mathbb{N} $$, we define a **_mixed tensor on $$ V $$ of type $$ (k, l) $$_** to be the tensor product of $$ k $$ such $$ V $$ and $$ l $$ such $$ V^* $$.


<h2 class="section-heading">Riemannian metrics</h2>

So far we have no mechanism to measure the length of (tangent) vectors like we do in standard Euclidean geometry, where the length of a vector $$v$$ is measured in term of the dot product $$ \sqrt{v \cdot v} $$. Thus, we would like to add a structure that enables us to do just that to our smooth manifold $$\mathcal{M}$$.

A **_Riemannian metric_** $$ g $$ on $$ \mathcal{M} $$ is a smooth symmetric covariant 2-tensor field on $$ \mathcal{M} $$ that is positive definite at each point. Furthermore, for each $$ p \in \mathcal{M} $$,  $$ g_p $$ defines an inner product on $$ T_p \mathcal{M} $$, written $$ \langle v, w \rangle_g = g_p(v, w) $$ for all $$ v, w \in T_p \mathcal{M} $$. We call a tuple $$(\mathcal{M}, g)$$ to be **_Riemannian manifold_**.

In any smooth local coordinate $$\{x^i\}$$, a Riemannian metric can be written as tensor product

$$
    g = g_{ij} \, dx^i \otimes dx^j \, ,
$$

such that

$$
    g(v, w) = g_{ij} \, dx^i \otimes dx^j(v, w) = g_{ij} \, dx^i(v) dx^j(w) = g_{ij} \, v^i w^j \, .
$$

That is we can represent $$ g $$ as a symmetric, positive definite matrix $$ G $$ taking two tangent vectors as its arguments: $$ \langle v, w \rangle_g = v^\text{T} G w $$. Furthermore, we can define a norm w.r.t. $$g$$ to be $$\lVert \cdot \rVert_g := \langle v, v \rangle_g$$ for any $$v \in T_p \mathcal{M}$$.

**Example 6 (The Euclidean Metric).** The simplest example of a Riemannian metric is the familiar **_Euclidean metric_** $$g$$ of $$\mathbb{R}^n$$ using the standard coordinate. It is defined by

$$
    g = \delta_{ij} \, dx^i dx^j \, ,
$$

which, if applied to vectors $$v, w \in T_p \mathbb{R}^n$$, yields

$$
    g_p(v, w) = \delta_{ij} \, v^i w^j = \sum_{i=1}^n v^i w^i = v \cdot w \, .
$$

Note that above, $$\delta_{ij}$$ is the Kronecker delta. Thus, the Euclidean metric can be represented by the $$n \times n$$ identity matrix.


<h2 class="section-heading">The tangent-cotangent isomorphism</h2>

Riemannian metric also provides a natural isomorphism between the tangent and cotangent space. Let $$(\mathcal{M}, g)$$ be a Riemannian manifold. We define an isomorphism $$\hat{g}: T_p \mathcal{M} \to T_p^* \mathcal{M}$$ as follows. For each $$p \in \mathcal{M}$$ and each $$v \in T_p \mathcal{M}$$

$$
    \hat{g}(v) = \langle v, \cdot \rangle_g \, .
$$

Notice that that $$\hat{g}(v)$$ is in $$T_p^* \mathcal{M}$$ as it is a linear functional over $$T_p \mathcal{M}$$. In any smooth coordinate $$\{x^i\}$$, by definition we can write $$g = g_{ij} \, dx^i dx^j$$. Thus we can write the isomorphism above as

$$
    \hat{g}(v) = (g_{ij} \, v^i) \, dx^j =: v_i \, dx^j \, .
$$

Notice that we transform a contravariant component $$v^i$$ (denoted by the upper index component $$i$$) to a covariant component $$v_i = g_{ij} \, v^i$$ (denoted by the lower index component $$j$$), with the help of the metric tensor $$g$$. Because of this, we say that we obtain a covector from a tangent vector by **_lowering an index_**. Note that, we can also denote this by "flat" symbol in musical sheets: $$\hat{g}(v) =: v^\flat$$.

As Riemannian metric can be seen as a symmetric positive definite matrix, it has an inverse $$g^{ij} := g_{ij}^{-1}$$, which we denote by moving the index to the top, such that $$g^{ij} \, g_{jk} = g_{kj} \, g^{ji} = \delta^i_k$$. We can then define the inverse map of the above isomorphism as $$\hat{g}^{-1}: T_p^* \mathcal{M} \to T_p \mathcal{M}$$, where

$$
    \hat{g}^{-1}(\omega) = (g^{ij} \, \omega_j) \, \frac{\partial}{\partial x^i} =: \omega^i \, \frac{\partial}{\partial x^i} \, ,
$$

for all $$\omega \in T_p^* \mathcal{M}$$. In correspondence with the previous operation, we are now looking at the components $$\omega^i := g^{ij} \, \omega_j$$, hence this operation is called **_raising an index_**, which we can also denote by "sharp" musical symbol: $$\hat{g}^{-1}(\omega) =: \omega^\sharp$$. Putting these two map together, we call the isomorphism between the tangent and cotangent space as the **_musical isomorphism_**.


<h2 class="section-heading">The Riemannian gradient</h2>

Let $$(\mathcal{M}, g)$$ be a Riemannian manifold, and let $$f: \mathcal{M} \to \mathbb{R}$$ be a real-valued function over $$\mathcal{M}$$ (i.e. a scalar field on $$\mathcal{M})$$. Recall that $$df$$ is a covector field, which in coordinates has partial derivatives of $$f$$ as its components. We define a vector field called the **_gradient_** of $$f$$ by

$$
\begin{align}
    \text{grad}& \, f := (df)^\sharp = \hat{g}^{-1}(df) \, .
\end{align}
$$

For any $$p \in \mathcal{M}$$ and for any $$v \in T_p \mathcal{M}$$, the gradient satisfies

$$
    \langle \text{grad} \, f, v \rangle_g = vf \, .
$$

That is, for each $$p \in \mathcal{M}$$ and for any $$v \in T_p \mathcal{M}$$, $$\text{grad} \, f$$ is a vector in $$T_p \mathcal{M}$$ such that the inner product with $$v$$ is the directional derivative of $$f$$ in the direction of $$v$$. Observe the compatibility of this definition with standard multi-variable calculus: the directional derivative of a function in the direction of a vector is the dot product of its gradient and that vector.

In any smooth coordinate $$\{x^i\}$$, $$\text{grad} \, f$$ has the expression

$$
    \text{grad} \, f = g^{ij} \frac{\partial f}{\partial x^i} \frac{\partial}{\partial x^j} \, .
$$

**Example 7 (Euclidean gradient).** On $$\mathbb{R}^n$$ with the Euclidean metric with the standard coordinate, the gradient of $$f: \mathbb{R}^n \to \mathbb{R}$$ is

$$
    \text{grad} \, f = \delta^{ij} \, \frac{\partial f}{\partial x^i} \frac{\partial}{\partial x^j} = \sum_{i=1}^n \frac{\partial f}{\partial x^i} \frac{\partial}{\partial x^i} \, .
$$

Thus, again it is coincide with the definition we are familiar with form calculus.

All in all then, based on Example 7, we can compute the Riemannian gradient by raising the index of the Euclidean gradient, i.e. by applying the inverse Riemannian metric to the Euclidean gradient. In matrix notation, let $$G$$ be the matrix representation of $$g$$ and let $$\partial f$$ be the Euclidean gradient vector, then: $$\text{grad} \, f = G^{-1} \partial f$$.

The interpretation of the gradient in Riemannian manifold is analogous to the one in Euclidean space: its direction is the direction of steepest ascent of $$f$$ and it is orthogonal to the level sets of $$f$$; and its length is the maximum directional derivative of $$f$$ in any direction.

<h2 class="section-heading">Connections</h2>

Let $$(\mathcal{M}, g)$$ be a Riemannian manifold and let $$X, Y: \mathcal{M} \to T \mathcal{M}$$ be a vector field. Applying the usual definition for directional derivative, the way we differentiate $$X$$ is by

$$
    D_X \vert_p Y = \lim_{h \to 0} \frac{Y_{p+hX_p} - Y_p}{h} \, .
$$

However, we will have problems: We have not defined what this expression means $$p+hX_p$$. Furthermore, as $$Y_{p+hX_p}$$ and $$Y_p$$ live in different vector spaces $$T_{p+hX_p} \mathcal{M}$$ and $$T_p \mathcal{M}$$, it does not make sense to subtract them, unless there is a natural isomorphism between each $$T_p \mathcal{M}$$ and $$\mathcal{M}$$ itself, as in Euclidean spaces. Hence, we need to add an additional structure, called **_connection_** that allows us to compare different tangent vectors from different tangent spaces of nearby points.

Specifically, we define the **_affine connection_** to be a connection in the tangent bundle of $$\mathcal{M}$$. Let $$\mathfrak{X}(\mathcal{M})$$ be the space of vector fields on $$\mathcal{M}$$; $$X, Y, Z \in \mathfrak{X}(\mathcal{M})$$; $$f, g \in C^\infty(\mathcal{M})$$; and $$a, b \in \mathbb{R}$$. The affine connection is given by the map

$$
\begin{align}
    \nabla: \mathfrak{X}(\mathcal{M}) \times \mathfrak{X}(\mathcal{M}) &\to \mathfrak{X}(\mathcal{M}) \\
    (X, Y) &\mapsto \nabla_X Y \, ,
\end{align}
$$

which satisfies the following properties

1. $$C^\infty(\mathcal{M})$$-linearity in $$X$$, i.e., $$\nabla_{fX+gY} Z = f \, \nabla_X Z + g \, \nabla_Y Z$$
2. $$\mathbb{R}$$-linearity in Y, i.e., $$\nabla_X (aY + bZ) = a \, \nabla_X Y + b \, \nabla_X Z$$
3. Leibniz rule, i.e., $$\nabla_X (fY) = (Xf) Y + f \, \nabla_X Y$$ .

We call $$\nabla_X Y$$ the **_covariant derivative_** of $$Y$$ in the direction $$X$$. Note that the notation $$Xf$$ means $$Xf(p) := D_{X_p} \vert_p f$$ for all $$p \in \mathcal{M}$$, i.e. the directional derivative (it is a scalar field). Furthermore, notice that, covariant derivative and connection are the same thing and they are useful to generalize the notion of directional derivative to vector fields.

In any smooth local frame $$(E_i)$$ in $$T \mathcal{M}$$ on an open subset $$U \in \mathcal{M}$$, we can expand the vector field $$\nabla_{E_i} E_j$$ in terms of this frame

$$
    \nabla_{E_i} E_j = \Gamma^k_{ij} E_k \,.
$$

The $$n^3$$ smooth functions $$\Gamma^k_{ij}: U \to \mathbb{R}$$ is called the **_connection coefficients_** or the **_Christoffel symbols_** of $$\nabla$$.

**Example 8 (Covariant derivative in Euclidean spaces).** Let $$\mathbb{R}^n$$ with the Euclidean metric be a Riemannian manifold. Then

$$
    (\nabla_Y X)_p = \lim_{h \to 0} \frac{Y_{p+hX_p} - Y_p}{h} \enspace \enspace \forall p \in \mathcal{M} \, ,
$$

the usual directional derivative, is a covariant derivative.

There exists a unique affine connection for every Riemannian manifold $$(\mathcal{M}, g)$$ that satisfies

1. Symmetry, i.e., $$\nabla_X Y - \nabla_Y X = [X, Y]$$
2. Metric compatible, i.e., $$Z \langle X, Y \rangle_g = \langle \nabla_Z X, Y \rangle_g + \langle X, \nabla_Z Y \rangle_g$$,

for all $$X, Y, Z \in \mathfrak{X}(\mathcal{M})$$. It is called the **_Levi-Civita connection_**. Note that, $$[\cdot, \cdot]$$ is the **Lie bracket**, defined by $$[X, Y]f = X(Yf) - Y(Xf)$$ for all $$f \in C^\infty(\mathcal{M})$$. Note also that, the connection shown in Example 8 is the Levi-Civita connection for Euclidean spaces with the Euclidean metric.


<h2 class="section-heading">Riemannian Hessians</h2>

Let $$(\mathcal{M}, g)$$ be a Riemannian manifold equipped by the Levi-Civita connection $$\nabla$$. Given a scalar field $$f: \mathcal{M} \to \mathbb{R}$$ and any $$X, Y \in \mathfrak{X}(\mathcal{M})$$, the **_Riemannian Hessian_** of $$f$$ is the covariant 2-tensor field $$\text{Hess}f := \nabla^2 f := \nabla \nabla f$$, defined by

$$
    \text{Hess} \, f(X, Y) := X(Yf) - (\nabla_X Y)f = \langle \nabla_X \, \text{grad} f, Y \rangle_g \, .
$$

Another way to define Riemannian Hessian is to treat is a linear map $$T_p \mathcal{M} \to T_p \mathcal{M}$$, defined by

$$
    \text{Hess}_{v} \, f = \nabla_v \, \text{grad} \, f \, ,
$$

for every $$p \in \mathcal{M}$$ and $$v \in T_p \mathcal{M}$$.

In any local coordinate $$\{x^i\}$$, it is defined by

$$
    \text{Hess} \, f = f_{; i,j} \, dx^i \otimes dx^j := \left( \frac{\partial f}{\partial x^i \partial x^j} - \Gamma^k_{ij} \frac{\partial f}{\partial x^k} \right) \, dx^i \otimes dx^j \, .
$$

**Example 9 (Euclidean Hessian).** Let $$\mathbb{R}^n$$ be a Euclidean space with the Euclidean metric and standard Euclidean coordinate. We can show that connection coefficients of the Levi-Civita connection are all $$0$$. Thus the Hessian is defined by

$$
    \text{Hess} \, f = \left( \frac{\partial f}{\partial x^i \partial x^j} \right) \, dx^i \otimes dx^j \, .
$$

It is the same Hessian as we have seen in calculus.


<h2 class="section-heading">Geodesics</h2>

Let $$(\mathcal{M}, g)$$ be a Riemannian manifold and let $$\nabla$$ be a connection on $$T\mathcal{M}$$. Given a smooth curve $$\gamma: I \to \mathcal{M}$$, a **_vector field along $$\gamma$$_** is a smooth map $$V: I \to T\mathcal{M}$$ such that $$V(t) \in T_{\gamma(t)}\mathcal{M}$$ for every $$t \in I$$. We denote the space of all such vector fields $$\mathfrak{X}(\gamma)$$. A vector field $$V$$ along $$\gamma$$ is said to be **_extendible_** if there exists another vector field $$\tilde{V}$$ on a neighborhood of $$\gamma(I)$$ such that $$V = \tilde{V} \circ \gamma$$.

For each smooth curve $$\gamma: I \to \mathcal{M}$$, the connection determines a unique operator

$$
    D_t: \mathfrak{X}(\gamma) \to \mathfrak{X}(\gamma) \, ,
$$

called the **_covariant derivative along $$\gamma$$_**, satisfying (i) linearity over $$\mathbb{R}$$, (ii) Leibniz rule, and (iii) if it $$V \in \mathfrak{X}(\gamma)$$ is extendible, then for all $$\tilde{V}$$ of $$V$$, we have that $$ D_t V(t) = \nabla_{\gamma'(t)} \tilde{V}$$.

For every smooth curve $$\gamma: I \to \mathcal{M}$$, we define the **_acceleration_** of $$\gamma$$ to be the vector field $$D_t \gamma'$$ along $$\gamma$$. A smooth curve $$\gamma$$ is called a **_geodesic_** with respect to $$\nabla$$ if its acceleration is zero, i.e. $$D_t \gamma' = 0 \enspace \forall t \in I$$. In term of smooth coordinates $$\{x^i\}$$, if we write $$\gamma$$ in term of its components $$\gamma(t) := \{x^1(t), \dots, x^n(t)\}$$, then it follows that $$\gamma$$ is a geodesic if and only if its component functions satisfy the following **_geodesic equation_**:

$$
    \ddot{x}^k(t) + \dot{x}^i(t) \, \dot{x}^j(t) \, \Gamma^k_{ij}(x(t)) = 0 \, ,
$$

where we use $$x(t)$$ as an abbreviation for $$\{x^1(t), \dots, x^n(t)\}$$. Observe that, this gives us a hint that to compute a geodesic we need to solve a system of second-order ODE for the real-valued functions $$x^1, \dots, x^n$$.

Suppose $$\gamma: [a, b] \to \mathcal{M}$$ is a smooth curve segment with domain in the interval $$[a, b]$$. The **_length_** of $$\gamma$$ is

$$
    L_g (\gamma) := \int_a^b \lVert \gamma'(t) \rVert_g \, dt \, ,
$$

where $$\gamma'$$ is the derivative (the velocity vector) of $$\gamma$$. We can then use curve segments as "measuring tapes" to measure the **_Riemannian distance_** from $$p$$ to $$q$$ for any $$p, q \in \mathcal{M}$$

$$
    d_g(p, q) := \inf \{L_g(\gamma) \, \vert \, \gamma: [a, b] \to \mathcal{M} \enspace \text{s.t.} \enspace \gamma(a) = p, \, \gamma(b) = q\} \, ,
$$

over all curve segments $$\gamma$$ which have endpoints at $$p$$ and $$q$$. We call the particular $$\gamma$$ such that $$L_g(\gamma) = d_g(p, q)$$ as the **_length-minimizing curve_**. We can show that all geodesics are locally length-minimizing, and all length-minimizing curves are geodesics.


<h2 class="section-heading">Parallel transport</h2>

Let $$(\mathcal{M}, g)$$ be a Riemannian manifold with affine connection $$\nabla$$. A smooth vector field $$V$$ along a smooth curve $$\gamma: I \to \mathcal{M}$$ is said to be **_parallel_** along $$\gamma$$ if $$D_t V = 0$$ for all $$t \in I$$. Notice that a geodesic can then be said to be a curve whose velocity vector field is parallel along the curve.

Given $$t_0 \in I$$ and $$v \in T_{\gamma(t_0)} \mathcal{M}$$, we can show there exists a unique parallel vector field $$V$$ along $$\gamma$$ such that $$V(t_0) = v$$. This vector field is called the **_parallel transport_** of $$v$$ along $$\gamma$$. Now, for each $$t_0, t_1 \in I$$, we define a map

$$
\begin{align}
    &P^\gamma_{t_0 t_1} : T_{\gamma(t_0)} \mathcal{M} \to T_{\gamma(t_1)} \mathcal{M} \\
    &P^\gamma_{t_0 t_1}(v) := V(t_1) \, ,
\end{align}
$$

called the **_parallel transport map_**. We can picture the concept of parallel transport by imagining that we are "sliding" a tangent vector $$v$$ along $$\gamma$$ such that the direction and the magnitude of $$v$$ is preserved.

Note that, the parallel transport map is a linear map with inverse $$P^\gamma_{t_1 t_0}$$, hence it is an isomorphism between two tangent spaces $$T_{\gamma(t_0)} \mathcal{M}$$ and $$T_{\gamma(t_1)} \mathcal{M}$$. We can therefore determine the covariant derivative along $$\gamma$$ using parallel transport:

$$
    D_t V(t_0) = \lim_{t_1 \to t_0} \frac{P^\gamma_{t_1 t_0} \, V(t_1) - V(t_0)}{t_1 - t_0} \, ,
$$

Moreover, we can also determine the connection $$\nabla$$ via parallel transport:

$$
    \nabla_X Y \, \vert_p = \lim_{h \to 0} \frac{P^\gamma_{h 0} Y_{\gamma(h)} - Y_p}{h} \, ,
$$

for every $$p \in \mathcal{M}$$.

Finally, if $$A$$ is a smooth vector field on $$\mathcal{M}$$, then $$A$$ is parallel on $$\mathcal{M}$$ if and only if $$\nabla A = 0$$.


<h2 class="section-heading">The exponential map</h2>

Geodesics with proportional initial velocities are related in simple way. Let $$(\mathcal{M}, g)$$ be a Riemannian manifold equipped with the Levi-Civita connection. For every $$p \in \mathcal{M}$$, $$v \in T_p \mathcal{M}$$, and $$c, t \in \mathbb{R}$$,

$$
    \gamma_{cv} (t) = \gamma_{v} (ct) \, ,
$$

whenever either side is defined. This fact is compatible with our intuition on how speed and time are related to distance.

From the fact above, we can define a map from the tangent bundle to $$\mathcal{M}$$ itself, which sends each line through the origin in $$T_p \mathcal{M}$$ to a geodesic. Define a subset $$\mathcal{E} \subseteq T\mathcal{M}$$, the **_domain of the exponential map_** by

$$
    \mathcal{E} := \{ v \in T\mathcal{M} : \gamma_v \text{ is defined on an interval containing } [0, 1] \} \, ,
$$

and then define the **_exponential map_**

$$
\begin{align}
    &\text{Exp}: \mathcal{E} \to \mathcal{M} \\
    &\text{Exp}(v) = \gamma_v(1) \, .
\end{align}
$$

For each $$p \in \mathcal{M}$$, the **_restricted exponential map_** at $$p$$, denoted $$\text{Exp}_p$$ is the restriction of $$\text{Exp}$$ to the set $$\mathcal{E}_p := \mathcal{E} \cap T_p \mathcal{M}$$.

The interpretation of the (restricted) exponential maps is that, given a point $$p$$ and tangent vector $$v$$, we follow a geodesic which has the property $$\gamma(0) = p$$ and $$\gamma'(0) = v$$. This is then can be seen as the generalization of moving around the Euclidean space by following straight line in the direction of velocity vector.


<h2 class="section-heading">Curvature</h2>

Let $$(\mathcal{M}, g)$$ be a Riemannian manifold. Recall that an **_isometry_** is a map that preserves distance. Now, $$\mathcal{M}$$ is said to be **_flat_** if it is locally isometric to a Euclidean space, that is, every point in $$\mathcal{M}$$ has a neighborhood that is isometric to an open set in $$\mathbb{R}^n$$. We say that a connection $$\nabla$$ on $$\mathcal{M}$$ satisfies the **_flatness criterion_** if whenever $$X, Y, Z$$ are smooth vector fields defined on an open subset of $$\mathcal{M}$$, the following identity holds:

$$
    \nabla_X \nabla_Y Z - \nabla_Y \nabla_X Z = \nabla_{[X, Y]} Z \, .
$$

Furthermore, we can show that $$(\mathcal{M}, g)$$ is a flat Riemannian manifold, then its Levi-Civita connection satisfies the flatness criterion.

**Example 9 (Euclidean space is flat).** Let $$\mathbb{R}^n$$ with the Euclidean metric be a Riemannian manifold, equipped with the Euclidean connection $$\nabla$$. Then, given $$X, Y, Z$$ smooth vector fields:

$$
\begin{align}
    \nabla_X \nabla_Y Z &= \nabla_X (Y(Z^k) \partial_k) = XY(Z^k) \partial_k \\
    \nabla_Y \nabla_X Z &= \nabla_Y (X(Z^k) \partial_k) = YX(Z^k) \partial_k \, .
\end{align}
$$

The difference between them is

$$
    (XY(Z^k) - YX(Z^k)) \partial_k = \nabla_{[X, Y]}Z \, ,
$$

by definition. Thus

$$
    \nabla_X \nabla_Y Z - \nabla_Y \nabla_X Z = \nabla_{[X, Y]}Z \, .
$$

Therefore, the Euclidean space with the Euclidean connection (which is the Levi-Civita connection on Euclidean space) is flat.

Based on the above definition of the flatness criterion, then we can define a measure on how far away a manifold to be flat:

$$
\begin{align}
    &R: \mathfrak{X}(\mathcal{M}) \times \mathfrak{X}(\mathcal{M}) \times \mathfrak{X}(\mathcal{M}) \to \mathfrak{X}(\mathcal{M}) \\
    &R(X, Y)Z := \nabla_X \nabla_Y Z - \nabla_Y \nabla_X Z - \nabla_{[X, Y]} Z \, ,
\end{align}
$$

which is a multilinear map over $$C^\infty (\mathcal{M})$$, and is therefore a $$(1, 3)$$-tensor field on $$\mathcal{M}$$.

We can then define a covariant 4-tensor called the **_(Riemann) curvature tensor_** to be the $$(0, 4)$$-tensor field $$Rm := R^\flat$$, by lowering the contravariant index of $$R$$. Its action on a vector fields is given by

$$
    Rm(X, Y, Z, W) := \langle R(X, Y)Z, W \rangle_g \, .
$$

In any local coordinates, it is written

$$
    Rm = R_{ijkl} \, dx^i \otimes dx^j \otimes dx^k \otimes dx^l \, ,
$$

where $$R_{ijkl} = g_{lm} \, {R_{ijkl}}^m$$. We can show that $$Rm$$ is a local isometry invariant. Furthermore, compatible with our intuition of the role of the curvature tensor, a Riemannian manifold is flat if and only if its curvature tensor vanishes identically.

Working with $$4$$-tensors are complicated, thus we want to construct simpler tensors that summarize some of the information contained in the curvature tensor. For that, first we need to define the trace operator for tensors. Let $$T^{(k,l)}(V)$$ denotes the space of tensors with $$k$$ covariant and $$l$$ contravariant components of a vector space $$V$$, the trace operator is:

$$
\begin{align}
    &\text{tr}: T^{(k+1, l+1)}(V) \to T^{(k,l)}(V) \\
    &(\text{tr} \, F)(\omega^1, \dots, \omega^k, v_1, \dots, v_l) := \text{tr}(F(\omega^1, \dots, \omega^k, \cdot, v_1, \dots, v_l, \cdot)) \, ,
\end{align}
$$

where the trace operator in the right hand side is the usual trace operator, as $$F(\omega^1, \dots, \omega^k, \cdot, v_1, \dots, v_l, \cdot) \in T^{(1,1)}(V)$$ is a $$(1,1)$$-tensor, which can be represented by a matrix. We can extend this operator to covariant tensors in Riemannian manifolds: If $$h$$ is any covariant $$k$$-tensor field with $$k \geq 2$$, we can raise one of its indices and obtain $$(1, k-1)$$-tensor $$h^\sharp$$. The trace of $$h^\sharp$$ is thus a covariant $$(k-2)$$-tensor field. All in all, we define the **_trace_** of $$h$$ w.r.t. $$g$$ as

$$
    \text{tr}_g \, h := \text{tr}(h^\sharp) \, .
$$

In coordinates, it is

$$
    \text{tr}_g \, h = {h_i}^i = g^{ij} h_{ij} \, ,
$$

which, in an orthonormal frame, it is given by the ordinary trace of the matrix $$(h_{ij})$$.

We now define the **_Ricci curvature_** or **_Ricci tensor_** $$Rc$$ which is the covariant 2-tensor field defined as follows:

$$
    Rc(X, Y) := \text{tr}(Z \mapsto R(Z, X)Y) \, ,
$$

for any vector fields $$X, Y$$. In local coordinates, its components are

$$
    R_{ij} := {R_{kij}}^k = g^{km} \, R_{kijm} \, .
$$

We can simplify it further: We define the **_scalar curvature_** to be the function $$S$$ to be the trace of the Ricci tensor:

$$
    S := \text{tr}_g \, Rc = {R_i}^i = g^{ij} \, R_{ij} \, .
$$

Thus the scalar curvature is a scalar field on $$\mathcal{M}$$.

<h2 class="section-heading">References</h2>

1. Lee, John M. "Smooth manifolds." Introduction to Smooth Manifolds. Springer, New York, NY, 2013. 1-31.
2. Lee, John M. Riemannian manifolds: an introduction to curvature. Vol. 176. Springer Science & Business Media, 2006.
3. Absil, P-A., Robert Mahony, and Rodolphe Sepulchre. Optimization algorithms on matrix manifolds. Princeton University Press, 2009.
4. Boumal, Nicolas. Optimization and estimation on manifolds. Diss. Catholic University of Louvain, Louvain-la-Neuve, Belgium, 2014.
5. Graphics: <https://tex.stackexchange.com/questions/261408/sphere-tangent-to-plane>.
