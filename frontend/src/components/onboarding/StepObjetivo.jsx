import React from 'react'
import { objetivos } from '../../data/explicaciones.js'

export default function StepObjetivo({ onSelect }) {
  return (
    <div className="flex flex-col items-center gap-8 py-4">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-white mb-2">
          Bienvenido a FinanceAI. ¿Qué querés lograr?
        </h2>
        <p className="text-gray-400 text-sm">
          No hace falta saber de finanzas. Te guiamos paso a paso.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
        {objetivos.map((obj) => (
          <button
            key={obj.id}
            onClick={() => onSelect(obj.id)}
            className="group bg-card border border-border hover:border-accent rounded-xl p-6 text-left transition-all hover:bg-accent/5"
          >
            <div className="text-4xl mb-3">{obj.emoji}</div>
            <h3 className="text-white font-semibold mb-1 group-hover:text-accent transition-colors">
              {obj.titulo}
            </h3>
            <p className="text-gray-500 text-sm">{obj.descripcion}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
