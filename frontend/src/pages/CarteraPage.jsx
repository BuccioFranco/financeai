import React, { useState, useEffect, useMemo } from 'react'
import { Plus, Trash2, TrendingUp, TrendingDown, Info } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useMarketData } from '../hooks/useMarketData.js'
import LinksDirectos from '../components/LinksDirectos.jsx'

const TIPOS = [
  { value: 'pf_ars',    label: 'Plazo fijo tradicional',       moneda: 'ARS', rinde: true  },
  { value: 'pf_uva',    label: 'Plazo fijo UVA',               moneda: 'ARS', rinde: true  },
  { value: 'fci_mm',    label: 'FCI Money Market',             moneda: 'ARS', rinde: true  },
  { value: 'lecap',     label: 'LECAP / BONCAP',               moneda: 'ARS', rinde: true  },
  { value: 'cer',       label: 'Bono CER / LECER',             moneda: 'ARS', rinde: true  },
  { value: 'caucion',   label: 'Caución bursátil',             moneda: 'ARS', rinde: true  },
  { value: 'usd_mep',   label: 'Dólar MEP / efectivo USD',     moneda: 'USD', rinde: false },
  { value: 'on_corp',   label: 'ON dolarizada corporativa',    moneda: 'USD', rinde: true  },
  { value: 'bono_usd',  label: 'Bono soberano USD (AL30/GD30)',moneda: 'USD', rinde: true  },
  { value: 'cedear',    label: 'CEDEARs / ETFs',               moneda: 'USD', rinde: true  },
  { value: 'acciones',  label: 'Acciones Merval',              moneda: 'ARS', rinde: true  },
  { value: 'otro',      label: 'Otro',                         moneda: 'ARS', rinde: false },
]

const INSTRUMENTO_MAP = {
  'pf_ars':   'Plazo fijo tradicional',
  'pf_uva':   'Plazo fijo UVA',
  'fci_mm':   'FCI Money Market',
  'lecap':    'LECAP',
  'cer':      'LECER / Bono CER',
  'caucion':  'Caución bursátil',
  'usd_mep':  'Dólar MEP',
  'on_corp':  'ON dolarizada (corp.)',
  'bono_usd': 'Bono soberano USD (AL30/GD30)',
  'cedear':   'CEDEARs de ETFs (SPY/QQQ)',
  'acciones': 'Acciones Merval',
}

function fmt(n, decimals = 0) {
  if (n == null) return '—'
  return Number(n).toLocaleString('es-AR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

function useCartera() {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('financeai_cartera') || '[]') }
    catch { return [] }
  })

  function guardar(nuevos) {
    setItems(nuevos)
    localStorage.setItem('financeai_cartera', JSON.stringify(nuevos))
  }

  function agregar(item) {
    guardar([...items, { ...item, id: Date.now() }])
  }

  function eliminar(id) {
    guardar(items.filter(i => i.id !== id))
  }

  function actualizar(id, cambios) {
    guardar(items.map(i => i.id === id ? { ...i, ...cambios } : i))
  }

  return { items, agregar, eliminar, actualizar }
}

