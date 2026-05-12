import React, { useState, useMemo } from 'react'
import { ArrowLeftRight, Copy, Check } from 'lucide-react'
import { useMarketData } from '../hooks/useMarketData.js'

// ── Monedas de origen disponibles ──────────────────────────────
const MONEDAS_ORIGEN = [
  { value: 'ARS',       label: 'Pesos argentinos',  symbol: '$',   flag: '🇦🇷' },
  { value: 'USD_BLUE',  label: 'Dólar blue',         symbol: 'USD', flag: '💵' },
  { value: 'USD_MEP',   label: 'Dólar MEP',          symbol: 'USD', flag: '🏦' },
  { value: 'USD_CCL',   label: 'Dólar CCL',          symbol: 'USD', flag: '🔄' },
  { value: 'USD_OF',    label: 'Dólar oficial',      symbol: 'USD', flag: '🏛️' },
  { value: 'USD_MAY',   label: 'Dólar mayorista',    symbol: 'USD', flag: '📦' },
  { value: 'USD_TAR',   label: 'Dólar tarjeta',      symbol: 'USD', flag: '💳' },
  { value: 'EUR',       label: 'Euro',               symbol: '€',   flag: '🇪🇺' },
]

function fmtARS(n) {
  if (n == null || isNaN(n)) return '—'
  return Number(n).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function fmtUSD(n) {
  if (n == null || isNaN(n)) return '—'
  return Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function CopiarBtn({ texto }) {
  const [copiado, setCopiado] = useState(false)
  function copiar() {
    navigator.clipboard.writeText(texto).then(() => {
      setCopiado(true)
      setTimeout(() => setCopiado(false), 1500)
    })
  }
  return (
    <button onClick={copiar} className="text-gray-600 hover:text-gray-400 transition-colors p-1 rounded">
      {copiado ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
    </button>
  )
}

export default function CurrencyConverter() {
  const { data: market } = useMarketData()
  const [monto, setMonto] = useState('')
  const [monedaOrigen, setMonedaOrigen] = useState('ARS')

  // Tasas desde el backend
  const tasas = useMemo(() => {
    if (!market) return null
    const mep  = market.mep_venta   || null
    const blue = market.blue_venta  || null
    const ccl  = market.ccl         || null
    const of   = market.oficial     || null
    const may  = market.mayorista   || null
    const tar  = market.tarjeta     || null
    const eur_usd = market.eur_usd  || null
    return {
      ARS:      1,
      USD_BLUE: blue,
      USD_MEP:  mep,
      USD_CCL:  ccl,
      USD_OF:   of,
      USD_MAY:  may,
      USD_TAR:  tar,
      EUR:      eur_usd && mep ? eur_usd * mep : null,
      eur_usd,
    }
  }, [market])

  const montoNum = useMemo(() => {
    const clean = monto.replace(/\./g, '').replace(',', '.')
    const n = parseFloat(clean)
    return isNaN(n) ? null : n
  }, [monto])

  // Convertir montoNum desde monedaOrigen a ARS primero, luego a cada destino
  const enARS = useMemo(() => {
    if (!montoNum || !tasas) return null
    const tasa = tasas[monedaOrigen]
    if (!tasa) return null
    return monedaOrigen === 'ARS' ? montoNum : montoNum * tasa
  }, [montoNum, monedaOrigen, tasas])

  // Resultados de conversión
  const resultados = useMemo(() => {
    if (!enARS || !tasas) return []

    const destinos = [
      { key: 'USD_BLUE', label: 'Dólar blue',       flag: '💵', tipo: 'USD' },
      { key: 'USD_MEP',  label: 'Dólar MEP',        flag: '🏦', tipo: 'USD' },
      { key: 'USD_CCL',  label: 'Dólar CCL',        flag: '🔄', tipo: 'USD' },
      { key: 'USD_OF',   label: 'Dólar oficial',    flag: '🏛️', tipo: 'USD' },
      { key: 'USD_MAY',  label: 'Dólar mayorista',  flag: '📦', tipo: 'USD' },
      { key: 'USD_TAR',  label: 'Dólar tarjeta',    flag: '💳', tipo: 'USD' },
      { key: 'EUR',      label: 'Euro',             flag: '🇪🇺', tipo: 'EUR' },
      { key: 'ARS',      label: 'Pesos (ARS)',       flag: '🇦🇷', tipo: 'ARS' },
    ].filter(d => d.key !== monedaOrigen)

    return destinos.map(d => {
      const tasa = tasas[d.key]
      if (!tasa) return { ...d, valor: null, tasa: null }
      const valor = d.key === 'ARS' ? enARS : enARS / tasa
      return { ...d, valor, tasa }
    })
  }, [enARS, tasas, monedaOrigen])

  function handleMontoChange(e) {
    const raw = e.target.value.replace(/[^\d,.]/g, '')
    setMonto(raw)
  }

  function formatearMonto(n, tipo) {
    if (n == null) return '—'
    if (tipo === 'ARS') return `$ ${fmtARS(n)}`
    if (tipo === 'EUR') return `€ ${fmtUSD(n)}`
    return `USD ${fmtUSD(n)}`
  }

  const monedaInfo = MONEDAS_ORIGEN.find(m => m.value === monedaOrigen)
  const tasaOrigen = tasas?.[monedaOrigen]

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border flex items-center gap-2">
        <ArrowLeftRight size={16} className="text-accent" />
        <h2 className="text-white font-semibold">Conversor de monedas</h2>
        <span className="text-gray-600 text-xs ml-auto">Tasas en tiempo real</span>
      </div>

      <div className="p-5 space-y-5">
        {/* Input principal */}
        <div className="space-y-2">
          <label className="text-gray-500 text-xs">Ingresá el monto</label>
          <div className="flex gap-2">
            {/* Selector de moneda de origen */}
            <select
              value={monedaOrigen}
              onChange={e => setMonedaOrigen(e.target.value)}
              className="bg-bg border border-border rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-accent transition-colors shrink-0"
            >
              {MONEDAS_ORIGEN.map(m => (
                <option key={m.value} value={m.value}>
                  {m.flag} {m.label}
                </option>
              ))}
            </select>

            {/* Campo de monto */}
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-mono">
                {monedaInfo?.symbol}
              </span>
              <input
                type="text"
                inputMode="decimal"
                value={monto}
                onChange={handleMontoChange}
                placeholder="0"
                className="w-full bg-bg border border-border rounded-xl pl-8 pr-4 py-3 text-xl font-mono text-white focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>

          {/* Tasa de la moneda seleccionada */}
          {monedaOrigen !== 'ARS' && tasaOrigen && (
            <p className="text-gray-600 text-xs font-mono">
              1 {monedaInfo?.label} = ${fmtARS(tasaOrigen)} ARS
            </p>
          )}
        </div>

        {/* Presets rápidos */}
        <div className="flex gap-2 flex-wrap">
          {(monedaOrigen === 'ARS'
            ? [10000, 50000, 100000, 500000, 1000000]
            : [100, 500, 1000, 5000, 10000]
          ).map(p => (
            <button
              key={p}
              onClick={() => setMonto(p.toLocaleString('es-AR'))}
              className={`px-3 py-1 rounded-lg text-xs font-mono border transition-all ${
                montoNum === p
                  ? 'bg-accent/20 border-accent text-accent'
                  : 'border-border text-gray-500 hover:border-gray-500 hover:text-gray-300'
              }`}
            >
              {monedaInfo?.symbol}{p >= 1000000 ? `${p/1000000}M` : p >= 1000 ? `${p/1000}K` : p}
            </button>
          ))}
        </div>

        {/* Resultados */}
        {montoNum && enARS ? (
          <div className="space-y-2">
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">
              {monedaOrigen === 'ARS' ? 'Equivale a' : `= $ ${fmtARS(enARS)} ARS · Equivale a`}
            </p>

            <div className="space-y-1.5">
              {resultados.map(r => (
                <div
                  key={r.key}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-colors ${
                    r.valor == null
                      ? 'border-border/30 opacity-40'
                      : 'border-border bg-bg hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{r.flag}</span>
                    <div>
                      <p className="text-gray-300 text-sm">{r.label}</p>
                      {r.tasa && r.key !== 'ARS' && (
                        <p className="text-gray-600 text-xs font-mono">
                          {r.tipo === 'ARS' ? '' : `$${fmtARS(r.tasa)} por ${r.tipo === 'EUR' ? '€' : 'USD'}`}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white text-base">
                      {formatearMonto(r.valor, r.tipo)}
                    </span>
                    {r.valor != null && (
                      <CopiarBtn texto={r.valor?.toFixed(2)} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-700 text-sm">
            Ingresá un monto para ver las conversiones
          </div>
        )}

        {/* Nota de transparencia */}
        {market && (
          <div className="text-xs text-gray-700 space-y-0.5 border-t border-border pt-3">
            <p>Fuente: dolarapi.com (blue/MEP/CCL/oficial) · Yahoo Finance (EUR/USD)</p>
            <p>Última actualización: {market.dolar_updated
              ? new Date(market.dolar_updated).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
              : 'reciente'}</p>
          </div>
        )}
      </div>
    </div>
  )
}
