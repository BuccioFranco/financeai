import React, { useState } from 'react'
import { objetivos, recomendaciones } from '../data/explicaciones.js'
import InstrumentosExplorer from '../components/InstrumentosExplorer.jsx'
import { SkeletonTable } from '../components/ui/Skeleton.jsx'
import { useComparison } from '../hooks/useMarketData.js'
import { useFinanceStore } from '../store/useFinanceStore.js'

const RIESGO_LABEL = ['', 'Muy bajo', 'Bajo', 'Moderado', 'Alto', 'Muy alto']
const RIESGO_COLOR = ['', 'text-green-400', 'text-lime-400', 'text-yellow-400', 'text-orange-400', 'text-red-400']
const RIESGO_MAP = {
  "Plazo fijo tradicional": 1, "Plazo fijo UVA": 1, "FCI Money Market": 1, "Caución bursátil": 1,
  "LECAP": 1, "BONCAP": 2, "LECER / Bono CER": 2, "FCI Renta Fija": 2,
  "Dólar MEP": 2, "Dólar CCL": 2, "ON dolarizada (corp.)": 3, "FCI Renta Mixta": 3,
  "Bono dollar-linked": 3, "Cheques de pago diferido (CHEPED)": 3,
  "Fideicomiso inmobiliario": 3, "Bono soberano USD (AL30/GD30)": 4,
  "Cedears (acciones USA)": 4, "CEDEARs de ETFs (SPY/QQQ)": 4, "Oro (GLD CEDEAR)": 3,
  "FCI Renta Variable": 4, "Acciones Merval": 5,
}

export default function BussolePage() {
  const [objetivoSeleccionado, setObjetivoSeleccionado] = useState(
    localStorage.getItem('financeai_objetivo') || null
  )
  const { monto } = useFinanceStore()
  const { data: compare, isLoading: compareLoading } = useComparison(monto)

  const inversiones = compare?.inversiones || []
  const instrumentosRecomendados = objetivoSeleccionado
    ? recomendaciones[objetivoSeleccionado] || []
    : []

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12">

      <div>
        <h1 className="text-3xl font-semibold text-white mb-2">🧭 La Brújula</h1>
        <p className="text-gray-400">Entendé tu dinero antes de moverlo</p>
      </div>

      {/* Sección 1: Objetivo */}
      <section className="space-y-5">
        <h2 className="text-lg font-semibold text-gray-200">¿Qué querés lograr con tu plata?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {objetivos.map(obj => (
            <button
              key={obj.id}
              onClick={() => {
                setObjetivoSeleccionado(obj.id)
                localStorage.setItem('financeai_objetivo', obj.id)
              }}
              className={`group rounded-xl p-5 text-left transition-all border ${
                objetivoSeleccionado === obj.id
                  ? 'border-accent bg-accent/5'
                  : 'border-border hover:border-gray-600 bg-card'
              }`}
            >
              <div className="text-3xl mb-2">{obj.emoji}</div>
              <h3 className={`font-semibold mb-1 transition-colors ${
                objetivoSeleccionado === obj.id ? 'text-accent' : 'text-white'
              }`}>{obj.titulo}</h3>
              <p className="text-gray-500 text-sm">{obj.descripcion}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Sección 2: Tabla rendimientos reales */}
      {compareLoading && !compare ? (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-200">¿Cuánto rinde cada opción hoy?</h2>
          <SkeletonTable />
        </section>
      ) : inversiones.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-200">¿Cuánto rinde cada opción hoy?</h2>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-3 text-gray-500 font-medium">Instrumento</th>
                  <th className="text-right px-4 py-3 text-gray-500 font-medium">TNA nominal</th>
                  <th className="text-right px-4 py-3 text-gray-500 font-medium">Rendimiento real</th>
                  <th className="text-right px-4 py-3 text-gray-500 font-medium hidden sm:table-cell">Riesgo</th>
                  <th className="text-right px-4 py-3 text-gray-500 font-medium hidden md:table-cell">Liquidez</th>
                </tr>
              </thead>
              <tbody>
                {inversiones.map((inv) => {
                  const esRecomendado = instrumentosRecomendados.includes(inv.nombre)
                  const riesgo = RIESGO_MAP[inv.nombre] || 3
                  return (
                    <tr
                      key={inv.nombre}
                      className={`border-b border-border/50 transition-colors ${
                        esRecomendado ? 'bg-accent/5' : 'hover:bg-white/2'
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {esRecomendado && <span className="text-accent text-xs">★</span>}
                          <span className="text-white">{inv.nombre}</span>
                          <span className={`text-xs px-1.5 py-0.5 rounded ${
                            inv.tipo === 'pesos' ? 'bg-green-900/30 text-ars' : 'bg-blue-900/30 text-usd'
                          }`}>
                            {inv.tipo === 'pesos' ? 'ARS' : 'USD'}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-gray-300">
                        {inv.tna_nominal > 0 ? `${inv.tna_nominal}%` : '—'}
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-bold">
                        <span className={inv.rendimiento_real >= 0 ? 'text-green-400' : 'text-red-400'}>
                          {inv.rendimiento_real >= 0 ? '↑' : '↓'} {Math.abs(inv.rendimiento_real).toFixed(1)}%
                        </span>
                      </td>
                      <td className={`px-4 py-3 text-right text-xs hidden sm:table-cell ${RIESGO_COLOR[riesgo]}`}>
                        {RIESGO_LABEL[riesgo]}
                      </td>
                      <td className="px-4 py-3 text-right text-xs text-gray-500 hidden md:table-cell">
                        {inv.liquidez}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-600">
            ★ = recomendado para tu objetivo · Rendimiento real = nominal descontada inflación
          </p>
        </section>
      )}

      {/* Sección 3: Explorador completo */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-200">Diccionario de instrumentos financieros</h2>
        <InstrumentosExplorer />
      </section>

    </div>
  )
}
