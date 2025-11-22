---
title: "Go Fish"
description: "Classic playing cards game"
date: "2024-12-20"
tags: ["Javascript", "HTML", "CSS"]
published: true
links:
  - text: "GitHub"
    url: "https://github.com/mfarhanz/go-fish"
  - text: "Live Site"
    url: "https://mfarhanz.github.io/go-fish"
    icon: "external"
---

# About

Go Fish is a browser-based implementation of the classic card game, built entirely with vanilla JavaScript, HTML and CSS. It was a fun little project inspired by my younger siblings, who had recently gotten really into the game — we played it nonstop while I was visiting home, so I figured I’d try building a digital version before leaving again.

## Overview

The game supports **1 to 5 bot opponents**, each with their own turn logic. The interface is clean and easy to follow, and everything in the game is designed to feel smooth and readable. Since it’s all done without any frontend frameworks, a lot of care went into keeping the UI organized, animated and visually clear.

Most actions like drawing cards, passing turns, giving cards, and finishing sets are animated — all done using CSS for performance. Visual cues, transitions and little effects help players quickly understand what’s happening at any moment.

## Features

- **1–5 Bot Players**  
  Play against multiple bot opponents with simple but effective decision logic.

- **Smooth Animations**  
  Card movements, transitions and turn indicators are all animated for clarity.

- **SFX Toggle**  
  Optional sound effects that can be switched on or off anytime.

- **Accessible Gameplay Flow**  
  Turns, requests, and card exchanges are easy to follow thanks to visual indicators.

- **Completely Local**  
  No sign-in, no backend, no SSR — just <a href="https://mfarhanz.github.io/go-fish" target="_blank" rel="noopener noreferrer">open the site</a> and start playing.

## Notes

The UI isn’t responsive yet, and since I built this without any libraries or frameworks, retrofitting responsiveness is something I’ll revisit later. It also doesn’t support multiplayer (yet!) — the current version is strictly player-vs-bots.

Despite those limitations, I’m really happy with how it turned out, and it became a meaningful little project tied to memories of home.
