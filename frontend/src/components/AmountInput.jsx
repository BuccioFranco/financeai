import React, { useState, useEffect, useCallback } from 'react'
import { useFinanceStore } from '../store/useFinanceStore.js'
import { useMarketData } from '../hooks/useMarketData.js'

const PRESETS = [10000, 50000, 100000, 500000, 1000000, 5000000]

function fmtARS(n) {
  return Number(n).toLocaleString('es-AR', { maximumFractionDigits: 0 })
}

export default function AmountInput() {
  const { monto, setMonto } = useFinanceStore()
  const { data: market } = useMarketData()
  const [raw, setRaw] = useState(fmtARS(monto))

  const dolarMep = market?.mep_venta || 1200
  const usd = monto > 0 ? Math.round(monto / dolarMep) : 0

  useEffect(() => {
    setRaw(fmtARS(monto))
  }, [monto])

  function handleChange(e) {
    const digits = e.target.value.replace(/\D/g, '')
    setRaw(digits ? fmtARS(Number(digits)) : '')
    if (digits) setMonto(Number(digits))
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-gray-400 font-mono">$</span>
        <input
          className="bg-card border border-border rounded-xl pl-10 pr-6 py-4 text-3xl font-mono text-white w-72 text-center focus:outline-none focus:border-accent transition-colors"
          value={raw}
          onChange={handleChange}
          placeholder="100.000"
        />
      </div>
      <p className="text-gray-500 text-sm font-mono">
        = USD {fmtARS(usd)} al MEP
      </p>
      <div className="flex gap-2 flex-wrap justify-center">
        {PRESETS.map((p) => (
          <button
            key={p}
            onClick={() => setMonto(p)}
            className={`px-3 py-1.5 rounded-lg text-sm font-mono border transition-all ${
              monto === p
                ? 'bg-accent/20 border-accent text-accent'
                : 'border-border text-gray-400 hover:border-gray-500'
            }`}
          >
            {p >= 1000000 ? `${p / 1000000}M` : `${p / 1000}K`}
          </button>
        ))}
      </div>
    </div>
  )
}
