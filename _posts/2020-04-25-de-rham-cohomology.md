---
layout:     post
title:      "De Rham Cohomology"
subtitle:   "De Rham cohomology groups are algebraic objects which are useful for identifying, on a given manifold, whether a closed differential form is exact and therefore conservative or not. Remarkably, these groups are topological invariant: Two manifolds that are homeomorphic to each other have isomorphic de Rham groups."
date:       2020-05-01 08:00
author:     "wiseodd"
header-img: "img/VectorField.svg"
category:   techblog
tags:       [math]
---


_**Disclaimer.** This post is my study notes on Lee's geometry books [1, 2], containing a condensed (in terms of topics) yet more verbose (in terms of details e.g. in the proofs) version of Lee's writings along with my personal interpretation and commentaries._
<br/><br/>


One of the central points of the previous two posts about [covector fields]({% post_url 2020-03-14-covector-field %}) and [differential forms]({% post_url 2020-04-17-exterior-derivative %}) is the identification of closed and exact forms. If $d$ is the exterior derivative, a smooth differential form $\omega$ is **_closed_** if $d\omega = 0$. Meanwhile $\omega$ is **_exact_** if it can be written as $\omega = d\eta$. Since $d \circ d = 0$, every exact form is closed.

In Euclidean space, if $\omega$ is a covector field ($1$-form), the converse is true: In this space we can equivalently think about a conservative vector field, and see that it fulfills both conditions above. But, what about higher degree forms in an arbitrary smooth manifold? It turns out, the answer of this question depends on the topology of the manifold, as has been suggested in Example 4 of this [post]({% post_url 2020-03-14-covector-field %}): In a punctured Euclidean space $\R^n \setminus \{ 0 \}$, a closed form is not necessarily exact due to the existence of the "hole" in $\R^n$.


<h2 class="section-heading">Quotient vector spaces</h2>

Recall that if $W \subseteq V$ are vector spaces, we can define their quotient space as follows. We define an **_equivalence relation_** $\sim$ on $V$ by stating that two elements $v_1, v_2$ of $V$ are equivalent (i.e. $v_1 \sim v_2$) if their difference $v_1-v_2$ is in $W$. The **_equivalence class of an element $v \in V$_** is then $[v] := \\{ v + w : w \in W \\}$. In words, $[v]$ consists of all elements of $V$ that are equivalent to $v$, which can be written as $(v + w)$ with $w \in W$, since $v - (v + w) = w \in W$ and thus $v \sim (v + w)$. The **_quotient space_** $V/W$ is defined as the vector space consisting of all equivalence classes of $V$ w.r.t. $W$.

Note in particular that the quotient $V/V$ is the zero vector space $\\{ [0] \\}$. This is because any two elements $v_1, v_2$ of $V$ are equivalent since $(v_1 - v_2) \in V$, thus for any $v$ in $V$, we have that $[v] = V = \\{ 0 + v : v \in V \\} = [0]$.


<h2 class="section-heading">The de Rham cohomology groups</h2>

