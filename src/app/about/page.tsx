import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/site-config";

const values = [
  { title: "Clear discovery", description: "Every section is designed to help visitors find useful content without friction." },
  { title: "Consistent experience", description: "Pages, cards, and navigation follow one visual language across the website." },
  { title: "Quality presentation", description: "Strong layout hierarchy and polished visuals keep the experience premium and readable." },
];

export default function AboutPage() {
  return (
    <PageShell
      title={`About ${SITE_CONFIG.name}`}
      description={`${SITE_CONFIG.name} is a modern content platform built for clean browsing, clear publishing, and connected discovery.`}
      actions={
        <Button asChild>
          <Link href="/contact">Contact Us</Link>
        </Button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-border bg-card">
          <CardContent className="space-y-4 p-6">
            <Badge variant="secondary">Our Story</Badge>
            <h2 className="text-2xl font-semibold text-foreground">
              A connected home for publishing, discovery, and meaningful browsing.
            </h2>
            <p className="text-sm text-muted-foreground">
              {SITE_CONFIG.name} is designed to bring content, visuals, and resources into one smooth experience.
              The goal is simple: make exploration easier, reduce clutter, and help visitors reach the right information faster.
            </p>
            <p className="text-sm text-muted-foreground">
              From homepage flow to section-level browsing, the platform focuses on clarity, consistency, and a stronger
              first impression across every page.
            </p>
          </CardContent>
        </Card>
        <div className="space-y-4">
          {values.map((value) => (
            <Card key={value.title} className="border-border bg-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

          </PageShell>
  );
}
