import React, { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Send, Bot, User, ChevronDown, ChevronUp } from 'lucide-react'
import { useFinanceStore } from '../store/useFinanceStore.js'
import { useChatStatus, sendChat } from '../hooks/useMarketData.js'

const SUGGESTIONS = [
  '¿Conviene el plazo fijo hoy?',
  '¿Qué pasa si el dólar sube 20%?',
  '¿Cómo protejo mis ahorros de la inflación?',
]

export default function ChatAssistant() {
  const { chatHistory, addMessage, pendingPrompt, clearPendingPrompt } = useFinanceStore()
  const { data: status } = useChatStatus()
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatHistory, loading])

  useEffect(() => {
    if (pendingPrompt) {
      setInput(pendingPrompt)
      clearPendingPrompt()
      inputRef.current?.focus()
    }
  }, [pendingPrompt])

  async function handleSend(text) {
    const msg = text || input.trim()
    if (!msg || loading) return
    setInput('')

    const userMsg = { role: 'user', content: msg }
    addMessage(userMsg)
    setLoading(true)

    try {
      const apiHistory = chatHistory.map((m) => ({ role: m.role, content: m.content }))
      const res = await sendChat(msg, apiHistory)
      addMessage({
        role: 'assistant',
        content: res.response,
        model: res.model,
        model_label: res.model_label,
      })
    } catch {
      addMessage({ role: 'assistant', content: '⚠️ Error al conectar con el servidor. Verificá que el backend esté corriendo.', model: 'error' })
    } finally {
      setLoading(false)
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const ollamaOk = status?.ollama_available
  const groqOk = status?.groq_configured

  return (
    <div className="bg-card border border-border rounded-xl flex flex-col" style={{ height: '520px' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Bot size={18} className="text-accent" />
          <span className="font-semibold text-white text-sm">FinanceAI Assistant</span>
        </div>
        <div className="flex gap-2">
          {ollamaOk && (
            <span className="text-xs px-2 py-0.5 bg-green-900/40 text-green-400 rounded-full border border-green-900">
              Ollama local
            </span>
          )}
          {groqOk && (
            <span className="text-xs px-2 py-0.5 bg-blue-900/40 text-blue-400 rounded-full border border-blue-900">
              Groq Llama 70B
            </span>
          )}
          {!ollamaOk && !groqOk && (
            <span className="text-xs px-2 py-0.5 bg-red-900/40 text-red-400 rounded-full border border-red-900">
              Sin IA
            </span>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {chatHistory.length === 0 && (
          <div className="text-center text-gray-600 text-sm pt-8">
            <Bot size={32} className="mx-auto mb-2 text-gray-700" />
            <p>Preguntame sobre inversiones, cotizaciones o estrategias para el mercado argentino</p>
          </div>
        )}

        {chatHistory.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] rounded-xl px-4 py-2.5 text-sm ${
                msg.role === 'user'
                  ? 'bg-[#1e3a5f] text-white rounded-br-sm'
                  : 'bg-[#1a1f2e] text-gray-200 rounded-bl-sm'
              }`}
            >
              {msg.role === 'assistant' ? (
                <>
                  <div className="prose prose-invert prose-sm max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                  </div>
                  {msg.model_label && (
                    <p className="text-xs text-gray-600 mt-1 pt-1 border-t border-gray-800">
                      {msg.model === 'groq' ? '🤖 ' : '💻 '}{msg.model_label}
                    </p>
                  )}
                </>
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-[#1a1f2e] rounded-xl px-4 py-3 rounded-bl-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {chatHistory.length === 0 && (
        <div className="px-4 pb-2 flex gap-2 flex-wrap">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => handleSend(s)}
              className="text-xs px-3 py-1.5 rounded-full border border-border text-gray-400 hover:border-accent hover:text-accent transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="px-4 pb-4 pt-2 border-t border-border">
        <div className="flex gap-2 items-end">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Preguntá sobre inversiones... (Enter para enviar, Shift+Enter nueva línea)"
            rows={2}
            className="flex-1 bg-bg border border-border rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 resize-none focus:outline-none focus:border-accent transition-colors"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            className="p-2.5 bg-accent/20 border border-accent/50 rounded-lg text-accent hover:bg-accent/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
