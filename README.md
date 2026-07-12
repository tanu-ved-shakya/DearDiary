# DearDiary

A web journaling platform that gives people a space to reflect, anywhere, with an AI chat companion to help them start.

[Live Demo](#) &nbsp;|&nbsp; [Screenshots](#screenshots) &nbsp;|&nbsp; [Tech Stack](#tech-stack) &nbsp;|&nbsp; [Getting Started](#getting-started)

> Replace the Live Demo link above with your deployed URL once it's live.

---

## Overview

Most people don't journal consistently. The moments they need to reflect the most — when they're overwhelmed, anxious, or just stuck in their head — are exactly the moments they're least likely to sit down and write.

DearDiary removes that friction. It's a web-based journaling platform where users can write entries in Let It Out, talk to a built-in AI chat assistant when they don't know where to start, and revisit their thoughts through search and auto-generated diary compilations. It also includes Find Calm, a guided space with a breathing exercise, daily affirmations, and a gratitude journal, for moments when someone needs to settle down before or instead of writing.

The platform is accessible from any device with a browser, so reflection isn't tied to a specific app, journal, or place.

---

## Features

- **Authentication** — secure signup/login with JWT-based session handling
- **Let It Out (Diary Entries)** — create, edit, delete, and organize journal entries
- **AI Chat Assistant** — powered by the Gemini API, helps users reflect when they don't know what to write
- **Search** — quickly find past entries
- **Diary Compilation** — automatically compiles entries into a readable, book-like format
- **Voice & Audio Support** — record and attach voice notes alongside written entries
- **Find Calm** — a guided wellness space featuring a breathing exercise, daily affirmations, and a gratitude journal
- **Access Anywhere** — fully web-based, no installation needed

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| AI / Chat | Gemini API |
| Auth | JWT (JSON Web Tokens) |
| Testing | Selenium WebDriver, TestNG, Maven |
| Architecture | Monolithic |

---

## Screenshots

> Add 2–4 screenshots or a short GIF here showing the Let It Out journaling interface, the chat assistant, and the Find Calm section (breathing exercise, affirmations, gratitude journal). This is usually what recruiters look at first, so don't skip it.

---

## Getting Started

### Prerequisites
- Node.js installed on your machine
- MongoDB, either installed locally or a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) connection string

### 1. Install Dependencies

Clone the repository, then install dependencies from inside the project folder:

```bash
git clone https://github.com/<your-username>/deardiary.git
cd deardiary
npm install
```

### 2. Configure Environment Variables

1. Find the file named `.env.example`.
2. Make a copy of it and rename the copy to `.env`.
3. Open `.env` and fill in the values:

```env
MONGO_URI=mongodb://127.0.0.1:27017/deardiary   # or your MongoDB Atlas connection string
JWT_SECRET=any_random_long_string
GEMINI_API_KEY=your_gemini_api_key
```

Get a free Gemini API key from [Google AI Studio](https://aistudio.google.com/). It's required for the chat companion and auto-tagging to work.

### 3. Run the Project

For development, with auto-restart on file changes:

```bash
npm run dev
```

For a production-style run:

```bash
npm start
```

### 4. View the App

Once the terminal shows `Server running on http://localhost:5000`, open that address in your browser.

---

## Troubleshooting

**AI chat companion not working:**
1. Double-check that `GEMINI_API_KEY` in your `.env` file is correct.
2. Restart the server after saving changes to `.env`.
3. Check the terminal for an `AI Chat Error` message.

**MongoDB connection errors:**
- Make sure MongoDB is installed and running.
- On Windows, start it by running `mongod` in a terminal, or by ensuring the MongoDB service is running in Task Manager.

---

## Testing

Core user flows (authentication, entry creation, search, and the Find Calm section) were tested using Selenium WebDriver with TestNG, built and run through Eclipse with Maven. Test runs generate TestNG XSLT reports and Extent-style emailable reports summarizing pass/fail results across the automated suite.

---

## What I Built (Solo Project)

DearDiary was designed and built end-to-end by me — from database schema and API design to frontend UI and AI integration. I used AI tools throughout development to accelerate implementation, while owning the architecture, feature decisions, and integration work myself.

**Some of the harder problems I worked through:**
- Getting the Gemini API to give context-aware, genuinely helpful responses inside a journaling setting, rather than generic chatbot replies
- Designing MongoDB schemas that support both individual entries and the auto-generated compilations built from them
- Building secure JWT-based auth from scratch
- Getting voice and audio recording/playback working reliably in the browser

---

## Future Improvements

- Mood tracking and analytics dashboard
- Offline support / PWA capability
- End-to-end entry encryption

---

## Author

**[Your Name]**
[LinkedIn](#) • [GitHub](#) • [Portfolio](#)
