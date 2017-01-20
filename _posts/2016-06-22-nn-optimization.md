---
layout:     post
title:      "Beyond SGD: Gradient Descent with Momentum and Adaptive Learning Rate"
subtitle:   "There are many attempts to improve Gradient Descent: some add momentum, some add adaptive learning rate. Let's see what's out there in the realm of neural nets optimization."
date:       2016-06-22 04:55
author:     "wiseodd"
header-img: "img/code.png"
category:   techblog
tags:       [machine learning, programming, python, neural networks, optimization]
---

Last time, we [implemented]({% post_url 2016-06-21-nn-sgd %}) Minibatch Gradient Descent to train our neural nets model. Using that post as the base, we will look into another optimization algorithms that are popular out there for training neural nets.

I've since made an update to the last post's SGD codes. Mainly, making the algorithms to use random batch in each iteration, not the whole dataset. However, the problem set and the neural nets model are still the same. Let's refresh the code:

``` python
def get_minibatch(X, y, minibatch_size):
    minibatches = []

    X, y = shuffle(X, y)

    for i in range(0, X.shape[0], minibatch_size):
        X_mini = X[i:i + minibatch_size]
        y_mini = y[i:i + minibatch_size]

        minibatches.append((X_mini, y_mini))

    return minibatches


def sgd(model, X_train, y_train, minibatch_size):
    minibatches = get_minibatch(X_train, y_train, minibatch_size)

    for iter in range(1, n_iter + 1):
        idx = np.random.randint(0, len(minibatches))
        X_mini, y_mini = minibatches[idx]

        grad = get_minibatch_grad(model, X_mini, y_mini)

        for layer in grad:
            model[layer] += alpha * grad[layer]

    return model
```

<h2 class="section-heading">SGD + Momentum</h2>

Imagine a car. The car is going through a mountain range. Being a mountain range, naturally the terrain is hilly. Up and down, up and down. But we, the driver of that car, only want to see the deepest valley of the mountain. So, we want to stop at the part of the road that has the lowest elevation.

Only, there's a problem: the car is just a box with wheels! So, we can't accelerate and brake at our will, we're at the mercy of the nature! So, we decided to start from the very top of the mountain road and pray that Netwon blesses our journey.

We're moving now! As our "car" moving downhill, it's gaining more and more speed. We find that we're going to get through a small hill. Will this hill stop us? Not quite! Because we have been gaining a lot of momentum! So, we pass that small hill. And another small hill after that. And another. And another...

Finally, after seems like forever, we find ourselves facing very tall hill. Maybe it's tall because it's at the bottom of the mountain range? Nevertheless, the hill is just too much for our "car". Finally it stops. And it's true! We could already see the beautiful deepest valley of the mountain!

That's exactly how momentum plays part in SGD. It uses physical law of motion to go pass through local optima (small hills). Intuitively, adding momentum will also make the convergence faster, as we're accumulating speed, so our Gradient Descent step could be larger, compared to SGD's constant step.

Now the code!

``` python
def momentum(model, X_train, y_train, minibatch_size):
    velocity = {k: np.zeros_like(v) for k, v in model.items()}
    gamma = .9

    minibatches = get_minibatch(X_train, y_train, minibatch_size)

    for iter in range(1, n_iter + 1):
        idx = np.random.randint(0, len(minibatches))
        X_mini, y_mini = minibatches[idx]

        grad = get_minibatch_grad(model, X_mini, y_mini)

        for layer in grad:
            velocity[layer] = gamma * velocity[layer] + alpha * grad[layer]
            model[layer] += velocity[layer]

    return model
```

What we do is to create a new velocity variable to store our momentum for every parameter. The update of the velocity is given the old velocity value and new Gradient Descent step `alpha * grad`. We also decay our past velocity so that we only consider the most recent velocities with `gamma = .9`.

<h2 class="section-heading">Nesterov Momentum</h2>

Very similar with momentum method above, Nesterov Momentum add one little different bit to the momentum calculation. Instead of calculating gradient of the current position, it calculates the gradient at the approximated new position.

Intuitively, because we have some momentum applied to our "car", then at the current position, we know where will our "car" end up one more minute from the current time, ignoring any other variables.

So, Nesterov Momentum exploits that knowledge, and instead of using the current position's gradient, it uses the next approximated position's gradient with the hope that it will give us better information when we're taking the next step.

