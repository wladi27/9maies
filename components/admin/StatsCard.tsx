"use client"

import React from 'react'

export default function StatsCard({ title, value, delta }: { title: string; value: string | number; delta?: string }) {
  return (
    <div className="bg-card border p-4 rounded-lg shadow-sm">
      <div className="text-sm text-muted-foreground">{title}</div>
      <div className="mt-2 flex items-baseline gap-3">
        <div className="text-2xl font-bold">{value}</div>
        {delta && <div className="text-sm text-muted-foreground">{delta}</div>}
      </div>
    </div>
  )
}
