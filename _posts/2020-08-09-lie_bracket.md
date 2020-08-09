---
layout:     post
title:      "Vector Fields and Lie Brackets"
subtitle:   "In this post we will discuss two very useful concepts: vector fields and the Lie bracket. They are very useful concept in Riemannian geometry, for example for defining curvatures."
date:       2020-08-09 08:00
author:     "wiseodd"
header-img: "img/VectorField.svg"
category:   techblog
tags:       [math]
---


In the previous post, we have studied [covector fields]({% post_url 2020-03-14-covector-field %}), which can be seen as attaching each point $p$ on a manifold $M$ a covector in the cotangent space $T_p^* M$. Now, we are going to study vector fields (without "co"), which can be seen as attaching an arrow (a tangent vector) at each point of $M$. But first, we review what the definition of tangent vector.


<h2 class="section-heading">Tangent Vectors</h2>

Let $M$ be a smooth manifold of dimension $n$ and let $p \in M$. A **_tangent vector_** $v$ at $p$ is a map $v: C^\infty(M) \to \R$ that is linear and Leibniz. The Leibniz property is just the usual product rule:

$$
    v(fg) = f(p) vg + g(p) vf \qquad \text{for all } f,g \in C^\infty(M).
$$

The vector space of all tangent vectors at $p$ is called the **_tangent space_** to $M$ at $p$ and denoted by $T_p M$. Note that $T_p M$ has dimension $n$ and therefore is isomorphic to $\R^n$. The disjoint union of all tangent spaces to $M$ is called as the **_tangent bundle_** of $M$ and denoted by $TM$.

Given any smooth coordinate chart $(U, (x^i))$ for $M$, at each point $p \in M$, the set of partial derivative operators $(\partial/\partial^i \vert_p)$ for each $i = 1, \dots, n$ forms a basis for the tangent space $T_pM$. Thus, each tangent vector $v$ can be written as the linear combination

$$
    v = \left. v^i \frac{\partial}{\partial x^i} \right\vert_p ,
$$

where the Einstein summation convention has been used and thus the summation $\sum_{i=1}^n$ is implied. Here, $(v^i)\_{i=1}^n$ are called the components of $v$.

One way to think about tangent vectors is that they are directional derivatives. In coordinates, the action of a tangent vector $v \in T_p M$ on a smooth function $f$ is written as

$$
    vf = v^i \frac{\partial f}{\partial x^i}(p).
$$

In the standard calculus notation, $vf$ is essentially the dot product between the components vector $(v_1, \dots, v_n)$ and the vector of partial derivatives $(\partial f/\partial x^1, \dots, \partial f/\partial x^n)$ of $f$.


<h2 class="section-heading">Vector Fields</h2>


If $M$ is a smooth $n$-manifold, a **_smooth vector field_** on $M$ is a smooth section (right inverse) of the map $\pi: TM \to M$. In other words, it is a smooth map $X: M \to TM$ defined by $p \mapsto X_p$ with the property that $\pi \circ X = \text{Id}\_M$. Equivalently, we can identify $X$ by $X_p \in T_p M$ for each $p \in M$. Thus, if we think of a tangent vector at $p \in M$ is an arrow that is tangent to $M$ and stemmed at $p$, then the vector field $X$ can be seen as assigning that kind of arrow at each point of $M$.

Let $(U, (x^i))$ be any smooth coordinate chart for $M$. Since at each point $p \in U \subseteq M$, $X_p$ is just a tangent vector, we can write it as

$$
    X_p = \left. X^i(p) \frac{\partial}{\partial x^i} \right\vert_p ,
$$

where for each $i = 1, \dots, n$, the smooth function $X^i: U \to \R$ is the **_component function_** of $X$ in the chart.


**Example 1.** If $(U, (x^i))$ is any smooth chart on $M$, the function $p \mapsto \partial/\partial x^i \vert_p$ (remember that $\partial/\partial x^i \vert_p$ is the $i$th basis vector of $T_p M$ and thus in particular a tangent vector at $p$) is a smooth vector field on $U$. This vector field is called the $i$th **_coordinate vector field_** and denoted by $\partial/\partial x^i$.

//
{:.right}


The set of all smooth vector fields on $M$ forms a vector space and is denoted by $\mathfrak{X}(M)$. The zero element of $\mathfrak{X}(M)$ is the zero vector field, i.e. the vector field $X$ s.t. at each $p \in M$, we have $X_p = 0 \in T_p M$.

Furthermore, if $f \in C^\infty(M)$ and $X \in \mathfrak{X}(M)$, we define the smooth vector field $fX \in \mathfrak{X}(M)$ by $(fX)\_p = f(p) X_p$. This gives us a way to express a vector field $X \in \mathfrak{X}(M)$ in coordinates as

$$
    X = X^i \frac{\partial}{\partial x^i},
