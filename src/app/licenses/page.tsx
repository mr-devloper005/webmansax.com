import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'

const licenses = [
  { name: 'Next.js', description: 'MIT License · https://nextjs.org' },
  { name: 'React', description: 'MIT License · https://react.dev' },
  { name: 'Tailwind CSS', description: 'MIT License · https://tailwindcss.com' },
  { name: 'Radix UI', description: 'MIT License · https://www.radix-ui.com' },
  { name: 'Lucide icons', description: 'ISC License · https://lucide.dev' },
]

const cardClass = 'rounded-3xl border border-white/[0.08] bg-[#121214] text-zinc-100 shadow-[0_24px_80px_rgba(0,0,0,0.35)]'

export default function LicensesPage() {
  return (
    <PageShell
      eyebrow="Open source"
      title="Licenses"
      description="Acknowledgements for libraries that power this reading experience."
    >
      <Card className={cardClass}>
        <CardContent className="space-y-3 p-8">
          {licenses.map((license) => (
            <div key={license.name} className="rounded-2xl border border-white/[0.06] bg-[#0c0c0e] p-4">
              <h3 className="text-sm font-semibold text-zinc-50">{license.name}</h3>
              <p className="mt-1 text-sm text-zinc-500">{license.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </PageShell>
  )
}
