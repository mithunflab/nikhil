# FinanceAI 🤖💰

AI-powered personal finance advisor using Google Gemini API. Get intelligent financial recommendations based on your income, expenses, and investment profile.

## 🌐 Live Demo

**➡️ Visit: https://mithunflab.github.io/nikhil/**

The app is now hosted on GitHub Pages! Just open the link, enter your Gemini API key, and get personalized financial advice powered by AI.

---

## ✨ Features

- **Real-time Budget Calculation** - Automatically calculates total expenses and disposable income
- **AI Financial Advisor** - Get personalized recommendations using Google Gemini API
- **Multiple Models** - Automatically tries gemini-2.5-flash for best results
- **Secure Storage** - Your API key is stored locally in browser (never sent to servers)
- **Responsive Design** - Works on desktop and mobile
- **Dark Theme** - Easy on the eyes

---

## 🚀 How to Use

1. **Get a Gemini API Key:**
   - Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Sign in with your Google account
   - Create a new API key
   - Copy the key (starts with `AIza...`)

2. **Use the App:**
   - Visit: https://mithunflab.github.io/nikhil/
   - Paste your API key in the input field
   - (Optional) Click "Save key" to store it in browser
   - Enter your financial information
   - Click "🚀 Get AI Recommendations"
   - Get AI-generated financial advice instantly!

---

## 📊 What You Can Input

- Monthly Income (Salary)
- Monthly Expenses:
  - Rent/Mortgage
  - Utilities
  - Groceries
  - Transportation
  - Entertainment
  - Other
- Current Savings
- Age
- Investment Risk Tolerance (Low/Moderate/High)

---

## 🤖 AI Features

The app uses Google's Gemini AI to provide:
- ✅ Summary of your financial health
- ✅ Monthly budget optimization plan
- ✅ Investment allocation strategies (Conservative & Aggressive)
- ✅ Actionable next steps for this month

---

## 🔒 Security & Privacy

- **No Backend Server** - Everything runs in your browser
- **API Key in Browser** - Your key is stored locally only (never sent to our servers)
- **Direct to Google** - Requests go directly to Google Gemini API
- **No Data Tracking** - We don't collect any of your financial data

---

## 📁 Project Structure

```
.
├── index.html       # Main UI
├── styles.css       # Styling (dark theme)
├── app.js          # Frontend logic & AI integration
├── README.md       # This file
└── .nojekyll       # GitHub Pages configuration
```

---

## 💻 Run Locally

If you want to run this project on your own machine:

```bash
# Clone the repository
git clone https://github.com/mithunflab/nikhil.git
cd nikhil

# Serve locally (using Python)
python -m http.server 8000

# Or using Node.js
npx http-server

# Open browser to http://localhost:8000
```

---

## 🛠️ Technology Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **AI Engine:** Google Generative Language API (Gemini)
- **Hosting:** GitHub Pages
- **No Dependencies** - Pure static site, no frameworks or build tools needed!

---

## 📝 About Gemini Models

This app uses **Gemini 2.5 Flash** by default:
- ⚡ Fast and responsive
- 🧠 Advanced reasoning
- 💰 Free tier available
- 📊 Perfect for financial analysis

---

## ❓ FAQ

**Q: Is my financial data safe?**
A: Yes! Your data never leaves your browser. Everything is processed client-side and sent directly to Google's API with your own API key.

**Q: Do I need to pay?**
A: Google offers free tier usage. Check https://ai.google.dev/pricing for current limits.

**Q: Can I use this offline?**
A: No, you need internet to call the Gemini API.

**Q: How do I get a Gemini API key?**
A: Visit https://aistudio.google.com/app/apikey and sign in with your Google account.

**Q: What if I get an error?**
A: Check that:
- Your API key is correct
- Gemini API is enabled in your Google account
- You haven't exceeded your API quota

---

## 🐛 Troubleshooting

### "Error: API Error: 400"
- Your API key might be invalid
- Go to [Google AI Studio](https://aistudio.google.com/app/apikey) and regenerate your key

### "Error: API Error: 429"
- You've hit the rate limit
- Wait a few minutes and try again
- Check your API quota

### "No response received"
- The AI might be overloaded
- Try again in a few moments

---

## 📄 License

MIT License - Feel free to use, modify, and distribute!

---

## 🙏 Credits

Built with:
- Google Generative AI API
- GitHub Pages
- ❤️ and a passion for finance

---

## 📞 Support

Found a bug? Have a suggestion?
- Create an [issue](https://github.com/mithunflab/nikhil/issues)
- Submit a [pull request](https://github.com/mithunflab/nikhil/pulls)

---

**Made with ❤️ for better financial decisions**
