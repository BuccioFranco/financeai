import React, { useState, useMemo } from 'react'
import { STOCKS, SECTORES } from '../data/stocks.js'
import StockFilters from '../components/stocks/StockFilters.jsx'
import StockCard from '../components/stocks/StockCard.jsx'
import ComparisonPanel from '../components/stocks/ComparisonPanel.jsx'
import StockDetailModal from '../components/stocks/StockDetailModal.jsx'
import { useStockPrices } from '../hooks/useStockPrices.js'

const PAGE_SIZE = 20

export default function StocksPage() {
  const [search, setSearch]           = useState('')
  const [sector, setSector]           = useState('todos')
  const [sortBy, setSortBy]           = useState('change_day_pct')
  const [selected, setSelected]       = useState([])
  const [detailStock, setDetailStock] = useState(null)
  const [page, setPage]               = useState(1)

  const filtered = useMemo(() => {
    return STOCKS.filter(s =>
      (sector === 'todos' || s.sector === sector) &&
      (s.name.toLowerCase().includes(search.toLowerCase()) ||
       s.ticker.toLowerCase().includes(search.toLowerCase()))
    )
  }, [search, sector])

  const visibleTickers = filtered.slice(0, page * PAGE_SIZE).map(s => s.ticker)
  const { data: prices = {}, isLoading } = useStockPrices(visibleTickers)

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const pa = prices[a.ticker], pb = prices[b.ticker]
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (!pa?.price && !pb?.price) return 0
      if (!pa?.price) return 1
      if (!pb?.price) return -1
      if (sortBy === 'change_day_pct') return (pb.change_day_pct ?? 0) - (pa.change_day_pct ?? 0)
      if (sortBy === 'change_1m_pct')  return (pb.change_1m_pct  ?? 0) - (pa.change_1m_pct  ?? 0)
      if (sortBy === 'price')          return (pb.price ?? 0) - (pa.price ?? 0)
      return 0
    })
  }, [filtered, prices, sortBy])

  function toggleSelect(ticker) {
    setSelected(prev =>
      prev.includes(ticker) ? prev.filter(t => t !== ticker) : [...prev, ticker].slice(0, 5)
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-32">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-white mb-2">📈 Explorador de acciones</h1>
        <p className="text-gray-400">
          {STOCKS.length} empresas · Precios en tiempo real de Yahoo Finance ·
          Los marcados con <span className="text-blue-400">CEDEAR</span> se compran en pesos desde Argentina
        </p>
      </div>

      {selected.length > 0 && (
        <div className="mb-4 flex items-center gap-2 text-sm text-accent">
          <span>⚖️ {selected.length} seleccionada{selected.length > 1 ? 's' : ''} para comparar</span>
          {selected.length < 2 && <span className="text-gray-500">— seleccioná al menos 2 para comparar</span>}
          <button onClick={() => setSelected([])} className="text-gray-500 hover:text-white ml-2 text-xs">
            Limpiar
          </button>
        </div>
      )}

      <StockFilters
        search={search} onSearch={s => { setSearch(s); setPage(1) }}
        sector={sector} onSector={s => { setSector(s); setPage(1) }}
        sortBy={sortBy} onSortBy={setSortBy}
        sectores={SECTORES}
      />

      <p className="text-gray-600 text-xs mt-3 mb-4">
        Mostrando {Math.min(sorted.length, page * PAGE_SIZE)} de {sorted.length} resultados
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sorted.slice(0, page * PAGE_SIZE).map(stock => (
          <StockCard
            key={stock.ticker}
            stock={stock}
            priceData={prices[stock.ticker]}
            isLoading={isLoading && !prices[stock.ticker]}
            isSelected={selected.includes(stock.ticker)}
            onToggleSelect={() => toggleSelect(stock.ticker)}
            onDetail={() => setDetailStock(stock)}
          />
        ))}
      </div>

      {sorted.length > page * PAGE_SIZE && (
        <div className="text-center mt-8">
          <button
            onClick={() => setPage(p => p + 1)}
            className="px-6 py-2.5 rounded-xl border border-border text-gray-400 hover:border-accent hover:text-accent transition-colors text-sm"
          >
            Cargar más ({sorted.length - page * PAGE_SIZE} restantes)
          </button>
        </div>
      )}

      {selected.length >= 2 && (
        <ComparisonPanel
          selectedTickers={selected}
          stocks={STOCKS}
          prices={prices}
          onClear={() => setSelected([])}
        />
      )}

      {detailStock && (
        <StockDetailModal
          stock={detailStock}
          priceData={prices[detailStock.ticker]}
          onClose={() => setDetailStock(null)}
        />
      )}
    </div>
  )
}
