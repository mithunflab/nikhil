require('dotenv').config()
const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('.'))

// Models to try in order
const FALLBACK_MODELS = ['gemini-2.5-pro','gemini-2.5-flash','gemini-2.0-flash-lite']

// Correct Google Generative Language API endpoint
const GEMINI_BASE = process.env.GEMINI_BASE || 'https://generativelanguage.googleapis.com/v1beta'

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ➜ ${req.method} ${req.url}`)
  next()
})

app.get('/health', (req, res) => res.json({ status: 'ok' }))

app.post('/api/ai', async (req, res) => {
  const { apiKey, prompt } = req.body || {}
  if(!apiKey || !prompt){
    return res.status(400).json({ error: 'Missing apiKey or prompt' })
  }

  let lastError = null

  for(const model of FALLBACK_MODELS){
    try{
      // Correct endpoint: models/{model}:generateContent
      const url = `${GEMINI_BASE}/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`

      // Correct request payload format for Google Generative Language API
      const body = {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024
        }
      }

      console.log(`Attempting model: ${model}`)
      const response = await axios.post(url, body, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000
      })

      const d = response.data || {}
      
      // Parse response format: candidates[0].content.parts[0].text
      let text = ''
      if(d.candidates && d.candidates[0] && d.candidates[0].content && d.candidates[0].content.parts && d.candidates[0].content.parts[0] && d.candidates[0].content.parts[0].text){
        text = d.candidates[0].content.parts[0].text
      }

      if(text && text.trim().length > 0){
        console.log(`✓ Success with model: ${model}`)
        return res.json({ model: model, output: text })
      }

      lastError = new Error(`Empty response from model ${model}`)
    }catch(err){
      if(err && err.response){
        const r = err.response
        console.warn(`✗ Model ${model} failed: HTTP ${r.status}`, (r.data && JSON.stringify(r.data).slice(0, 200)) || r.statusText)
        lastError = new Error(`HTTP ${r.status}: ${(r.data && JSON.stringify(r.data).slice(0, 200)) || r.statusText}`)
      }else{
        console.warn(`✗ Model ${model} failed:`, err.message || err)
        lastError = err
      }
    }
  }

  const msg = lastError && lastError.message ? lastError.message : 'All models failed. Check API key and network.'
  return res.status(502).json({ error: msg })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>console.log(`FinanceAI server running on http://localhost:${PORT}`))
