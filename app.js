// FinanceAI Frontend - Static Site Version for GitHub Pages
// Direct API integration with Gemini

function parseNum(id) {
  const val = document.getElementById(id)?.value || '0';
  const num = parseFloat(val);
  return isNaN(num) ? 0 : num;
}

function updateTotals() {
  const rent = parseNum('rent');
  const utilities = parseNum('utilities');
  const groceries = parseNum('groceries');
  const transportation = parseNum('transportation');
  const entertainment = parseNum('entertainment');
  const other = parseNum('other');

  const totalExpenses = rent + utilities + groceries + transportation + entertainment + other;
  document.getElementById('totalExpenses').textContent = '$' + totalExpenses.toFixed(2);

  const salary = parseNum('salary');
  const savings = parseNum('savings');
  const disposable = Math.max(0, salary - totalExpenses - savings);
  document.getElementById('disposable').textContent = '$' + disposable.toFixed(2);
}

// Event listeners for real-time calculation
['salary', 'rent', 'utilities', 'groceries', 'transportation', 'entertainment', 'other', 'savings'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('input', updateTotals);
});

// Load API key from localStorage on page load
window.addEventListener('load', () => {
  const saved = localStorage.getItem('gemini_key');
  if (saved) {
    document.getElementById('apiKey').value = saved;
  }
  updateTotals();
});

// Save API key to localStorage
document.getElementById('saveKey')?.addEventListener('click', () => {
  const k = document.getElementById('apiKey').value.trim();
  if (!k) {
    alert('Please enter your Gemini API key');
    return;
  }
  localStorage.setItem('gemini_key', k);
  alert('✅ API key saved to browser storage (this device only)!');
});

// Get AI Recommendations
document.getElementById('getAI')?.addEventListener('click', async () => {
  const apiKey = document.getElementById('apiKey').value.trim() || localStorage.getItem('gemini_key');
  if (!apiKey) {
    alert('Please enter or save your Gemini API key first');
    return;
  }

  const salary = parseNum('salary');
  const rent = parseNum('rent');
  const utilities = parseNum('utilities');
  const groceries = parseNum('groceries');
  const transportation = parseNum('transportation');
  const entertainment = parseNum('entertainment');
  const other = parseNum('other');
  const savings = parseNum('savings');
  const age = document.getElementById('age').value || 'Not specified';
  const riskTolerance = document.getElementById('risk').value || 'Moderate';

  const totalExpenses = rent + utilities + groceries + transportation + entertainment + other;
  const disposable = Math.max(0, salary - totalExpenses - savings);

  const profile = {
    salary, rent, utilities, groceries, transportation, entertainment, other, savings, totalExpenses, disposable, age, risk: riskTolerance
  };

  const prompt = `You are an expert personal finance advisor. The user profile is:
${JSON.stringify(profile, null, 2)}

Please provide:
1) A short summary of the user's financial health.
2) A 3-point monthly budget plan that optimizes savings and covers emergency fund.
3) A conservative investment allocation and an aggressive allocation (percentages) with brief rationale.
4) Top 3 next steps (actionable) the user can take this month.
Keep the answer concise and in plain language.`;

  const outputArea = document.getElementById('outputArea');
  outputArea.textContent = '⏳ Loading AI recommendations...';

  try {
    // Direct call to Google Gemini API
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + apiKey, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024
        }
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || `API Error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response received';

    outputArea.innerHTML = `<pre style="white-space: pre-wrap; line-height: 1.6;">${text}</pre>`;
  } catch (error) {
    console.error(error);
    outputArea.innerHTML = `<div style="color: #ef4444;">❌ Error: ${error.message}</div><div style="color: #9ca3af; font-size: 0.9em; margin-top: 8px;">Make sure your Gemini API key is valid and has the Generative Language API enabled.</div>`;
  }
});
