import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'

const sections = [
  {
    title: 'What we collect',
    body: 'Account details you provide, reading preferences, lightweight analytics on pages and performance, and content you submit (comments, tips, or pitches).',
  },
  {
    title: 'How we use it',
    body: 'To run the site, personalize reading surfaces, improve search and recommendations, keep accounts secure, and meet legal obligations.',
  },
  {
    title: 'Sharing',
    body: 'We do not sell personal data. Vendors may process data under contract for hosting, email, or analytics—and only for services we operate.',
  },
  {
    title: 'Your controls',
    body: 'Update profile data, export requests where applicable, opt out of marketing, or delete your account from settings when available.',
  },
]

const cardClass = 'rounded-3xl border border-white/[0.08] bg-[#121214] text-zinc-100 shadow-[0_24px_80px_rgba(0,0,0,0.35)]'

export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Privacy policy"
      description="How we collect, use, and protect information across the newsroom experience."
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
