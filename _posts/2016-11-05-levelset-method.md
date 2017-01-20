---
layout:     post
title:      "Level Set Method Part I: Introduction"
subtitle:   "Level Set Method is an interesting classical (pre deep learning) Computer Vision method based on Partial Differential Equation (PDE) for image segmentation. In this post, we will look at the intuition behind it."
date:       2016-11-05 11:24
author:     "wiseodd"
header-img: "img/code.png"
category:   techblog
tags:       [programming, python, computer vision]
---

Looking at the trend in Computer Vision, people steadily abandon the classical methods and just throw everything into Deep Neural Network. It is, however, very useful to study the classical CV method as it is still the key foundation, regardless whether we plan to use DNN or not.

We will look at one of the classic algorithms in Computer Vision: the Level Set Method (LSM). In this post we will see the motivation behind it, the intuition, formulation and finally the implementation of LSM. In the next post, we will apply this method for image segmentation.

<h2 class="section-heading">Intuition</h2>

Let's say we throw a stone into the middle of a pond. What would happen? There would be a ripple of water (for simplicity let's just pick one wave), moving from the epicenter, going wide until it dissipates or hit the pond's edge. How do we model and simulate that phenomenon?

We could do this: model the curve of that ripple and track its movement. Let's say at time \\( t = 1 \\), this is how the ripple looks like:

![LSM]({{ site.baseurl }}/img/2016-11-05-levelset-method/0.png)

Now, we want to model the movement as time goes. To do that, we have to track the movement of the curve above. One way to do it is to sample sufficient points in that curve and move it to the direction normal to the curve.

![LSM]({{ site.baseurl }}/img/2016-11-05-levelset-method/1.png)

This is a good solution for a very simple simulation (like this one). However, consider what happen to this case:

![LSM]({{ site.baseurl }}/img/2016-11-05-levelset-method/2.png)

Assuming there's no external force, those two curve will merge together into a single curve. Also, we have to consider the case when a curve splitting into two or more curves. How do we model that?

This is where LSM shines. Instead of modeling the curve explicitly, LSM will model it implicitly. But how can it help us to model the split, merge, and the movement of the curve, we would ask. Let's see how it works.

Suppose we have this 3D curve (surface):

![LSM]({{ site.baseurl }}/img/2016-11-05-levelset-method/3.png)

We can model the above curve (circle) with this curve by exploiting the relation between surface, plane, and curve. What we're going to do is to adjust our surface so that it intersect with a plane in a certain height. Like this:

![LSM]({{ site.baseurl }}/img/2016-11-05-levelset-method/4.png)

Take at a closer look at the intersection. What is it? It is none other than a curve, specifically, a circle! The curve is the level curve, i.e., a curve of a level set. This is the idea behind LSM. We implicitly modify our curve by transforming the surface then intersecting it to a plane and evaluate the resulting level curve.

But it's still not clear how do LSM could model the merge and split operation of curves. Let's do something to our surface and see what does it do to our level curve.

![LSM]({{ site.baseurl }}/img/2016-11-05-levelset-method/5.png)

In the above graph, we transform the surface into a surface with two minima. We can see the implication at the level curve, instead of a single circle, now it becomes two. Similarly with merge operation:

![LSM]({{ site.baseurl }}/img/2016-11-05-levelset-method/6.png)

Effortlessly, the level curve captures it!

This is a powerful insight and we're going to formulate this.

<h2 class="section-heading">Level Set Method Formulation</h2>

Suppose we have surface \\( \phi(x) \\). The c-level set of this surface is given by:

$$ \{x | \phi(x) = c\} $$

Formally, we want to track the level curve at \\( c = 0 \\), which is the zero level set of \\( \phi \\).

$$ \{x | \phi(x) = 0\} $$

As we're dealing with curve and surface evolution, we will parameterized our surface with a temporal variable \\(t\\) such that:

$$ \phi(x(t), t) = 0 $$

We could think of that as the surface at time \\(t\\), given the variable \\(x\\) at time \\(t\\).

Next, as we want to track the movement of the zero level curve of \\(\phi\\), we will derive it with respect to \\(t\\) i.e. we derive the equation of motion of \\(\phi\\). Remember, the derivation of position is speed, and knowing the speed, we could model the movement of the surface.

$$ \frac{\partial \phi(x(t), t)}{\partial t} = 0 $$

Using chain rule, we get:

