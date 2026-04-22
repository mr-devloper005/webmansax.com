import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { mockFaqs } from '@/data/mock-data'

const topics = [
  {
    title: 'Reading & accounts',
    description: 'Save stories, sync sessions, and manage your profile without losing your place.',
  },
  {
    title: 'Newsletters & alerts',
    description: 'Choose digest frequency, topic tags, and quiet hours so updates feel helpful—not noisy.',
  },
  {
    title: 'Publishing & pitches',
    description: 'Contributor guidelines, style notes, and how submissions move through the desk.',
  },
  {
    title: 'Billing & access',
    description: 'Manage premium lanes, receipts, and workspace seats when those programs go live.',
  },
]

const cardClass = 'rounded-3xl border border-white/[0.08] bg-[#121214] text-zinc-100 shadow-[0_24px_80px_rgba(0,0,0,0.35)]'

export default function HelpPage() {
  return (
    <PageShell
      eyebrow="Support"
      title="Help center"
      description="Guides, FAQs, and best practices—styled like the rest of the newsroom so help never feels like a different product."
      actions={
        <Button asChild className="bg-sky-500 text-white hover:bg-sky-400">
          <Link href="/contact">Contact support</Link>
        </Button>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          {topics.map((topic) => (
            <Card key={topic.title} className={`${cardClass} transition-transform hover:-translate-y-0.5`}>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-zinc-50">{topic.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">{topic.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className={cardClass}>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-zinc-50">FAQ</h3>
            <Accordion type="single" collapsible className="mt-4 border-white/10 text-zinc-300">
              {mockFaqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="border-white/10">
                  <AccordionTrigger className="text-left text-zinc-100 hover:text-white hover:no-underline">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-sm text-zinc-500">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
