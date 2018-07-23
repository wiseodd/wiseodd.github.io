---
layout:     post
title:      "Reduced Betti number of sphere: Mayer-Vietoris Theorem"
subtitle:   "A proof of reduced homology of sphere with Mayer-Vietoris sequence."
date:       2018-07-23 10:00
author:     "wiseodd"
header-img: "img/homology.png"
category:   techblog
tags:       [math]
---

In the [previous post]({% post_url 2018-07-18-brouwers-fixed-point %}) about Brouwer's Fixed Point Theorem, we used two black boxes. In this post we will prove the slight variation of those black boxes. We will start with the simplest lemma first: the reduced homology of balls.

**Lemma 2 (Reduced homology of balls)**  
Given a \\( d \\)-ball \\( \mathbb{B}^d \\), then its reduced \\( p \\)-th homology space is trivial, i.e. \\(\tilde{H}_p(\mathbb{B}^d) = 0 \\), for any \\( d \\) and \\( p \\).

_Proof._ &nbsp;&nbsp; Observe that \\( \mathbb{B}^d \\) is contractible, i.e. homotopy equivalent to a point. Assuming we use coefficient \\( \mathbb{Q} \\), we know the zero-th homology space of point is \\( H_0(\, \cdot \,, \mathbb{Q}) = \mathbb{Q} \\), and trivial otherwise, i.e. \\( H_p (\, \cdot \,, \mathbb{Q}) = 0 \enspace \forall p \geq 1 \\).

In the reduced homology, therefore \\( \tilde{H}_0(\, \cdot \,, \mathbb{Q}) = 0 \\). Thus the reduced homology of balls is trivial for all \\( d, p \\).

\\( \square \\)
{:.right}


**Corollary 1 (Reduced Betti numbers of balls)**  
The \\( p \\)-th reduced Betti numbers of \\( \mathbb{B}^d \\) is zero for all \\(d, p\\).

\\( \square \\)
{:.right}

Now, we are ready to prove the main theme of this post.

**Lemma 1 (Reduced Betti numbers of spheres)**   
Given a \\( d \\)-sphere \\( \mathbb{S}^d \\), then its \\( p \\)-th reduced Betti number is:

$$
\tilde{\beta}_p(\mathbb{S}^d) = \begin{cases} 1, & \text{if } p = d \\ 0, & \text{otherwise} \enspace . \end{cases}
$$

_Proof._ &nbsp;&nbsp; We use "divide-and-conquer" approach to apply Mayer-Vietoris Theorem. We cut the sphere along the equator and note that the upper and lower portion of the sphere is just a disk, and the intersection between those two parts is a circle (sphere one dimension down), as shown in the figure below.

![Sphere]({{ site.baseurl }}/img/2018-07-23-mayer-vietoris-sphere/sphere.svg){:height="350px" width="350px"}

By Mayer-Vietoris Theorem, we have a long exact sequence in the form of:

$$
\dots \longrightarrow \tilde{H}_p(\mathbb{S}^{d-1}) \longrightarrow \tilde{H}_p(\mathbb{B}^d) \oplus \tilde{H}_p(\mathbb{B}^d) \longrightarrow \tilde{H}_p(\mathbb{S}^d) \longrightarrow \tilde{H}_{p-1}(\mathbb{S}^{d-1}) \longrightarrow \dots \enspace .
$$

By Corollary 1, \\( \tilde{H}_p(\mathbb{B}^d) \oplus \tilde{H}_p(\mathbb{B}^d) = \tilde{H}\_{p-1}(\mathbb{B}^d) \oplus \tilde{H}\_{p-1}(\mathbb{B}^d) = 0 \\). As the sequence is exact, therefore \\( \tilde{H}\_p(\mathbb{S}^d) \longrightarrow \tilde{H}\_{p-1}(\mathbb{S}^{d-1}) \\) is a bijection, and thus an isomorphism. Then by induction with base case of \\( \mathbb{S}^0 \\), we conclude that the claim holds.

\\( \square \\)
{:.right}


<h2 class="section-heading">References</h2>

1. Hatcher, Allen. "Algebraic topology." (2001).

