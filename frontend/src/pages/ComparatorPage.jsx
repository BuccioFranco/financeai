import React from 'react'
import AmountInput from '../components/AmountInput.jsx'
import InvestmentCard from '../components/InvestmentCard.jsx'
import CurrencyConverter from '../components/CurrencyConverter.jsx'
import { SkeletonCard } from '../components/ui/Skeleton.jsx'
import { useFinanceStore } from '../store/useFinanceStore.js'
import { useComparison, useMarketData } from '../hooks/useMarketData.js'

export default function ComparatorPage() {
  const { monto } = useFinanceStore()
  const { data: compare, isLoading } = useComparison(monto)
  const { data: market } = useMarketData()

  const pesos   = compare?.inversiones?.filter(i => i.tipo === 'pesos')   || []
  const dolares = compare?.inversiones?.filter(i => i.tipo === 'dolares') || []

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-white mb-2">⚖️ Comparar inversiones</h1>
        <p className="text-gray-400">
          Compará instrumentos de inversión y convertí monedas con tasas del día.
        </p>
      </div>

      {/* Datos de contexto rápidos */}
      {market && (
        <div className="flex flex-wrap gap-3 text-sm">
          {[
            { label: 'MEP',      value: `$${market.mep_venta?.toLocaleString('es-AR') ?? '—'}`,  color: 'text-blue-400' },
            { label: 'Blue',     value: `$${market.blue_venta?.toLocaleString('es-AR') ?? '—'}`, color: 'text-blue-300' },
            { label: 'CCL',      value: `$${market.ccl?.toLocaleString('es-AR') ?? '—'}`,        color: 'text-blue-300' },
            { label: 'Oficial',  value: `$${market.oficial?.toLocaleString('es-AR') ?? '—'}`,    color: 'text-gray-400' },
            { label: 'EUR/USD',  value: market.eur_usd ? `${market.eur_usd}` : '—',              color: 'text-yellow-400' },
            { label: 'IPC mes',  value: `${market.ipc_mensual?.toFixed(1) ?? '—'}%`,             color: market.ipc_mensual > 5 ? 'text-red-400' : 'text-yellow-400' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-card border border-border rounded-lg px-3 py-1.5">
              <span className="text-gray-500 text-xs">{label}: </span>
              <span className={`font-mono text-xs font-semibold ${color}`}>{value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Conversor de monedas */}
      <CurrencyConverter />

      {/* Separador */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-border" />
        <span className="text-gray-600 text-xs uppercase tracking-wider">Comparador de inversiones</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Input monto para inversiones */}
      <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
        <h3 className="text-gray-300 text-sm font-semibold">¿Cuánto querés invertir?</h3>
        <AmountInput />
      </div>

      {/* Grid inversiones */}
      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-2">{Array(4).fill(0).map((_,i) => <SkeletonCard key={i} />)}</div>
          <div className="space-y-2">{Array(4).fill(0).map((_,i) => <SkeletonCard key={i} />)}</div>
        </div>
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
        Rendimiento real = nominal descontando inflación INDEC · No constituye asesoramiento financiero
      </p>
    </div>
  )
}
