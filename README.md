# Adroit CMS Blog Post Automation Tool

An automated publishing tool designed specifically for **Adroit CMS** (`https://adroitco.in/admin/blogs`). It automatically creates and publishes blog posts from a JSON dataset.

---

## What It Does

1. Navigates to `https://adroitco.in/admin/blogs` with your authenticated credentials.
2. For each post in `blogs.json`:
   - Clicks **+ New Post**
   - Automatically fills out:
     - **Title**
     - **Slug**
     - **Category**
     - **Category Color** (`orange`, `blue`, or `green`)
     - **Author**
     - **Read Time**
     - **Cover Image URL**
     - **Tags**
     - **Excerpt**
     - **Full Content**
     - **Meta Title**
     - **Meta Description**
     - **Meta Keywords**
     - **Published** toggle
   - Scrolls down to **Save Post**
   - Clicks **Save Post** and waits for confirmation
   - Repeats until all blog posts are published.

---

## Quick Start

### 1. Visual Browser Mode (Watch it live in Chrome)
```bash
npm run automate:browser
```
*(Or simply `npm start` and choose option 1)*

This launches Google Chrome and visually performs every click, input entry, scroll, and post submission on your screen!

### 2. Fast API Mode (Bulk upload in seconds)
```bash
npm run automate:api
```
*(Or `npm start` and choose option 2)*

Directly uploads all posts via the CMS REST API endpoint with instant feedback.

---

## File Structure

- `blogs.json` - Contains the array of blog posts to publish.
- `config.json` - CMS configuration, URLs, authentication token, and browser settings.
- `automate_browser.js` - Visual Playwright script that automates the browser UI.
- `automate_api.js` - Fast direct API script.
- `runner.js` - Easy-to-use menu runner.