$$ \frac{\partial \phi}{\partial x(t)} \frac{\partial x(t)}{\partial t} + \frac{\partial \phi}{\partial t} = 0 $$

Remember, by definition, the left most partial derivate is the gradient of our surface. And also, for clearer reading we will switch the Leibniz into more compact notation.

$$ \nabla\phi X_t + \phi_t = 0 $$

As we state above, the direction of the curve's movement is normal, which is \\( \frac{\nabla \phi}{\lVert \nabla \phi \rVert} \\). Of course there would also be a force that move the curve, we call it as \\( F \\). Hence, the speed vector is given by \\( x_t = F \frac{\nabla \phi}{\lVert \nabla \phi \rVert} \\).

$$ \begin{align}

\nabla \phi F \frac{\nabla \phi}{\lVert \nabla \phi \rVert} + \phi_t & = 0 \\[10pt]
F \lVert \nabla \phi \rVert + \phi_t & = 0

\end{align} $$

Finally, organizing things a little bit, we have our level set equation:

$$ \phi_t = -F {\lVert \nabla \phi \rVert} $$

This gives us the speed of the surface evolution of \\( \phi \\).

<h2 class="section-heading">Solving the PDE</h2>

Knowing the initial value of \\( \phi \\) (let's say 0 everywhere) and the speed of evolution, we can solve the equation of motion. That is, we want to know surface \\( \phi \\) at time \\( t \\). This is a Partial Differential Equation (PDE).

The simplest way to solve this would be to use Finite Difference Method. Let's consider forward difference scheme.

$$ f'(x) = \frac{f(x + \Delta x) - f(x)}{\Delta x} $$

Plugging in our \\( \phi \\) we have:

$$ \begin{align}

\frac{\partial \phi(x(t), t)}{\partial t} & = \frac{\phi(x(t), t + \Delta t) - \phi(x(t), t)}{\Delta t} \\[10pt]
\Delta t \phi_t & = \phi(x(t), t + \Delta t) - \phi(x(t), t) \\[10pt]
\phi(x(t), t + \Delta t) & = \phi(x(t), t) + \Delta t \phi_t \\[10pt]
\phi(x(t), t + \Delta t) & = \phi(x(t), t) + \Delta t F {\lVert \nabla \phi \rVert}

\end{align} $$

To make it clearer for those who has a background in Machine Learning, recall gradient descent. The update rule is in the form of:

$$ x' = x + \alpha \nabla x $$

Which is analogous to the finite difference scheme above. So we're practically doing gradient descent on \\( \phi \\) with respect to \\( t \\)!

$$ \phi' = \phi + \Delta t F {\lVert \nabla \phi \rVert} $$

So that's it. We just need to provide initial value for \\( \phi \\) and figure out the equation of force \\( F \\), which depend on the system we're going to model.

<h2 class="section-heading">Implementation</h2>

Given the finite difference formulation to solve the LSM's PDE, we could now implement it.

As we see, first we need to provide initial values. Then at every iteration, we look at the zero level set of \\( \phi \\), and we get our curve evolution! For example in Python using matplotlib, it would be something like this:

``` python
import numpy as np
import matplotlib.pyplot as plt

phi = np.random.randn(20, 20) # initial value for phi
F = ... # some function
dt = 1
it = 100

for i in range(it):
    dphi = np.gradient(phi)
    dphi_norm = np.sqrt(np.sum(dphi**2, axis=0))

    phi = phi + dt * F * dphi_norm

    # plot the zero level curve of phi
    plt.contour(phi, 0)
    plt.show()
```

As we can see, the core of LSM could be implemented with just a few lines of code. Bear in mind, this is the simplest formulation of LSM. There are many sophisticated variations of LSM which modifies \\( \frac{\phi(x(t), t)}{\partial t} \\).

<h2 class="section-heading">Conclusion</h2>

In this post, we looked at Level Set Method (LSM) which is a method to model curve evolution using implicit contour. LSM is powerful because we don't have to explicitly model difficult curve evolution like merge and split directly.

Then, we looked at the LSM formulation and how to solve the LSM as PDE using Finite Difference Method.

Finally, we implemented the simplest formulation of LSM in Python.

<h2 class="section-heading">References</h2>

1. Richard Szeliski. 2010. Computer Vision: Algorithms and Applications (1st ed.). Springer-Verlag New York, Inc., New York, NY, USA.
2. <http://step.polymtl.ca/~rv101/levelset/>