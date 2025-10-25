---
title: "Understanding Svelte Transitions"
description: "Some more interesting facts about Svelte!"
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
