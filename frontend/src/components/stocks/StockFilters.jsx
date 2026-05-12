import React from 'react'
import { Search } from 'lucide-react'

export default function StockFilters({ search, onSearch, sector, onSector, sortBy, onSortBy, sectores }) {
  return (
    <div className="space-y-4">
      <div className="flex gap-3 flex-col sm:flex-row">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            value={search}
            onChange={e => onSearch(e.target.value)}
            placeholder="Buscar empresa o ticker... (AAPL, Apple, Tesla...)"
            className="w-full bg-card border border-border rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <select
          value={sortBy}
          onChange={e => onSortBy(e.target.value)}
          className="bg-card border border-border rounded-xl px-3 py-2.5 text-sm text-gray-300 focus:outline-none focus:border-accent transition-colors"
        >
          <option value="change_day_pct">Rendimiento hoy ↓</option>
          <option value="change_1m_pct">Rendimiento 1 mes ↓</option>
          <option value="price">Precio USD ↓</option>
          <option value="name">Nombre A→Z</option>
        </select>
      </div>

      <div className="flex gap-2 flex-wrap">
        {sectores.map(s => (
          <button
            key={s.id}
            onClick={() => onSector(s.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-all ${
              sector === s.id
                ? 'bg-accent text-black border-accent font-semibold'
                : 'border-border text-gray-500 hover:border-gray-500 hover:text-gray-300'
            }`}
          >
            <span>{s.emoji}</span>
            {s.label}
          </button>
        ))}
      </div>
    </div>
  )
}