Let $M$ be a smooth manifold and let $p$ be a non-negative integer. Since the exterior derivative $d: \Omega^p(M) \to \Omega^{p+1}(M)$, mapping smooth $p$-forms to smooth $(p+1)$-forms, is linear, its [kernel and image are linear subspaces](https://math.libretexts.org/Bookshelves/Linear_Algebra/Book%3A_A_First_Course_in_Linear_Algebra_(Kuttler)/09%3A_Vector_Spaces/9.08%3A_The_Kernel_and_Image_of_a_Linear_Map). We define

$$
\begin{align}
    \mathcal{Z}^p(M) &:= \mathrm{Ker} \left( d: \Omega^p(M) \to \Omega^{p+1}(M) \right) \\
            &= \{ \omega \in \Omega^p(M): d\omega = 0 \} \\
            &= \{ \text{closed $p$-forms on $M$} \} \, ,
\end{align}
$$

and

$$
\begin{align}
    \mathcal{B}^p(M) &:= \mathrm{Im} \left( d: \Omega^{p-1}(M) \to \Omega^{p}(M) \right) \\
            &= \{ d\omega \in \Omega^p(M) : \omega \in \Omega^{p-1}(M) \} \\
            &= \{ \text{exact $p$-forms on $M$} \} \, .
\end{align}
$$

To handle the edge cases, we agree the convention that $\Omega^p(M)$ is the zero vector space when $p < 0$ or $p > n := \mathrm{dim} \, \, M$. Therefore, in particular, $\mathcal{B}^0(M) = 0$ and $\mathcal{Z}^p(M) = \Omega^n(M)$. Furthermore, due to the fact that every exact form is closed, we have that $\mathcal{B}^p(M) \subseteq \mathcal{Z}^p(M)$.

To summarize, we can picture the above construction as follows:


It therefore makes sense to define the **_$p$-th de Rham cohomology group of $M$_** to be the quotient vector space

$$
    H^p_\text{dR}(M) := \frac{\mathcal{Z}^p(M)}{\mathcal{B}^p(M)} = \{ [\omega] : \omega \in \mathcal{Z}^p(M) \} \, .
$$

The element $[\omega]$ of $H^p_\text{dR}(M)$ is called the **_cohomology class of $\omega$_** and if $[\omega] = [\omega']$, we say they are **_cohomologous_**. Note that $H^p_\text{dR}(M) = 0$ for $p < 0$ or $p > n$ since $\Omega^p(M)$ are just the zero vector space in those cases.

This construction might seem familiar if one has some exposure to algebraic topology, esp. in simplicial or singular homology theory. Intuitively, one can substitute the space $\Omega^p(M)$ with a chain complex and the map $d$ with the boundary map to get the construction of simplicial/singular homology. The nomenclature _**co**homology_ here reflects to the fact that we are studying the elements of the "dual space" of a manifold.

Now, here is how the de Rham comohology groups can help us answering our main question: For $0 \leq p \leq n$, the quotient space $H^p_\text{dR}(M)$ is the zero vector space if and only if every closed $p$-form on $M$ is exact. This is because, in this case, we have that $\mathcal{Z}^p(M) = \mathcal{B}^p(M)$ and thus their quotient is trivial (i.e. zero).

**Example 1.** The punctured plane $M := \R^2 \setminus \\{ 0 \\}$ in Example 4 of the [previous post](asd) has $H^1\_\text{dR}(M) \neq 0$ since we have shown that there is a closed covector field ($1$-form) on $M$ that is not exact. Meanwhile, Theorem 5 in the same post (the Poincaré lemma) implies that for any star-shaped open subset $U \subseteq \R^n$, we have that $H^1_\text{dR}(U) = 0$.

//
{:.right}


Remarkably, de Rham cohomology is a _diffeomorphism invariance_. One can show (the proof is not shown here since we have not talked about pullbacks) that diffeomorphic smooth manifolds have isomorphic de Rham cohomology groups. Moreover, de Rham cohomology is actually a _topological invariance_.

The computation of de Rham cohomology groups is in general not easy. One can use homotopy invariance or Mayer-Vietoris theorem to do so. However, a lot of pre-requisites about topology is required and is thus outside of the scope of this post. However, for completeness, we will show them below. The first is about contractible manifolds.

**Theorem 2 (Cohomology of Contractible Manifolds).** _If $M$ is a contractible smooth manifold then $H^p\_\text{dR}(M) = 0$ for $p \geq 1$._

$\square$
{:.right}

As a consequence we can generalize the Poincaré Lemma for covector fields (Theorem 5 [here]({% post_url 2020-03-14-covector-field %})) to higher order differential forms.

**Theorem 3 (The Poincaré Lemma).** _If $U$ is a star-shaped open subset of $\R^n$, then $H^p\_\text{dR}(U) = 0$ for $p \geq 1$._

_Proof._ $U$ star-shaped implies that it is contractible.

$\square$
{:.right}


A particular consequence is that, we can now see why we do not need to bother about the main question of this post in Euclidean spaces.

**Theorem 4 (Cohomology of Euclidean Spaces).** _For any integers $n \geq 0$ and $p \geq 1$, we have that $H^p\_\text{dR}(\R^n) = 0$._

_Proof._ $\R^n$ is star-shaped for any $n \geq 0$.

$\square$
{:.right}


Finally, the following result (the proof requires Mayer-Vietoris theorem) formalizes what we have stated in Example 1.

**Theorem 5 (Cohomology of Punctured Euclidean Space).** _Let $n \geq 2$ be an integer, $x \in \R^n$, and $M := \R^n \setminus \\{ x \\}$. Then, the only nontrivial de Rham groups of $M$ are $H^0\_\text{dR}(M)$ and $H^{n-1}\_\text{dR}(M)$._

$\square$
{:.right}

In Example 1, we have that $n = 2$, thus $gH^1_\text{dR}(\R^2 \setminus \\{ 0 \\})$ is not zero, and therefore closed covector fields on $\R^2 \setminus \\{ 0 \\}$ are not necessarily exact.


<h2 class="section-heading">References</h2>

1. Lee, John M. "Smooth manifolds." Introduction to Smooth Manifolds. Springer, New York, NY, 2013. 1-31.
