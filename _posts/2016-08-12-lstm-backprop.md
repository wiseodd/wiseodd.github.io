---
layout:     post
title:      "Deriving LSTM Gradient for Backpropagation"
subtitle:   "Deriving neuralnet gradient is an absolutely great exercise to understand backpropagation and computational graph better. In this post we will walk through the process of deriving LSTM net gradient so that we can use it in backpropagation."
date:       2016-08-12 12:34
author:     "wiseodd"
header-img: "img/code.png"
category:   techblog
tags:       [machine learning, programming, python, neural networks, rnn, lstm]
---

Recurrent Neural Network (RNN) is hot in these past years, especially with the boom of Deep Learning. Just like any deep neural network, RNN can be seen as a (very) deep neural network if we "unroll" the network with respect of the time step. Hence, with all the things that enable vanilla deep network, training RNN become more and more feasible too.

The most popular model for RNN right now is the LSTM (Long Short-Term Memory) network. For the background theory, there are a lot of amazing resources available in [Andrej Karpathy's blog]() and [Chris Olah's blog](http://colah.github.io/posts/2015-08-Understanding-LSTMs/).

Using modern Deep Learning libraries like TensorFlow, Torch, or Theano nowadays, building an LSTM model would be a breeze as we don't need to analytically derive the backpropagation step. However to understand the model better, it's absolutely a good thing, albeit optional, to try to derive the LSTM net gradient and implement the backpropagation "manually".

So, here, we will try to first implement the forward computation step according to the LSTM net formula, then we will try to derive the network gradient analytically. Finally, we will implement it using numpy.

<h2 class="section-header">LSTM Forward</h2>

We will follow this model for a single LSTM cell:

![LSTM formula]({{ site.baseurl }}/img/2016-08-12-lstm-backprop/formula.png)

Let's implement it!

``` python
import numpy as np


H = 128 # Number of LSTM layer's neurons
D = ... # Number of input dimension == number of items in vocabulary
Z = H + D # Because we will concatenate LSTM state with the input

model = dict(
    Wf=np.random.randn(Z, H) / np.sqrt(Z / 2.),
    Wi=np.random.randn(Z, H) / np.sqrt(Z / 2.),
    Wc=np.random.randn(Z, H) / np.sqrt(Z / 2.),
    Wo=np.random.randn(Z, H) / np.sqrt(Z / 2.),
    Wy=np.random.randn(H, D) / np.sqrt(D / 2.),
    bf=np.zeros((1, H)),
    bi=np.zeros((1, H)),
    bc=np.zeros((1, H)),
    bo=np.zeros((1, H)),
    by=np.zeros((1, D))
)
```

Above, we're declaring our LSTM net model. Notice that from the formula above, we're concatenating the old hidden state `h` with current input `x`, hence the input for our LSTM net would be `Z = H + D`. And because our LSTM layer wants to output `H` neurons, each weight matrices' size would be `ZxH` and each bias vectors' size would be `1xH`.

One difference is for `Wy` and `by`. This weight and bias would be used for fully connected layer, which would be fed to a softmax layer. The resulting output should be a probability distribution over all possible items in vocabulary, which would be the size of `1xD`. Hence, `Wy`'s size must be `HxD` and `by`'s size must be `1xD`.

``` python
def lstm_forward(X, state):
    m = model
    Wf, Wi, Wc, Wo, Wy = m['Wf'], m['Wi'], m['Wc'], m['Wo'], m['Wy']
    bf, bi, bc, bo, by = m['bf'], m['bi'], m['bc'], m['bo'], m['by']

    h_old, c_old = state

    # One-hot encode
    X_one_hot = np.zeros(D)
    X_one_hot[X] = 1.
    X_one_hot = X_one_hot.reshape(1, -1)

    # Concatenate old state with current input
    X = np.column_stack((h_old, X_one_hot))

    hf = sigmoid(X @ Wf + bf)
    hi = sigmoid(X @ Wi + bi)
    ho = sigmoid(X @ Wo + bo)
    hc = tanh(X @ Wc + bc)

    c = hf * c_old + hi * hc
    h = ho * tanh(c)

    y = h @ Wy + by
    prob = softmax(y)

    cache = ... # Add all intermediate variables to this cache

    return prob, cache
```

The above code is for the forward step for a single LSTM cell, which identically follows the formula above. The only additions are the one-hot encoding and the hidden-input concatenation process.

<h2 class="section-header">LSTM Backward</h2>

Now, we will dive into the main point of this post: LSTM backward computation. We will assume that derivative function for `sigmoid` and `tanh` are already known.

``` python
def lstm_backward(prob, y_train, d_next, cache):
    # Unpack the cache variable to get the intermediate variables used in forward step
    ... = cache
    dh_next, dc_next = d_next

    # Softmax loss gradient
    dy = prob.copy()
    dy[1, y_train] -= 1.

    # Hidden to output gradient
    dWy = h.T @ dy
    dby = dy
    # Note we're adding dh_next here
    dh = dy @ Wy.T + dh_next

    # Gradient for ho in h = ho * tanh(c)
    dho = tanh(c) * dh
    dho = dsigmoid(ho) * dho

    # Gradient for c in h = ho * tanh(c), note we're adding dc_next here
    dc = ho * dh + dc_next
    dc = dtanh(c) * dc

    # Gradient for hf in c = hf * c_old + hi * hc
    dhf = c_old * dc
    dhf = dsigmoid(hf) * dhf

    # Gradient for hi in c = hf * c_old + hi * hc
    dhi = hc * dc
    dhi = dsigmoid(hi) * dhi

    # Gradient for hc in c = hf * c_old + hi * hc
    dhc = hi * dc
    dhc = dtanh(hc) * dhc

    # Gate gradients, just a normal fully connected layer gradient
    dWf = X.T @ dhf
    dbf = dhf
    dXf = dhf @ Wf.T

    dWi = X.T @ dhi
    dbi = dhi
    dXi = dhi @ Wi.T

    dWo = X.T @ dho
    dbo = dho
    dXo = dho @ Wo.T

    dWc = X.T @ dhc
    dbc = dhc
    dXc = dhc @ Wc.T

    # As X was used in multiple gates, the gradient must be accumulated here
    dX = dXo + dXc + dXi + dXf
    # Split the concatenated X, so that we get our gradient of h_old
    dh_next = dX[:, :H]
    # Gradient for c_old in c = hf * c_old + hi * hc
    dc_next = hf * dc

    grad = dict(Wf=dWf, Wi=dWi, Wc=dWc, Wo=dWo, Wy=dWy, bf=dbf, bi=dbi, bc=dbc, bo=dbo, by=dby)
    state = (dh_next, dc_next)

    return grad, state
```

A bit long isn't it? However, actually it's easy enough to derive the LSTM gradients if you understand how to take a partial derivative of a function and how to do chain rule, albeit some tricky stuffs are going on here. For this, I would recommend [CS231n](http://cs231n.github.io/optimization-2/).

Things that are tricky and not-so-obvious when deriving the LSTM gradients are:

1. Adding `dh_next` to `dh`, because `h` is branched in forward propagation: it was used in `y = h @ Wy + by` and the next time step, concatenated with `x`. Hence the gradient is split and has to be added here.
2. Adding `dc_next` to `dc`. Identical reason with above.
3. Adding `dX = dXo + dXc + dXi + dXf`. Similar reason with above: X is used in many places so the gradient is split and need to be accumulated back.
4. Getting `dh_next` which is the gradient of `h_old`. As `X = [h_old, x]`, then `dh_next` is just a reverse concatenation: split operation on `dX`.

With the forward and backward computation implementations in hands, we could stitch them together to get a full training step that would be useful for optimization algorithms.

<h2 class="section-header">LSTM Training Step</h2>

This training step consists of three steps: forward computation, loss calculation, and backward computation.

``` python
def train_step(X_train, y_train, state):
    probs = []
    caches = []
    loss = 0.
    h, c = state

    # Forward Step

    for x, y_true in zip(X_train, y_train):
        prob, state, cache = lstm_forward(x, state, train=True)
        loss += cross_entropy(prob, y_true)

        # Store forward step result to be used in backward step
        probs.append(prob)
        caches.append(cache)

    # The loss is the average cross entropy
    loss /= X_train.shape[0]

    # Backward Step

    # Gradient for dh_next and dc_next is zero for the last timestep
    d_next = (np.zeros_like(h), np.zeros_like(c))
    grads = {k: np.zeros_like(v) for k, v in model.items()}

    # Go backward from the last timestep to the first
    for prob, y_true, cache in reversed(list(zip(probs, y_train, caches))):
        grad, d_next = lstm_backward(prob, y_true, d_next, cache)

        # Accumulate gradients from all timesteps
        for k in grads.keys():
            grads[k] += grad[k]

    return grads, loss, state
```

In the full training step, first we're do full forward propagation on all items in training set, then store the results which are the softmax probabilities and cache of each timestep into a list, because we are going to use it in backward step.

Next, at each timestep, we can calculate the cross entropy loss (because we're using softmax). We then accumulate all of those loss in every timestep, then average them.

Lastly, we do backpropagation based on the forward step results. Notice while we're iterating the data forward in forward step, we're going the reverse direction here.

Also notice that `dh_next` and `dc_next` for the first timestep in backward step is zero. Why? This is because at the last timestep in forward propagation, `h` and `c` won't be used in the next timestep, as there are no more timestep! So, the gradient of `h` and `c` in the last timestep are not split and could be derived directly without `dh_next` and `dc_next`.

With this function in hands, we could plug this to any optimization algorithm like RMSProp, Adam, etc with some modification. Namely, we have to take account on the state of the network. So, the state for the current timestep need to be passed to the next timestep.

And, that's it. We can train our LSTM net now!

<h2 class="section-header">Test Result</h2>

Using Adam to optimize the network, here's the result when I feed a copy-pasted text about Japan from Wikipedia. Each data is a character in the text. The target is the next character.

After each 100 iterations, the network are sampled.

It works like this:

1. Do forward propagation and get the softmax distribution
2. Sample the distribution
3. Feed the sampled character as the input of next time step
4. Repeat

And here's the snippet of the results:

```
=========================================================================
Iter-100 loss: 4.2125
=========================================================================
best c ehpnpgteHihcpf,M tt" ao tpo Teoe ep S4 Tt5.8"i neai   neyoserpiila o  rha aapkhMpl rlp pclf5i
=========================================================================

...

=========================================================================
Iter-52800 loss: 0.1233
=========================================================================
tary shoguns who ruled in the name of the Uprea wal motrko, the copulation of Japan is a sour the wa
=========================================================================
```

Our network definitely learned something here!

<h2 class="section-header">Conclusion</h2>

Here, we looked at the general formula for LSTM and implement the forward propagation step based on it, which is very straightforward to do.

Then, we derived the backward computation step. This step was also straightforward, but there were some tricky stuffs that we had to ponder about, especially the recurrency step in `h` and `c`.

We then stitched the forward and backward step together to build the full training step that can be used with any optimization algorithm.

Lastly, we tried to run the network using some test data and showed that the network was learning by looking at the loss value and the sample of text that are produced by the network.

<h2 class="section-header">References</h2>

* <http://colah.github.io/posts/2015-08-Understanding-LSTMs/>
* <http://karpathy.github.io/2015/05/21/rnn-effectiveness/>
* <http://cs231n.github.io/optimization-2/>
* <https://gist.github.com/karpathy/d4dee566867f8291f086>
