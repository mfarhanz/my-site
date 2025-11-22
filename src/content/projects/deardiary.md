---
title: "DearDiary"
description: "Android app for creating mini-diary entries"
date: "2023-09-24"
tags: ["Flutter", "Dart", "Firebase", "Firestore"]
published: true
links:
  - text: "GitHub"
    url: "https://github.com/mfarhanz/DiaryEntryApp"
---

# About

DearDiary is a simple academic project I created to get hands-on experience with Flutter and Firebase. The core idea was to build a minimal, fast, and clean mobile app where a user can jot down short diary-style entries and sync them to the cloud.

## Overview

DearDiary focuses on doing one thing well: letting users create personal notes quickly and effortlessly. The UI is intentionally simple — a single main page that lists all of the user’s diary entries, each stored in Firestore and accompanied by optional photo attachments.

Despite its straightforward scope, it touches on multiple core mobile development skills, including:
- Building Flutter layouts and navigation
- Managing app state
- Working with Firebase Authentication
- Integrating Firestore for real-time data
- Handling image uploads with Firebase Storage

## Key Features

- **Simple Registration & Login**  
  A basic email/password auth flow using Firebase Authentication. No advanced token handling or security layers — just a clean, minimal login system for the project’s purposes.

- **Create & Store Diary Entries**  
  Users can write short reflections or notes and upload them to Firestore, where entries sync automatically across devices.

- **Photo Attachments**  
  Add a picture from the camera or gallery. Images are uploaded and stored in Firebase Storage, linked to the entry metadata.

- **Minimal Single-Page UI**  
  The main screen is a scrollable list of the user’s entries — nothing more, nothing unnecessary. The lightweight interface keeps the experience as fast and frictionless as possible.

## Purpose of the Project

This app wasn’t meant to be production-grade; it was an academic build to understand the ecosystem around Flutter and Firebase. It shaped my understanding of:
- How Flutter structures widgets and reactive interfaces
- Handling async data flows and Firebase streams
- Integrating multiple Firebase services in one workflow

## Tech Stack
- **Flutter & Dart** for UI and logic
- **Firebase Authentication** for user login
- **Cloud Firestore** for storing diary entries
- **Firebase Storage** for photo uploads
