import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'

const sections = [
  {
    title: 'Essential',
    body: 'Required for sign-in, security, load balancing, and remembering your session across pages.',
  },
  {
    title: 'Analytics',
    body: 'Helps us understand which stories resonate, where readers drop off, and how performance changes over time—aggregated where possible.',
  },
  {
    title: 'Preferences',
    body: 'Stores theme, newsletter choices, and category filters so the desk feels consistent when you return.',
  },
]

const cardClass = 'rounded-3xl border border-white/[0.08] bg-[#121214] text-zinc-100 shadow-[0_24px_80px_rgba(0,0,0,0.35)]'

export default function CookiesPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Cookie policy"
      description="What cookies and similar technologies we use, and how you can control them."
    >
      <Card className={cardClass}>
        <CardContent className="space-y-8 p-8">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Last updated · April 21, 2026</p>
          <div className="space-y-6">
            {sections.map((section) => (
              <div key={section.title} className="rounded-2xl border border-white/[0.06] bg-[#0c0c0e] p-5">
                <h3 className="text-base font-semibold text-zinc-50">{section.title}</h3>
                <p className="mt-2 text-sm leading-7 text-zinc-500">{section.body}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </PageShell>
  )
}
