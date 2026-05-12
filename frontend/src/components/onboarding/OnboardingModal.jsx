import React, { useState } from 'react'
import { X } from 'lucide-react'
import StepObjetivo from './StepObjetivo.jsx'
import StepInstrumentos from './StepInstrumentos.jsx'
import StepConfirmacion from './StepConfirmacion.jsx'

export default function OnboardingModal({ onClose }) {
  const [step, setStep] = useState(1)
  const [objetivo, setObjetivo] = useState(null)
  const [instrumento, setInstrumento] = useState(null)

  function handleSelectObjetivo(obj) {
    setObjetivo(obj)
    setStep(2)
  }

  function handleElegirInstrumento(nombre) {
    setInstrumento(nombre)
    localStorage.setItem('financeai_onboarding_done', 'true')
    localStorage.setItem('financeai_objetivo', objetivo)
    localStorage.setItem('financeai_instrumento', nombre)
    setStep(3)
  }

  function handleDashboard() {
    localStorage.setItem('financeai_onboarding_done', 'true')
    onClose()
  }

  const stepLabel = { 1: 'Tu objetivo', 2: 'Opciones recomendadas', 3: '¡Listo!' }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#0d1117] border border-border rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 bg-[#0d1117] z-10">
          <div className="flex items-center gap-3">
            <span className="text-accent font-mono text-sm font-bold">FinanceAI</span>
            <div className="flex gap-1.5">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 rounded-full transition-all ${
                    s <= step ? 'bg-accent w-8' : 'bg-gray-700 w-4'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-500 text-xs">{stepLabel[step]}</span>
          </div>
          <button
            onClick={handleDashboard}
            className="text-gray-600 hover:text-gray-400 transition-colors"
            title="Cerrar y ver el dashboard"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 && <StepObjetivo onSelect={handleSelectObjetivo} />}
          {step === 2 && (
            <StepInstrumentos
              objetivo={objetivo}
              onElegir={handleElegirInstrumento}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <StepConfirmacion
              instrumento={instrumento}
              onDashboard={handleDashboard}
            />
          )}
        </div>
      </div>
    </div>
  )
}
