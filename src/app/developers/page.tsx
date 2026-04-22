import type { Metadata } from 'next'
import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { buildPageMetadata } from '@/lib/seo'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/developers',
    title: 'Developers & APIs',
    description: `Integration overview and reference endpoints for ${SITE_CONFIG.name}.`,
  })
}

const endpoints = [
  { method: 'GET', path: '/api/feed', scope: 'read:posts', description: 'List published posts for the active site code.' },
  { method: 'GET', path: '/api/posts/:slug', scope: 'read:posts', description: 'Fetch a single post by slug when exposed by your deployment.' },
  { method: 'POST', path: '/api/webhooks/test', scope: 'write:hooks', description: 'Verify webhook signatures for automation pipelines.' },
]

const principles = [
  'JSON-first responses with predictable pagination tokens.',
  'Site-scoped credentials—never share your master panel keys in browser bundles.',
  'Rate limits apply per API key; backoff when you receive 429 responses.',
]

const cardClass = 'rounded-3xl border border-white/[0.08] bg-[#121214] text-zinc-100 shadow-[0_24px_80px_rgba(0,0,0,0.35)]'

export default function DevelopersPage() {
  return (
    <PageShell
      eyebrow="Developers"
      title="APIs & integrations"
      description={`Build on top of ${SITE_CONFIG.name} with the same charcoal desk aesthetic in your docs and dashboards.`}
      actions={
        <Button asChild variant="outline" className="border-white/15 bg-transparent text-zinc-100 hover:bg-white/10">
          <Link href="/contact">Request access</Link>
        </Button>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <Card className={cardClass}>
          <CardContent className="p-8">
            <h2 className="text-lg font-semibold text-zinc-50">Reference endpoints</h2>
            <p className="mt-2 text-sm text-zinc-500">Illustrative routes—wire to your actual gateway and environment.</p>
            <div className="mt-6 space-y-4">
              {endpoints.map((row) => (
                <div key={row.path} className="rounded-2xl border border-white/[0.06] bg-[#0c0c0e] p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="bg-sky-500/20 text-sky-300">{row.method}</Badge>
                    <code className="text-sm text-zinc-300">{row.path}</code>
                  </div>
                  <p className="mt-2 text-xs uppercase tracking-wider text-zinc-600">{row.scope}</p>
                  <p className="mt-2 text-sm text-zinc-500">{row.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className={cardClass}>
          <CardContent className="space-y-4 p-8">
            <h2 className="text-lg font-semibold text-zinc-50">Integration principles</h2>
            <ul className="space-y-3 text-sm leading-relaxed text-zinc-400">
              {principles.map((p) => (
                <li key={p} className="flex gap-3 rounded-2xl border border-white/[0.06] bg-[#0c0c0e] px-4 py-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
                  {p}
                </li>
              ))}
            </ul>
            <p className="text-xs text-zinc-600">
              Need a signed SLA or dedicated workspace? Reach out via <span className="text-zinc-400">Contact</span> and mention “Platform”.
            </p>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
