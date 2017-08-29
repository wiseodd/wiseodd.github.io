---
layout:     post
title:      "Deriving normal equation"
subtitle:   "Deriving normal equation to solve least squares from calculus point of view"
date:       2017-04-14 08:01
author:     "wiseodd"
header-img: "img/code.png"
category:   techblog
tags:       [machine learning]
---

Normal equation is a well known, exact solution of least squares problem (or linear regression in ML jargon). Let \\( w \\) be the learnable weights, \\( X \\) be the data, \\( y \\) be the target, it has the form of:

$$ w = (X^TX)^{-1}X^Ty $$

In this post, we will derive that equation using calculus.

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

And we are done.
