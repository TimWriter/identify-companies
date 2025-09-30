# Identify Companies – Activity Tracker

A lightweight, browser-based tracker for logging **pageviews, clicks, and user activities**.
Perfect for simple analytics or enriching data about website visitors.

---

## 🚀 Features

- 📊 Tracks **page views, clicks, and page leaves** out of the box
- 🌐 Sends activity data to Supabase Edge Functions
- ⚡ Zero external dependencies
- 🔑 Supports `public_key` attribution per website
- 🛠️ Easy to embed with a single `<script>` tag

---

## 📦 Installation

### Option 1 – Embed via `<script>` tag
Include the built tracker in your HTML:

```html
<script
  src="https://unpkg.com/identify-companies/dist/tracker.min.js"
  data-publicKey="YOUR_PUBLIC_KEY"
  data-mode="allow"
></script>