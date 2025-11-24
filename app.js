// Simple frontend logic for FinanceAI
(function(){
  const $ = id => document.getElementById(id)

  const inputs = ['salary','rent','utilities','groceries','transport','entertainment','other']

  function parseNum(id){
    const v = parseFloat($(id).value || 0)
    return isNaN(v)?0:v
  }

  function updateTotals(){
    const total = inputs.reduce((s,k)=> s + parseNum(k), 0)
    const salary = parseNum('salary')
    const disposable = Math.max(0, salary - total)
    $('totalExpenses').textContent = `$${total.toFixed(2)}`
    $('disposable').textContent = `$${disposable.toFixed(2)}`
  }

  // wire inputs
  inputs.concat(['salary']).forEach(id=>{
    const el = $(id)
    if(el) el.addEventListener('input', updateTotals)
  })

  // Save and load API key
  $('saveKey').addEventListener('click', ()=>{
    const k = $('apiKey').value.trim()
    if(!k){alert('Please paste your Gemini API key.');return}
    localStorage.setItem('gemini_key', k)
    alert('API key saved to browser localStorage (only on this device).')
  })

  // load saved key
  window.addEventListener('load', ()=>{
    const k = localStorage.getItem('gemini_key')
    if(k) $('apiKey').value = k
    updateTotals()
  })

  $('getAI').addEventListener('click', async ()=>{
    const apiKey = $('apiKey').value.trim() || localStorage.getItem('gemini_key')
    if(!apiKey){alert('Enter or save your Gemini API key first.');return}

    const profile = {
      salary: parseNum('salary'),
      rent: parseNum('rent'),
      utilities: parseNum('utilities'),
      groceries: parseNum('groceries'),
      transport: parseNum('transport'),
      entertainment: parseNum('entertainment'),
      other: parseNum('other'),
      savings: parseNum('savings'),
      age: parseNum('age'),
      risk: $('risk').value
    }

      const prompt = buildPrompt(profile)

      $('outputArea').textContent = '⏳ Asking AI — this may take a few seconds...'

      try{
        const res = await fetch('/api/ai', {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({ apiKey, prompt })
        })
      const data = await res.json()
      if(!res.ok) throw new Error(data.error || data.message || 'Request failed')
      $('outputArea').textContent = `Model used: ${data.model}\n\n${data.output}`
    }catch(err){
      console.error(err)
      $('outputArea').textContent = '❌ Error: ' + (err.message || err)
    }
  })

  function buildPrompt(p){
    return `You are an expert personal finance advisor. The user profile is:\n${JSON.stringify(p, null, 2)}\n\nPlease provide:\n1) A short summary of the user's financial health.\n2) A 3-point monthly budget plan that optimizes savings and covers emergency fund.\n3) A conservative investment allocation and an aggressive allocation (percentages) with brief rationale.\n4) Top 3 next steps (actionable) the user can take this month.\nKeep the answer concise and in plain language.`
  }

})();
