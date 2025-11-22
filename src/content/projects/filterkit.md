---
title: "Filterkit"
description: "Compact Python library for various image processing methods"
date: "2024-07-15"
tags: ["Python", "Numpy", "PIL", "Image Processing"]
published: true
links:
  - text: "GitHub"
    url: "https://github.com/mfarhanz/filterkit"
  - text: "PyPi"
    url: "https://pypi.org/project/filterkit/"
    icon: "external"
---

# About

Filterkit is a lightweight image processing library I built and published to PyPI. It grew out of my interest in computer vision — something I’d been reading about in my last year of college, but didn’t truly dive into until after graduating. This project became my way of finally practicing those concepts hands-on and implementing the underlying algorithms myself.

## Overview

At its core, Filterkit is a modest collection of commonly used image filters and transforms, most of which aim to be as close to constant time complexity as possible. It also comes with basic geometric operations and helpers for convenience.

Taking inspiration from established giants like PIL, scikit-image, ImageMagick, DIPLib and OpenCV, Filterkit was an experiment into understanding not just primary image processing algorithms, but also what goes into developing and publishing a Python library - from code correctness to documentation.

## Features

- **Optimized Convolutions**  
  Highly efficient implementations of convolution filters. Many operations run at near constant time for most parameter ranges.

- **Dithering Algorithms**  
  Constant time error-diffusion, ordered dithering and threshold-based dithering methods.

- **Blending & Quantization**  
  Assorted blend modes, palettes and color quantisation techniques.

- **Geometric Transforms**  
  Common operations like cropping, shearing, perspective transforms, and more.

- **Miscellaneous Operations**  
  Filterkit includes a variety of other assorted custom filters employing the use of algorithms like k-means clustering, neural networks, correlation and Fourier transform.

## Motivation

Realistically, the Python ecosystem already has world-class image processing tools. Filterkit wasn’t created to compete with them — it was created because I wanted to *understand* them......and hopefully see more people use it someday.

Regardless, it was an interesting experiment giving me in-depth exposure to algorithms - from researching, to designing them. Additionally, it gave me practical understanding of how vectorized operations in **Numpy** and parallelized loops via **Numba's** JIT-based compiler can *significantly* boost processing times for heavy CPU-based work in Python, which is known in the programming community for being notoriously slow.
