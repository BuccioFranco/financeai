import React from 'react'
import AmountInput from '../components/AmountInput.jsx'
import InvestmentCard from '../components/InvestmentCard.jsx'
import InflationChart from '../components/InflationChart.jsx'
import { useFinanceStore } from '../store/useFinanceStore.js'
import { useComparison, useMarketData } from '../hooks/useMarketData.js'

function StatCard({ label, value, sub, color = 'text-white' }) {
  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <p className="text-gray-500 text-xs mb-1">{label}</p>
      <p className={`font-mono font-bold text-xl ${color}`}>{value ?? 'N/D'}</p>
      {sub && <p className="text-gray-600 text-xs mt-1">{sub}</p>}
    </div>
  )
}

export default function LabPage() {
  const { monto } = useFinanceStore()
  const { data: compare, isLoading } = useComparison(monto)
  const { data: market } = useMarketData()

  const pesos   = compare?.inversiones?.filter(i => i.tipo === 'pesos')   || []
  const dolares = compare?.inversiones?.filter(i => i.tipo === 'dolares') || []

  const fmt = (n, d = 0) => n != null ? Number(n).toLocaleString('es-AR', { maximumFractionDigits: d }) : 'N/D'

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-white mb-2">🔬 El Laboratorio</h1>
        <p className="text-gray-400">Datos de mercado en tiempo real · Actualizados cada 60 segundos</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard label="Dólar Blue" value={`$${fmt(market?.blue_venta)}`} color="text-blue-400" />
        <StatCard label="Dólar MEP" value={`$${fmt(market?.mep_venta)}`} color="text-blue-300" />
        <StatCard label="Dólar CCL" value={`$${fmt(market?.ccl)}`} color="text-blue-300" />
        <StatCard label="Dólar Oficial" value={`$${fmt(market?.oficial)}`} color="text-gray-400" />
        <StatCard
          label="IPC mensual"
          value={`${fmt(market?.ipc_mensual, 1)}%`}
          color={market?.ipc_mensual > 5 ? 'text-red-400' : 'text-yellow-400'}
          sub="último dato INDEC"
        />
        <StatCard label="BTC" value={`$${fmt(market?.btc_usd)}`} color="text-yellow-400" sub="USD" />
      </div>

      {/* Layout: gráfico + comparador */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <InflationChart />
          <div className="bg-card border border-border rounded-xl p-4 space-y-2">
            <p className="text-sm font-semibold text-gray-300 mb-3">📊 Datos adicionales</p>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">IPC 12 meses</span>
              <span className="font-mono text-orange-400">{fmt(market?.ipc_acumulada_12m, 1)}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">TNA Plazo Fijo est.</span>
              <span className="font-mono text-gray-300">{fmt(market?.tasa_pf_estimada, 1)}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">ETH</span>
              <span className="font-mono text-purple-400">USD {fmt(market?.eth_usd)}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="bg-card border border-border rounded-xl p-5">
            <h2 className="text-sm font-semibold text-gray-300 mb-4">Calculá tu inversión</h2>
            <AmountInput />
          </div>

          {isLoading ? (
            <div className="text-center text-gray-600 py-8">Calculando opciones...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-ars rounded-full" />
                  <h3 className="text-xs font-semibold text-ars uppercase tracking-wider">En Pesos</h3>
                </div>
                <div className="bg-green-950/10 rounded-xl p-2 space-y-2">
                  {pesos.map(inv => <InvestmentCard key={inv.nombre} inv={inv} />)}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-usd rounded-full" />
                  <h3 className="text-xs font-semibold text-usd uppercase tracking-wider">En Dólares</h3>
                </div>
                <div className="bg-blue-950/10 rounded-xl p-2 space-y-2">
                  {dolares.map(inv => <InvestmentCard key={inv.nombre} inv={inv} />)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
