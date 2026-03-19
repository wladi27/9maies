"use client"

import React from 'react'

export default function BarChart({ data, color = '#06b6d4' }: { data: number[]; color?: string }) {
  const max = Math.max(...data, 1)
  return (
    <div className="flex items-end gap-2 h-36">
      {data.map((d, i) => (
        <div key={i} className="flex-1 bg-muted rounded" style={{ height: `${(d / max) * 100}%`, background: color }} />
      ))}
    </div>
  )
}
