---
layout:     post
title:      "Brouwer's Fixed Point Theorem: A Proof with Reduced Homology"
subtitle:   "A proof of special case (ball) of Brouwer's Fixed Point Theorem with Reduced Homology."
date:       2018-07-18 10:00
author:     "wiseodd"
header-img: "img/homology.png"
category:   techblog
tags:       [math]
---

This post is about the proof I found very interesting during the Topology course I took this semester. It highlights the application of Reduced Homology, which is a modification of Homology theory in Algebraic Topology. We will use two results from Reduced Homology as black-boxes for the proof. Everywhere, we will assume \\( \mathbb{Q} \\) is used as the coefficient of the Homology space.

**Lemma 1 (Reduced Homology of spheres)**   
Given a \\( d \\)-sphere \\( \mathbb{S}^d \\), then its reduced \\( p \\)-th Homology space is:

$$
\tilde{H}_p(\mathbb{S}^d) = \begin{cases} \mathbb{Q}, & \text{if } p = d \\ 0, & \text{otherwise} \enspace . \end{cases}
$$

\\( \square \\)
{:.right}

**Lemma 2 (Reduced Homology of balls)**  
Given a \\( d \\)-ball \\( \mathbb{B}^d \\), then its reduced \\( p \\)-th Homology space is trivial, i.e. \\(\tilde{H}_p(\mathbb{B}^d) = 0 \\), for any \\( d \\) and \\( p \\).

\\( \square \\)
{:.right}

Equipped with these lemmas, we are ready to prove the special case of Brouwer's Fixed Point Theorem, where we consider map from a ball to itself.

**Brouwer's Fixed Point Theorem**  
Given \\( f: \mathbb{B}^{d+1} \to \mathbb{B}^{d+1} \\) continuous, then there exists \\( x
\in \mathbb{B}^{d+1} \\) such that \\( f(x) = x \\).

**Proof**  
For contradiction, assume \\( \forall x \in \mathbb{B}^{d+1}: f(x) \neq x \\). We construct a map \\( r: \mathbb{B}^{d+1} \to \mathbb{S}^d \\), casting ray from the ball to its shell by extending the line segment between \\( x \\) and \\( f(x) \\).

![Map r]({{ site.baseurl }}/img/2018-07-18-brouwers-fixed-point/map_r.svg){:height="200px" width="200px"}

Observe that \\( r(x) \\) is continuous because \\( f(x) \\) is. Also, \\( x \in \mathbb{S}^d \implies r(x) = x \\). Therefore we have the following commutative diagram.

![Commutative Diagram]({{ site.baseurl }}/img/2018-07-18-brouwers-fixed-point/comm_diag.svg){:height="200px" width="200px"}

Above, \\( i \\) is inclusion map, and \\( id \\) is identity map. We then look of the Reduced Homology of the above, and this gives us the following commutative diagram.

![Commutative Diagram Homology]({{ site.baseurl }}/img/2018-07-18-brouwers-fixed-point/comm_diag_hom.svg){:height="275px" width="275px"}

As the diagram commute, then \\( \tilde{H}_d(\mathbb{S}^d) \xrightarrow{i^\*} \tilde{H}_d(\mathbb{B}^{d+1}) \xrightarrow{r^\*}  \tilde{H}_d(\mathbb{S}^d) \\) should be identity map on \\( \tilde{H}_d(\mathbb{S}^d) \\). By Lemma 2, \\( \tilde{H}_d(\mathbb{B}^{d+1}) = 0 \\). This implies \\( \tilde{H}_d(\mathbb{S}^d) = 0 \\). But this is a contradiction, as By Lemma 1, \\( \tilde{H}_d(\mathbb{S}^d) = \mathbb{Q} \\). Therefore there must be a fixed point.

\\( \square \\)
{:.right}
