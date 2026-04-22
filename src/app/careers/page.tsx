import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/site-config";

const roles = [
  { title: "Staff writer — Markets", location: "Remote (US/EU)", type: "Full-time", level: "Mid" },
  { title: "Senior frontend engineer", location: "New York / Remote", type: "Full-time", level: "Senior" },
  { title: "Audience & growth lead", location: "Remote", type: "Full-time", level: "Lead" },
];

const benefits = [
  "Editorial-first culture: ship work readers actually open",
  "Health stipend + equipment budget for your desk",
  "Learning budget for data, design, and reporting tools",
  "Async-friendly schedules with predictable publishing cadence",
];

const cardClass = "rounded-3xl border border-white/[0.08] bg-[#121214] text-zinc-100 shadow-[0_24px_80px_rgba(0,0,0,0.35)]";

export default function CareersPage() {
  return (
    <PageShell
      eyebrow="Careers"
      title="Join the desk"
      description={`Help shape how ${SITE_CONFIG.name} covers companies, markets, and ideas—with craft, speed, and zero corporate filler.`}
      actions={
        <Button asChild className="bg-sky-500 text-white hover:bg-sky-400">
          <Link href="/contact">Introduce yourself</Link>
        </Button>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          {roles.map((role) => (
            <Card key={role.title} className={cardClass}>
              <CardContent className="p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="border-white/10 bg-white/10 text-zinc-200">{role.level}</Badge>
                  <Badge variant="outline" className="border-white/15 text-zinc-400">
                    {role.type}
                  </Badge>
                </div>
                <h2 className="mt-4 text-lg font-semibold text-zinc-50">{role.title}</h2>
                <p className="mt-1 text-sm text-zinc-500">{role.location}</p>
                <Button variant="outline" className="mt-5 border-white/15 text-zinc-100 hover:bg-white/10" asChild>
                  <Link href="/contact">Ask about this role</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className={cardClass}>
          <CardContent className="p-8">
            <h3 className="text-lg font-semibold text-zinc-50">Why {SITE_CONFIG.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              We are a small editorial product team obsessed with reader trust, fast pages, and stories that hold up after the hype
              cycle ends.
            </p>
            <div className="mt-6 space-y-3 text-sm text-zinc-400">
              {benefits.map((benefit) => (
                <div key={benefit} className="rounded-2xl border border-white/[0.06] bg-[#0c0c0e] px-4 py-3">
                  {benefit}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
