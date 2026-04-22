'use client'

import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export function PageShell({
  title,
  description,
  actions,
  children,
  eyebrow,
}: {
  title: string
  description?: string
  actions?: ReactNode
  children?: ReactNode
  eyebrow?: string
}) {
  return (
    <div className="min-h-screen bg-[#070708] text-zinc-100">
      <NavbarShell />
      <main>
        <section className="border-b border-white/[0.08] bg-[#0a0a0c]/95 backdrop-blur-xl">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                {eyebrow ? (
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-400/90">{eyebrow}</p>
                ) : null}
                <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-zinc-50 sm:text-4xl lg:text-5xl">{title}</h1>
                {description ? <p className="mt-4 text-base leading-relaxed text-zinc-400">{description}</p> : null}
              </div>
              {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">{children}</section>
      </main>
      <Footer />
    </div>
  )
}
