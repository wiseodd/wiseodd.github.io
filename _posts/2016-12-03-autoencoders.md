---
layout:     post
title:      "Many flavors of Autoencoder"
subtitle:   "Autoencoder is a family of methods that answers the problem of data reconstruction using neural net. There are several variation of Autoencoder: sparse, multilayer, and convolutional. In this post, we will look at those different kind of Autoencoders and learn how to implement them with Keras."
date:       2016-12-03 12:20
author:     "wiseodd"
header-img: "img/code.png"
category:   techblog
tags:       [programming, python, neuralnet]
---

Consider a neural net. Usually we use it for classification and regression task, that is, given an input vector \\( X \\), we want to find \\( y \\). In other words, we want neural net to find a mapping \\( y = f(X) \\).

Now, what happens if we use the same data as codomain of the function? That is, we want to find a mapping \\( X = f(X) \\). Well, the neural net now will learn an identity mapping of \\( X \\). We probably would ask, how is that useful?

It turns out, the hidden layer(s) of neural net learns a very interesting respresentation of the data. Hence, we can use the hidden layer representation for many things, for example data compression, dimensionality reduction, and feature learning. This is exactly the last decade idea of Deep Learning: by stacking Autoencoders to learn the representation of data, and train it greedily, hopefully we can train deep net effectively.


<h2 class="section-heading">Vanilla Autoencoder</h2>

In its simplest form, Autoencoder is a two layer net, i.e. a neural net with one hidden layer. The input and output are the same, and we learn how to reconstruct the input, for example using the \\( \ell_{2} \\) norm.

{% highlight python %}
from tensorflow.examples.tutorials.mnist import input_data
from keras.layers import Input, Dense, Conv2D, MaxPooling2D, UpSampling2D, Flatten, Reshape
from keras.models import Model
from keras.optimizers import Adam
from keras.regularizers import activity_l1

import numpy as np
import matplotlib.pyplot as plt
import keras.backend as K
import tensorflow as tf


mnist = input_data.read_data_sets('../data/MNIST_data', one_hot=True)
X, _ = mnist.train.images, mnist.train.labels

inputs = Input(shape=(784,))
h = Dense(64, activation='sigmoid')(inputs)
outputs = Dense(784)(h)

model = Model(input=inputs, output=outputs)
model.compile(optimizer='adam', loss='mse')
model.fit(X, X, batch_size=64, nb_epoch=5)
{% endhighlight %}

One question that might surface is if we are essentially learning an identity mapping, why do we even bother using a fancy algorithm? Isn't identity mapping trivial? Well, we are trying to learn identity mapping with some constraints, hence it's non trivial. The constraints might arise because of the architectural decision of the neural net.

Consider this. In our implementation above, we use a hidden layer with dimension of 64. The data we are going to learn is a vector with dimension of 784. Hence, we can see that we are imposing a constraint in our neural net such that we learn a compressed representation of data.


<h2 class="section-heading">Sparse Autoencoder</h2>

Another way we can constraint the reconstruction of Autoencoder is to impose a constraint in its loss. We could, for example, add a reguralization term in the loss function. Doing this will make our Autoencoder to learn sparse representation of data.

{% highlight python %}
inputs = Input(shape=(784,))
h = Dense(64, activation='sigmoid', activity_regularizer=activity_l1(1e-5))(inputs)
outputs = Dense(784)(h)

model = Model(input=inputs, output=outputs)
model.compile(optimizer='adam', loss='mse')
model.fit(X, X, batch_size=64, nb_epoch=5)
{% endhighlight %}

Notice in our hidden layer, we added an \\( \ell_{1} \\) penalty. As a result, the representation is now sparser compared to the vanilla Autoencoder. We could see that by looking at the statistics of the hidden layer. The mean value of vanilla Autoencoder is 0.512477, whereas Sparse Autoencoder 0.148664.


<h2 class="section-heading">Multilayer Autoencoder</h2>

One natural thought that might arise is to extend the Autoencoder beyond just single layer.

{% highlight python %}
inputs = Input(shape=(784,))
h = Dense(128, activation='relu')(inputs)
encoded = Dense(64, activation='relu', activity_regularizer=activity_l1(1e-5))(h)
h = Dense(128, activation='relu')(encoded)
outputs = Dense(784)(h)

model = Model(input=inputs, output=outputs)
model.compile(optimizer='adam', loss='mse')
model.fit(X, X, batch_size=64, nb_epoch=5)
{% endhighlight %}

Now our implementation uses 3 hidden layers instead of just one. We could pick any layer as the feature representation, but for simplicity sake, let's make it simmetrical and use the middle-most layer.


<h2 class="section-heading">Convolutional Autoencoder</h2>

We then naturally extend our thinking: can we use convnet instead of FCN?

{% highlight python %}
inputs = Input(shape=(28, 28, 1))
h = Conv2D(4, 3, 3, activation='relu', border_mode='same')(inputs)
encoded = MaxPooling2D((2, 2))(h)
h = Conv2D(4, 3, 3, activation='relu', border_mode='same')(encoded)
h = UpSampling2D((2, 2))(h)
outputs = Conv2D(1, 3, 3, activation='relu', border_mode='same')(h)

model = Model(input=inputs, output=outputs)
model.compile(optimizer='adam', loss='mse')
model.fit(X, X, batch_size=64, nb_epoch=5)
{% endhighlight %}

Above we could see that instead of using fully connected layer, we use convolution and pooling layers as seen in convnet.


<h2 class="section-heading">Conclusion</h2>

In this post we looked at many different types of Autoencoder: vanilla, sparse, multilayer, convolutional. Each has different intriguing property that comes from the imposed constraints, be it from the architectural choice or additional penalty term in the loss function.

The learned representation of Autoencoder can be used for dimensionality reduction or compression, and can be used as a features for another task. The way it is being used is analogous of using things like PCA to transform the features. It has been shown empirically that using learned features of Autoencoder, one can get significant boost in classification performance [3].

<h2 class="section-heading">References</h2>

1. <https://en.wikipedia.org/wiki/Autoencoder>
2. <https://blog.keras.io/building-autoencoders-in-keras.html>
3. Rifai, Salah, et al. "Contractive auto-encoders: Explicit invariance during feature extraction." Proceedings of the 28th international conference on machine learning (ICML-11). 2011.
