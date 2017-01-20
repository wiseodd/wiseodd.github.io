---
layout:     post
title:      "Residual Net"
subtitle:   "In this post, we will look into the record breaking convnet model of 2015: the Residual Net (ResNet)."
date:       2016-10-13 09:19
author:     "wiseodd"
header-img: "img/code.png"
category:   techblog
tags:       [machine learning, programming, python, neural networks]
---

September 2015, at the ImageNet Large Scale Visual Recognition Challenge's (ILSVRC) winners announcement, there was this one net by MSRA that dominated it all: Residual Net (ResNet) (He et al., 2015). The ensemble of ResNets crushing the classification task of other competitiors and almost halving the error rate of the 2014 winner.

Aside from winning the ILSVRC 2015 classification, ResNet also won the detection and localization challenge of the said competition. Additionally, it also won the MSCOCO detection and segmentation challenge. Quite a feat!

So, what makes ResNet so good? What's the difference compared to the previous convnet models?

<h2 class="section-heading">ResNet: the theory behind it</h2>

Suppose we want to approximate a function \\( g(x) \\) with another function \\( f(x) \\). In any numerical analysis, there would be some error, be it attributed to precision loss or because the approximator is not good enough. The error of that approximation, we call it as **residual**, is given by \\( r = g(x) - f(x) \\).

Going to neural net space, suppose we have input \\( x \\) and the function that we want to approximate by the net \\( H(x) \\). In a plain neural net, one or more layers with input \\( x \\) will try to approximate \\( H(x) \\) directly. That's not the case in ResNet; we're going go around the corner a little bit.

ResNet, instead, will approximate the \\( H(x) \\) by learning the residual of the mapping of input to output of one or more layers. Concretely, ResNet will compute \\( F(x) = H(x) - x \\). From there, we still want to approximate \\( H(x) \\) just like the plain neural net, but now, to approximate the desired function \\( H(x) \\), we just need the net to learn \\( F(x) \\), the residual, and adding that together with the input: \\( H(x) = F(x) + x \\). In a way, we're adding an identity mapping (adding with the input itself) to the formulation of our net. This formulation has a nice interpretation in neural net, and might be attributed on to why ResNet is so good.

<h2 class="section-heading">ResNet: the impact in backprop</h2>

Suppose that we have net gradient at the output node \\( \frac {\partial \ell}{\partial H} \\). We know what that \\( H(x) = F(x) + x \\), so we know its derivatives: \\( \frac {\partial H(x)}{\partial x} =  1 \\) and \\( \frac {\partial H(x)}{\partial F} = 1 \\). What does it means?

Remember that backpropagation is just a chain rule of derivative. Therefore, net gradient at the layers are \\( \frac {\partial H(x)}{\partial x} =  1 * \frac {\partial \ell}{\partial H} \\) and \\( \frac {\partial H(x)}{\partial F} =  1 * \frac {\partial \ell}{\partial H} \\). They both equal to \\( \frac {\partial \ell}{\partial H} \\), the gradient of the output!

If we think about that in term of backpropagation as a whole, it means that the gradient just being passed through from the output node to the input without any loss on augmentation. Intuitively, this very thing might help ResNet to alleviate the vanishing gradient problem, hence it's able to learn better, even with very deep layer configuration!

As another explanation (I'm pretty sure I heard it from Andrej Karpathy) said, having identity mapping in ResNet is like a highway: the gradient will be forwarded as is to the lower layers, and therefore the network will learn better.

It seems, the benefit of computing \\( H(x) \\) through its residual is quite free in term of computational cost. First, the time complexity is largely the same as the network need to take into account the identity mapping, which is just some extra pointwise addition. Second, the memory complexity is surprisingly the same as before. We don't need to introduce more parameters to learn the residual, as again, it's just an identity mapping. It might give the ResNet more edge though, as it could learn better with fewer parameters compared to, say, VGGNet. And fewer parameters means less overfitting and faster to train! All in all, I found this quite ingenious!

<h2 class="section-heading">ResNet: implementation detail</h2>

He et al. experimented with 152 layers deep ResNet in their paper. But due to our (my) monitor budget, we will look at the 34 layers version instead. Furthermore, it's easier to understand with not so many layers, isn't it?

![ResNet-34]({{ site.baseurl }}/img/2016-10-13-residual-net/resnet34.png)

At the first layer, ResNet use 7x7 convolution with stride 2 to downsample the input by the order of 2, similar to pooling layer. Then it's followed by three identity blocks before downsampling again by 2. The downsampling layer is also a convolution layer, but without the identity connection. It continues like that for several layer deep. The last layer is average pooling which creates 1000 feature maps (for ImageNet data), and average it for each feature map. The result would be 1000 dimensional vector which then fed into Softmax layer directly, so it's fully convolutional.

In the paper, He et al. use bottleneck architecture for each the residual block. It means that the residual block consists of 3 layers in this order: 1x1 convolution - 3x3 convolution - 1x1 convolution. The first and the last convolution is the bottleneck. It mostly just for practical consideration, as the first 1x1 convolution is being used to reduce the dimensionality, and the last 1x1 convolution is to restore it. So, the same network is now become 50 layers.

![ResNet-50]({{ site.baseurl }}/img/2016-10-13-residual-net/resnet50.png)

Notice, in 50 layers and more ResNet, at each block, there are now two 1x1 convolution layers.

<h2 class="section-heading">Conclusion</h2>

That's it for the introduction of ResNet. Next post, we will try to implement it!

With those achievements, now wonder ResNet inspired quite a bit other ideas, only one year after it was unveiled. Things like Google's latest Inception-v4 (Szegedy et al., 2016) and DenseNet (Gao et al., 2016) are clearly inspired by ResNet.

ResNet is ingenious, simple, yet super powerful model. If you have time and interested in the field, I suggest you to read the paper if you haven't. It's a joyful read!

<h2 class="section-heading">References</h2>

1. [He, Kaiming, et al. "Deep residual learning for image recognition." arXiv preprint arXiv:1512.03385 (2015).](http://arxiv.org/pdf/1512.03385)
2. [Szegedy, Christian, Sergey Ioffe, and Vincent Vanhoucke. "Inception-v4, inception-resnet and the impact of residual connections on learning." arXiv preprint arXiv:1602.07261 (2016).](http://arxiv.org/pdf/1602.07261)
3. [Huang, Gao, Zhuang Liu, and Kilian Q. Weinberger. "Densely Connected Convolutional Networks." arXiv preprint arXiv:1608.06993 (2016).](https://arxiv.org/pdf/1608.06993)