import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_CONFIG } from "@/lib/site-config";

const sections = [
  {
    title: "Using the service",
    body: `By accessing ${SITE_CONFIG.name} you agree to follow these terms, our community standards, and any product-specific rules we publish.`,
  },
  {
    title: "Content & licensing",
    body: "You retain rights to what you create. You grant us a license to host, format, distribute, and promote that content in connection with the platform.",
  },
  {
    title: "Acceptable use",
    body: "No harassment, spam, malware, or illegal activity. We may remove content or restrict accounts that put readers or infrastructure at risk.",
  },
  {
    title: "Disclaimers",
    body: "Coverage is for information—not financial, legal, or medical advice. We may change features; where required we will give reasonable notice.",
  },
];

const cardClass = "rounded-3xl border border-white/[0.08] bg-[#121214] text-zinc-100 shadow-[0_24px_80px_rgba(0,0,0,0.35)]";

export default function TermsPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Terms of service"
      description={`Rules for using ${SITE_CONFIG.name}, including publishing, reading, and account responsibilities.`}
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
  );
}
