import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockTeamMembers } from "@/data/mock-data";
import { SITE_CONFIG } from "@/lib/site-config";

const highlights = [
  { label: "Readers monthly", value: "120k+" },
  { label: "Stories published", value: "4.2k" },
  { label: "Avg. read time", value: "6 min" },
];

const values = [
  {
    title: "Signal over noise",
    description: "We prioritize clarity, sourcing, and edits that respect your attention—not endless scroll bait.",
  },
  {
    title: "Built for focus",
    description: "Typography, spacing, and night-friendly surfaces keep long reads comfortable from headline to footnote.",
  },
  {
    title: "Open to contributors",
    description: "Writers and analysts can pitch through the same desk workflow readers trust for daily coverage.",
  },
];

const cardClass = "rounded-3xl border border-white/[0.08] bg-[#121214] text-zinc-100 shadow-[0_24px_80px_rgba(0,0,0,0.35)]";

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="Our mission"
      title={`About ${SITE_CONFIG.name}`}
      description={`${SITE_CONFIG.name} is an editorial news desk for markets, companies, and ideas—delivered with the same charcoal-and-sky system as our homepage.`}
      actions={
        <>
          <Button variant="outline" asChild className="border-white/15 bg-transparent text-zinc-100 hover:bg-white/10">
            <Link href="/team">Masthead</Link>
          </Button>
          <Button asChild className="bg-sky-500 text-white hover:bg-sky-400">
            <Link href="/contact">Contact the desk</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className={cardClass}>
          <CardContent className="space-y-6 p-8">
            <Badge className="border-white/10 bg-white/10 text-zinc-200 hover:bg-white/15">Why we exist</Badge>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
              A single home for reporting you can trust—and revisit.
            </h2>
            <p className="text-sm leading-7 text-zinc-400">
              {SITE_CONFIG.name} brings analysts, editors, and readers into one rhythm: morning briefings, deep dives, and explainers
              that assume you are smart, busy, and tired of recycled press releases.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/[0.06] bg-[#0c0c0e] p-4">
                  <div className="text-2xl font-semibold text-zinc-50">{item.value}</div>
                  <div className="text-xs text-zinc-500">{item.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4">
          {values.map((value) => (
            <Card key={value.title} className={cardClass}>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-zinc-50">{value.title}</h3>
                <p className="mt-2 text-sm leading-7 text-zinc-500">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-14">
        <h2 className="text-lg font-semibold uppercase tracking-[0.2em] text-zinc-500">Editorial faces</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {mockTeamMembers.map((member) => (
            <Card key={member.id} className={`${cardClass} transition-transform hover:-translate-y-1`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border border-white/10">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="bg-zinc-800 text-zinc-200">{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-zinc-100">{member.name}</p>
                    <p className="text-xs text-zinc-500">{member.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-zinc-500">{member.bio}</p>
                <p className="mt-3 text-xs text-zinc-600">{member.location}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