function FormAgregarHolding({ onAgregar, onCancelar }) {
  const [tipo, setTipo] = useState('fci_mm')
  const [monto, setMonto] = useState('')
  const [moneda, setMoneda] = useState('ARS')
  const [nota, setNota] = useState('')
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0])

  const tipoInfo = TIPOS.find(t => t.value === tipo)

  function handleTipo(val) {
    setTipo(val)
    const info = TIPOS.find(t => t.value === val)
    if (info) setMoneda(info.moneda)
  }

  function submit(e) {
    e.preventDefault()
    if (!monto || isNaN(Number(monto.replace(/\./g, '').replace(',', '.')))) return
    const montoNum = Number(monto.replace(/\./g, '').replace(',', '.'))
    onAgregar({ tipo, label: tipoInfo?.label || tipo, monto: montoNum, moneda, nota, fecha })
  }

  return (
    <form onSubmit={submit} className="bg-card border border-accent/30 rounded-2xl p-5 space-y-4">
      <h3 className="text-white font-semibold">➕ Agregar posición</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="sm:col-span-2">
          <label className="text-gray-500 text-xs mb-1 block">Tipo de inversión</label>
          <select
            value={tipo}
            onChange={e => handleTipo(e.target.value)}
            className="w-full bg-bg border border-border rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-accent"
          >
            {TIPOS.map(t => (
              <option key={t.value} value={t.value}>{t.label} ({t.moneda})</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-gray-500 text-xs mb-1 block">Monto</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
              {moneda === 'USD' ? 'USD' : '$'}
            </span>
            <input
              type="text"
              value={monto}
              onChange={e => setMonto(e.target.value)}
              placeholder="0"
              className="w-full bg-bg border border-border rounded-xl pl-12 pr-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-accent"
              required
            />
          </div>
        </div>

        <div>
          <label className="text-gray-500 text-xs mb-1 block">Fecha de entrada</label>
          <input
            type="date"
            value={fecha}
            onChange={e => setFecha(e.target.value)}
            className="w-full bg-bg border border-border rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-accent"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="text-gray-500 text-xs mb-1 block">Nota (opcional)</label>
          <input
            type="text"
            value={nota}
            onChange={e => setNota(e.target.value)}
            placeholder="ej: Plazo fijo BNA vto. julio"
            className="w-full bg-bg border border-border rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-accent"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 py-2.5 rounded-xl bg-accent/20 border border-accent text-accent hover:bg-accent/30 transition-colors text-sm font-medium"
        >
          Agregar
        </button>
        <button
          type="button"
          onClick={onCancelar}
          className="px-4 py-2.5 rounded-xl border border-border text-gray-500 hover:text-gray-300 transition-colors text-sm"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}

function HoldingCard({ item, market, onEliminar }) {
  const [showLinks, setShowLinks] = useState(false)
  const mep = market?.mep_venta || 1200
  const ipc = market?.ipc_mensual || 3.5

  const montoARS = item.moneda === 'USD' ? item.monto * mep : item.monto
  const montoUSD = item.moneda === 'USD' ? item.monto : item.monto / mep

  const diasDesde = Math.floor((Date.now() - new Date(item.fecha).getTime()) / (1000 * 60 * 60 * 24))
  const mesesDesde = diasDesde / 30

  const inflacionAcum = ((1 + ipc / 100) ** mesesDesde - 1) * 100
  const instrNombre = INSTRUMENTO_MAP[item.tipo]

  const esPesos = item.moneda === 'ARS'
  const colorMoneda = esPesos ? 'text-ars' : 'text-usd'

  return (
    <div className="bg-card border border-border rounded-xl p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs px-2 py-0.5 rounded font-medium ${esPesos ? 'bg-green-900/30 text-ars' : 'bg-blue-900/30 text-usd'}`}>
              {item.moneda}
            </span>
            <span className="text-white font-medium text-sm truncate">{item.label}</span>
          </div>
          {item.nota && <p className="text-gray-500 text-xs mt-0.5 truncate">{item.nota}</p>}
          <p className="text-gray-600 text-xs mt-0.5">Desde {item.fecha} · {diasDesde} días</p>
        </div>
        <button
          onClick={() => onEliminar(item.id)}
          className="text-gray-700 hover:text-red-400 transition-colors shrink-0 p-1"
        >
          <Trash2 size={14} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-bg rounded-lg p-2.5">
          <p className="text-gray-600 text-xs">Monto original</p>
          <p className={`font-mono font-bold text-base ${colorMoneda}`}>
            {item.moneda === 'USD' ? `USD ${fmt(item.monto, 2)}` : `$${fmt(item.monto)}`}
          </p>
          {item.moneda === 'USD'
            ? <p className="text-gray-600 text-xs font-mono">≈ ${fmt(montoARS)}</p>
            : <p className="text-gray-600 text-xs font-mono">≈ USD {fmt(montoUSD, 0)}</p>
          }
        </div>

        <div className="bg-bg rounded-lg p-2.5">
          <p className="text-gray-600 text-xs">Inflación desde entrada</p>
          <p className="font-mono font-bold text-base text-orange-400">
            +{fmt(inflacionAcum, 1)}%
          </p>
          <p className="text-gray-600 text-xs">en {fmt(mesesDesde, 1)} meses</p>
        </div>
      </div>

      {instrNombre && (
        <button
          onClick={() => setShowLinks(x => !x)}
          className="text-xs text-gray-500 hover:text-accent transition-colors flex items-center gap-1"
        >
          🔗 {showLinks ? 'Ocultar' : 'Ver'} dónde operar esto
        </button>
      )}
      {showLinks && instrNombre && (
        <LinksDirectos nombreInstrumento={instrNombre} />
      )}
    </div>
  )
}

export default function CarteraPage() {
  const { items, agregar, eliminar } = useCartera()
  const { data: market } = useMarketData()
  const navigate = useNavigate()
  const [mostrando, setMostrando] = useState(false)

  const mep = market?.mep_venta || 1200

  const totales = useMemo(() => {
    const ars = items.filter(i => i.moneda === 'ARS').reduce((sum, i) => sum + i.monto, 0)
    const usd = items.filter(i => i.moneda === 'USD').reduce((sum, i) => sum + i.monto, 0)
    const total_ars = ars + usd * mep
    const total_usd = total_ars / mep
    const pct_ars = total_ars > 0 ? Math.round((ars / total_ars) * 100) : 0
    const pct_usd = 100 - pct_ars
    return { ars, usd, total_ars, total_usd, pct_ars, pct_usd }
  }, [items, mep])

  const perfil = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('financeai_perfil') || 'null')?.perfil } catch { return null }
  }, [])

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white mb-1">💼 Mi cartera</h1>
          <p className="text-gray-400 text-sm">
            Guardado solo en tu dispositivo · Privado · Sin registro
          </p>
        </div>
        {!perfil && (
          <button
            onClick={() => navigate('/perfil')}
            className="text-xs border border-border text-gray-500 hover:border-accent hover:text-accent rounded-lg px-3 py-2 transition-colors"
          >
            🎯 Hacer test de perfil
          </button>
        )}
      </div>

      {perfil && (
        <div className={`rounded-xl border p-3 flex items-center justify-between ${perfil.border} ${perfil.bg}`}>
          <div className="flex items-center gap-2 text-sm">
            <span>{perfil.emoji}</span>
            <span className={perfil.color}>Perfil {perfil.nombre}</span>
          </div>
          <button onClick={() => navigate('/perfil')} className="text-xs text-gray-500 hover:text-gray-300">
            Ver cartera sugerida →
          </button>
        </div>
      )}

      {/* Resumen total */}
      {items.length > 0 && (
        <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
          <h3 className="text-gray-300 text-sm font-semibold">Resumen de posiciones</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 text-xs">Total en ARS</p>
              <p className="font-mono font-bold text-white text-xl">${fmt(totales.total_ars)}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Equivalente USD</p>
              <p className="font-mono font-bold text-usd text-xl">USD {fmt(totales.total_usd, 0)}</p>
            </div>
          </div>

          {/* Barra composición */}
          <div>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span className="text-ars">ARS {totales.pct_ars}%</span>
              <span className="text-usd">USD {totales.pct_usd}%</span>
            </div>
            <div className="h-2.5 bg-gray-800 rounded-full overflow-hidden flex">
              <div
                className="h-full bg-ars/70 transition-all duration-700"
                style={{ width: `${totales.pct_ars}%` }}
              />
              <div
                className="h-full bg-usd/70 transition-all duration-700"
                style={{ width: `${totales.pct_usd}%` }}
              />
            </div>
            <div className="flex gap-3 mt-1.5 text-xs text-gray-600">
              <span>En pesos: ${fmt(totales.ars)}</span>
              <span>·</span>
              <span>En USD: {fmt(totales.usd, 2)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/asistente', {
              state: { preloadedMessage: `Tengo esta cartera: ${items.map(i => `${i.label}: ${i.moneda === 'USD' ? 'USD' : '$'}${fmt(i.monto)} (${i.moneda})`).join(', ')}. ¿Qué ajustes me sugerís para mejorar mi rendimiento real contra la inflación?` }
            })}
            className="w-full py-2 rounded-xl bg-accent/10 border border-accent/30 text-accent text-xs hover:bg-accent/20 transition-colors"
          >
            🤖 Pedirle análisis al asistente
          </button>
        </div>
      )}

      {/* Posiciones */}
      {items.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <p className="text-5xl">💼</p>
          <p className="text-gray-400">Tu cartera está vacía</p>
          <p className="text-gray-600 text-sm">Agregá tus posiciones para ver el balance total</p>
        </div>
      ) : (
        <div className="space-y-3">
          <h3 className="text-gray-300 text-sm font-semibold">Posiciones ({items.length})</h3>
          {items.map(item => (
            <HoldingCard key={item.id} item={item} market={market} onEliminar={eliminar} />
          ))}
        </div>
      )}

      {/* Form agregar */}
      {mostrando ? (
        <FormAgregarHolding
          onAgregar={item => { agregar(item); setMostrando(false) }}
          onCancelar={() => setMostrando(false)}
        />
      ) : (
        <button
          onClick={() => setMostrando(true)}
          className="w-full py-3 rounded-xl border-2 border-dashed border-border text-gray-500 hover:border-accent hover:text-accent transition-colors flex items-center justify-center gap-2 text-sm"
        >
          <Plus size={16} />
          Agregar posición
        </button>
      )}

      <p className="text-xs text-gray-700 text-center pb-4">
        Los datos de tu cartera se guardan solo en este dispositivo (localStorage).
        Nada se envía a ningún servidor.
      </p>
    </div>
  )
}
