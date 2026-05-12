import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, ChevronLeft, RotateCcw } from 'lucide-react'
import LinksDirectos from '../components/LinksDirectos.jsx'

const PREGUNTAS = [
  {
    id: 'horizonte',
    texto: '¿En cuánto tiempo podrías necesitar este dinero?',
    ayuda: 'Si hay chances de que lo necesites pronto, el riesgo que podés tomar es menor.',
    opciones: [
      { label: 'Menos de 3 meses', valor: 0, emoji: '⚡' },
      { label: '3 a 12 meses', valor: 1, emoji: '📅' },
      { label: '1 a 3 años', valor: 2, emoji: '📆' },
      { label: 'Más de 3 años', valor: 3, emoji: '🗓️' },
    ],
  },
  {
    id: 'caida',
    texto: 'Si tu inversión cae 20% en un mes, ¿qué harías?',
    ayuda: 'Esta pregunta mide tu tolerancia real a las pérdidas temporales.',
    opciones: [
      { label: 'Vendo todo de inmediato', valor: 0, emoji: '😰' },
      { label: 'Me preocupo mucho pero espero', valor: 1, emoji: '😟' },
      { label: 'Lo aguanto — sé que se recupera', valor: 2, emoji: '😤' },
      { label: 'Compro más aprovechando el precio', valor: 3, emoji: '😎' },
    ],
  },
  {
    id: 'objetivo',
    texto: '¿Cuál es tu principal objetivo financiero?',
    ayuda: 'Tu objetivo define la estrategia más adecuada.',
    opciones: [
      { label: 'No perder contra la inflación', valor: 0, emoji: '🛡️' },
      { label: 'Crecer moderadamente', valor: 1, emoji: '📈' },
      { label: 'Maximizar el rendimiento', valor: 2, emoji: '🚀' },
      { label: 'Construir patrimonio a largo plazo', valor: 3, emoji: '🏗️' },
    ],
  },
  {
    id: 'conocimiento',
    texto: '¿Cuánto sabés de inversiones hoy?',
    ayuda: 'Ser honesto acá te va a ayudar a recibir recomendaciones adecuadas.',
    opciones: [
      { label: 'Nada, empiezo desde cero', valor: 0, emoji: '🌱' },
      { label: 'Sé lo básico (plazo fijo, dólar)', valor: 1, emoji: '📖' },
      { label: 'Conozco acciones, bonos y CEDEARs', valor: 2, emoji: '📊' },
      { label: 'Opero regularmente en el mercado', valor: 3, emoji: '💼' },
    ],
  },
  {
    id: 'liquidez',
    texto: '¿Qué tan importante es poder retirar tu dinero rápido?',
    ayuda: 'A mayor liquidez requerida, menores serán los rendimientos posibles.',
    opciones: [
      { label: 'Muy importante — puede que lo necesite mañana', valor: 0, emoji: '💧' },
      { label: 'Prefiero que sea fácil de retirar', valor: 1, emoji: '🚿' },
      { label: 'Puedo esperar unos días sin problema', valor: 2, emoji: '⏳' },
      { label: 'Puedo inmovilizarlo por meses', valor: 3, emoji: '🔒' },
    ],
  },
  {
    id: 'moneda',
    texto: '¿En qué preferís denominar tus ahorros?',
    ayuda: 'No hay respuesta correcta — depende de tus gastos e ingresos.',
    opciones: [
      { label: 'Pesos — mis gastos son en pesos', valor: 0, emoji: '💵' },
      { label: 'Mitad y mitad', valor: 1, emoji: '⚖️' },
      { label: 'Dólares — quiero protegerme de la devaluación', valor: 2, emoji: '🇺🇸' },
      { label: 'Me da igual, quiero el mejor rendimiento real', valor: 3, emoji: '🎯' },
    ],
  },
]

