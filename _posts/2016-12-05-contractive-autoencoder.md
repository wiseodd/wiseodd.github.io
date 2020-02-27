---
layout:     post
title:      "Deriving Contractive Autoencoder and Implementing it in Keras"
subtitle:   "Contractive Autoencoder is more sophisticated kind of Autoencoder compared to the last post. Here, we will dissect the loss function of Contractive Autoencoder and derive it so that we could implement it in Keras."
date:       2016-12-05 12:55
author:     "wiseodd"
header-img: "img/code.png"
category:   techblog
tags:       [programming, python, neuralnet]
---

In the last post, we have seen many different flavors of a family of methods called Autoencoders. However, there is one more autoencoding method on top of them, dubbed Contractive Autoencoder (Rifai et al., 2011).

The idea of Contractive Autoencoder is to make the learned representation to be robust towards small changes around the training examples. It achieves that by using different penalty term imposed to the representation.

The loss function for the reconstruction term is similar to previous Autoencoders that we have been seen, i.e. using \\( \ell_2 \\) loss. The penalty term, however is more complicated: we need to calculate the representation's jacobian matrix with regards of the training data.

Hence, the loss function is as follows:

$$ L = \lVert X - \hat{X} \rVert_2^2  + \lambda \lVert J_h(X) \rVert_F^2 $$

in which

$$ \lVert J_h(X) \rVert_F^2 = \sum_{ij} \left( \frac{\partial h_j(X)}{\partial X_i} \right)^2 $$

that is, the penalty term is the Frobenius norm of the jacobian matrix, which is the sum squared over all elements inside the matrix. We could think Frobenius norm as the generalization of euclidean norm.

In the loss above, clearly it's the calculation of the jacobian that's not straightforward. Calculating a jacobian of the hidden layer with respect to input is similar to gradient calculation. Recall than jacobian is the generalization of gradient, i.e. when a function is a vector valued function, the partial derivative is a matrix called jacobian.

Let's calculate the jacobian of the hidden layer of our autoencoder then. Let's say:

$$ \begin{align}

Z_j &= W_i X_i \\[10pt]
h_j &= \phi(Z_j)

\end{align} $$

where \\( \phi \\) is sigmoid nonlinearity. That is, to get the \\( j\text{-th} \\) hidden unit, we need to get the dot product of the \\( i\text{-th} \\) feature and the corresponding weight. Then using chain rule:

$$ \begin{align}

\frac{\partial h_j}{\partial X_i} &= \frac{\partial \phi(Z_j)}{\partial X_i} \\[10pt]
                                 &= \frac{\partial \phi(W_i X_i)}{\partial W_i X_i} \frac{\partial W_i X_i}{\partial X_i} \\[10pt]
                                 &= [\phi(W_i X_i)(1 - \phi(W_i X_i))] \, W_{i} \\[10pt]
                                 &= [h_j(1 - h_j)] \, W_i

\end{align} $$

It looks familiar, doesn't it? Because it's exactly how we calculate gradient. The difference is however, that we treat \\( h(X) \\) as a vector valued function. That is, we treat \\( h_{i}(X) \\) each as a separate output. Intuitively, let's say for example we have 64 hidden units, then we have 64 function outputs, and so we will have a gradient vector for each of those 64 hidden unit. Hence, when we get the derivative of that hidden layer, what we get instead is a jacobian matrix. And as we now know how to calculate the jacobian, we can calculate the penalty term in our loss.

Let \\( diag(x) \\) be a diagonal matrix, the matrix form of the above derivative is as follows:

$$ \frac{\partial h}{\partial X} = diag[h(1 - h)] \, W^T $$

We need to form a diagonal matrix of the gradient of \\( h \\) because if we look carefully at the original equation, the first term doesn't depend on \\( i \\). Hence, for all values of \\( W_i \\), we want to multiply it with the correspondent \\( h_j \\). And the nice way to do that is to use diagonal matrix.

As our main objective is to calculate the norm, we could simplify that in our implementation so that we don't need to construct the diagonal matrix:

$$ \begin{align}

\lVert J_h(X) \rVert_F^2 &= \sum_{ij} \left( \frac{\partial h_j}{\partial X_i} \right)^2 \\[10pt]
                         &= \sum_i \sum_j [h_j(1 - h_j)]^2 (W_{ji}^T)^2 \\[10pt]
                         &= \sum_j [h_j(1 - h_j)]^2 \sum_i (W_{ji}^T)^2 \\[10pt]

\end{align} $$

Translated to code:

{% highlight python %}
import numpy as np


# Let's say we have minibatch of 32, and 64 hidden units
# Our input is 786 elements vector
X = np.random.randn(32, 786)
W = np.random.randn(786, 64)

Z = np.dot(W, X)
h = sigmoid(Z)  # 32x64

Wj_sqr = np.sum(W.T**2, axis=1)  # Marginalize i (note the transpose), 64x1
dhj_sqr = (h * (1 - h))**2  # Derivative of h, 32x64
J_norm = np.sum(dhj_sqr * Wj_sqr, axis=1) # 32x1, i.e. 1 jacobian norm for each data point
{% endhighlight %}

Putting all of those together, we have our full Contractive Autoencoder implemented in Keras:

{% highlight python %}
from keras.layers import Input, Dense
from keras.models import Model
import keras.backend as K


lam = 1e-4

inputs = Input(shape=(N,))
encoded = Dense(N_hidden, activation='sigmoid', name='encoded')(inputs)
outputs = Dense(N, activation='linear')(encoded)

model = Model(input=inputs, output=outputs)

def contractive_loss(y_pred, y_true):
    mse = K.mean(K.square(y_true - y_pred), axis=1)

    W = K.variable(value=model.get_layer('encoded').get_weights()[0])  # N x N_hidden
    W = K.transpose(W)  # N_hidden x N
    h = model.get_layer('encoded').output
    dh = h * (1 - h)  # N_batch x N_hidden

    # N_batch x N_hidden * N_hidden x 1 = N_batch x 1
    contractive = lam * K.sum(dh**2 * K.sum(W**2, axis=1), axis=1)

    return mse + contractive

model.compile(optimizer='adam', loss=contractive_loss)
model.fit(X, X, batch_size=N_batch, nb_epoch=5)
{% endhighlight %}

And that is it! The full code could be found in my Github repository: <https://github.com/wiseodd/hipsternet>.

<h2 class="section-heading">References</h2>

1. Rifai, Salah, et al. "Contractive auto-encoders: Explicit invariance during feature extraction." Proceedings of the 28th international conference on machine learning (ICML-11). 2011.
