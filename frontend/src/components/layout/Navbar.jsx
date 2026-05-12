import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { TrendingUp, Menu, X } from 'lucide-react'
import MarketTicker from '../MarketTicker.jsx'
import { useChatStatus } from '../../hooks/useMarketData.js'

const navLinks = [
  { path: '/brujula',     label: 'La Brújula',     icon: '🧭' },
  { path: '/laboratorio', label: 'El Laboratorio',  icon: '🔬' },
  { path: '/acciones',    label: 'Acciones',        icon: '📈' },
  { path: '/comparar',    label: 'Comparar',        icon: '⚖️' },
  { path: '/asistente',   label: 'Asistente IA',    icon: '🤖' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { data: status } = useChatStatus()

  return (
    <header className="bg-[#0d1117] border-b border-border sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <TrendingUp size={20} className="text-accent" />
            <span className="font-semibold text-white">FinanceAI</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all ${
                    isActive
                      ? 'text-accent border-b-2 border-accent bg-accent/5'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <span>{link.icon}</span>
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Status + hamburger */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">
              {status?.groq_configured && (
                <span className="flex items-center gap-1 text-xs text-blue-400">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                  Groq
                </span>
              )}
              {status?.ollama_available && (
                <span className="flex items-center gap-1 text-xs text-green-400">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  Ollama
                </span>
              )}
            </div>
            <button
              className="md:hidden text-gray-400 hover:text-white"
              onClick={() => setMenuOpen(o => !o)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-3 space-y-1 border-t border-border pt-3">
            {navLinks.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm ${
                    isActive ? 'bg-accent/10 text-accent' : 'text-gray-400'
                  }`
                }
              >
                <span>{link.icon}</span>
                {link.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>

      {/* Ticker bar */}
      <MarketTicker />
    </header>
  )
}
