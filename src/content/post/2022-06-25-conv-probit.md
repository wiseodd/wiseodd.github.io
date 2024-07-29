---
title: "Convolution of Gaussians and the Probit Integral"
description: "Gaussian distributions are very useful in Bayesian inference due to their (many!) convenient properties. In this post we take a look at two of them: the convolution of two Gaussian pdfs and the integral of the probit function w.r.t. a Gaussian measure."
publishDate: 2022-06-25 00:00
---

Gaussian distributions are very useful in Bayesian inference due to their (many!) convenient properties.
In this post we take a look at two of them: the convolution of two Gaussian pdfs and the integral of the probit function w.r.t. a Gaussian measure.

## Convolution and the Predictive Distribution of Gaussian Regression

Let's start with the **_convolution_** $\N(z_1 \mid \mu_1, \sigma^2_1) * \N(z_2 \mid \mu_2, \sigma^2_2)$ of two Gaussians $\N(z_1 \mid \mu_1, \sigma^2_1)$ and $\N(z_2 \mid \mu_2, \sigma^2_2)$ on $\R$:

$$
  \N(z_1 \mid \mu_1, \sigma^2_1) * \N(z_2 \mid \mu_2, \sigma^2_2) := \int_{\R} \N(z_1 - z_2 \mid \mu_1, \sigma^2_1) \, \N(z_2 \mid \mu_2, \sigma^2_2) \,dz_2 .
$$

**Proposition 1 (Convolution of Gaussians)** _Let $\N(z_1 \mid \mu_1, \sigma^2_1)$ and $\N(z_2 \mid \mu_2, \sigma^2_2)$ be two Gaussians on $\R$._

$$
  \N(z_1 \mid \mu_1, \sigma^2_1) * \N(z_2 \mid \mu_2, \sigma^2_2) = \N(z_1 \mid \mu_1+\mu_2, \sigma^2_1+\sigma^2_2) .
$$

