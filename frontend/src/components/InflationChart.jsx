import React from 'react'
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { useMarketData, useComparison } from '../hooks/useMarketData.js'
import { useFinanceStore } from '../store/useFinanceStore.js'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-gray-900 border border-border rounded-lg p-3 text-xs">
      <p className="text-gray-400 mb-2">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: <span className="font-mono">{p.value?.toFixed(1)}%</span>
        </p>
      ))}
    </div>
  )
}

export default function InflationChart() {
  const { data: market } = useMarketData()
  const { monto } = useFinanceStore()
  const { data: compare } = useComparison(monto)

  const historico = market?.ipc_historico || []
  const tna = compare?.tna_pf || 40
  const ipc = compare?.inflacion_mensual || 5

  const chartData = historico.slice(0, 12).reverse().map((p) => {
    const tnaMensual = tna / 12
    const realMensual = ((1 + tnaMensual / 100) / (1 + p.valor / 100) - 1) * 100
    return {
      fecha: p.fecha?.slice(0, 7),
      ipc: p.valor,
      pf_nominal: parseFloat(tnaMensual.toFixed(2)),
      pf_real: parseFloat(realMensual.toFixed(2)),
    }
  })

  if (chartData.length === 0) {
    return (
      <div className="bg-card border border-border rounded-xl p-6 flex items-center justify-center h-64 text-gray-600 text-sm">
        Cargando datos de inflación...
      </div>
    )
  }

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <h3 className="text-sm font-semibold text-gray-300 mb-4">
        Inflación vs Plazo Fijo (últimos 12 meses)
      </h3>
      <ResponsiveContainer width="100%" height={240}>
        <ComposedChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
          <XAxis dataKey="fecha" tick={{ fill: '#6b7280', fontSize: 10 }} />
          <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} unit="%" />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: 11, color: '#9ca3af' }}
          />
          <ReferenceLine y={0} stroke="#374151" strokeDasharray="4 4" />
          <Bar dataKey="ipc" name="IPC mensual" fill="#f87171" opacity={0.6} radius={[2, 2, 0, 0]} />
          <Line
            type="monotone"
            dataKey="pf_nominal"
            name="PF nominal /mes"
            stroke="#fb923c"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="pf_real"
            name="PF real /mes"
            stroke="#dc2626"
            strokeWidth={2}
            strokeDasharray="5 3"
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
