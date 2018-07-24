---
layout:     post
title:      "Minkowski's, Dirichlet's, and Two Squares Theorem"
subtitle:   "Application of Minkowski's Theorem in geometry problems, Dirichlet's Approximation Theorem, and Two Squares Theorem."
date:       2018-07-24 20:30
author:     "wiseodd"
header-img: "img/2018-07-24-minkowski-dirichlet/forest_minkowski.svg"
category:   techblog
tags:       [math]
---

![Forest]({{ site.baseurl }}/img/2018-07-24-minkowski-dirichlet/forest.svg){:height="250px" width="250px"}

Suppose we are standing at the origin of bounded regular forest in \\( \mathbb{R}^2 \\), with diameter of \\(26\\)m, and all the trees inside have diameter of \\(0.16\\)m. Can we see outside this forest? This problem can be solved using Minkowski's Theorem. We will see the theorem itself first, and we shall see how can we answer that question. Furthermore, Minkowski's Theorem can also be applied to answer two other famous theorems, Dirichlet's Approximation Theorem, and Two Squares Theorem.

**Theorem 1 (Minkowski's Theorem)**  
Let \\( C \subseteq \mathbb{R}^d \\) be symmetric around the origin, convex, and bounded set. If \\( \text{vol}(C) > 2^d \\) then \\( C \\) contains at least one lattice point different from the origin.

_Proof._ &nbsp;&nbsp; Let \\( C' := \frac{1}{2} C = \\{ \frac{1}{2} c \, \vert \, c \in C \\} \\). Assume that there exists non-zero integer \\( v \in \mathbb{Z}^d \setminus \\{ 0 \\} \\), such that the intersection between \\( C' \\) and its translation wrt. \\( v \\) is non-empty.

Pick arbitrary \\( x \in C' \cap (C' + v) \\). Then \\( x - v \in C' \\) by construction. By symmetry, \\( v - x \in C' \\). As \\( C' \\) is convex, then line segment between \\( x \\) and \\( v - x \\) is in \\( C' \\). We particularly consider the midpoint of the line segment: \\( \frac{1}{2}x + \frac{1}{2} (v - x) = \frac{1}{2} v \in C' \\). This immediately implies that \\( v \in C \\) by the definition of \\( C' \\), which proves the theorem.

\\( \square \\)
{:.right}

The claim that there exists non-zero integer \\( v \in \mathbb{Z}^d \setminus \\{ 0 \\} \\), such that \\( C' \cap (C' + v) \neq \emptyset \\) is not proven in this post. One can refer to Matoušek's book for the proof.

![Minkowsi_forest]({{ site.baseurl }}/img/2018-07-24-minkowski-dirichlet/forest_minkowski.svg){:height="250px" width="250px"}

Given Minkowski's Theorem, now we can answer our original question. We assume the trees are just lattice points, and our visibility line is now a visibility strip, which has wide of \\( 0.16 \\)m and length of \\( 26 \\)m. We note that the preconditions of Minkowski's Theorem are satisfied by this visibility strip, which has the volume of \\( \approx 4.16 > 4 = 2^d  \\). Therefore, there exists a lattice point other than the origin inside our visibility strip. Thus our vision outside is blocked by the tree.

Now we look at two theorems that can be proven using Minkowski's Theorem. The first one is about approximation of real number with a rational.

