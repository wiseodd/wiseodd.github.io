---
layout:     post
title:      "Paralellizing Monte Carlo Simulation in Python"
subtitle:   "Monte Carlo simulation is all about quantity. It can take a long time to complete. Here's how to speed it up with the amazing Python multiprocessing module!"
date:       2016-06-13 02:42
author:     "wiseodd"
header-img: "img/code.png"
---

Let's talk about Monte Carlo.

It's a method to infer an unknown distribution using stochastic simulation. If that unknown distribution is in a nice form, e.g. Gaussian, Beta, etc, by all means, we could just infer it analytically. However things get more complicated and quickly become untractable when we're dealing with some unknown, complicated distribution. And this is where Monte Carlo method shines.

By exploiting the [Law of Large Numbers](https://en.wikipedia.org/wiki/Law_of_large_numbers){:target="_blank"}, if we sample a lot of data point from that unknown distribution, eventually, we could approximate that distribution. That's the key of Monte Carlo method: quantity of sample, the more the better.

So, really Monte Carlo method is a general framework. What we do is just plug our unknown distribution, and by drawing a HUGE amount of samples from it, we could infer the true distribution.

Better yet, because the Monte Carlo draws an i.i.d random variables from the target distribution, it has a very nice property. You bet, Monte Carlo is embarassingly parallel. So, it's a very low hanging fruit. And with Python in our arsenal, we could parallelize Monte Carlo in just several lines!

<h2 class="section-header">Naive Implementation of Monte Carlo Simulation</h2>

Suppose we have this `sample()` method that sample from an unknown target distribution that we want to infer. For example purpose, we will use a `x ~ Categorical(p)`. But it can be anything.

What we want is to infer the distribution of `p`. For this example we will use `p = (0.3, 0.2, 0.1, 0.1, 0.3)`. Remember, we don't know the true `p`! So pretend that our program don't know that!

``` python
import numpy as np
import time


p = (0.3, 0.2, 0.1, 0.1, 0.3)


def sample():
    # Just to make it slow!
    # Pretend that this is a complicated distribution!
    time.sleep(0.1)

    # Return item index
    return np.argmax(np.random.multinomial(1, p))
```

So, we're wondering what's our distribution looks like. We could draw a huge amount of samples and normalize them to get the distribution.

``` python
from collections import Counter


def monte_carlo(iter=1000):
    samples = []

    for _ in xrange(iter):
        x = sample()
        samples.append(x)

    # Count each item in our samples
    p = Counter(samples)
    # Convert to dict so we could use update() method properly
    p = dict(p)
    # Normalize them to get the distribution
    p.update([(item, prob / float(iter)) for item, prob in p.items()])

    return p
```

Let's try running our simulation!

```
In [0]: %time monte_carlo(iter=1000)

CPU times: user 91 ms, sys: 28.5 ms, total: 120 ms
Wall time: 1min 42s

Out[0]: {0: 0.29, 1: 0.198, 2: 0.103, 3: 0.101, 4: 0.308}
```

Try to compare the result of our Monte Carlo simulation with the true distribution of `p`! It's very close to our true `p`!

We finished our simulation in 100s. Now imagine if our unknown target distribution is not trivial and takes a lot of computational time to get sample from. The execution time of our Monte Carlo simulation will quickly get out of hand!

<h2 class="section-header">Parallel Monte Carlo Simulation</h2>

Let's try to speed that up by parallelizing it. But first we need to modify our `sample()` method so that it won't use the same random seed across all of the processes, as we will get the same "random" results, which would be pointless.

``` python
import multiprocessing as mp


def sample():
    # Just to make it slow!
    # Pretend that this is a complicated distribution!
    time.sleep(0.1)

    # Re-seed the random number generator
    np.random.seed()

    # Return item index
    return np.argmax(np.random.multinomial(1, p))


def _parallel_mc(iter=1000):
    pool = mp.Pool(4)

    future_res = [pool.apply_async(sample) for _ in range(iter)]
    res = [f.get() for f in future_res]

    return res
```

Here, we're using Python's `multiprocessing.Pool` module, which we define that we use 4 workers for our Monte Carlo simulation. `Pool` class has some very useful methods like `map` and `apply_async`. Because our simulation doesn't take any argument, we will use `apply_asnyc`.

Let's use that method for our new parallel Monte Carlo!

``` python
def parallel_monte_carlo(iter=1000):
    samples = _parallel_mc(iter)

    # Count each item in our samples
    p = Counter(samples)
    # Convert to dict so we could use update() method properly
    p = dict(p)
    # Normalize them to get the distribution
    p.update([(item, prob / float(iter)) for item, prob in p.items()])

    return p
```

We just swapped our `for` loop in `monte_carlo()` method with the new `_parallel_mc()` method. The rest is the same as before, we were only changing one line of code.

Here's the result:

```
In [1]: %time parallel_monte_carlo(iter=1000)

CPU times: user 289 ms, sys: 258 ms, total: 547 ms
Wall time: 28.3 s

Out[1]: {0: 0.31, 1: 0.185, 2: 0.099, 3: 0.105, 4: 0.301}
```

100s down to 28s? ~4x of speedup! It's scaled linearly with the number of processes we stated in `Pool` because practically the `sample()` method run in uniform time: ~0.1s. In the real world problem though, it will wildly vary. But linear growth of speedup compared to the number of processes would be the baseline.

Also, be careful with the number of processes. As a rule of thumb, number of processes should equal to the number of CPU cores available, so that excessive context switching could be avoided.

Lastly, this parallelization scheme works best if each individual simulation takes considerably long time. This won't be effective if each simulation is really quick and we do huge amount of simulations as the overhead will be greater than the benefit of parallelization.

<h2 class="section-header">Conclusion</h2>

In this post, we look at Monte Carlo method and how to speed it up using Python's `multiprocessing` module. We show that parallelizing Monte Carlo in Python is very easy, and it should be the default way to do Monte Carlo simulation.