const PERFILES = [
  {
    id: 'conservador',
    nombre: 'Conservador',
    emoji: '🛡️',
    rango: [0, 7],
    color: 'text-green-400',
    border: 'border-green-800',
    bg: 'bg-green-950/20',
    descripcion: 'Priorizás no perder sobre todo. Preferís instrumentos seguros con rendimiento predecible, aunque sea menor.',
    cartera: [
      { instrumento: 'FCI Money Market', pct: 40 },
      { instrumento: 'Plazo fijo UVA', pct: 30 },
      { instrumento: 'Dólar MEP', pct: 20 },
      { instrumento: 'LECAP', pct: 10 },
    ],
    consejo: 'Empezá con el FCI Money Market para el fondo de emergencia y el PF UVA para el ahorro a mediano plazo. El 20% en MEP te da cobertura cambiaria básica.',
  },
  {
    id: 'moderado',
    nombre: 'Moderado',
    emoji: '⚖️',
    rango: [8, 13],
    color: 'text-yellow-400',
    border: 'border-yellow-800',
    bg: 'bg-yellow-950/20',
    descripcion: 'Buscás un balance entre seguridad y rendimiento. Podés tolerar alguna volatilidad a cambio de mejores retornos.',
    cartera: [
      { instrumento: 'FCI Money Market', pct: 20 },
      { instrumento: 'LECER / Bono CER', pct: 20 },
      { instrumento: 'Dólar MEP', pct: 20 },
      { instrumento: 'ON dolarizada (corp.)', pct: 25 },
      { instrumento: 'CEDEARs de ETFs (SPY/QQQ)', pct: 15 },
    ],
    consejo: 'La combinación de CER + ONs + ETFs te da cobertura de inflación y dolarización con algo de crecimiento. Mantené siempre al menos 2 meses de gastos en liquidez inmediata.',
  },
  {
    id: 'agresivo',
    nombre: 'Agresivo',
    emoji: '📈',
    rango: [14, 17],
    color: 'text-orange-400',
    border: 'border-orange-800',
    bg: 'bg-orange-950/20',
    descripcion: 'Querés maximizar el rendimiento y podés tolerar pérdidas temporales. Horizonte de inversión largo.',
    cartera: [
      { instrumento: 'FCI Money Market', pct: 10 },
      { instrumento: 'ON dolarizada (corp.)', pct: 20 },
      { instrumento: 'Bono soberano USD (AL30/GD30)', pct: 15 },
      { instrumento: 'CEDEARs de ETFs (SPY/QQQ)', pct: 30 },
      { instrumento: 'Cedears (acciones USA)', pct: 15 },
      { instrumento: 'Acciones Merval', pct: 10 },
    ],
    consejo: 'Tu mayor riesgo es el riesgo soberano argentino. Diversificá geográficamente con ETFs de EEUU y usá los bonos locales solo si tenés convicción en la mejora macro.',
  },
  {
    id: 'muy_agresivo',
    nombre: 'Muy agresivo',
    emoji: '🚀',
    rango: [18, 21],
    color: 'text-red-400',
    border: 'border-red-800',
    bg: 'bg-red-950/20',
    descripcion: 'Buscás el máximo retorno posible, entendés el riesgo y tenés experiencia en el mercado.',
    cartera: [
      { instrumento: 'Bono soberano USD (AL30/GD30)', pct: 20 },
      { instrumento: 'CEDEARs de ETFs (SPY/QQQ)', pct: 25 },
      { instrumento: 'Cedears (acciones USA)', pct: 25 },
      { instrumento: 'Acciones Merval', pct: 20 },
      { instrumento: 'ON dolarizada (corp.)', pct: 10 },
    ],
    consejo: 'Con este perfil, la diversificación es tu mejor amiga. Revisá el riesgo país antes de sobreponderar bonos locales. Nunca más del 10% en un solo activo.',
  },
]

function calcularPerfil(respuestas) {
  const total = Object.values(respuestas).reduce((sum, v) => sum + v, 0)
  return PERFILES.find(p => total >= p.rango[0] && total <= p.rango[1]) || PERFILES[1]
}

