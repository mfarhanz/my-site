---
title: "Understanding Svelte Transitions"
description: "A quick dive into how Svelte’s built-in transition functions work, and how to use them for smooth UI animations."
date: "2025-10-21"
tags: ["Svelte", "Frontend", "Animation"]
published: true
---

# Svelte Transitions

Svelte provides simple yet powerful transition directives like `fade`, `fly`, and `slide`.  
These let you animate elements entering or leaving the DOM with minimal code.

For example:

```svelte
<div transition:fade>
  Hello world!
</div>
