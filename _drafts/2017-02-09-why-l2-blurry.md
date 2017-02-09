---
layout:     post
title:      "Why does L2 reconstruction loss yield blurry images?"
subtitle:   "It is generally known that L2 reconstruction loss found in generative models yields blurrier images that e.g. adversarial loss. But why?"
date:       2016-02-09 03:14
author:     "wiseodd"
header-img: "img/bayes.png"
category:   techblog
tags:       [machine learning, gan]
---

In generative modeling, especially in vision, it is a very well known observation that using $L_2$ loss function yields blurry images [1][2][3][4][5].