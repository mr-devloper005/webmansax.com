import Link from 'next/link'
import { FileText, Mail, MessageSquare, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { CONTACT_PAGE_OVERRIDE_ENABLED, ContactPageOverride } from '@/overrides/contact-page'

const lanes = [
  {
    icon: FileText,
    title: 'Editorial & pitches',
    body: 'Send long-form ideas, op-eds, and reporting proposals. We read every note and reply when there is a fit.',
  },
  {
    icon: Mail,
    title: 'Partnerships & newsletters',
    body: 'Discuss sponsorships, syndication, and co-branded issues without losing the calm reading experience.',
  },
  {
    icon: Sparkles,
    title: 'Product & accounts',
    body: 'Get help with reading lists, contributor access, and anything blocking your workflow.',
  },
]

export default function ContactPage() {
  if (CONTACT_PAGE_OVERRIDE_ENABLED) {
    return <ContactPageOverride />
  }

  return (
    <div className="min-h-screen bg-[#070708] text-zinc-100">
      <NavbarShell />
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-400/90">Contact</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Talk to the {SITE_CONFIG.name} desk</h1>
        <p className="mt-5 max-w-2xl text-sm leading-8 text-zinc-400">
          Tell us what you are trying to publish, fix, or explore. Messages are routed to the right lane—editorial, partnerships, or
          support—instead of a single generic queue.
        </p>

        <section className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          <div className="space-y-4">
            {lanes.map((lane) => (
              <div key={lane.title} className="rounded-3xl border border-white/[0.08] bg-[#121214] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
                <lane.icon className="h-5 w-5 text-sky-400" />
                <h2 className="mt-4 text-lg font-semibold text-zinc-50">{lane.title}</h2>
                <p className="mt-2 text-sm leading-7 text-zinc-500">{lane.body}</p>
              </div>
            ))}
            <div className="flex items-start gap-3 rounded-3xl border border-white/[0.08] bg-[#0f0f11] p-5 text-sm text-zinc-500">
              <MessageSquare className="mt-0.5 h-5 w-5 shrink-0 text-zinc-600" />
              <p>
                Prefer async? Email{' '}
                <Link href="mailto:hello@webmansax.com" className="font-medium text-sky-400 hover:text-sky-300">
                  hello@webmansax.com
                </Link>{' '}
                and include “Desk” in the subject so we can triage faster.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/[0.08] bg-[#121214] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
            <h2 className="text-xl font-semibold text-zinc-50">Send a message</h2>
            <p className="mt-2 text-sm text-zinc-500">This form is for UI demonstration; wire it to your backend when ready.</p>
            <form className="mt-8 grid gap-4">
              <input
                className="h-12 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-zinc-100 placeholder:text-zinc-500"
                placeholder="Your name"
              />
              <input
                className="h-12 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-zinc-100 placeholder:text-zinc-500"
                placeholder="Email address"
                type="email"
              />
              <input
                className="h-12 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-zinc-100 placeholder:text-zinc-500"
                placeholder="Topic (e.g. pitch, partnership, bug)"
              />
              <textarea
                className="min-h-[160px] rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500"
                placeholder="Share context so we can respond with the right next step."
              />
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center rounded-full bg-sky-500 px-6 text-sm font-semibold text-white hover:bg-sky-400"
              >
                Send message
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
