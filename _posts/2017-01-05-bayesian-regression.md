---
layout:     post
title:      "Linear Regression: A Bayesian Point of View"
subtitle:   "You know the drill, apply mean squared error, then descend those gradients. But, what is the intuition of that process in Bayesian PoV?"
date:       2017-01-05 02:41
author:     "wiseodd"
header-img: "img/bayes.png"
category:   techblog
tags:       [machine learning, bayesian]
---

We all know the first model we learned when learning Machine Learning: Linear Regression. It is a simple, intuitive, and stimulating our mind to go deeper into Machine Learning hole.

Linear Regression could be intuitively interpreted in several point of views, e.g. geometry and statistics (frequentist one!). Having frequentist statistics point of view, usually there should be the Bayesian counterpart. Hence, in this post, we would address the Bayesian point of view of Linear Regression.


<h2 class="section-header">Linear Regression: Refreshments</h2>

Recall, in Linear Regression, we want to map our inputs into real numbers, i.e. \\( f: \mathbb{R}^N \to \mathbb{R} \\). For example, given some features, e.g. how many hour of studying, number of subject taken, and the IQ of a student, we want to predict his or her GPA.

There are several types of Linear Regression, depending on their cost function and the regularizer. In this post, we would focus on Linear Regression with \\( \ell_2 \\) cost and \\( \ell_2 \\) regularization. In statistics, this kind of regression is called Ridge Regression.

Formally, the objective is as follows:

$$ L = \frac{1}{2} \Vert \hat{y} - y \Vert^2_2 + \frac{\lambda}{2} \Vert W \Vert^2_2 $$

where \\( \hat{y} \\) is the ground truth value, and \\( y \\) is given by:

$$ y = W^Tx $$

which is a linear combination of feature vector and weight matrix. The additional \\( \frac{1}{2} \\) in both terms is just for mathematical convenience when taking the derivative.

The idea is then to minimize this objective function with regard to \\( W \\). That is, we want to find weight matrix \\( W \\) that minimize the squared error.

Of course we could ignore the regularization term. What we end up with then, is a vanilla Linear Regression:

$$ L = \frac{1}{2} \Vert \hat{y} - y \Vert^2_2 $$

Minimization this objective is the definition of Linear Least Square problem.


<h2 class="section-header">Frequentist view of Linear Regression</h2>

We could write the regression target of the above model as the predicted value plus some error:

$$ \begin{align}

\hat{y} &= y + \epsilon \\[10pt]
        &= W^Tx + \epsilon

\end{align} $$

or equivalently, we could say that the error is:

$$ \epsilon = \hat{y} - y $$

Now, let's say we model the regression target as a Gaussian random variable, i.e. \\( y \sim N(\mu, \sigma^2) \\), with \\( \mu = y = W^Tx \\), the prediction of our model. Formally:

$$ P(\hat{y} \vert x, W) = N(\hat{y} \vert W^Tx, \sigma^2) $$

Then, to find the optimum \\( W \\), we could use Maximum Likelihood Estimation (MLE). As the above model is a likelihood, i.e. describing our data \\( y \\) under parameter \\( W \\), we will do MLE on that:

$$ W_{MLE} = \mathop{\rm arg\,max}\limits_{W} N(\hat{y} \vert W^Tx, \sigma^2) $$

The PDF of Gaussian is given by:

$$ P(\hat{y} \vert x, W) = \frac{1}{\sqrt{2 \sigma^2 \pi}} \, \exp \left( \frac{(\hat{y} - W^Tx)^2}{2 \sigma^2} \right) $$

As we are doing maximization, we could ignore the normalizing constant of the likelihood. Hence:

$$ W_{MLE} = \mathop{\rm arg\,max}\limits_{W} \, \exp \left( \frac{(\hat{y} - W^Tx)^2}{2 \sigma^2} \right) $$

As always, it is easier to optimize the log likelihood:

$$ \begin{align}

W_{MLE} &= \mathop{\rm arg\,max}\limits_{W} \, \log \left[ \exp \left( \frac{(\hat{y} - W^Tx)^2}{2 \sigma^2} \right) \right] \\[10pt]
        &= \mathop{\rm arg\,max}\limits_{W} \frac{1}{2 \sigma^2}(\hat{y} - W^Tx)^2

\end{align} $$

For simplicity, let's say \\( \sigma^2 = 1 \\), then:

$$ \begin{align}

W_{MLE} &= \mathop{\rm arg\,max}\limits_{W} \frac{1}{2} (\hat{y} - W^Tx)^2 \\[10pt]
        &= \mathop{\rm arg\,max}\limits_{W} \frac{1}{2} \sum_i (\hat{y}_i - W_i x_i)^2 \\[10pt]
        &= \mathop{\rm arg\,max}\limits_{W} \frac{1}{2} \Vert \hat{y} - W^Tx \Vert^2_2

\end{align} $$

