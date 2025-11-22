---
title: "ImAdjustr"
description: "Lightweight tool for retouching, filtering, or altering image and GIF files"
date: "2024-09-20"
tags: ["C#", "Python", "Winforms", "Image Processing"]
published: true
links:
  - text: "GitHub"
    url: "https://github.com/mfarhanz/imadjustr"
---

# Overview

ImAdjustr is a lightweight image and GIF editing application built with a hybrid **C# WinForms frontend** and a **Python/C# backend**. I started the project shortly after graduation as my first major post-school undertaking. The idea came from my earlier work on **filterkit**, a Python image-processing library I created, and I wanted to build a full desktop editor powered by it.

## Features

ImAdjustr includes a wide range of tools and operations:

- Basic image editing (crop, resize, rotate, etc.)
- Layering support
- Channel-based editing
- Color adjustments and transforms
- Visual filters and effects
- Quantizing for reducing image size/data
- Batch processing for handling multiple files
- GIF support

Some features are still in progress — several operations are fully implemented in the backend but not yet wired into the UI. The app uses a blend of **filterkit**, **PIL**, and **Windows GDI+** under the hood, which gives it solid performance on both single-image edits (supporting sizes up to ~24M pixels) and larger batch workflows.

## Architecture

The project combines a **C# WinForms** interface with a backend powered by **Python** and **C#**. Connecting these cleanly required experimentation with different communication approaches (HTTP, file-based sharing, memory-mapped files, pipes, etc.). I eventually settled on a combination that provided fast and efficient data transfer during editing and batch operations.

## Development

I worked on ImAdjustr gradually after graduation, whenever I had time. It was more ambitious than I expected for a first “big portfolio project,” mostly because image editors need a surprising amount of interconnected features. As of recent, development has slowed down as I focused on other projects, but I still plan to fully complete it over time.

## Try It

If you are interested in trying ImAdjustr, you can find installation files <a href="https://github.com/mfarhanz/ImAdjustr/releases" target="_blank" rel="noopener noreferrer">here</a>.
