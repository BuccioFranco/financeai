import React, { useState } from 'react'
import { X, CheckCircle, XCircle, Bot, ChevronDown, ChevronUp } from 'lucide-react'
import { explicaciones, categorias } from '../data/explicaciones.js'
import { useFinanceStore } from '../store/useFinanceStore.js'
import RiskBar from './RiskBar.jsx'
import LinksDirectos from './LinksDirectos.jsx'

const RIESGO_MAP = {
  "Plazo fijo tradicional": 1,
  "Plazo fijo UVA": 1,
  "FCI Money Market": 1,
  "Caución bursátil": 1,
  "LECAP": 1,
  "BONCAP": 2,
  "LECER / Bono CER": 2,
  "FCI Renta Fija": 2,
  "Dólar MEP": 2,
  "Dólar CCL": 2,
  "ON dolarizada (corp.)": 3,
  "FCI Renta Mixta": 3,
  "Bono dollar-linked": 3,
  "Cheques de pago diferido (CHEPED)": 3,
  "Fideicomiso inmobiliario": 3,
  "Bono soberano USD (AL30/GD30)": 4,
  "Cedears (acciones USA)": 4,
  "CEDEARs de ETFs (SPY/QQQ)": 4,
  "Oro (GLD CEDEAR)": 3,
  "FCI Renta Variable": 4,
  "Acciones Merval": 5,
}

function InstrumentoModal({ nombre, exp, onClose }) {
  const { sendPrompt } = useFinanceStore()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#111827] border border-border rounded-2xl w-full max-w-lg flex flex-col" style={{ maxHeight: '90vh' }}>

        {/* Header — siempre visible */}
        <div className="flex items-start justify-between p-5 border-b border-border shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">{exp.emoji}</span>
              <div>
                <h3 className="text-xl font-semibold text-white">{nombre}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
                  {exp.categoria}
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-2 italic">"{exp.tagline}"</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body — scrollable */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          <div>
            <h4 className="text-accent text-sm font-semibold mb-2">📖 ¿Cómo funciona?</h4>
            <p className="text-gray-300 text-sm leading-relaxed">{exp.como_funciona}</p>
          </div>

          <div className="bg-bg rounded-lg p-4 border border-border">
            <h4 className="text-yellow-400 text-sm font-semibold mb-2">💡 Ejemplo concreto</h4>
            <p className="text-gray-300 text-sm leading-relaxed">{exp.ejemplo}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-400 mb-2">Nivel de riesgo</h4>
            <RiskBar level={RIESGO_MAP[nombre] || 3} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-green-400 text-sm font-semibold mb-2 flex items-center gap-1">
                <CheckCircle size={14} /> Ventajas
              </h4>
              <ul className="space-y-1">
                {exp.ventajas.map((v, i) => (
                  <li key={i} className="text-gray-400 text-xs flex gap-1.5">
                    <span className="text-green-500 mt-0.5 shrink-0">•</span>{v}
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
                    <span className="text-red-500 mt-0.5 shrink-0">•</span>{d}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-blue-950/20 rounded-lg p-3 border border-blue-900/30">
            <p className="text-blue-300 text-sm">
              <span className="font-semibold">👤 ¿Para quién es? </span>{exp.para_quien}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-gray-500 text-xs">💰 Mínimo:</span>
              <p className="text-gray-300 text-xs mt-0.5">{exp.minimo}</p>
            </div>
            <div>
              <span className="text-gray-500 text-xs">📍 ¿Dónde?:</span>
              <p className="text-gray-300 text-xs mt-0.5">{exp.donde}</p>
            </div>
          </div>

          {exp.pasos && (
            <div>
              <h4 className="text-sm font-semibold text-gray-400 mb-2">🚀 Cómo empezar</h4>
              <ol className="space-y-1.5">
                {exp.pasos.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                    <span className="w-5 h-5 rounded-full bg-accent/20 text-accent text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">{i+1}</span>
                    {p}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        {/* Footer — siempre visible, con links directos + botón IA */}
        <div className="p-5 border-t border-border space-y-3 shrink-0 bg-[#111827]">
          <LinksDirectos nombreInstrumento={nombre} />
          <button
            onClick={() => {
              sendPrompt(`Explicame más sobre "${nombre}" para el mercado argentino actual y si me conviene para mi perfil`)
              onClose()
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-accent/10 border border-accent/50 text-accent hover:bg-accent/20 transition-colors text-sm font-medium"
          >
            <Bot size={16} />
            Preguntarle al asistente IA
          </button>
        </div>
      </div>
    </div>
  )
}

export default function InstrumentosExplorer() {
  const [categoriaActiva, setCategoriaActiva] = useState('todas')
  const [modalNombre, setModalNombre] = useState(null)

  const instrumentosFiltrados = Object.entries(explicaciones).filter(([, exp]) =>
    categoriaActiva === 'todas' || exp.categoria === categoriaActiva
  )

  const modalExp = modalNombre ? explicaciones[modalNombre] : null

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-300">
          🔍 Explorador de instrumentos — {Object.keys(explicaciones).length} opciones
        </h3>
      </div>

      {/* Filtros por categoría */}
      <div className="flex gap-2 flex-wrap mb-4">
        {categorias.map(cat => (
          <button
            key={cat.id}
            onClick={() => setCategoriaActiva(cat.id)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs border transition-all ${
              categoriaActiva === cat.id
                ? 'bg-accent/20 border-accent text-accent'
                : 'border-border text-gray-500 hover:border-gray-500 hover:text-gray-300'
            }`}
          >
            <span>{cat.emoji}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid de instrumentos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {instrumentosFiltrados.map(([nombre, exp]) => (
          <button
            key={nombre}
            onClick={() => setModalNombre(nombre)}
            className="group bg-bg border border-border rounded-xl p-4 text-left hover:border-accent/50 hover:bg-accent/5 transition-all"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{exp.emoji}</span>
                <div>
                  <p className="text-white text-sm font-semibold leading-tight group-hover:text-accent transition-colors">
                    {nombre}
                  </p>
                  <span className="text-xs text-gray-600">{exp.categoria}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-500 text-xs leading-snug mb-3 line-clamp-2">{exp.tagline}</p>
            <RiskBar level={RIESGO_MAP[nombre] || 3} />
          </button>
        ))}
      </div>

      {modalNombre && modalExp && (
        <InstrumentoModal
          nombre={modalNombre}
          exp={modalExp}
          onClose={() => setModalNombre(null)}
        />
      )}
    </div>
  )
}
