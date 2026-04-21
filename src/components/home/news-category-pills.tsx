'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

const categories = ['All', 'Industry news', 'Market analysis', 'Company updates'] as const

export function NewsCategoryPills() {
  const [active, setActive] = useState<(typeof categories)[number]>('All')

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((c) => {
        const isOn = active === c
        return (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium transition-colors',
              isOn ? 'bg-white text-zinc-950' : 'border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white',
            )}
          >
            {c}
          </button>
        )
      })}
    </div>
  )
}
