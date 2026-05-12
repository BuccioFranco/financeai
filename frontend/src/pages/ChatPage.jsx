import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ChatAssistant from '../components/ChatAssistant.jsx'
import { useFinanceStore } from '../store/useFinanceStore.js'

const SUGGESTIONS_EXTRA = [
  '¿Conviene el plazo fijo hoy?',
  '¿Qué son los Cedears?',
  '¿Cómo me dolarizo legalmente?',
  'Explicame el dólar MEP',
  '¿Cuál es el riesgo de los bonos AL30?',
  '¿Qué es una LECAP?',
  '¿Cómo armo un portafolio diversificado en Argentina?',
]

export default function ChatPage() {
  const location = useLocation()
  const { sendPrompt } = useFinanceStore()

  useEffect(() => {
    const preloaded = location.state?.preloadedMessage
    if (preloaded) {
      sendPrompt(preloaded)
    }
  }, [location.state])

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-white mb-2">🤖 Asistente FinanceAI</h1>
        <p className="text-gray-400">
          Preguntá lo que quieras sobre el mercado argentino. Responde con datos reales del día.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {SUGGESTIONS_EXTRA.map(s => (
          <button
            key={s}
            onClick={() => sendPrompt(s)}
            className="text-xs px-3 py-1.5 rounded-full border border-border text-gray-400 hover:border-accent hover:text-accent transition-colors"
          >
            {s}
          </button>
        ))}
      </div>

      <ChatAssistant fullPage />
    </div>
  )
}