$$

since $X^i \in C^\infty(M)$ and $\partial/\partial x^i$ is the $i$th coordinate vector field.

Let $X \in \mathfrak{X}(M)$. Since at each point $p \in M$, the value $X_p$ is just a tangent vector in $T_p M$, the action of $X$ on $f \in C^\infty(M)$ at $p$ is given by

$$
    (Xf)(p) = X_p f \in \R.
$$

Considering all points in $M$, the vector field $X$ defines a map $C^\infty(M) \to C^\infty(M)$ by $f \mapsto Xf$. It is linear over $\R$ and follows the product rule $X(fg) = f \, Xg + g \, Xf$ for all $f, g \in C^\infty(M)$. Furthermore, it holds for any open subset $U \subseteq M$, the function $Xf$ is determined locally, i.e. $(Xf)\vert_U = X(f \vert_U)$.


In general, a map $X: C^\infty(M) \to C^\infty(M)$ is called a **_derivation_** if it is linear over $\R$ and satisfies the product rule above. Moreover, derivations of $C^\infty(M)$ can be identified with smooth vector fields on $M$.


<h2 class="section-heading">Intermezzo: Frames</h2>

Coordinate vector fields are useful, esp. for representing vector fields as we have seen above, since their values at each point form a basis for the tangent space at that point. Here, we will see other choices for forming a basis for $T_p M$.

First, let's see some definitions. Let $M$ be a smooth $n$-manifold. And ordered $k$-tuple $(X_1, \dots, X_k)$ of vector fields defined on $A \subseteq M$ is linearly independent if $(X_1 \vert_p, \dots, X_k \vert_p)$ is a linearly independent $k$-tuple in $T_p M$ for each $p \in A$. It is said to span the tangent bundle if $(X_1 \vert_p, \dots, X_k \vert_p)$ spans $T_p M$ at each $p \in A$.

A **_local frame_** for $M$ is an ordered $n$-tuple of vector fields $(E_1, \dots, E_n) =: (E_i)$ defined on an open subset $U \subseteq M$ that is linearly independent and span the tangent bundle. It follows that the $n$-tuple $(E_1 \vert_p, \dots, E_n \vert_p)$ of tangent vectors forms a basis for $T_p M$ at each $p \in U$. We call it a **_global frame_** if $U = M$ and a **_smooth frame_** if each $E_i \in \mathfrak{X}(M)$.


**Example 2.** If $(U, (x^i))$ is any smooth coordinate chart for $M$, then the coordinate vector fields from Example 1 form a smooth local frame $(\partial/\partial x^i)$ on $U$, called a **_coordinate frame_**.

//
{:.right}


<h2 class="section-heading">Lie Brackets</h2>


Let $X, Y \in \mathfrak{X}(M)$ and $f \in C^\infty(M)$. We know that applying $X$ to $f$ yield a smooth function $Xf$. If we apply $Y$ to this function, we obtain another smooth function $YXf := Y(Xf)$. However, $YX$ is in general not a vector field, since it does not have the Leibniz property in general.


**Example 3.** Let $X := \partial/\partial x$ and $Y := x \, \partial/\partial y$ be vector fields on $\R^2$. Let $f, g \in C^\infty(\R^2)$ be defined as $f(x, y) := x$ and $g(x, y) := y$, respectively. We can then compute

$$
\begin{align*}
    XY(fg) &= X(f \, Yg + g \, Yf) \\
        &= X(x x \, \partial g/\partial y + y x \, \partial f/\partial y) \\
        &= X(x^2) \\
        &= \partial x^2/\partial x \\
        &= 2x.
\end{align*}
$$

However,

$$
\begin{align*}
    (XY)(fg) &= f \, XYg + g \, XYf \\
        &= x \, X(x \, \partial g/\partial y) + y \, X(x \, \partial f/\partial y) \\
        &= x \, \partial x/\partial x \\
        &= x,
\end{align*}
$$

thus $XY$ does not follows the product rule and thus is not a derivation. It follows immediately that $XY$ cannot be a vector field.

//
{:.right}


While, applying the vector fields $X, Y$ in any order will not in general gives a vector field, combining _both_ orders of applications in some specific way will always yield a vector field. Here is the details.

Suppose $X, Y \in \mathfrak{X}(M)$. We define the **_Lie bracket_** of $X$ and $Y$ to be the operator $[X, Y]: C^\infty(M) \to C^\infty(M)$ with $[X, Y]f = XYf - YXf$.


**Theorem 4.** _The Lie bracket for any pair of smooth vector fields is a smooth vector field._

_Proof._ Let $X, Y \in \mathfrak{X}(M)$ be arbitrary. Since we identify vector fields with derivations, it suffices to show that $[X, Y]$ is a derivation of $C^\infty(M)$. First, we show that $[X, Y]$ is linear over $\R$. Let $f, g \in C^\infty(M)$ and $\alpha, \beta \in \R$ be arbitrary. Recall that since vector fields correspond to derivations, they are linear over $\R$. Thus,

