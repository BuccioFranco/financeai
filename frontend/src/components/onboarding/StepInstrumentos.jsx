import React, { useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import { explicaciones, recomendaciones } from '../../data/explicaciones.js'
import InstrumentoModal from './InstrumentoModal.jsx'
import RiskBar from '../RiskBar.jsx'

const RIESGO_MAP = {
  "FCI Money Market": 1,
  "Plazo fijo tradicional": 1,
  "Plazo fijo UVA": 2,
  "Dólar MEP": 2,
  "ON dolarizada (corp.)": 3,
  "Cedears (acciones USA)": 4,
  "Acciones Merval": 5,
  "Bitcoin": 5,
}

const OBJETIVO_LABEL = {
  proteger: "proteger tus ahorros",
  crecer: "hacer crecer tu dinero",
  dolarizar: "dolarizarte",
  aprender: "aprender sobre inversiones",
}

export default function StepInstrumentos({ objetivo, onElegir, onBack }) {
  const [modalInstrumento, setModalInstrumento] = useState(null)
  const instrumentos = recomendaciones[objetivo] || recomendaciones.aprender

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="text-gray-500 hover:text-white transition-colors">
          <ChevronLeft size={20} />
        </button>
        <div>
          <h2 className="text-xl font-semibold text-white">
            Opciones recomendadas para {OBJETIVO_LABEL[objetivo]}
          </h2>
          <p className="text-gray-500 text-sm">
            Hacé clic en "Saber más" para entender cada opción en detalle.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {instrumentos.map((nombre) => {
          const exp = explicaciones[nombre]
          if (!exp) return null
          const riesgo = RIESGO_MAP[nombre] || 3

          return (
            <div key={nombre} className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{exp.emoji}</span>
                    <h3 className="text-white font-semibold">{nombre}</h3>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">{exp.tagline}</p>
                  <RiskBar level={riesgo} />
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <button
                    onClick={() => setModalInstrumento(nombre)}
                    className="px-3 py-1.5 rounded-lg border border-border text-gray-400 hover:border-accent hover:text-accent transition-colors text-sm"
                  >
                    📖 Saber más
                  </button>
                  <button
                    onClick={() => onElegir(nombre)}
                    className="px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/50 text-accent hover:bg-accent/20 transition-colors text-sm font-medium"
                  >
                    ✅ Quiero este
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {modalInstrumento && (
        <InstrumentoModal
          nombre={modalInstrumento}
          exp={explicaciones[modalInstrumento]}
          onClose={() => setModalInstrumento(null)}
          onElegir={(nombre) => {
            setModalInstrumento(null)
            onElegir(nombre)
          }}
        />
      )}
    </div>
  )
}
