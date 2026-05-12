import React from 'react'
import { X } from 'lucide-react'
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import { useNavigate } from 'react-router-dom'

export default function StockDetailModal({ stock, priceData, onClose }) {
  const navigate = useNavigate()
  const closes = priceData?.closes_1m || []
  const firstClose = closes[0] || 0
  const lastClose  = closes[closes.length - 1] || 0
  const trend = lastClose >= firstClose ? 'up' : 'down'

  const chartData = closes.map((c, i) => ({ day: i + 1, price: c }))

  function handleAsistente() {
    onClose()
    navigate('/asistente', {
      state: { preloadedMessage: `Dame un análisis de ${stock.ticker} - ${stock.name}. ¿Conviene comprar ${stock.cedear ? `Cedears de ${stock.ticker}` : `acciones de ${stock.ticker}`} ahora para invertir desde Argentina?` }
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#111827] border border-border rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{stock.emoji}</span>
            <div>
              <h3 className="text-white font-bold">{stock.ticker}</h3>
              <p className="text-gray-400 text-sm">{stock.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Precio principal */}
          {priceData?.price && (
            <div className="flex items-end justify-between">
              <div>
                <p className="font-mono font-bold text-white text-3xl">
                  ${priceData.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
                <p className={`text-sm font-mono mt-1 ${priceData.change_day_pct >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {priceData.change_day_pct >= 0 ? '↑' : '↓'} {Math.abs(priceData.change_day_pct).toFixed(2)}% hoy
                </p>
              </div>
              <div className="text-right text-sm text-gray-500">
                <p>{priceData.currency} · {priceData.exchange}</p>
              </div>
            </div>
          )}

          {/* Gráfico últimos 20 días */}
          {chartData.length > 2 && (
            <div>
              <p className="text-xs text-gray-500 mb-2">Últimos {chartData.length} días de trading</p>
              <ResponsiveContainer width="100%" height={100}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={trend === 'up' ? '#4ade80' : '#f87171'} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={trend === 'up' ? '#4ade80' : '#f87171'} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke={trend === 'up' ? '#4ade80' : '#f87171'}
                    strokeWidth={1.5}
                    fill="url(#colorPrice)"
                    dot={false}
                  />
                  <Tooltip
                    contentStyle={{ background: '#1f2937', border: 'none', borderRadius: '8px', fontSize: '12px' }}
                    formatter={v => [`$${v.toFixed(2)}`, '']}
                    labelFormatter={() => ''}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Tabla stats */}
          <div className="grid grid-cols-2 gap-2 text-sm">
            {[
              ['Variación hoy', `${priceData?.change_day_pct >= 0 ? '+' : ''}${priceData?.change_day_pct?.toFixed(2)}%`],
              ['Variación 1 mes', `${priceData?.change_1m_pct >= 0 ? '+' : ''}${priceData?.change_1m_pct?.toFixed(1)}%`],
              ['Máximo 1 mes', priceData?.high_1m ? `$${priceData.high_1m.toFixed(2)}` : 'N/D'],
              ['Mínimo 1 mes',  priceData?.low_1m  ? `$${priceData.low_1m.toFixed(2)}`  : 'N/D'],
            ].map(([label, value]) => (
              <div key={label} className="bg-bg rounded-lg p-3">
                <p className="text-gray-500 text-xs">{label}</p>
                <p className="font-mono text-white mt-0.5">{value ?? 'N/D'}</p>
              </div>
            ))}
          </div>

          {/* Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Sector:</span>
              <span className="text-gray-300 capitalize">{stock.sector}</span>
              <span className="text-gray-500">·</span>
              <span className="text-gray-300">{stock.subsector}</span>
            </div>
            {stock.cedear && (
              <div className="bg-blue-950/20 border border-blue-900/30 rounded-lg p-3">
                <p className="text-blue-300 text-sm font-medium mb-1">🇦🇷 Disponible como CEDEAR en Argentina</p>
                <p className="text-gray-500 text-xs">IOL · PPI · Balanz · Bull Market · Cocos</p>
              </div>
            )}
            {stock.country === 'ARG' && (
              <div className="bg-green-950/20 border border-green-900/30 rounded-lg p-3">
                <p className="text-ars text-sm font-medium">🇦🇷 Cotiza directamente en BYMA (Bolsa Argentina)</p>
              </div>
            )}
          </div>
        </div>

        <div className="p-5 border-t border-border">
          <button
            onClick={handleAsistente}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-accent/10 border border-accent/50 text-accent hover:bg-accent/20 transition-colors text-sm font-medium"
          >
            🤖 Preguntarle al asistente sobre {stock.ticker}
          </button>
        </div>
      </div>
    </div>
  )
}