$$
\begin{align*}
    [X, Y](\alpha f + \beta g) &= XY(\alpha f + \beta g) - YX(\alpha f + \beta g) \\
        &= X(\alpha Yf + \beta Yg) - Y(\alpha Xf + \beta Xg) \\
        &= \alpha XYf - \alpha YXf + \beta XYg - \beta YXg \\
        &= \alpha [X, Y]f + \beta [X, Y]g.
\end{align*}
$$

Now, for the Leibniz property, let $f, g \in C^\infty(M)$ be arbitrary smooth functions. Then by definition,  repeatedly applying the product rule, and the linearity of vector fields as derivations, we have that

$$
\begin{align*}
    [X, Y](fg) &= X(Y(fg)) - Y(X(fg)) \\
        &= X(f \, Yg + g \, Yf) - Y(f \, Xg + g \, Xf) \\
        &= X(f \, Yg) + X(g \, Yf) - Y(f \, Xg) - Y(g \, Xf) \\
        &= f \, XYg + Yg \, Xf + g \, XYf + Yf \, Xg - f \, YXg - Xg \, Yf - g \, YXf - Xf \, Yg \\
        &= f \, XYg + g \, XYf - f \, YXg - g \, YXf \\
        &= f (XYg - YXg) + g (XYf - YXf) \\
        &= f \, [X, Y]g + g \, [X, Y]f.
\end{align*}
$$

Thus, since $[X, Y]$ is linear over $\R$ and Leibniz, $[X, Y]$ is a derivation. Since $X, Y$ are arbitrary, the claim follows.

$\square$
{:.right}


The value of the vector field $[X, Y]$ at $p \in M$ is the derivation at $p$ given by

$$
    [X, Y]\_p f = X_p(Yf) - Y_p (Xf).
$$

It can be computed in coordinate via the following formula.


**Proposition 5.** _Let $M$ be a smooth $n$-manifold and $X, Y \in \mathfrak{X}(M)$. If $X = X^i \, \partial/\partial x^i$ and $Y = Y^i \, \partial/\partial x^j$ be the coordinate representations of $X, Y$, then $[X, Y]$ has the following coordinate expression:_

$$
    [X, Y] = \left( X^i \frac{\partial Y^j}{\partial x^i} - Y^i \frac{\partial X^j}{\partial x^i} \right) \frac{\partial}{\partial x^j},
$$

_or more concisely,_

$$
    [X, Y] = (XY^j - YX^j) \frac{\partial}{\partial x^j}.
$$

_Proof._ Since $[X, Y] \in \mathfrak{X}(M)$, its action on $f \in C^\infty(M)$ is determined locally: $([X, Y]f)\vert_U = \[X, Y\](f \vert_U)$. Thus, it suffices to compute the coordinate representation of $[X, Y]$ in a single chart. Via the product rule, we have

$$
\begin{align*}
    [X, Y]f &= X^i \, \frac{\partial}{\partial x^i} \left( Y^j \frac{\partial f}{\partial x^j} \right) -  Y^j \, \frac{\partial}{\partial x^j} \left( X^i \frac{\partial f}{\partial x^i} \right) \\[10pt]
        &= X^i Y^j \, \frac{\partial^2 f}{\partial x^i \partial x^j} + X^i \, \frac{\partial Y^j}{\partial x^i} \frac{\partial f}{\partial x^j} - Y^j X^i \, \frac{\partial^2 f}{\partial x^i \partial x^j} - Y^j \, \frac{\partial X^i}{\partial x^j} \frac{\partial f}{\partial x^i} \\[10pt]
        &= X^i \, \frac{\partial Y^j}{\partial x^i} \frac{\partial f}{\partial x^j} - Y^j \, \frac{\partial X^i}{\partial x^j} \frac{\partial f}{\partial x^i} \\[10pt]
        &= \left( X^i \, \frac{\partial Y^j}{\partial x^i} - Y^i \, \frac{\partial X^j}{\partial x^i} \right) \frac{\partial f}{\partial x^j},
\end{align*}
$$

where in the last step we interchange the summation (dummy) indices $i, j$. The concise expression is immediate from the coordinate expression of vector fields, e.g.

$$
    XY^j = X^i \frac{\partial Y^j}{\partial x^i}.
$$

$\square$
{:.right}


**Example 6.** The Lie bracket of any pair of the coordinate vector fields $(\partial/\partial^i)$ in any smooth chart is trivially zero.

A less trivial example: Let $X, Y \in \mathfrak{X}(\R^3)$ be defined by