_Proof._
By the [convolution theorem](https://en.wikipedia.org/wiki/Convolution_theorem), the convolution of two functions is equivalent to the product of the functions' Fourier transforms.
The Fourier transform of a density function is given by its [characteristic function](https://en.wikipedia.org/wiki/Normal_distribution#Fourier_transform_and_characteristic_function).
For a Gaussian $f(x) := \N(x, \mu, \sigma^2)$, it is $\varphi(u) := \exp\left(-iu\mu - \frac{1}{2}u^2\sigma^2\right)$.
Therefore, if $\varphi_1$ and $\varphi_2$ are the characteristic functions of $\N(z_1 \mid \mu_1, \sigma^2_1)$ and $\N(z_2 \mid \mu_2, \sigma^2_2)$, respectively, then

$$
\begin{align}
  (\varphi_1 \varphi_2)(u) &= \exp\left(-iu\mu_1 - \frac{1}{2}u^2\sigma_1^2\right) \exp\left(-iu\mu_2 - \frac{1}{2}u^2\sigma_2^2\right) \\[5pt]
    %
    &=  \exp\left(-iu(\mu_1+\mu_2) - \frac{1}{2}u^2(\sigma_1^2 + \sigma_2^2)\right) ,
\end{align}
$$

which we can immediately identify as the characteristic function of a Gaussian with mean $\mu_1 + \mu_2$ and variance $\sigma_1^2 + \sigma_2^2$.

$$
\qed
$$

This result is very useful in Bayesian machine learning, especially to obtain the predictive distribution of a Bayesian regression model.
For instance, when one knows that the distribution over the regressor's output is a Gaussian $\N(f \mid \mu, \sigma^2)$ and we assume that the output is noisy $\N(y \mid f, s^2)$.

**Corollary 2 (Gaussian Regression).** _Let $p(y \mid f) = \N(y \mid f, s^2)$ and $p(f) = \N(f \mid \mu, \sigma^2)$ are Gaussians on $\R$. Then,_

$$
  p(y) = \int_\R p(y \mid f) \, p(f) \,df = \N(y \mid f, \sigma^2 + s^2) .
$$

_Proof._
First, notice that Gaussian is symmetric:

$$
\begin{align}
  \N(x - a \mid \mu, \sigma^2) &= \frac{1}{Z} \exp\left(-\frac{1}{2\sigma^2} ((x-a)-\mu)^2\right) \\[5pt]
    %
    &=  \frac{1}{Z} \exp\left(-\frac{1}{2\sigma^2} (x-(\mu+a))^2\right) \\[5pt]
    %
    &= \N(x \mid \mu + a, \sigma^2) ,
\end{align}
$$

for $x, a \in \R$, where $Z$ is the normalizing constant.
Using this, we can write the integral above as a convolution:

$$
\begin{align}
  \int_\R \N(y \mid f, s^2) \, \N(f \mid \mu, \sigma^2) \,df &= \int_\R \N(y \mid 0+f, s^2) \, \N(f \mid \mu, \sigma^2) \,df \\[5pt]
    %
    &= \N(y \mid 0, s^2) * \N(f \mid \mu, \sigma^2) .
\end{align}
$$

Thus, by Proposition 1, we have $p(y) = \N(y \mid f, s^2 + \sigma^2)$.

$$
\qed
$$

## The Probit Integral and the Probit Approximation

**_The probit function_** $\Phi$ is the cumulative distribution function of the standard Normal distribution $\N(x \mid 0, 1)$ on $\R$, i.e., $\Phi(z) := \int_{-\infty}^z \N(x \mid 0, 1) \,dx$.
It can conveniently be written in terms of the **_error function_**

$$
  \mathrm{erf}(z) := \frac{2}{\sqrt{\pi}} \int_0^z \exp(-x^2) \,dx
$$

by

$$
  \Phi(z) = \frac{1}{2} \left( 1 + \mathrm{erf}\left(\frac{z}{\sqrt{2}}\right) \right) .
$$

**Proposition 3 (The Probit Integral).** _If $\N(x \mid \mu, \sigma^2)$ be a Gaussian on $\R$ and $a, b \in \R$ then_

$$
  \int_{\R} \Phi(ax + b) \, \N(x \mid \mu, \sigma^2) \,dx = \Phi\left(\frac{a\mu + b}{\sqrt{1 + a^2 \sigma^2}}\right).
$$

_Proof._
The standard property of the error function [2] says that

$$
  \int_{\R} \mathrm{erf}(ax + b) \, \N(x \mid \mu, \sigma^2) \, dx = \mathrm{erf}\left(\frac{a\mu+b}{\sqrt{1 + 2 a^2 \sigma^2}}\right) .
$$

So,

$$
\begin{align}
  \int_{\R} &\left(\frac{1}{2} + \frac{1}{2} \mathrm{erf}\left(\frac{ax+b}{\sqrt{2}}\right)\right) \, \N(x \mid \mu, \sigma^2) \,dx \\[5pt]
    %
    &= \frac{1}{2} + \frac{1}{2} \int_{\R} \mathrm{erf}\left(\left(\frac{a}{\sqrt{2}}\right)x+\left(\frac{b}{\sqrt{2}}\right)\right) \, \N(x \mid \mu, \sigma^2) \,dx \\[5pt]
    %
    &= \frac{1}{2} + \frac{1}{2} \mathrm{erf}\left(\frac{(a\mu+b)/\sqrt{2}}{\sqrt{1 + \cancel{2} (a/\cancel{\sqrt{2}})^2 \sigma^2}}\right) \\[5pt]
    %
    &= \frac{1}{2} \left(1 + \mathrm{erf}\left(\frac{a\mu+b}{\sqrt{2} \sqrt{1 + a^2 \sigma^2}}\right) \right) \\[5pt]
    %
    &= \Phi\left(\frac{a\mu+b}{\sqrt{1 + a^2 \sigma^2}}\right) .
\end{align}
$$

$$
\qed
$$

This integral is very useful for Bayesian inference since it enables us to approximate the following integral that is ubiquitous in Bayesian binary classifications

$$
  \int_{\R} \sigma(z) \, \N(z \mid m, s^2) \,dx ,
$$

where $\sigma(z) := 1/(1 + \exp(-z))$ is the **_logistic function_**.

The key idea is to notice that the probit and logistic function are both _sigmoid_ functions.
That is, their graphs have a similar "S-shape".
Moreover, their images are both $[0, 1]$.
However, they are a bit different---the probit function is more "horizontally stretched" compared to the logistic function.

So, the strategy to approximate the integral above is as follows: (i) horizontally "contract" the probit function and then (ii) use Proposition 3 to get an analytic approximation to the integral.

For the first step, this can be done by a simple change of coordinate: stretch the domain of the probit function with a constant $\lambda$, i.e., $z \mapsto \lambda z$.
There are several "good" values for $\lambda$, but commonly it is chosen to be $\lambda = \sqrt{\pi/8}$, which makes the probit function have the same derivative as the logistic function at zero.
That is, we have the approximation $\sigma(z) \approx \Phi(\lambda z) = \Phi(\sqrt{\pi/8} \, z)$.

**Corollary 4.** _If $\N(z \mid m, s^2)$ is a Gaussian on $\R$, then_

$$
  \int_{\R} \Phi(\lambda z) \, \N(z \mid m, s^2) \, dz = \Phi\left( \frac{m}{\sqrt{\lambda^{-2} + s^2}} \right) .
$$

_Proof._
By Proposition 3, we have

$$
\begin{align}
  \int_{\R} \Phi(\lambda \, z) \, \N(z \mid m, s^2) \, dz &= \Phi\left( \frac{\lambda \mu}{\sqrt{1 + \lambda^2 s^2}} \right) \\[5pt]
    %
    &= \Phi\left( \frac{\cancel{\lambda} \mu}{\cancel{\lambda} \sqrt{\lambda^{-2} + s^2}} \right) .
\end{align}
$$

$$
\qed
$$

Now we are ready to obtain the final approximation, often called the **_probit approximation_**.

**Proposition 5 (Probit Approximation)** _If $\N(z \mid m, s^2)$ is a Gaussian on $\R$ and $\sigma(z) \approx \Phi\left(\sqrt{\pi/8} \, z\right)$, then_

$$
  \int_{\R} \sigma(z) \, \N(z \mid m, s^2) \, dz \approx \sigma\left( \frac{m}{\sqrt{1 + \pi/8 \, s^2}} \right) .
$$

_Proof._
Let $\lambda = \sqrt{\pi/8}$.
Using Corollary 4 and substituting $\Phi(z) \approx \sigma\left(\lambda^{-1} \, z\right)$:

$$
\begin{align}
  \int_{\R} \sigma(z) \, \N(z \mid m, s^2) \,dz &\approx \Phi\left( \frac{m}{\sqrt{\lambda^{-2} + s^2}} \right) \\[5pt]
    %
    &= \sigma\left( \frac{\lambda^{-1} \, m}{\sqrt{\lambda^{-2} + s^2}} \right) \\[5pt]
    %
    &= \sigma\left( \frac{\cancel{\lambda^{-1}} \, m}{\cancel{\lambda^{-1}} \, \sqrt{1 + \lambda^2 \, s^2}} \right) .
\end{align}
$$

Substituting $\lambda^2 = \pi/8$ into the last equation yields the desired result.

$$
\qed
$$

The probit approximation can also be used to obtain an approximation to the following integral, ubiquitous in multi-class classifications:

$$
  \int_{\R^k} \mathrm{softmax}(z) \, \N(z \mid \mu, \varSigma) \, dz ,
$$

where the Gaussian is defined on $\R^k$ and the softmax function is identified by its components $\exp(z_i)/\sum_{j=1}^k \exp(z_j)$ for $i = 1, \dots, k$.

**Proposition 6 (Multiclass Probit Approximation; Gibbs, 1998).** _If $\N(z \mid \mu, \varSigma)$ is a Gaussian on $\R^k$ and $\sigma(z) \approx \Phi(\sqrt{\pi/8}\,z)$, then_

$$
  \int_{\R^k} \mathrm{softmax}(z) \, \N(z \mid \mu, \varSigma) \, dz \approx \mathrm{softmax}\left( \frac{\mu}{\sqrt{1 + \pi/8 \, \diag \varSigma}} \right) ,
$$

_where the division in the r.h.s. is component-wise._

_Proof._
The proof is based on [3].
Notice that we can write the $i$-th component of $\mathrm{softmax}(z)$ as $1/(1 + \sum_{j \neq i} \exp(-(z_i - z_j)))$.
So, for each $i = 1, \dots, k$, using $z_{ij} := z_i - z_j$, we can write

$$
\begin{align}
  \frac{1}{1 + \sum_{j \neq i} \exp(-z_{ij})} &= \frac{1}{1 - (K-1) + \sum_{j \neq i} \frac{1}{\frac{1}{1 + \exp(-z_{ij})}}} \\[5pt]
    %
    &= \frac{1}{2-K+\sum_{j \neq i} \frac{1}{\sigma(z_{ij})}} .
\end{align}
$$

Then, we use the following approximations (which admittedly might be quite loose):

1. $\E(f(x)) \approx f(\E(x))$,
2. the mean-field approximation $\N(z \mid \mu, \varSigma) \approx \N(z \mid \mu, \diag{\varSigma})$, and thus we have $z_i - z_j \sim \N(z_{ij} \mid \mu_i - \mu_j, \varSigma_{ii} + \varSigma_{jj})$, and
3. using the probit approximation (Proposition 5), with a further approximation

$$
\begin{align}
  \int_{\R} \sigma(z_{ij}) \, \N(z_{ij} \mid \mu_i - \mu_j, \varSigma_{ii} + \varSigma_{jj}) \, dz_{ij} &\approx \sigma \left( \frac{\mu_i - \mu_j}{\sqrt{1 + \pi/8 \, \varSigma_{ii} + \varSigma_{jj}}} \right) \\[5pt]
    %
    &\approx \sigma \left( \frac{\mu_i}{\sqrt{1 + \pi/8 \, \varSigma_{ii}}} - \frac{\mu_j}{\sqrt{1 + \pi/8 \, \varSigma_{jj}}} \right) ,
\end{align}
$$

we obtain

$$
\begin{align}
  \int_{\R^k} \mathrm{softmax}_i(z) \, \N(z \mid \mu, \varSigma) &\approx \frac{1}{2-K+\sum_{j \neq i} \frac{1}{\E \sigma(z_{ij})}} \\[5pt]
    %
    &\approx \frac{1}{2-K+\sum_{j \neq i} \frac{1}{\sigma \left( \frac{\mu_i}{\sqrt{1 + \pi/8 \, \varSigma_{ii}}} - \frac{\mu_j}{\sqrt{1 + \pi/8 \, \varSigma_{jj}}} \right)}} \\[5pt]
    %
    &= \frac{1}{1 + \sum_{j \neq i} \exp\left( -\left(\frac{\mu_i}{\sqrt{1 + \pi/8 \, \varSigma_{ii}}} - \frac{\mu_j}{\sqrt{1 + \pi/8 \, \varSigma_{jj}}} \right)\right)} \\[5pt]
    %
    &= \frac{\exp\left(\mu_i/\sqrt{1 + \pi/8 \, \varSigma_{ii}}\right)}{\sum_{j=1}^k \exp\left(\mu_j/\sqrt{1 + \pi/8 \, \varSigma_{jj}}\right)}
\end{align}
$$

We identify the last equation above as the $i$-th component of $\mathrm{softmax}\left( \frac{\mu}{\sqrt{1 + \pi/8 \, \diag \varSigma}} \right)$.
$$
\qed
$$

## References

1. Ng, Edward W., and Murray Geller. "A table of integrals of the error functions." _Journal of Research of the National Bureau of Standards B 73_, no. 1 (1969): 1-20.
2. Gibbs, Mark N. _Bayesian Gaussian processes for regression and classification_. Dissertation, University of Cambridge, 1998.
3. Lu, Zhiyun, Eugene Ie, and Fei Sha. "Mean-Field Approximation to Gaussian-Softmax Integral with Application to Uncertainty Estimation." _arXiv preprint arXiv:2006.07584_ (2020).
