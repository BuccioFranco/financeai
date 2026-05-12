import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(null) // 'brujula' | 'lab' | null

  const leftBasis  = hovered === 'lab'    ? '42%' : hovered === 'brujula' ? '58%' : '50%'
  const rightBasis = hovered === 'brujula'? '42%' : hovered === 'lab'     ? '58%' : '50%'

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col" style={{ background: '#0a0e1a' }}>

      {/* Header centrado */}
      <div className="text-center pt-10 pb-6 z-10 relative">
        <h1 className="text-2xl font-semibold text-white tracking-tight">
          <span className="text-accent">Finance</span>AI
        </h1>
        <p className="text-gray-500 text-sm mt-1">"Tu dinero, tus decisiones."</p>
      </div>

      {/* Split screen */}
      <div className="flex flex-1 overflow-hidden">

        {/* Lado izquierdo — La Brújula */}
        <div
          className="relative flex flex-col items-center justify-center cursor-pointer overflow-hidden border-r border-[#1f2937]"
          style={{
            flexBasis: leftBasis,
            transition: 'flex-basis 0.4s ease, background 0.4s ease',
            background: hovered === 'brujula'
              ? 'linear-gradient(135deg, #0d2418 0%, #0a1a0f 50%, #0a0e1a 100%)'
              : 'linear-gradient(135deg, #0a1a0f 0%, #0a0e1a 100%)',
          }}
          onMouseEnter={() => setHovered('brujula')}
          onMouseLeave={() => setHovered(null)}
          onClick={() => navigate('/brujula')}
        >
          <div className="text-center px-8 max-w-xs select-none">
            <div
              className="text-7xl mb-6 transition-transform duration-500"
              style={{ transform: hovered === 'brujula' ? 'scale(1.15)' : 'scale(1)' }}
            >
              🧭
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">La Brújula</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              "Empezá desde cero.<br />Entendé antes de invertir."
            </p>
            <p className="text-gray-600 text-xs mb-8">
              Para quienes nunca invirtieron o quieren entender mejor qué hacen con su plata.
            </p>
            <div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-ars/40 text-ars text-sm font-medium transition-all"
              style={{
                background: hovered === 'brujula' ? 'rgba(74,222,128,0.1)' : 'transparent',
              }}
            >
              Entrar →
            </div>
          </div>
          {hovered === 'brujula' && (
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 30% 60%, rgba(74,222,128,0.06) 0%, transparent 60%)' }}
            />
          )}
        </div>

        {/* Lado derecho — El Laboratorio */}
        <div
          className="relative flex flex-col items-center justify-center cursor-pointer overflow-hidden"
          style={{
            flexBasis: rightBasis,
            transition: 'flex-basis 0.4s ease, background 0.4s ease',
            background: hovered === 'lab'
              ? 'linear-gradient(135deg, #0a1525 0%, #0a0f1a 50%, #0a0e1a 100%)'
              : 'linear-gradient(135deg, #0a0f1a 0%, #0a0e1a 100%)',
          }}
          onMouseEnter={() => setHovered('lab')}
          onMouseLeave={() => setHovered(null)}
          onClick={() => navigate('/laboratorio')}
        >
          <div className="text-center px-8 max-w-xs select-none">
            <div
              className="text-7xl mb-6 transition-transform duration-500"
              style={{ transform: hovered === 'lab' ? 'scale(1.15)' : 'scale(1)' }}
            >
              🔬
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">El Laboratorio</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              "Analizá, comparé y decidí<br />con datos en tiempo real."
            </p>
            <p className="text-gray-600 text-xs mb-8">
              Para quienes ya saben lo básico y quieren profundizar con números reales.
            </p>
            <div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-usd/40 text-usd text-sm font-medium transition-all"
              style={{
                background: hovered === 'lab' ? 'rgba(96,165,250,0.1)' : 'transparent',
              }}
            >
              Entrar →
            </div>
          </div>
          {hovered === 'lab' && (
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 70% 60%, rgba(96,165,250,0.06) 0%, transparent 60%)' }}
            />
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-4">
        <button
          onClick={() => navigate('/laboratorio')}
          className="text-gray-700 text-xs hover:text-gray-500 transition-colors"
        >
          → Saltar al dashboard completo
        </button>
      </div>
    </div>
  )
}