**Theorem 2 (Dirichlet's Approximation Theorem)**  
Let \\( \alpha \in \mathbb{R} \\). Then for all \\( N \in \mathbb{N} \\), there exists \\( m \in \mathbb{Z}, n \in \mathbb{N} \\) with \\( n \leq N \\) such that:

$$
\left \vert \, \alpha - \frac{m}{n} \right \vert \lt \frac{1}{nN} \enspace .
$$

_Proof._ &nbsp;&nbsp; Consider \\( C := \\{ (x, y) \in \mathbb{R}^2 \, \vert \, -N-\frac{1}{2} \leq x \leq N+\frac{1}{2}, \vert \alpha x - y \vert \lt \frac{1}{N} \\} \\). By inspection on the figure below, we can observe that \\( C \\) is convex, bounded, and symmetric around the origin.

![Dirichlet]({{ site.baseurl }}/img/2018-07-24-minkowski-dirichlet/dirichlet.svg){:height="400px" width="400px"}

Observe also that the area of \\( C \\) is \\( \text{vol}(C) = \frac{2}{N} (2N + 1) = 4 + \frac{2}{N} \gt 4 = 2^d \\). Thus this construction satisfied the Minkowski's Theorem's preconditions. Therefore there exists lattice point \\( (n, m) \neq (0, 0) \\). As \\( C \\) is symmetric, we can always assume \\( n \gt 0 \\) thus \\( n \in \mathbb{N} \\). By definition of \\( C \\), \\( n \leq N+\frac{1}{2} \implies n \leq N \\) as  \\(  N \in \mathbb{N} \\). Futhermore, we have \\( \vert \alpha n - m \vert \lt \frac{1}{N} \\). This implies \\( \left\vert \alpha - \frac{m}{n} \right\vert \lt \frac{1}{nN} \\) which conclude the proof.

\\( \square \\)
{:.right}

Our second application is the theorem saying that prime number \\( p \equiv 1 \, (\text{mod } 4) \\) can be written as a sum of two squares. For this we need the General Minkowski's Theorem, which allows us to use arbitrary basis for our lattice.


**Theorem 3 (General Minkowski's Theorem)**
Let \\( C \subseteq \mathbb{R}^d \\) be symmetric around the origin, convex, and bounded set. Let \\( \Gamma \\) be the lattice in \\( \mathbb{R}^d \\). If \\( \text{vol}(C) > 2^d \,\text{vol}(\Gamma) = 2^d \det \Gamma \\), then \\( C \\) contains at least one lattice point in \\( \Gamma \\) different from the origin.

\\( \square \\)
{:.right}



**Theorem 4 (Two Squares Theorem)**  
Every prime number \\( p \equiv 1 \, (\text{mod } 4) \\) can be written by the sum of two squares \\( p = a^2 + b^2 \\) where \\( a, b \in \mathbb{Z} \\).

_Proof._ &nbsp;&nbsp; We need intermediate result which will not be proven here (refer to [1] for the proof): \\( -1 \\) is a quadratic residue modulo \\( p \\), that is, there exists \\( q \lt p \\) such that \\( q^2 \equiv -1 \, (\text{mod } p) \\).

Fix \\( q \\) and take the following basis for our lattice: \\( z_1 := (1, q), \, z_2 := (0, p) \\). The volume of this lattice is: \\( \det \Gamma = \det \begin{bmatrix} 1 & 0 \\\\ q & p \end{bmatrix} = p \\).

Define a convex, symmetric, and bounded body \\( C := \\{ (x, y) \in \mathbb{R}^2 \, \vert \, x^2 + y^2 \lt 2p \\} \\), i.e. \\( C \\) is an open ball around the origin with radius \\( \sqrt{2p} \\). Note:

$$
\text{vol}(C) = \pi r^2 \approx 6.28p \gt 4p = 2^2 p = 2^d \det \Gamma \enspace ,
$$

thus General Minkowski's Theorem applies and there exists a lattice point \\( (a, b) = i z_1 + j z_2 = (i, iq + jp) \neq (0, 0) \\). Notice:

$$ \begin{align}

a^2 + b^2 &= i^2 + i^2 q^2 + 2ijpq + j^2 p^2 \\
          &\equiv i^2 + i^2q^2 \, (\text{mod } p) \\
          &\equiv i^2(1+q^2) \, (\text{mod } p) \\
          &\equiv i^2(1-1) \, (\text{mod } p) \\
          &\equiv 0 \, (\text{mod } p) \enspace .

\end{align} $$

To go from 3rd to 4th line, we use our very first assumption, i.e. \\( q^2 \equiv -1 \, (\text{mod } p) \\). Therefore \\( a^2 + b^2 \\) has to be divisible by \\( p \\). Also, as \\( (a, b) \\) is in \\( C \\) this implies \\( a^2 + b^2 \lt 2p \\) by definition. Thus the only choice is \\( a^2 + b^2 = p \\). This proves the theorem.

\\( \square \\)
{:.right}

<h2 class="section-heading">References</h2>

1. Matoušek, Jiří. Lectures on discrete geometry. Vol. 212. New York: Springer, 2002.

