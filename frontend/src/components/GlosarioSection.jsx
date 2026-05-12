import React, { useState } from 'react'
import { Search, ChevronDown, ChevronUp } from 'lucide-react'
import { glosario } from '../data/explicaciones.js'

function TerminoCard({ item }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="bg-card border border-border rounded-xl p-4 cursor-pointer hover:border-gray-600 transition-all"
      onClick={() => setOpen(o => !o)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-3">
          <span className="font-mono font-bold text-accent text-sm">{item.termino}</span>
          <span className="text-gray-500 text-xs hidden sm:block">{item.nombre_completo}</span>
        </div>
        {open ? <ChevronUp size={14} className="text-gray-500 shrink-0" /> : <ChevronDown size={14} className="text-gray-500 shrink-0" />}
      </div>
      {open && (
        <div className="mt-3 space-y-2 border-t border-border pt-3">
          <p className="text-gray-300 text-sm leading-relaxed">{item.definicion}</p>
          {item.ejemplo && (
            <div className="bg-bg rounded-lg p-3">
              <span className="text-yellow-400 text-xs font-semibold">💡 Ejemplo: </span>
              <span className="text-gray-400 text-xs">{item.ejemplo}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function GlosarioSection() {
  const [query, setQuery] = useState('')

  const filtrados = glosario.filter(g =>
    g.termino.toLowerCase().includes(query.toLowerCase()) ||
    g.nombre_completo.toLowerCase().includes(query.toLowerCase()) ||
    g.definicion.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-300">
          📚 Glosario financiero — {glosario.length} términos
        </h3>
      </div>
      <div className="relative mb-4">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Buscar término... (TNA, MEP, CER, riesgo país...)"
          className="w-full bg-bg border border-border rounded-lg pl-8 pr-4 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent transition-colors"
        />
      </div>
      <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
        {filtrados.map(item => (
          <TerminoCard key={item.termino} item={item} />
        ))}
        {filtrados.length === 0 && (
          <p className="text-gray-600 text-sm text-center py-6">No se encontraron términos para "{query}"</p>
        )}
      </div>
    </div>
  )
}