``` python
def nesterov(model, X_train, y_train, minibatch_size):
    velocity = {k: np.zeros_like(v) for k, v in model.items()}
    gamma = .9

    minibatches = get_minibatch(X_train, y_train, minibatch_size)

    for iter in range(1, n_iter + 1):
        idx = np.random.randint(0, len(minibatches))
        X_mini, y_mini = minibatches[idx]

        model_ahead = {k: v + gamma * velocity[k] for k, v in model.items()}
        grad = get_minibatch_grad(model, X_mini, y_mini)

        for layer in grad:
            velocity[layer] = gamma * velocity[layer] + alpha * grad[layer]
            model[layer] += velocity[layer]

    return model
```

Looking at the code, the only difference is that now we're computing the gradient using `model_ahead`: approximated next state of our model parameters that we calculated by adding the momentum to the current parameters.

<h2 class="section-heading">Adagrad</h2>

Now, we're entering a different realm. Let's forget about our disfunctional "car"! We're going to approach the Gradient Descent from different angle that we've been ignoring so far: the learning rate `alpha`.

The problem with learning rate in Gradient Descent is that it's constant and affecting all of our parameters. What happen if we know that we should slow down or speed up? What happen if we know that we should accelerate more in this direction and decelerate in that direction? Using our standard SGD, we're out of luck.

That's why Adagrad was invented. It's trying to solve that very problem.

``` python
def adagrad(model, X_train, y_train, minibatch_size):
    cache = {k: np.zeros_like(v) for k, v in model.items()}

    minibatches = get_minibatch(X_train, y_train, minibatch_size)

    for iter in range(1, n_iter + 1):
        idx = np.random.randint(0, len(minibatches))
        X_mini, y_mini = minibatches[idx]

        grad = get_minibatch_grad(model, X_mini, y_mini)

        for k in grad:
            cache[k] += grad[k]**2
            model[k] += alpha * grad[k] / (np.sqrt(cache[k]) + eps)

    return model
```

Note that the parameters update is pointwise operation, hence the learning rate is adaptive **per-parameter**.

What we do is to accumulate the sum of squared of all of our parameters' gradient, and use that to normalize the learning rate `alpha`, so that now our alpha could be smaller or larger depending on how the past gradients behaved: parameters that updated a lot will be slowed down while parameters that received little updates will be have bigger learning rate to accelerate the learning process.

One note to the implementation, the `eps` there is useful to combat the division by zero, so that our optimization becomes numerically stable. Usually it's set with considerably small value, like `1e-8`.

<h2 class="section-heading">RMSprop</h2>

If you notice, at the gradient accumulation part in Adagrad `cache[k] += grad[k]**2`, it's monotonically increasing (hint: sum and squared). This could be problematic as the learning rate will be monotonically decreasing to the point that the learning stops altogether because of the very tiny learning rate.

To combat that problem, RMSprop decay the past accumulated gradient, so only a portion of past gradients are considered. Now, instead of considering all of the past gradients, RMSprop behaves like moving average.

``` python
def rmsprop(model, X_train, y_train, minibatch_size):
    cache = {k: np.zeros_like(v) for k, v in model.items()}
    gamma = .9

    minibatches = get_minibatch(X_train, y_train, minibatch_size)

    for iter in range(1, n_iter + 1):
        idx = np.random.randint(0, len(minibatches))
        X_mini, y_mini = minibatches[idx]

        grad = get_minibatch_grad(model, X_mini, y_mini)

        for k in grad:
            cache[k] = gamma * cache[k] + (1 - gamma) * (grad[k]**2)
            model[k] += alpha * grad[k] / (np.sqrt(cache[k]) + eps)

    return model
```

The only difference compared to Adagrad is how we calculate the cache. Here, we're take `gamma` portion of past accumulated sum of squared gradient, and take `1 - gamma` portion of the current squared gradient. By doing this, the accumulated gradient won't be aggresively monotonically increasing, depending on the gradients in the moving average window.

<h2 class="section-heading">Adam</h2>

Adam is the latest state of the art of first order optimization method that's widely used in the real world. It's a modification of RMSprop. Loosely speaking, Adam is RMSprop with momentum. So, Adam tries to combine the best of both world of momentum and adaptive learning rate.

``` python
def adam(model, X_train, y_train, minibatch_size):
    M = {k: np.zeros_like(v) for k, v in model.items()}
    R = {k: np.zeros_like(v) for k, v in model.items()}
    beta1 = .9
    beta2 = .999

    minibatches = get_minibatch(X_train, y_train, minibatch_size)

    for iter in range(1, n_iter + 1):
        t = iter
        idx = np.random.randint(0, len(minibatches))
        X_mini, y_mini = minibatches[idx]

        grad = get_minibatch_grad(model, X_mini, y_mini)

        for k in grad:
            M[k] = beta1 * M[k] + (1. - beta1) * grad[k]
            R[k] = beta2 * R[k] + (1. - beta2) * grad[k]**2

            m_k_hat = M[k] / (1. - beta1**(t))
            r_k_hat = R[k] / (1. - beta2**(t))

            model[k] += alpha * m_k_hat / (np.sqrt(r_k_hat) + eps)

    return model
```

