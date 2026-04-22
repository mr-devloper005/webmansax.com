import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const services = [
  { name: 'Reading app & web', status: 'Operational', detail: 'Core pages, navigation, and article rendering' },
  { name: 'Search & feeds', status: 'Operational', detail: 'Query API and editorial listings' },
  { name: 'Media CDN', status: 'Operational', detail: 'Images and static assets' },
]

const incidents = [
  { date: 'Apr 18, 2026', title: 'Elevated latency on image transforms', status: 'Resolved' },
  { date: 'Mar 12, 2026', title: 'Delayed notification digests', status: 'Resolved' },
]

const cardClass = 'rounded-3xl border border-white/[0.08] bg-[#121214] text-zinc-100 shadow-[0_24px_80px_rgba(0,0,0,0.35)]'

export default function StatusPage() {
  return (
    <PageShell
      eyebrow="Reliability"
      title="System status"
      description="Live snapshot of reader-facing services. For urgent issues, contact support after checking here."
    >
      <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <Card key={service.name} className={cardClass}>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-zinc-50">{service.name}</h2>
                <p className="mt-2 text-xs text-zinc-500">{service.detail}</p>
                <Badge className="mt-4 border-emerald-500/30 bg-emerald-500/15 text-emerald-300">{service.status}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className={cardClass}>
          <CardContent className="p-8">
            <h3 className="text-lg font-semibold text-zinc-50">Incident history</h3>
            <div className="mt-6 space-y-4">
              {incidents.map((incident) => (
                <div key={incident.title} className="rounded-2xl border border-white/[0.06] bg-[#0c0c0e] px-4 py-4">
                  <div className="text-xs uppercase tracking-wider text-zinc-500">{incident.date}</div>
                  <div className="mt-1 text-sm font-medium text-zinc-100">{incident.title}</div>
                  <div className="mt-2 text-xs text-emerald-400/90">{incident.status}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
