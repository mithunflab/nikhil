# FinanceAI — AI-Powered Financial Planning & Investment Advisor

Quick demo that shows a minimal HTML/CSS/JS frontend and a small Node/Express proxy server to call Google Gemini (Generative) models.

Files:
- `index.html` — frontend UI
- `styles.css` — frontend styles
- `app.js` — frontend logic (calculates totals, stores API key in localStorage, calls backend)
- `server.js` — minimal Express server that proxies to the Google Generative API and implements model fallback
- `package.json` — dependencies and start script

How it works (assumptions):
- The frontend collects the user's financial info and Gemini API key (kept in browser localStorage if saved).
-- When the user clicks "Get AI Recommendations" the frontend sends { apiKey, prompt } to `/api/ai` (no model selection).
-- The server will attempt each configured Gemini model in order (gemini-2.5pro, gemini-2.5flash, gemini-2.0). For each model the server will try several common request payload shapes and base URL variants so it's resilient to different API versions/response shapes.

Important assumptions & notes:
- This demo assumes the Generative API endpoint at `https://generative.googleapis.com/v1beta2/models/{model}:generateText`.
  - Google sometimes uses different versions or path shapes (v1, v1beta2, or a different resource name). If you see 404 or other errors, update `GEMINI_BASE` in a `.env` file or in `server.js` to the correct base URL for your account.
- The server expects a plain bearer API key (the same key you paste into the UI). Keep it private.
- For production, do NOT store user API keys in localStorage or accept raw API keys from clients — instead use secure server-side credentials or OAuth and follow Google’s recommended authentication flows.

Run locally:

1. Install dependencies:

```powershell
cd C:\Users\mithun\nikhil
npm install
```

2. (Optional) Create a `.env` with a custom base URL:

```
GEMINI_BASE=https://generative.googleapis.com/v1beta2
PORT=3000
```

3. Start the server:

```powershell
npm start
```

4. Open http://localhost:3000 in your browser, paste your Gemini API key, fill the form and click "Get AI Recommendations".

If the responses look unexpected, check the server logs for the exact HTTP responses. You may need to adapt `server.js` to the exact return shape your Google account provides. The server already tries several request shapes (`{prompt:{text:...}}`, `{text:...}`, `{input:...}`) and tries a few base URL variants, but some accounts / API versions return different JSON fields — if you paste an example response I can tailor the parser.

Security reminder: This is a demo. Do not reuse secrets or keys from production accounts without securing them properly.
