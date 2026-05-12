import React, { useState } from 'react'
import GlosarioModal from './GlosarioModal.jsx'

export default function GlosarioButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        title="Glosario & Fuentes"
        className="fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full bg-[#0d1117] border border-border shadow-lg flex items-center justify-center hover:border-accent hover:bg-accent/10 transition-all group"
      >
        <span className="text-xl group-hover:scale-110 transition-transform" role="img" aria-label="Glosario">
          📚
        </span>
      </button>

      {open && <GlosarioModal onClose={() => setOpen(false)} />}
    </>
  )
}
