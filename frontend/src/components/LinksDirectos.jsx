import React, { useState } from 'react'
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import { getBrokersForInstrumento } from '../data/brokers.js'

export default function LinksDirectos({ nombreInstrumento }) {
  const [expanded, setExpanded] = useState(false)
  const brokers = getBrokersForInstrumento(nombreInstrumento)

  if (brokers.length === 0) return null

  const visibles = expanded ? brokers : brokers.slice(0, 3)

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-gray-400 flex items-center gap-1.5">
        <ExternalLink size={12} />
        ¿Dónde puedo hacer esto?
      </p>

      <div className="space-y-2">
        {visibles.map(broker => (
          <a
            key={broker.id}
            href={broker.accion.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 bg-bg border border-border rounded-xl hover:border-accent/50 hover:bg-accent/5 transition-all group"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{broker.logo}</span>
              <div>
                <p className="text-white text-sm font-medium group-hover:text-accent transition-colors">
                  {broker.nombre}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-gray-600 text-xs">⏱ {broker.apertura_dias}</span>
                  {broker.para_principiantes && (
                    <span className="text-xs text-green-600">· Apto principiantes</span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-accent bg-accent/10 px-2 py-1 rounded-lg border border-accent/20">
                {broker.accion.texto}
              </span>
              <ExternalLink size={13} className="text-gray-600 group-hover:text-accent transition-colors shrink-0" />
            </div>
          </a>
        ))}
      </div>

      {brokers.length > 3 && (
        <button
          onClick={e => { e.stopPropagation(); setExpanded(x => !x) }}
          className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300 transition-colors"
        >
          {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          {expanded ? 'Ver menos' : `Ver ${brokers.length - 3} más`}
        </button>
      )}
    </div>
  )
}