Notice in the code, we still retain some RMSprop's codes, namely when we calculate `R`. We also add some codes that are similar to how we compute momentum in the form of `M`. Then, for the parameters update, it's the combination of momentum method and adaptive learning rate method: add the momentum, and normalize the learning rate using the moving average squared gradient.

Adam also has a bias correction mechanism, it's calculated in `m_k_hat` and `r_k_hat`. It's useful to make the convergence faster, at several first iterations. The reason is that we initialized `M` and `R` with zero, hence it will be biased toward zero in several first iterations, until they're fully *warmed up*. The solution is to correct the bias and get the unbiased estimate of `M` and `R`. Please refer to the original paper, section 3: <https://arxiv.org/pdf/1412.6980>.

As for the recommended value for the hyperparameter: `beta1 = 0.9`, `beta2 = 0.999`, `alpha = 1e-3`, and `eps = 1e-8`.

<h2 class="section-heading">Test and Comparison</h2>

With our bag full of those algorithms, let's compare them using our previous problem in the last post. Here's the setup:

``` python
n_iter = 100
eps = 1e-8  # Smoothing to avoid division by zero
minibatch_size = 50
n_experiment = 10
```

We will run the algorithms to optimize our neural nets for 100 epochs each, and we repeat them 3 times and average the accuracy score.

```
alpha = 0.5

sgd => mean accuracy: 0.4061333333333333, std: 0.15987773105998498
adam => mean accuracy: 0.8607999999999999, std: 0.015892975387468082
nesterov => mean accuracy: 0.47680000000000006, std: 5.551115123125783e-17
rmsprop => mean accuracy: 0.8506666666666667, std: 0.007224649164876814
adagrad => mean accuracy: 0.8754666666666667, std: 0.002639865316429748
momentum => mean accuracy: 0.3152, std: 0.11427592339012915

========================================================================

alpha = 1e-2

nesterov => mean accuracy: 0.8621333333333334, std: 0.024721021194297126
rmsprop => mean accuracy: 0.8727999999999999, std: 0.010182337649086262
sgd => mean accuracy: 0.8784000000000001, std: 0.0026127890589687525
adam => mean accuracy: 0.8709333333333333, std: 0.01112993960251158
momentum => mean accuracy: 0.8554666666666666, std: 0.016657597532524156
adagrad => mean accuracy: 0.8786666666666667, std: 0.001359738536958064

========================================================================

alpha = 1e-5

adagrad => mean accuracy: 0.504, std: 0.2635737973825673
sgd => mean accuracy: 0.6509333333333334, std: 0.1101414040626362
nesterov => mean accuracy: 0.8666666666666667, std: 0.016110727964792775
rmsprop => mean accuracy: 0.30693333333333334, std: 0.028898596659507347
momentum => mean accuracy: 0.8613333333333334, std: 0.02526728231439929
adam => mean accuracy: 0.43039999999999995, std: 0.0842928229447798

```

Using large value for the learning rate, the adaptive learning rate methods are the winner here.

However, the opposite happens when we're using small learning rate value e.g. `1e-5`. It's small enough for vanilla SGD and momentum based methods to perform well. On the other hand, as the learning rate is already very small, and we normalizes it in the adaptive learning rate methods, it becomes even smaller, which impacting the convergence rate. It makes the learning becomes really slow and they perform worse than the vanilla SGD with the same number of iteration.

<h2 class="section-heading">Conclusion</h2>

In this post we looked at the optimization algorithms for neural nets beyond SGD. We looked at two classes of algorithms: momentum based and adaptive learning rate methods.

We also implement all of those methods in Python and Numpy with the use case of our neural nets stated in the [last post]({% post_url 2016-06-21-nn-sgd %}).

Most of those methods above are currently implemented in the popular Deep Learning libraries like Tensorflow, Keras, and Caffe. However, Adam is currently the default recommended algorithm to be used.

You could find the full code used in this post here: <https://gist.github.com/wiseodd/85ad008aef5585cec017f4f1e6d67a02>

<h2 class="section-heading">References</h2>

* <http://cs231n.github.io/neural-networks-3/>
* <http://sebastianruder.com/optimizing-gradient-descent/>
* <https://arxiv.org/pdf/1412.6980.pdf>
