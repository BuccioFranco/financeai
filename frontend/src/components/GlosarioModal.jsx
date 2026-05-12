import React, { useState } from 'react'
import { X, Search, ExternalLink, CheckCircle, AlertTriangle, Info } from 'lucide-react'
import { glosario, explicaciones } from '../data/explicaciones.js'
import { FUENTES, METODOLOGIA } from '../data/fuentes.js'

const TABS = [
  { id: 'terminos',     label: 'Términos',       emoji: '📖' },
  { id: 'instrumentos', label: 'Instrumentos',   emoji: '💼' },
  { id: 'fuentes',      label: 'Fuentes de datos', emoji: '🔗' },
  { id: 'metodologia',  label: 'Metodología',    emoji: '🧮' },
]

// ── Términos ─────────────────────────────────────────────────

function TerminoItem({ item }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="border border-border rounded-xl overflow-hidden cursor-pointer hover:border-gray-600 transition-colors"
      onClick={() => setOpen(o => !o)}
    >
      <div className="flex items-center justify-between px-4 py-3 bg-card">
        <div className="flex items-baseline gap-3">
          <span className="font-mono font-bold text-accent text-sm">{item.termino}</span>
          <span className="text-gray-500 text-xs hidden sm:block">{item.nombre_completo}</span>
        </div>
        <span className="text-gray-600 text-xs">{open ? '▲' : '▼'}</span>
      </div>
      {open && (
        <div className="px-4 pb-4 pt-3 bg-bg space-y-2">
          <p className="text-gray-300 text-sm leading-relaxed">{item.definicion}</p>
          {item.ejemplo && (
            <div className="bg-card rounded-lg p-3 border border-border">
              <span className="text-yellow-400 text-xs font-semibold">💡 Ejemplo: </span>
              <span className="text-gray-400 text-xs">{item.ejemplo}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function TabTerminos({ query }) {
  const filtrados = glosario.filter(g =>
    !query || g.termino.toLowerCase().includes(query.toLowerCase()) ||
    g.nombre_completo.toLowerCase().includes(query.toLowerCase()) ||
    g.definicion.toLowerCase().includes(query.toLowerCase())
  )
  return (
    <div className="space-y-2">
      {filtrados.length === 0
        ? <p className="text-gray-600 text-sm text-center py-8">Sin resultados para "{query}"</p>
        : filtrados.map(item => <TerminoItem key={item.termino} item={item} />)
      }
    </div>
  )
}

// ── Instrumentos ──────────────────────────────────────────────

function InstrumentoItem({ nombre, exp }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="border border-border rounded-xl overflow-hidden cursor-pointer hover:border-gray-600 transition-colors"
      onClick={() => setOpen(o => !o)}
    >
      <div className="flex items-center justify-between px-4 py-3 bg-card">
        <div className="flex items-center gap-2">
          <span className="text-lg">{exp.emoji}</span>
          <div>
            <span className="text-white text-sm font-medium">{nombre}</span>
            <span className="text-gray-600 text-xs ml-2">{exp.categoria}</span>
          </div>
        </div>
        <span className="text-gray-600 text-xs">{open ? '▲' : '▼'}</span>
      </div>
      {open && (
        <div className="px-4 pb-4 pt-3 bg-bg space-y-3">
          <p className="text-accent text-xs font-semibold italic">"{exp.tagline}"</p>
          <div>
            <p className="text-gray-500 text-xs font-semibold mb-1">¿Cómo funciona?</p>
            <p className="text-gray-300 text-xs leading-relaxed">{exp.como_funciona}</p>
          </div>
          <div className="bg-card rounded-lg p-3 border border-border">
            <span className="text-yellow-400 text-xs font-semibold">💡 Ejemplo: </span>
            <span className="text-gray-400 text-xs">{exp.ejemplo}</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <p className="text-gray-500 font-semibold mb-1">✅ Ventajas</p>
              <ul className="space-y-0.5">
                {exp.ventajas.map((v, i) => <li key={i} className="text-gray-400 flex gap-1"><span className="text-green-500">•</span>{v}</li>)}
              </ul>
            </div>
            <div>
              <p className="text-gray-500 font-semibold mb-1">❌ Desventajas</p>
              <ul className="space-y-0.5">
                {exp.desventajas.map((d, i) => <li key={i} className="text-gray-400 flex gap-1"><span className="text-red-500">•</span>{d}</li>)}
              </ul>
            </div>
          </div>
          <div className="flex gap-4 text-xs text-gray-500">
            <span>💰 {exp.minimo}</span>
            <span>📍 {exp.donde}</span>
          </div>
        </div>
      )}
    </div>
  )
}

function TabInstrumentos({ query }) {
  const todos = Object.entries(explicaciones)
  const filtrados = todos.filter(([nombre, exp]) =>
    !query || nombre.toLowerCase().includes(query.toLowerCase()) ||
    exp.tagline.toLowerCase().includes(query.toLowerCase()) ||
    exp.categoria.toLowerCase().includes(query.toLowerCase())
  )
  return (
    <div className="space-y-2">
      {filtrados.length === 0
        ? <p className="text-gray-600 text-sm text-center py-8">Sin resultados</p>
        : filtrados.map(([nombre, exp]) => <InstrumentoItem key={nombre} nombre={nombre} exp={exp} />)
      }
    </div>
  )
}

// ── Fuentes ───────────────────────────────────────────────────

function FuenteCard({ fuente }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <div
        className="flex items-start justify-between px-4 py-4 bg-card cursor-pointer hover:bg-gray-900 transition-colors"
        onClick={() => setOpen(o => !o)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-white font-semibold text-sm">{fuente.nombre}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full border ${
              fuente.requiere_key
                ? 'border-yellow-700 text-yellow-500 bg-yellow-900/20'
                : 'border-green-800 text-green-400 bg-green-900/20'
            }`}>
              {fuente.requiere_key ? '🔑 Requiere API key' : '🔓 Sin API key'}
            </span>
            <span className="text-xs text-gray-600 border border-gray-800 px-2 py-0.5 rounded-full">
              {fuente.tipo}
            </span>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {fuente.datos.map(d => (
              <span key={d} className="text-xs bg-bg text-gray-500 px-2 py-0.5 rounded border border-border">{d}</span>
            ))}
          </div>
        </div>
        <span className="text-gray-600 text-xs ml-3 mt-1 shrink-0">{open ? '▲' : '▼'}</span>
      </div>

      {open && (
        <div className="px-4 pb-4 pt-3 bg-bg space-y-4">
          <p className="text-gray-300 text-sm leading-relaxed">{fuente.descripcion}</p>

          <div className="space-y-2">
            <div className="flex items-start gap-2 text-xs">
              <CheckCircle size={13} className="text-green-400 mt-0.5 shrink-0" />
              <span className="text-gray-400"><span className="text-gray-300 font-medium">Frecuencia: </span>{fuente.frecuencia}</span>
            </div>
            {fuente.limitaciones && (
              <div className="flex items-start gap-2 text-xs">
                <AlertTriangle size={13} className="text-yellow-400 mt-0.5 shrink-0" />
                <span className="text-gray-400"><span className="text-gray-300 font-medium">Limitaciones: </span>{fuente.limitaciones}</span>
              </div>
            )}
            {fuente.nota_importante && (
              <div className="flex items-start gap-2 text-xs bg-yellow-900/10 border border-yellow-800/30 rounded-lg p-2">
                <AlertTriangle size={13} className="text-yellow-400 mt-0.5 shrink-0" />
                <span className="text-yellow-300">{fuente.nota_importante}</span>
              </div>
            )}
            {fuente.fuente_original && (
              <div className="flex items-start gap-2 text-xs">
                <Info size={13} className="text-blue-400 mt-0.5 shrink-0" />
                <span className="text-gray-400"><span className="text-gray-300 font-medium">Fuente original: </span>{fuente.fuente_original}</span>
              </div>
            )}
          </div>

          <div className="bg-card rounded-lg p-3 border border-border">
            <p className="text-gray-500 text-xs font-semibold mb-1">Endpoint de ejemplo:</p>
            <code className="text-accent text-xs font-mono break-all">{fuente.endpoint_ejemplo}</code>
          </div>

          <a
            href={fuente.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ExternalLink size={12} />
            Ver documentación
          </a>
        </div>
      )}
    </div>
  )
}

function TabFuentes() {
  return (
    <div className="space-y-3">
      <div className="bg-blue-950/20 border border-blue-900/30 rounded-xl p-4 text-sm text-blue-300">
        <p className="font-semibold mb-1">🔍 Transparencia total</p>
        <p className="text-blue-400 text-xs leading-relaxed">
          FinanceAI es 100% open source y usa únicamente APIs públicas y gratuitas.
          Ningún dato personal sale de tu dispositivo. El código fuente está disponible en{' '}
          <a href="https://github.com/BuccioFranco/financeai" target="_blank" rel="noopener noreferrer"
            className="text-blue-300 underline hover:text-white">
            github.com/BuccioFranco/financeai
          </a>.
        </p>
      </div>
      {FUENTES.map(f => <FuenteCard key={f.id} fuente={f} />)}
    </div>
  )
}

// ── Metodología ───────────────────────────────────────────────

function TabMetodologia() {
  return (
    <div className="space-y-4">
      <div className="bg-card border border-border rounded-xl p-4 text-sm text-gray-400">
        Esta sección explica cómo calculamos cada dato que mostramos en la app.
        La transparencia en los cálculos es fundamental para que puedas tomar decisiones informadas.
      </div>
      {METODOLOGIA.map(m => (
        <div key={m.titulo} className="border border-border rounded-xl overflow-hidden">
          <div className="px-4 py-3 bg-card">
            <p className="text-white font-semibold text-sm">{m.titulo}</p>
          </div>
          <div className="px-4 py-3 bg-bg space-y-2">
            <div className="bg-card rounded-lg p-3 border border-border font-mono text-xs text-accent break-all">
              {m.formula}
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">{m.descripcion}</p>
          </div>
        </div>
      ))}
      <div className="bg-yellow-900/10 border border-yellow-800/30 rounded-xl p-4">
        <p className="text-yellow-300 text-xs font-semibold mb-1">⚠️ Aviso legal</p>
        <p className="text-yellow-400/70 text-xs leading-relaxed">
          FinanceAI es una herramienta educativa e informativa. Los datos mostrados pueden tener
          retrasos o inexactitudes. Ningún contenido de esta app constituye asesoramiento financiero
          profesional. Antes de tomar decisiones de inversión, consultá con un asesor certificado
          por la CNV. Los rendimientos pasados no garantizan rendimientos futuros.
        </p>
      </div>
    </div>
  )
}

// ── Modal principal ───────────────────────────────────────────

export default function GlosarioModal({ onClose }) {
  const [tab, setTab] = useState('terminos')
  const [query, setQuery] = useState('')

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#0d1117] border border-border rounded-t-2xl sm:rounded-2xl w-full sm:max-w-2xl flex flex-col"
        style={{ maxHeight: '90vh', height: '90vh' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xl">📚</span>
            <div>
              <h2 className="text-white font-semibold text-base">Glosario & Fuentes</h2>
              <p className="text-gray-500 text-xs">Términos · Instrumentos · Datos · Metodología</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors p-1">
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border shrink-0 overflow-x-auto">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); setQuery('') }}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium whitespace-nowrap transition-all border-b-2 ${
                tab === t.id
                  ? 'text-accent border-accent'
                  : 'text-gray-500 border-transparent hover:text-gray-300'
              }`}
            >
              <span>{t.emoji}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Search (solo en terminos e instrumentos) */}
        {(tab === 'terminos' || tab === 'instrumentos') && (
          <div className="px-5 py-3 border-b border-border shrink-0">
            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={tab === 'terminos' ? 'Buscar término...' : 'Buscar instrumento...'}
                className="w-full bg-bg border border-border rounded-lg pl-8 pr-4 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {tab === 'terminos'     && <TabTerminos query={query} />}
          {tab === 'instrumentos' && <TabInstrumentos query={query} />}
          {tab === 'fuentes'      && <TabFuentes />}
          {tab === 'metodologia'  && <TabMetodologia />}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-border shrink-0 flex items-center justify-between">
          <p className="text-gray-700 text-xs">FinanceAI · Open Source · MIT License</p>
          <a
            href="https://github.com/BuccioFranco/financeai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            <ExternalLink size={11} />
            Ver en GitHub
          </a>
        </div>
      </div>
    </div>
  )
}
