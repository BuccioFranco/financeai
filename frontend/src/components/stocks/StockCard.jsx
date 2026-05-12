import React from 'react'

function PriceSkeleton() {
  return (
    <div className="animate-pulse space-y-2">
      <div className="h-6 bg-gray-800 rounded w-24" />
      <div className="h-4 bg-gray-800 rounded w-16" />
    </div>
  )
}

export default function StockCard({ stock, priceData, isLoading, isSelected, onToggleSelect, onDetail }) {
  const price = priceData?.price
  const changeDay = priceData?.change_day_pct ?? 0
  const change1m  = priceData?.change_1m_pct  ?? 0
  const high1m    = priceData?.high_1m
  const pricePct  = high1m && price ? Math.round((price / high1m) * 100) : 0

  return (
    <div
      className={`rounded-xl border p-4 transition-all flex flex-col gap-3 ${
        isSelected
          ? 'border-accent bg-accent/5'
          : 'border-border bg-card hover:border-gray-600'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggleSelect}
            className="accent-cyan-400 w-4 h-4 cursor-pointer"
          />
          <div>
            <p className="font-mono font-bold text-white text-sm">{stock.ticker}</p>
            <p className="text-xs text-gray-500">{stock.country === 'ARG' ? '🇦🇷' : '🌐'} {stock.subsector}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {stock.cedear && (
            <span className="text-xs px-1.5 py-0.5 rounded bg-blue-900/40 text-blue-400 border border-blue-900/50">
              CEDEAR
            </span>
          )}
          {stock.country === 'ARG' && (
            <span className="text-xs px-1.5 py-0.5 rounded bg-green-900/40 text-ars border border-green-900/50">
              BYMA
            </span>
          )}
        </div>
      </div>

      {/* Nombre */}
      <div className="flex items-center gap-2">
        <span className="text-2xl">{stock.emoji}</span>
        <span className="text-gray-300 text-sm font-medium leading-tight">{stock.name}</span>
      </div>

      {/* Precio */}
      {isLoading && !price ? (
        <PriceSkeleton />
      ) : price ? (
        <div>
          <p className="font-mono font-bold text-white text-xl">
            ${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            <span className="text-gray-500 text-xs ml-1">USD</span>
          </p>
          <div className="flex gap-3 mt-1">
            <span className={`text-xs font-mono ${changeDay >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {changeDay >= 0 ? '↑' : '↓'} {Math.abs(changeDay).toFixed(2)}% hoy
            </span>
            <span className={`text-xs font-mono ${change1m >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {change1m >= 0 ? '+' : ''}{change1m.toFixed(1)}% 1m
            </span>
          </div>
        </div>
      ) : (
        <p className="text-gray-600 text-xs">Precio no disponible</p>
      )}

      {/* Barra precio vs máximo 1m */}
      {high1m && price && (
        <div>
          <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent/60 rounded-full transition-all"
              style={{ width: `${Math.min(pricePct, 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-600 mt-0.5">Máx 1m: ${high1m.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
        </div>
      )}

      {/* Botones */}
      <div className="flex gap-2 mt-auto pt-1">
        <button
          onClick={onDetail}
          className="flex-1 py-1.5 rounded-lg border border-border text-gray-400 hover:border-accent hover:text-accent transition-colors text-xs"
        >
          📊 Ver detalle
        </button>
        <button
          onClick={onToggleSelect}
          className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            isSelected
              ? 'bg-accent/20 border border-accent text-accent'
              : 'border border-border text-gray-500 hover:border-gray-400'
          }`}
        >
          {isSelected ? '✓ Seleccionado' : '+ Comparar'}
        </button>
      </div>
    </div>
  )
}