So we see, doing MLE on Gaussian likelihood is equal to Linear Regression!


<h2 class="section-header">Bayesian view of Linear Regression</h2>

But what if we want to go Bayesian, i.e. introduce a prior, and working with the posterior instead? Well, then we are doing MAP estimation! The posterior is likelihood times prior:

$$ P(W \vert \hat{y}, x) = P(\hat{y} \vert x, W) P(W \vert \mu_0, \sigma^2_0) $$

Since we have already known the likelihood, now we ask, what should be the prior? If we set it to be uniformly distributed, then we will be back to the MLE estimation, full detail [here]({% post_url 2017-01-01-mle-vs-map %}). So, for non-trivial example, let's use Gaussian prior for weight \\( W \\):

$$ P(W \vert \mu_0, \sigma^2_0) = N(0, \sigma^2_0) $$

Expanding the PDF, and again ignoring the normalizing constant and keeping in mind that \\( \mu_0 = 0 \\), we have:

$$ \begin{align}

P(W \vert \mu_0, \sigma^2_0) &= \frac{1}{\sqrt{2 \sigma^2_0 \pi}} \, \exp \left[ \frac{(W - \mu_0)^2}{2 \sigma^2_0} \right] \\[10pt]
                             &\propto \exp \left( \frac{W^2}{2 \sigma^2_0} \right)

\end{align} $$

Let's derive the posterior:

$$ \begin{align}

P(W \vert \hat{y}, x) &= P(\hat{y} \vert x, W) P(W \vert \mu_0, \sigma^2_0) \\[10pt]
                      &\propto \exp \left( \frac{(\hat{y} - W^Tx)^2}{2 \sigma^2} \right) \, \exp \left( \frac{W^2}{2 \sigma^2_0} \right)

\end{align} $$

And the log posterior is then:

$$ \begin{align}

\log P(W \vert \hat{y}, x) &\propto \frac{1}{2 \sigma^2}(\hat{y} - W^Tx)^2 + \frac{1}{2 \sigma^2_0} W^2 \\[10pt]
                           &= \frac{1}{2 \sigma^2} \Vert \hat{y} - W^Tx\Vert^2_2 + \frac{1}{2 \sigma^2_0} \Vert W \Vert^2_2

\end{align}$$

Seems familiar, right! Now if we assume that \\( \sigma^2 = 1 \\) and \\( \lambda = \frac{1}{\sigma^2_0} \\), then our log posterior becomes:

$$ \log P(W \vert \hat{y}, x) \propto \frac{1}{2} \Vert \hat{y} - W^Tx\Vert^2_2 + \frac{\lambda}{2} \Vert W \Vert^2_2 $$

That is, the log posterior of Gaussian likelihood and Gaussian prior is the same as the objective function for Ridge Regression! Hence, Gaussian prior is equal to \\( \ell_2 \\) regularization!


<h2 class="section-header">Full Bayesian Approach</h2>

Of course, above is not a full Bayesian, as we are doing a point estimation in the form of MAP. This is just a "shortcut", as we do not need to compute the full posterior distribution. For full Bayesian approach, we report the full posterior distribution. And in test time, we use the posterior to weight the new data, i.e. we marginalize the posterior predictive distribution:

$$ \begin{align}

P(y' \vert \hat{y}, x) &= \int_W P(y' \vert x', W) P(W \vert \hat{y}, x) \\[10pt]
                       &= \mathbb{E}_W \left[ P(y' \vert x', W) \right]

\end{align}$$

that is, given the likelihood of our new data point \\( (x', y') \\), we compute the likelihood, and weigh it with the posterior.

Intuitively, given all possible value for \\( W \\) in the posterior, we try those values one by one to predict the new data. The result is then averaged proportionality to the probability of those values, hence we are taking expectation.

And of course, that is the reason why we use a shortcut in the form of MAP. For illustration, if each component of \\( W \\) is binary, i.e. have two possible values, and there are \\( K \\) components in \\( W \\), we are talking about \\( 2^K \\) possible assignments for \\( W \\), which is exponential! In real world, each component of \\( W \\) is a real number, which makes the problem of enumerating all possible values of \\( W \\) intractable!

Of course we could use approximate method like Variational Bayes or MCMC, but they are still more costly than MAP. As MAP and MLE is guaranteed to find one of the modes (local maxima), it is good enough.

<h2 class="section-header">Conclusion</h2>

In this post we saw Linear Regression with several different point of view.

First, we looked at the definition of Linear Regression in plain Machine Learning PoV, then frequentist statistics, and finally Bayesian statistics.

We noted that the Bayesian version of the Linear Regression using MAP estimation is not a full Bayesian approach, since MAP is just a shortcut.

We then noted why full Bayesian approach is difficult and often intractable, even on this simple regression model.

<h2 class="section-header">References</h2>

1. Murphy, Kevin P. Machine learning: a probabilistic perspective. MIT press, 2012.
