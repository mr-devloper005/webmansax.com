'use client'

import { useState } from 'react'
import Image from 'next/image'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { mockPressAssets, mockPressCoverage } from '@/data/mock-data'

const cardClass = 'rounded-3xl border border-white/[0.08] bg-[#121214] text-zinc-100 shadow-[0_24px_80px_rgba(0,0,0,0.35)]'

export default function PressPage() {
  const { toast } = useToast()
  const [activeAssetId, setActiveAssetId] = useState<string | null>(null)
  const activeAsset = mockPressAssets.find((asset) => asset.id === activeAssetId)

  return (
    <PageShell
      eyebrow="Media"
      title="Press room"
      description="Brand assets, product imagery, and recent coverage—presented in the same night mode as the reader experience."
    >
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className={cardClass}>
          <CardContent className="space-y-4 p-8">
            <h2 className="text-lg font-semibold text-zinc-50">Press kit</h2>
            <p className="text-sm text-zinc-500">
              Logos, screenshots, and short-form boilerplate for journalists and partners.
            </p>
            <div className="grid gap-3">
              {mockPressAssets.map((asset) => (
                <div key={asset.id} className="rounded-2xl border border-white/[0.06] bg-[#0c0c0e] px-4 py-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm font-medium text-zinc-100">{asset.title}</p>
                      <p className="text-xs text-zinc-500">{asset.description}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className="border-white/10 bg-white/10 text-zinc-200">{asset.fileType}</Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/15 text-zinc-100 hover:bg-white/10"
                        onClick={() => setActiveAssetId(asset.id)}
                      >
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        className="bg-sky-500 text-white hover:bg-sky-400"
                        onClick={() =>
                          toast({
                            title: 'Download started',
                            description: `${asset.title} is downloading.`,
                          })
                        }
                      >
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Coverage</h3>
          {mockPressCoverage.map((item) => (
            <Card key={item.id} className={`${cardClass} transition-transform hover:-translate-y-0.5`}>
              <CardContent className="p-6">
                <div className="text-xs uppercase tracking-wide text-zinc-500">{item.outlet}</div>
                <p className="mt-2 text-sm font-medium text-zinc-100">{item.headline}</p>
                <p className="mt-2 text-xs text-zinc-600">{item.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={Boolean(activeAsset)} onOpenChange={() => setActiveAssetId(null)}>
        <DialogContent className="max-w-3xl border-white/10 bg-[#121214] text-zinc-100">
          <DialogHeader>
            <DialogTitle className="text-zinc-50">{activeAsset?.title}</DialogTitle>
          </DialogHeader>
          {activeAsset?.previewUrl && (
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-white/10 bg-[#0c0c0e]">
              <Image src={activeAsset.previewUrl} alt={activeAsset.title} fill className="object-cover" />
            </div>
          )}
          <p className="text-sm text-zinc-500">{activeAsset?.description}</p>
          <DialogFooter>
            <Button variant="outline" className="border-white/15 text-zinc-100 hover:bg-white/10" onClick={() => setActiveAssetId(null)}>
              Close
            </Button>
            <Button
              className="bg-sky-500 text-white hover:bg-sky-400"
              onClick={() =>
                toast({
                  title: 'Download started',
                  description: `${activeAsset?.title} is downloading.`,
                })
              }
            >
              Download {activeAsset?.fileType}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageShell>
  )
}
