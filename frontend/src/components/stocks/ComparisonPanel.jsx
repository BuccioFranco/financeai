import React from 'react'
import { X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function ComparisonPanel({ selectedTickers, stocks, prices, onClear }) {
  const navigate = useNavigate()
  const selectedStocks = selectedTickers.map(t => stocks.find(s => s.ticker === t)).filter(Boolean)

  const best1m = selectedTickers.reduce((best, t) => {
    const pct = prices[t]?.change_1m_pct ?? -Infinity
    return pct > (prices[best]?.change_1m_pct ?? -Infinity) ? t : best
  }, selectedTickers[0])

  function handleAsistente() {
    const msg = `Analizá y comparame estas acciones para invertir desde Argentina:\n${
      selectedStocks.map(s => `- ${s.ticker} (${s.name})`).join('\n')
    }\n¿Cuál conviene más hoy y por qué? Considerá el contexto del mercado argentino.`
    navigate('/asistente', { state: { preloadedMessage: msg } })
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0d1117] border-t border-border shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-semibold flex items-center gap-2">
            ⚖️ Comparación
            <span className="text-xs text-gray-500 font-normal">({selectedTickers.length} seleccionadas)</span>
          </h3>
          <button onClick={onClear} className="text-gray-500 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[500px]">
            <thead>
              <tr className="border-b border-border">
                <td className="pb-2 text-gray-500 text-xs">Métrica</td>
                {selectedStocks.map(s => (
                  <td key={s.ticker} className="pb-2 text-center">
                    <span className="text-xl">{s.emoji}</span>
                    <p className="font-mono font-bold text-white text-xs">{s.ticker}</p>
                    <p className="text-gray-600 text-xs truncate max-w-20">{s.name.split(' ')[0]}</p>
                  </td>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {[
                { label: 'Precio USD', key: 'price', fmt: v => v ? `$${v.toFixed(2)}` : 'N/D' },
                { label: 'Hoy', key: 'change_day_pct', fmt: v => v != null ? `${v >= 0 ? '+' : ''}${v.toFixed(2)}%` : 'N/D', color: v => v >= 0 ? 'text-green-400' : 'text-red-400' },
                { label: '1 mes', key: 'change_1m_pct', fmt: v => v != null ? `${v >= 0 ? '+' : ''}${v.toFixed(1)}%` : 'N/D', color: v => v >= 0 ? 'text-green-400' : 'text-red-400' },
              ].map(row => (
                <tr key={row.label}>
                  <td className="py-1.5 text-gray-500 text-xs pr-4">{row.label}</td>
                  {selectedStocks.map(s => {
                    const val = prices[s.ticker]?.[row.key]
                    return (
                      <td key={s.ticker} className={`py-1.5 text-center font-mono text-xs ${row.color ? row.color(val) : 'text-gray-300'}`}>
                        {row.fmt(val)}
                      </td>
                    )
                  })}
                </tr>
              ))}
              <tr>
                <td className="py-1.5 text-gray-500 text-xs">Cedear AR</td>
                {selectedStocks.map(s => (
                  <td key={s.ticker} className="py-1.5 text-center text-xs">
                    {s.cedear ? '✅' : '—'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-1.5 text-gray-500 text-xs">Mejor 1m</td>
                {selectedStocks.map(s => (
                  <td key={s.ticker} className="py-1.5 text-center text-xs">
                    {s.ticker === best1m ? '⭐' : ''}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <button
          onClick={handleAsistente}
          className="mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-accent/10 border border-accent/30 text-accent text-sm hover:bg-accent/20 transition-colors"
        >
          🤖 Pedirle análisis al asistente IA
        </button>
      </div>
    </div>
  )
}
