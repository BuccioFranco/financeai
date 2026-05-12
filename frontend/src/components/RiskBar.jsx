import React from 'react'

const COLORS = ['#4ade80', '#a3e635', '#facc15', '#fb923c', '#f87171']
const LABELS = ['Muy bajo', 'Bajo', 'Moderado', 'Alto', 'Muy alto']

export default function RiskBar({ level }) {
  return (
    <div>
      <div className="flex gap-1 h-2">
        {COLORS.map((color, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm"
            style={{
              backgroundColor: color,
              opacity: i < level ? 1 : 0.15,
            }}
          />
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-1">Riesgo: {LABELS[level - 1]}</p>
    </div>
  )
}
