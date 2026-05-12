import React from 'react'

export function Skeleton({ className = '', ...props }) {
  return (
    <div
      className={`animate-pulse bg-gray-800/60 rounded-lg ${className}`}
      {...props}
    />
  )
}

export function SkeletonCard() {
  return (
    <div className="bg-card border border-border rounded-xl p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-16" />
        </div>
        <Skeleton className="h-8 w-16" />
      </div>
      <Skeleton className="h-2 w-full" />
      <div className="flex justify-between">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  )
}

export function SkeletonStockCard() {
  return (
    <div className="bg-card border border-border rounded-xl p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="w-4 h-4 rounded" />
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="w-8 h-8 rounded-lg" />
        <Skeleton className="h-4 w-28" />
      </div>
      <div className="space-y-1">
        <Skeleton className="h-7 w-24" />
        <Skeleton className="h-3 w-32" />
      </div>
      <Skeleton className="h-1.5 w-full rounded-full" />
      <div className="flex gap-2">
        <Skeleton className="h-8 flex-1 rounded-lg" />
        <Skeleton className="h-8 flex-1 rounded-lg" />
      </div>
    </div>
  )
}

export function SkeletonStatCard() {
  return (
    <div className="bg-card border border-border rounded-xl p-4 space-y-2">
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-7 w-28" />
      <Skeleton className="h-3 w-16" />
    </div>
  )
}

export function SkeletonChart() {
  return (
    <div className="bg-card border border-border rounded-xl p-5 space-y-3">
      <Skeleton className="h-4 w-64" />
      <Skeleton className="h-56 w-full rounded-lg" />
    </div>
  )
}

export function SkeletonTable() {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-border flex gap-4">
        {[120, 80, 80, 70, 90].map((w, i) => (
          <Skeleton key={i} className={`h-3`} style={{ width: w }} />
        ))}
      </div>
      {Array(6).fill(0).map((_, i) => (
        <div key={i} className="px-4 py-3 border-b border-border/50 flex gap-4 items-center">
          {[140, 60, 70, 65, 80].map((w, j) => (
            <Skeleton key={j} className="h-4" style={{ width: w }} />
          ))}
        </div>
      ))}
    </div>
  )
}

export function SkeletonInstrumentCard() {
  return (
    <div className="bg-bg border border-border rounded-xl p-4 space-y-3">
      <div className="flex items-start gap-2">
        <Skeleton className="w-8 h-8 rounded-lg" />
        <div className="space-y-1.5 flex-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-3/4" />
      <Skeleton className="h-2 w-full rounded-full" />
    </div>
  )
}

export function SkeletonLanding() {
  return (
    <div className="h-screen w-screen bg-[#0a0e1a] flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="h-8 w-32" />
        </div>
        <Skeleton className="h-4 w-48 mx-auto" />
        <div className="flex gap-4 mt-8">
          <Skeleton className="h-64 w-72 rounded-2xl" />
          <Skeleton className="h-64 w-72 rounded-2xl" />
        </div>
      </div>
    </div>
  )
}
