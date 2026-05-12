import React from 'react'
import AmountInput from '../components/AmountInput.jsx'
import InvestmentCard from '../components/InvestmentCard.jsx'
import { useFinanceStore } from '../store/useFinanceStore.js'
import { useComparison, useMarketData } from '../hooks/useMarketData.js'

export default function ComparatorPage() {
  const { monto } = useFinanceStore()
  const { data: compare, isLoading } = useComparison(monto)
  const { data: market } = useMarketData()

  const pesos   = compare?.inversiones?.filter(i => i.tipo === 'pesos')   || []
  const dolares = compare?.inversiones?.filter(i => i.tipo === 'dolares') || []
  const dolarMep = market?.mep_venta

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-white mb-2">⚖️ Comparar inversiones</h1>
        <p className="text-gray-400">
          Ingresá el monto y compará todas las opciones con rendimiento real descontando inflación.
        </p>
      </div>

      {/* Datos de contexto */}
      {market && (
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="bg-card border border-border rounded-lg px-4 py-2">
            <span className="text-gray-500">Dólar MEP: </span>
            <span className="font-mono text-blue-400">${dolarMep?.toLocaleString('es-AR') ?? 'N/D'}</span>
          </div>
          <div className="bg-card border border-border rounded-lg px-4 py-2">
            <span className="text-gray-500">IPC mensual: </span>
            <span className={`font-mono ${market.ipc_mensual > 5 ? 'text-red-400' : 'text-yellow-400'}`}>
              {market.ipc_mensual?.toFixed(1) ?? 'N/D'}%
            </span>
          </div>
          <div className="bg-card border border-border rounded-lg px-4 py-2">
            <span className="text-gray-500">TNA PF est.: </span>
            <span className="font-mono text-gray-300">{market.tasa_pf_estimada?.toFixed(1) ?? 'N/D'}%</span>
          </div>
        </div>
      )}

      <AmountInput />

      {isLoading ? (
        <div className="text-center text-gray-600 py-12">Calculando...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-ars rounded-full" />
              <h2 className="text-sm font-semibold text-ars uppercase tracking-wider">En Pesos (ARS)</h2>
              <div className="flex-1 h-px bg-green-900/30" />
            </div>
            <div className="bg-green-950/10 rounded-xl p-3 space-y-2">
              {pesos.map(inv => <InvestmentCard key={inv.nombre} inv={inv} />)}
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-usd rounded-full" />
              <h2 className="text-sm font-semibold text-usd uppercase tracking-wider">En Dólares (USD)</h2>
              <div className="flex-1 h-px bg-blue-900/30" />
            </div>
            <div className="bg-blue-950/10 rounded-xl p-3 space-y-2">
              {dolares.map(inv => <InvestmentCard key={inv.nombre} inv={inv} />)}
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-gray-700 text-center">
        Rendimiento real = rendimiento nominal descontando inflación mensual estimada del INDEC.
        No constituye asesoramiento financiero.
      </p>
    </div>
  )
}