function BarraCartera({ item, total }) {
  const pct = item.pct
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-300">{item.instrumento}</span>
        <span className="font-mono text-white font-semibold">{pct}%</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-accent/70 rounded-full transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export default function PerfilPage() {
  const navigate = useNavigate()
  const [paso, setPaso] = useState(0)
  const [respuestas, setRespuestas] = useState({})
  const [perfil, setPerfil] = useState(null)
  const [instruccionActiva, setInstruccionActiva] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('financeai_perfil')
    if (saved) {
      const data = JSON.parse(saved)
      setPerfil(data.perfil)
      setRespuestas(data.respuestas)
      setPaso(PREGUNTAS.length)
    }
  }, [])

  const pregunta = PREGUNTAS[paso]
  const totalPreguntas = PREGUNTAS.length
  const progreso = Math.round((paso / totalPreguntas) * 100)

  function elegir(valor) {
    const nuevas = { ...respuestas, [pregunta.id]: valor }
    setRespuestas(nuevas)
    if (paso < totalPreguntas - 1) {
      setPaso(paso + 1)
    } else {
      const resultado = calcularPerfil(nuevas)
      setPerfil(resultado)
      setPaso(totalPreguntas)
      localStorage.setItem('financeai_perfil', JSON.stringify({ perfil: resultado, respuestas: nuevas }))
    }
  }

  function reiniciar() {
    setRespuestas({})
    setPerfil(null)
    setPaso(0)
    localStorage.removeItem('financeai_perfil')
  }

  // Resultado
  if (paso === totalPreguntas && perfil) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white mb-1">Tu perfil inversor</h1>
            <p className="text-gray-400 text-sm">Guardado en tu dispositivo · Solo vos lo ves</p>
          </div>
          <button
            onClick={reiniciar}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 border border-border rounded-lg px-3 py-2 transition-colors"
          >
            <RotateCcw size={12} />
            Reiniciar
          </button>
        </div>

        {/* Badge perfil */}
        <div className={`rounded-2xl border p-6 ${perfil.border} ${perfil.bg}`}>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-5xl">{perfil.emoji}</span>
            <div>
              <p className="text-gray-400 text-sm">Tu perfil es</p>
              <h2 className={`text-2xl font-bold ${perfil.color}`}>{perfil.nombre}</h2>
            </div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">{perfil.descripcion}</p>
        </div>

        {/* Cartera sugerida */}
        <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
          <h3 className="text-white font-semibold">📊 Distribución sugerida para tu perfil</h3>
          <div className="space-y-3">
            {perfil.cartera.map(item => (
              <BarraCartera key={item.instrumento} item={item} />
            ))}
          </div>
          <p className="text-xs text-gray-600">
            Esta es una guía orientativa. Ajustala según tu situación personal.
          </p>
        </div>

        {/* Consejo */}
        <div className="bg-blue-950/20 border border-blue-900/30 rounded-xl p-4">
          <p className="text-blue-300 text-xs font-semibold mb-1">💡 Consejo para tu perfil</p>
          <p className="text-blue-400/80 text-sm leading-relaxed">{perfil.consejo}</p>
        </div>

        {/* Links directos por instrumento */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold">🔗 Dónde invertir en cada instrumento</h3>
          {perfil.cartera.map(item => (
            <div key={item.instrumento} className="bg-card border border-border rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-white text-sm font-medium">{item.instrumento}</p>
                <span className={`font-mono font-bold text-sm ${perfil.color}`}>{item.pct}%</span>
              </div>
              <LinksDirectos nombreInstrumento={item.instrumento} />
            </div>
          ))}
        </div>

        {/* Acciones */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/comparar')}
            className="flex-1 py-3 rounded-xl border border-border text-gray-300 hover:border-gray-500 transition-colors text-sm"
          >
            Ver comparador →
          </button>
          <button
            onClick={() => navigate('/asistente', {
              state: { preloadedMessage: `Soy un inversor de perfil ${perfil.nombre}. Mi cartera sugerida es: ${perfil.cartera.map(i => `${i.pct}% en ${i.instrumento}`).join(', ')}. ¿Podés darme consejos específicos para el mercado argentino actual?` }
            })}
            className="flex-1 py-3 rounded-xl bg-accent/10 border border-accent/50 text-accent hover:bg-accent/20 transition-colors text-sm font-medium"
          >
            🤖 Consultar al asistente
          </button>
        </div>

        <p className="text-xs text-gray-700 text-center">
          FinanceAI no brinda asesoramiento financiero profesional. Consultá un asesor certificado por la CNV antes de invertir.
        </p>
      </div>
    )
  }

  // Quiz
  return (
    <div className="max-w-lg mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold text-white">🎯 Test de perfil inversor</h1>
        <p className="text-gray-400 text-sm">6 preguntas para conocer qué tipo de inversor sos</p>
      </div>

      {/* Barra de progreso */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Pregunta {paso + 1} de {totalPreguntas}</span>
          <span>{progreso}%</span>
        </div>
        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-500"
            style={{ width: `${progreso}%` }}
          />
        </div>
      </div>

      {/* Pregunta */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-white leading-snug">{pregunta.texto}</h2>
          <p className="text-gray-500 text-sm">{pregunta.ayuda}</p>
        </div>

        <div className="space-y-3">
          {pregunta.opciones.map(opcion => (
            <button
              key={opcion.valor}
              onClick={() => elegir(opcion.valor)}
              className="w-full flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-accent hover:bg-accent/5 transition-all text-left group"
            >
              <span className="text-2xl">{opcion.emoji}</span>
              <span className="text-gray-300 group-hover:text-white transition-colors text-sm">
                {opcion.label}
              </span>
              <ChevronRight size={16} className="ml-auto text-gray-600 group-hover:text-accent transition-colors" />
            </button>
          ))}
        </div>

        {paso > 0 && (
          <button
            onClick={() => setPaso(paso - 1)}
            className="flex items-center gap-1.5 text-gray-500 hover:text-gray-300 transition-colors text-sm"
          >
            <ChevronLeft size={14} />
            Volver
          </button>
        )}
      </div>
    </div>
  )
}
