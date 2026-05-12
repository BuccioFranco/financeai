import React from 'react'
import { useMarketData } from '../hooks/useMarketData.js'

function fmt(n, decimals = 0) {
  if (n == null) return '...'
  return Number(n).toLocaleString('es-AR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

export default function MarketTicker() {
  const { data } = useMarketData()

  const items = data ? [
    { label: '💵 Oficial',   value: `$${fmt(data.oficial)}`,    color: 'text-gray-300' },
    { label: '💵 Blue',      value: `$${fmt(data.blue_venta)}`, color: 'text-blue-400' },
    { label: '🏦 MEP',       value: `$${fmt(data.mep_venta)}`,  color: 'text-blue-300' },
    { label: '🔄 CCL',       value: `$${fmt(data.ccl)}`,        color: 'text-blue-300' },
    { label: '🏛️ Mayorista', value: `$${fmt(data.mayorista)}`,  color: 'text-gray-400' },
    { label: '💳 Tarjeta',   value: `$${fmt(data.tarjeta)}`,    color: 'text-purple-400' },
    {
      label: '📈 IPC',
      value: `${fmt(data.ipc_mensual, 1)}%`,
      color: (data.ipc_mensual ?? 0) > 5 ? 'text-red-400' : 'text-yellow-400',
    },
    { label: '📊 IPC 12m',   value: `${fmt(data.ipc_acumulada_12m, 1)}%`, color: 'text-orange-400' },
    {
      label: '🌡️ Riesgo País',
      value: data.riesgo_pais ? `${data.riesgo_pais} pts` : '...',
      color: (data.riesgo_pais ?? 0) > 800 ? 'text-red-400' : (data.riesgo_pais ?? 0) > 400 ? 'text-yellow-400' : 'text-green-400',
    },
    { label: '₿ BTC', value: `USD ${fmt(data.btc_usd)}`, color: 'text-yellow-400' },
    { label: '⟠ ETH', value: `USD ${fmt(data.eth_usd)}`, color: 'text-purple-400' },
  ] : Array(6).fill({ label: '●', value: '···', color: 'text-gray-700' })

  const doubled = [...items, ...items]

  return (
    <div className="bg-[#080c14] border-b border-border overflow-hidden h-9 flex items-center">
      <div className="ticker-track flex gap-10 whitespace-nowrap text-xs">
        {doubled.map((item, i) => (
          <span key={i} className="flex gap-1.5 items-center">
            <span className="text-gray-600">{item.label}</span>
            <span className={`font-mono font-semibold ${item.color}`}>{item.value}</span>
            <span className="text-gray-800 ml-4">|</span>
          </span>
        ))}
      </div>
    </div>
  )
}
