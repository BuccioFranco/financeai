import React from 'react'
import { CheckCircle, LayoutDashboard, MessageCircle } from 'lucide-react'
import { explicaciones } from '../../data/explicaciones.js'
import { useFinanceStore } from '../../store/useFinanceStore.js'

export default function StepConfirmacion({ instrumento, onDashboard }) {
  const { sendPrompt } = useFinanceStore()
  const exp = explicaciones[instrumento] || {}

  function handleHablarAsistente() {
    sendPrompt(`Quiero empezar a invertir en "${instrumento}". ¿Cuánto debería poner para empezar y qué pasos exactos debo seguir?`)
    onDashboard()
  }

  const pasos = exp.pasos || [
    "Investigar más sobre este instrumento",
    "Abrir una cuenta en la plataforma correspondiente",
    "Empezar con un monto pequeño",
    "Hacer seguimiento de tu inversión",
  ]

  return (
    <div className="flex flex-col items-center gap-6 py-4 max-w-md mx-auto text-center">
      <div>
        <CheckCircle size={56} className="text-green-400 mx-auto mb-3" />
        <h2 className="text-2xl font-semibold text-white mb-1">¡Excelente elección!</h2>
        <p className="text-gray-400">Elegiste comenzar con</p>
        <p className="text-xl font-bold text-accent mt-1">
          {exp.emoji} {instrumento}
        </p>
      </div>

      <div className="bg-card border border-border rounded-xl p-5 w-full text-left">
        <h3 className="text-white font-semibold mb-3">Para empezar necesitás:</h3>
        <ol className="space-y-2">
          {pasos.map((paso, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-accent/20 text-accent text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="text-gray-300 text-sm">{paso}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="bg-blue-950/20 border border-blue-900/30 rounded-xl p-4 w-full">
        <p className="text-blue-300 text-sm">
          💬 ¿Querés que el asistente te ayude a calcular cuánto poner y cómo empezar paso a paso?
        </p>
      </div>

      <div className="flex gap-3 w-full">
        <button
          onClick={onDashboard}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border text-gray-300 hover:border-gray-500 transition-colors text-sm"
        >
          <LayoutDashboard size={16} />
          Ir al dashboard
        </button>
        <button
          onClick={handleHablarAsistente}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-accent/20 border border-accent text-accent hover:bg-accent/30 transition-colors text-sm font-semibold"
        >
          <MessageCircle size={16} />
          Hablar con el asistente
        </button>
      </div>
    </div>
  )
}
