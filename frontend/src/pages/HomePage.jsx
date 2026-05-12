import React, { useMemo } from 'react'
import { TrendingUp, GraduationCap } from 'lucide-react'
import MarketTicker from '../components/MarketTicker.jsx'
import AmountInput from '../components/AmountInput.jsx'
import InvestmentCard from '../components/InvestmentCard.jsx'
import InflationChart from '../components/InflationChart.jsx'
import ChatAssistant from '../components/ChatAssistant.jsx'
import InstrumentosExplorer from '../components/InstrumentosExplorer.jsx'
import GlosarioSection from '../components/GlosarioSection.jsx'
import { useFinanceStore } from '../store/useFinanceStore.js'
import { useComparison } from '../hooks/useMarketData.js'
import { useChatStatus } from '../hooks/useMarketData.js'

export default function HomePage({ onOpenOnboarding }) {
  const { monto } = useFinanceStore()
  const { data: compare, isLoading } = useComparison(monto)
  const { data: status } = useChatStatus()

  const objetivoGuardado = localStorage.getItem('financeai_objetivo')
  const instrumentoGuardado = localStorage.getItem('financeai_instrumento')

  const inversiones = compare?.inversiones || []

  const pesos = useMemo(() => {
    const base = inversiones.filter((i) => i.tipo === 'pesos')
    if (objetivoGuardado && instrumentoGuardado) {
      return [...base].sort((a, b) =>
        a.nombre === instrumentoGuardado ? -1 : b.nombre === instrumentoGuardado ? 1 : 0
      )
    }
    return base
  }, [inversiones, objetivoGuardado, instrumentoGuardado])

  const dolares = useMemo(() => {
    const base = inversiones.filter((i) => i.tipo === 'dolares')
    if (objetivoGuardado && instrumentoGuardado) {
      return [...base].sort((a, b) =>
        a.nombre === instrumentoGuardado ? -1 : b.nombre === instrumentoGuardado ? 1 : 0
      )
    }
    return base
  }, [inversiones, objetivoGuardado, instrumentoGuardado])

  return (
    <div className="min-h-screen bg-bg text-white">
      {/* Navbar */}
      <nav className="bg-card border-b border-border px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp size={22} className="text-accent" />
          <span className="font-semibold text-lg text-white">FinanceAI</span>
          <span className="text-xs text-gray-600 hidden sm:block">Asistente financiero AR</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenOnboarding}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-gray-400 hover:border-accent hover:text-accent transition-colors text-xs font-medium"
          >
            <GraduationCap size={14} />
            ¿Por dónde empiezo?
          </button>
          {status?.ollama_available ? (
            <span className="flex items-center gap-1.5 text-xs text-green-400">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
              Ollama
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-xs text-gray-600">
              <span className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
              Ollama offline
            </span>
          )}
          {status?.groq_configured && (
            <span className="flex items-center gap-1.5 text-xs text-blue-400">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
              Groq
            </span>
          )}
        </div>
      </nav>

      {/* Ticker */}
      <MarketTicker />

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">

        {/* Hero + Amount Input */}
        <div className="text-center space-y-6">
          <div>
            <h1 className="text-3xl font-semibold text-white mb-1">¿Cuánto querés invertir?</h1>
            <p className="text-gray-500 text-sm">Compará todas las opciones con datos reales del mercado argentino</p>
          </div>
          <AmountInput />
        </div>

        {/* Investment columns */}
        {isLoading ? (
          <div className="text-center text-gray-600 py-12">Calculando opciones...</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* ARS column */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-1">
                <div className="w-2 h-2 bg-ars rounded-full" />
                <h2 className="text-sm font-semibold text-ars uppercase tracking-wider">En Pesos (ARS)</h2>
                <div className="flex-1 h-px bg-green-900/30" />
              </div>
              <div className="bg-green-950/10 rounded-xl p-3 space-y-2">
                {pesos.map((inv) => (
                  <InvestmentCard key={inv.nombre} inv={inv} />
                ))}
              </div>
            </div>

            {/* USD column */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-1">
                <div className="w-2 h-2 bg-usd rounded-full" />
                <h2 className="text-sm font-semibold text-usd uppercase tracking-wider">En Dólares (USD)</h2>
                <div className="flex-1 h-px bg-blue-900/30" />
              </div>
              <div className="bg-blue-950/10 rounded-xl p-3 space-y-2">
                {dolares.map((inv) => (
                  <InvestmentCard key={inv.nombre} inv={inv} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Inflation chart */}
        <InflationChart />

        {/* Explorador de instrumentos */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-accent rounded-full" />
            <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Todos los instrumentos del mercado argentino</h2>
            <div className="flex-1 h-px bg-gray-800" />
          </div>
          <InstrumentosExplorer />
        </div>

        {/* Glosario */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-yellow-400 rounded-full" />
            <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Glosario financiero</h2>
            <div className="flex-1 h-px bg-gray-800" />
          </div>
          <GlosarioSection />
        </div>

        {/* Chat */}
        <ChatAssistant />

        <footer className="text-center text-xs text-gray-700 pb-4">
          FinanceAI — Datos en tiempo real. No constituye asesoramiento financiero formal. Costo de runtime: $0.
        </footer>
      </main>
    </div>
  )
}