$$
\begin{align*}
    X &:= x \frac{\partial}{\partial x} + \frac{\partial}{\partial y} + x(y + 1) \frac{\partial}{\partial z}, \\[10pt]
    Y &:= \frac{\partial}{\partial x} + y \frac{\partial}{\partial z}.
\end{align*}
$$

Then, using the concise coordinate formula of $[X, Y]$, we have

$$
\begin{align*}
    [X, Y] &= \left( X(1) - Y(x) \right) \frac{\partial}{\partial x} + \left( X(0) - Y(1) \right) \frac{\partial}{\partial y} + \left( X(y) - Y(x(y + 1)) \right) \frac{\partial}{\partial z} \\[10pt]
        &= \left( 0 - 1 \right) \frac{\partial}{\partial x} + \left( 0 - 0 \right) \frac{\partial}{\partial y} + \left( 1 - (y + 1) \right) \frac{\partial}{\partial z} \\[10pt]
        &= - \frac{\partial}{\partial x} - y \frac{\partial}{\partial z}.
\end{align*}
$$

//
{:.right}


Now we look into the properties of the Lie bracket, which are summarized in the following proposition.


**Proposition 7 (Properties of the Lie Bracket).** _For all $X, Y, Z \in \mathfrak{X}(M)$, the Lie bracket satisfies the following identities:_

(i) **_Bilinearity_**: _For any $a, b \in \R$:_

$$
\begin{align*}
    [aX + bY, Z] &= a[X, Z] + b[Y, Z] \\
    [Z, aX + bY] &= a[Z, X] + b[Z, Y].
\end{align*}
$$

(ii) **_Antisymmetry_**:

$$
    [X, Y] = -[Y, X].
$$

(iii) **_Jacobi Identity_**:

$$
    [X, [Y, Z]] + [Y, [Z, X]] + [Z, [X, Y]] = 0.
$$

(iv) _For any $f, g \in C^\infty(M)$,_

$$
    [fX, gY] = fg[X, Y] + (f \, Xg)Y - (g \, Yf)X.
$$

_Proof._ First we first prove the bilinearity. Let $f \in C^\infty(M)$ be arbitrary. We have

$$
\begin{align*}
    [aX + bY, Z]f &= (aX + bY)(Zf) - Z(aX + bY)f \\
        &= a XZf + b YZf - a ZXf - b ZYf \\
        &= a[X, Z]f + b[Y, Z]f .
\end{align*}
$$

The second statement about bilinearity can be shown analogously.

Next, we prove the antisymmetry:

$$
    [X, Y] = XY - YX = -(-XY + YX) = -(YX - XY) = -[Y, X].
$$

Now, we prove the Jacobi identity. For any $f \in C^\infty(M)$, we have

$$
\begin{align*}
    ([X, [Y, Z]] &+ [Y, [Z, X]] + [Z, [X, Y]])f = [X, [Y, Z]]f + [Y, [Z, X]]f + [Z, [X, Y]]f \\
        &= X[Y, Z]f - [Y, Z]Xf + Y[Z, X]f - [Z, X]Yf + Z[X, Y]f - [X, Y]Z f \\
        &= XYZf - XZYf - YZXf + ZYXf + YZXf - YXZf \\
        &\qquad - ZXYf + XZYf + ZXYf - ZYXf - XYZf + YXZf \\
        &= 0.
\end{align*}
$$

Lastly, for (iv), let $h \in C^\infty(M)$ be arbitrary. We then use the definition, product rule, and recalling that the product of smooth function with a vector field is a vector field (e.g. $fX \in \mathfrak{X}(M)$) while the action of a vector field on a smooth function yields smooth function (e.g. $Xf \in C^\infty(M)$), to get:

$$
\begin{align*}
    [fX, gY] &= (fX)(gY)h - (gY)(fX)h \\
        &= (fX)(g \, (Yh)) - (gY)(f \, (Xh)) \\
        &= g \, (fX)(Yh) + (Yh)(fXg) - f \, (gY)(Xh) - (Xh)(gYf) \\
        &= (fg (XY))h - (fg (YX))h + ((fXg)Y)h - ((gYf)X)h \\
        &= fg \, [X, Y]h + ((fXg)Y)h - ((gYf)X)h .
\end{align*}
$$

$\square$
{:.right}


<h2 class="section-heading">Closing Remark</h2>

The Lie bracket is an important object in differential geometry, e.g. for defining curvatures in a Riemannian manifold. From this post, we can see that it is rather abstract and it is not quite clear what the Lie bracket actually does. Fortunately, there _is_ a geometric intuition of the Lie bracket. But, we have to wait until we discuss about integral curves and flows before we can obtain that intuition. We will discuss them in the next post.


<h2 class="section-heading">References</h2>

1. Lee, John M. "Smooth manifolds." Introduction to Smooth Manifolds. Springer, New York, NY, 2013. 1-31.
