import React, { useState } from 'react'
import { Wallet, Shield, DollarSign, FileText, TrendingUp, BarChart2, Zap, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'
import RiskBar from './RiskBar.jsx'
import { useFinanceStore } from '../store/useFinanceStore.js'

const ICONS = {
  wallet: Wallet,
  shield: Shield,
  'dollar-sign': DollarSign,
  'file-text': FileText,
  'trending-up': TrendingUp,
  'bar-chart-2': BarChart2,
  zap: Zap,
  bank: Shield,
}

function fmtARS(n) {
  if (n == null) return null
  return Number(n).toLocaleString('es-AR', { maximumFractionDigits: 0 })
}

function fmtUSD(n) {
  if (n == null) return null
  return Number(n).toLocaleString('en-US', { maximumFractionDigits: 0 })
}

export default function InvestmentCard({ inv }) {
  const [expanded, setExpanded] = useState(false)
  const { sendPrompt } = useFinanceStore()

  const Icon = ICONS[inv.icono] || Wallet
  const isPositive = inv.rendimiento_real >= 0
  const esPesos = inv.tipo === 'pesos'

  return (
    <div
      className="bg-card border border-border rounded-xl p-4 cursor-pointer hover:border-gray-600 transition-all"
      onClick={() => setExpanded((x) => !x)}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${esPesos ? 'bg-green-900/30' : 'bg-blue-900/30'}`}>
            <Icon size={16} className={esPesos ? 'text-ars' : 'text-usd'} />
          </div>
          <div>
            <p className="text-sm font-semibold text-white leading-tight">{inv.nombre}</p>
            <span
              className={`text-xs px-1.5 py-0.5 rounded font-mono ${
                esPesos ? 'bg-green-900/40 text-ars' : 'bg-blue-900/40 text-usd'
              }`}
            >
              {esPesos ? 'ARS' : 'USD'}
            </span>
          </div>
        </div>
        <div className="text-right">
          <p
            className={`text-xl font-mono font-bold leading-tight ${
              isPositive ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {isPositive ? '↑' : '↓'} {Math.abs(inv.rendimiento_real).toFixed(1)}%
          </p>
          <p className="text-xs text-gray-500">real anual</p>
        </div>
      </div>

      <RiskBar level={inv.riesgo} />

      <div className="mt-3 flex justify-between items-center text-xs text-gray-500">
        <span>🕐 {inv.liquidez}</span>
        {inv.monto_final_ars && (
          <span className="font-mono text-gray-400">
            → ${fmtARS(inv.monto_final_ars)}
          </span>
        )}
        {inv.monto_final_usd && (
          <span className="font-mono text-gray-400">
            → USD {fmtUSD(inv.monto_final_usd)}
          </span>
        )}
      </div>

      {expanded && (
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-sm text-gray-400 mb-2">{inv.descripcion}</p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>TNA nominal: <span className="font-mono text-gray-300">{inv.tna_nominal}%</span></span>
            <button
              className="flex items-center gap-1 text-accent hover:text-cyan-300 transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                sendPrompt(`Explicame en detalle qué es "${inv.nombre}" y si conviene para mi situación actual`)
              }}
            >
              <HelpCircle size={12} />
              ¿Qué es esto?
            </button>
          </div>
        </div>
      )}

      <div className="mt-2 flex justify-center">
        {expanded ? (
          <ChevronUp size={14} className="text-gray-600" />
        ) : (
          <ChevronDown size={14} className="text-gray-600" />
        )}
      </div>
    </div>
  )
}
