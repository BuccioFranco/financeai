import React from 'react'
import { X, CheckCircle, XCircle, Bot } from 'lucide-react'
import { useFinanceStore } from '../../store/useFinanceStore.js'

export default function InstrumentoModal({ nombre, exp, onClose, onElegir }) {
  const { sendPrompt } = useFinanceStore()

  if (!exp) return null

  function handlePreguntarIA() {
    sendPrompt(`Explicame más sobre "${nombre}" y si me conviene dado mi objetivo de inversión`)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#111827] border border-border rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">{exp.emoji}</span>
              <h3 className="text-xl font-semibold text-white">{nombre}</h3>
            </div>
            <p className="text-gray-400 text-sm mt-1 italic">"{exp.tagline}"</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors mt-1">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5">
          {/* Cómo funciona */}
          <div>
            <h4 className="text-accent text-sm font-semibold mb-2">📖 ¿Cómo funciona?</h4>
            <p className="text-gray-300 text-sm leading-relaxed">{exp.como_funciona}</p>
          </div>

          {/* Ejemplo */}
          <div className="bg-bg rounded-lg p-4 border border-border">
            <h4 className="text-yellow-400 text-sm font-semibold mb-2">💡 Ejemplo concreto</h4>
            <p className="text-gray-300 text-sm leading-relaxed">{exp.ejemplo}</p>
          </div>

          {/* Ventajas / Desventajas */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-green-400 text-sm font-semibold mb-2 flex items-center gap-1">
                <CheckCircle size={14} /> Ventajas
              </h4>
              <ul className="space-y-1">
                {exp.ventajas.map((v, i) => (
                  <li key={i} className="text-gray-400 text-xs flex gap-1.5">
                    <span className="text-green-500 mt-0.5 shrink-0">•</span>
                    {v}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-red-400 text-sm font-semibold mb-2 flex items-center gap-1">
                <XCircle size={14} /> Desventajas
              </h4>
              <ul className="space-y-1">
                {exp.desventajas.map((d, i) => (
                  <li key={i} className="text-gray-400 text-xs flex gap-1.5">
                    <span className="text-red-500 mt-0.5 shrink-0">•</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Para quién */}
          <div className="bg-blue-950/20 rounded-lg p-3 border border-blue-900/30">
            <p className="text-blue-300 text-sm">
              <span className="font-semibold">👤 ¿Para quién es? </span>
              {exp.para_quien}
            </p>
          </div>

          {/* Mínimo y dónde */}
          <div className="grid grid-cols-2 gap-3 text-sm text-gray-400">
            <div>
              <span className="text-gray-500">💰 Mínimo:</span>
              <p className="text-gray-300 mt-0.5">{exp.minimo}</p>
            </div>
            <div>
              <span className="text-gray-500">📍 ¿Dónde?:</span>
              <p className="text-gray-300 mt-0.5">{exp.donde}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-border flex gap-3">
          <button
            onClick={handlePreguntarIA}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-accent/50 text-accent hover:bg-accent/10 transition-colors text-sm"
          >
            <Bot size={16} />
            Preguntarle al asistente
          </button>
          <button
            onClick={() => onElegir(nombre)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-accent/20 border border-accent text-accent hover:bg-accent/30 transition-colors text-sm font-semibold"
          >
            ✅ Quiero este
          </button>
        </div>
      </div>
    </div>
  )
}
