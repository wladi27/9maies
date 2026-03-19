"use client"

import React from 'react'

type Props = { data: number[]; width?: number; height?: number; color?: string }

export default function LineChart({ data, width = 600, height = 160, color = '#7c3aed' }: Props) {
  const max = Math.max(...data, 1)
  const points = data.map((d, i) => `${(i / (data.length - 1)) * width},${height - (d / max) * height}`).join(' ')

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" className="rounded">
      <polyline fill="none" stroke={color} strokeWidth="2" points={points} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
