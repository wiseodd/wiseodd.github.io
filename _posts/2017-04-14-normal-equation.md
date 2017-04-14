---
layout:     post
title:      "Deriving normal equation: three ways"
subtitle:   "Deriving normal equation to solve least squares, in three different views"
date:       2017-04-14 08:01
author:     "wiseodd"
header-img: "img/code.png"
category:   techblog
tags:       [machine learning]
---

Normal equation is a well known, exact solution of least squares problem (or linear regression in ML jargon). Let \\( w \\) be the learnable weights, \\( X \\) be the data, \\( y \\) be the target, it has the form of:

$$ w = (X^TX)^{-1}X^Ty $$

In this post, we will derive that equation in three different perspectives: geometry, linear algebra, and calculus.


<h2 class="section-heading">Geometric derivation</h2>

The objective of linear regression is to minimize the error between the predicted result \\( Xw \\) and the ground truth \\( y \\). So, our best bet to minimize that is to make sure that the error vector given by \\( y - Xw \\) to be orthogonal with our prediction (regression line) \\( Xw \\).

Now, as we choose them to be orthogonal to each other, the dot product are zero:

$$ (Xw)^T(y - Xw) = 0 $$

If we carry on with the math:

$$ \begin{align}

(Xw)^T(y - Xw) &= 0 \\[10pt]
w^TX^Ty - w^TX^TXw &= 0 \\[10pt]
w^TX^TXw &= w^TX^Ty \\[10pt]
X^TXw &= (w^T)^{-1}w^TX^Ty \\[10pt]
X^TXw &= X^Ty \\[10pt]
w &= (X^TX)^{-1}X^Ty \\[10pt]

\end {align} $$

We end up with the normal equation. Hence, we can conclude that geometrically, the normal equation gives us the least distance from the ground truth to the prediction/regression line.


<h2 class="section-heading">Linear algebra point of view</h2>

Usually, we have much more data than features. Matrix \\( X \\) has more rows than columns, or in other words, it has more equation than unknown. We could imagine that each equation in \\( X \\) as constraint to the system. This kind of system is called [overdetermined system](https://en.wikipedia.org/wiki/Overdetermined_system), and usually has no solution. Intuitively, if we have many constraint, it will be harder to satisfy the system.

Okay, if there's no exact solution, now what? The next best thing is to find the best approximate solution. Let's digest that term "the best approximate solution" bit by bit.

We know that for the solution of the system of linear equations \\( Ax = b \\) to exist, it must lie in the column space of \\( A \\), because the columns of \\( A \\) span the whole subspace. That is, any vector \\( b \\) in that subspace could be found by taking the linear combination of the columns of \\( A \\) with coefficients \\( x \\), and one of those coefficients is the solution to the system. As in our regression model we don't have any solution, \\( y \\) is outside the column space of \\( X \\). Therefore, to make sure that it has solution, \\( y \\) needs to be projected to the column space of \\( X \\).

But what kind of projection do we need to make it "the best approximate solution"? We could project \\( y \\) to \\( C(X) \\), the column space of \\( X \\), so that the distance is close to the original \\( y \\). Turn out, the closest distance is given by orthogonal projection. The orthogonal projection matrix is given by: \\( X(X^TX)^{-1}X^T \\), see reference [2].

So, let \\( \bar{y} \\) be the projection of \\( y \\) onto \\( C(X) \\), i.e. \\( \bar{y} = X(X^TX)^{-1}X^Ty \\), our system becomes as follows:

$$ \begin{align}

Xw &= \bar{y} \\[10pt]
Xw &= X(X^TX)^{-1}X^Ty

\end {align} $$

Rearranging to get \\( w \\):

$$ \begin{align}

w  &= X^{-1}X(X^TX)^{-1}X^Ty \\[10pt]
w  &= I(X^TX)^{-1}X^Ty \\[10pt]
w  &= (X^TX)^{-1}X^Ty

\end {align} $$

And we get the normal equation again.


<h2 class="section-heading">Calculus perspective</h2>

Recall, the objective of least squares is to minimize the squared distance between the prediciton and the ground truth. So, we want to minimize the mean squared error: \\( \frac{1}{2} \Vert y - Xw \Vert^2 \\). The standard rule of minimization in calculus is to derive then set it to zero. But first let's expand that equation first.

$$ \begin{align}

L &= \frac{1}{2} \Vert y - Xw \Vert^2 \\[10pt]
  &= \frac{1}{2} (y - Xw)^T(y - Xw) \\[10pt]
  &= \frac{1}{2} (y^Ty - 2w^TX^Ty + w^TX^TXw) \\[10pt]

\end {align} $$

Now we could take the derivate w.r.t. \\( w \\), and set it to zero:

$$ \begin{align}

\frac{\partial}{\partial{w}} \frac{1}{2} (y^Ty - 2w^TX^Ty + w^TX^TXw) &= 0 \\[10pt]
\frac{1}{2} (2X^Ty - 2X^TXw) &= 0 \\[10pt]
X^Ty - X^TXw &= 0 \\[10pt]

\end {align} $$

Above, \\( y^Ty \\) vanished as there's no \\( w \\) dependence, and \\( w^TX^TXw \\) becomes \\( 2X^TXw \\) as \\( w^Tw \\) is analogous to \\( w^2 \\).

The final step, we just need to rearrange:

$$ \begin{align}

X^Ty - X^TXw &= 0 \\[10pt]
X^TXw &= X^Ty \\[10pt]
w &= (X^TX)^{-1}X^Ty \\[10pt]

\end {align} $$

We meet the normal equation again.


<h2 class="section-heading">Conclusion</h2>

In this post, we derived the famous normal equation using three different perspectives: geometry, linear algebra, and calculus.

In geometry, we get the normal equation by realizing that the error is orthogonal to the plane that is spanned by our data. In linear algebra, we realized that in machine learning, there are noises in our measurement \\( y \\) so that there might not be an exact solution to our system. We alleviate it by projecting the measurements onto the column space of our data, so that it's guaranteed to have (approximate) solution. Lastly, in calculus, we take a derivative of mean squared error objective, and set it to zero.


<h2 class="section-heading">References</h2>

1. Strang, Gilbert, et al. Introduction to linear algebra. Vol. 3. Wellesley, MA: Wellesley-Cambridge Press, 1993.
2. [Projections onto subspaces, MIT](https://ocw.mit.edu/courses/mathematics/18-06sc-linear-algebra-fall-2011/least-squares-determinants-and-eigenvalues/projections-onto-subspaces/MIT18_06SCF11_Ses2.2sum.pdf)