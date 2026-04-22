import Link from 'next/link'
import { Home, MessageCircle, Reply } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { NewsCategoryPills } from '@/components/home/news-category-pills'
import { SITE_CONFIG } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'

function getPostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const contentImage =
    typeof post?.content === 'object' && post?.content && Array.isArray((post.content as { images?: unknown }).images)
      ? (post.content as { images: string[] }).images.find((url: unknown) => typeof url === 'string' && url)
      : null
  return mediaUrl || contentImage || '/placeholder.svg?height=900&width=1400'
}

function formatRelative(iso?: string | null) {
  if (!iso) return 'Just now'
  const t = new Date(iso).getTime()
  if (Number.isNaN(t)) return 'Recently'
  const diff = Date.now() - t
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'Just now'
  if (m < 60) return `${m}min ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.floor(h / 24)
  return `${d}d ago`
}

const PLACEHOLDER_POSTS: SitePost[] = [
  {
    id: 'ph-1',
    title: 'The next chapter for on-chain infrastructure',
    slug: 'sample-infrastructure',
    summary: 'How teams are balancing speed, security, and clarity as adoption grows.',
    tags: ['Markets', 'Analysis'],
    publishedAt: new Date(Date.now() - 23 * 60000).toISOString(),
  },
  {
    id: 'ph-2',
    title: 'Editorial brief: what readers saved this week',
    slug: 'sample-brief',
    summary: 'A calmer look at the stories that earned the most attention.',
    tags: ['Briefing'],
    publishedAt: new Date(Date.now() - 2 * 3600000).toISOString(),
  },
  {
    id: 'ph-3',
    title: 'Company notes: roadmap and publishing rhythm',
    slug: 'sample-company',
    summary: 'Product updates explained without the hype cycle.',
    tags: ['Company'],
    publishedAt: new Date(Date.now() - 26 * 3600000).toISOString(),
  },
]

const SIDEBAR_COMMENTS = [
  {
    id: 'c1',
    name: 'Morgan Lee',
    time: '8m ago',
    text: 'Clear breakdown — saved this for our editorial sync.',
    articleTitle: 'The next chapter for on-chain infrastructure',
  },
  {
    id: 'c2',
    name: 'Priya N.',
    time: '32m ago',
    text: 'Would love a follow-up on second-order effects.',
    articleTitle: 'Editorial brief: what readers saved this week',
  },
  {
    id: 'c3',
    name: 'Jordan K.',
    time: '1h ago',
    text: 'Finally, context without the noise.',
    articleTitle: 'Company notes: roadmap and publishing rhythm',
  },
]

type Props = {
  articlePosts: SitePost[]
}

export function NewsArticlesHome({ articlePosts }: Props) {
  const usePlaceholders = !articlePosts.length
  const pool = usePlaceholders ? PLACEHOLDER_POSTS : articlePosts
  const postHref = (slug: string) => (usePlaceholders ? '/articles' : `/articles/${slug}`)
  const lead = pool[0]
  const rowPair = pool.slice(1, 3)
  const rail = pool.slice(1, 6)
  const bottom = pool.slice(0, 3)

  const tagFor = (post: SitePost, i: number) => {
    const t = post.tags?.[0]
    if (typeof t === 'string' && t.length) return `#${t.replace(/^#/, '')}`
    return ['#Markets', '#Analysis', '#Company'][i % 3]
  }

  return (
    <main className="bg-[#070708] text-zinc-100">
      <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <nav className="flex items-center gap-2 text-sm text-zinc-500">
          <Link href="/" className="inline-flex items-center gap-1 transition-colors hover:text-zinc-200">
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
          <span className="text-zinc-600">/</span>
          <span className="font-medium text-zinc-300">News &amp; Articles</span>
        </nav>

        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">News &amp; Articles</h1>
          <NewsCategoryPills />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_280px_300px]">
          <div className="space-y-8">
            {lead ? (
              <Link
                href={postHref(lead.slug)}
                className="group block overflow-hidden rounded-3xl border border-white/[0.08] bg-[#121214] shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
              >
                <div className="relative aspect-[21/9] min-h-[220px] w-full overflow-hidden sm:aspect-[2.4/1]">
                  <ContentImage src={getPostImage(lead)} alt={lead.title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">{tagFor(lead, 0)}</span>
                    <span className="rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">#Featured</span>
                  </div>
                  <span className="absolute right-4 top-4 rounded-full bg-black/45 px-3 py-1 text-xs text-zinc-200 backdrop-blur-sm">
                    {formatRelative(lead.publishedAt)}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <h2 className="text-2xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-3xl lg:max-w-4xl">{lead.title}</h2>
                  </div>
                </div>
              </Link>
            ) : null}

            <div className="grid gap-6 md:grid-cols-2">
              {rowPair.map((post, idx) => (
                <Link
                  key={post.id}
                  href={postHref(post.slug)}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-[#101012] transition-colors hover:border-sky-500/30"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                    <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-black/55 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">{tagFor(post, idx + 1)}</span>
                    </div>
                    <span className="absolute right-3 top-3 text-[11px] text-sky-300/95">{formatRelative(post.publishedAt)}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg font-semibold leading-snug tracking-[-0.02em] group-hover:text-white">{post.title}</h3>
                    {post.summary ? <p className="mt-2 line-clamp-2 text-sm text-zinc-500">{post.summary}</p> : null}
                  </div>
                </Link>
              ))}
            </div>

            <div>
              <h2 className="text-xl font-semibold tracking-[-0.02em]">Latest coverage</h2>
              <div className="mt-6 grid gap-6 md:grid-cols-3">
                {bottom.map((post, idx) => (
                  <Link
                    key={`${post.id}-b-${idx}`}
                    href={postHref(post.slug)}
                    className="group flex flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0f0f11]"
                  >
                    <div className="flex items-start justify-between gap-3 border-b border-white/[0.06] px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">{tagFor(post, idx)}</span>
                      </div>
                      <span className="shrink-0 text-[11px] text-sky-400/90">{formatRelative(post.publishedAt)}</span>
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="line-clamp-3 text-base font-semibold leading-snug group-hover:text-white">{post.title}</h3>
                    </div>
                    <div className="relative mt-auto aspect-[16/9] w-full overflow-hidden border-t border-white/[0.06]">
                      <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <aside className="hidden space-y-4 xl:block">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Trending</p>
            <div className="space-y-3">
              {rail.map((post) => (
                <Link key={`rail-${post.id}`} href={postHref(post.slug)} className="group flex gap-3 rounded-2xl border border-white/[0.06] bg-[#0c0c0e] p-3 transition-colors hover:border-white/15">
                  <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl">
                    <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-medium text-sky-400/90">{formatRelative(post.publishedAt)}</p>
                    <p className="mt-1 line-clamp-2 text-sm font-medium leading-snug text-zinc-200 group-hover:text-white">{post.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </aside>

          <aside className="space-y-4 rounded-3xl border border-white/[0.08] bg-[#0b0b0d] p-5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-zinc-100">
                <MessageCircle className="h-4 w-4 text-sky-400" />
                Comments on publications
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-zinc-400">Popular</span>
            </div>
            <ul className="space-y-5">
              {SIDEBAR_COMMENTS.map((c) => (
                <li key={c.id} className="border-b border-white/[0.06] pb-5 last:border-b-0 last:pb-0">
                  <div className="flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-500/80 to-indigo-600/80 text-xs font-bold text-white">
                      {c.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-2 text-xs text-zinc-500">
                        <span className="font-medium text-zinc-200">{c.name}</span>
                        <span>{c.time}</span>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-zinc-300">{c.text}</p>
                      <p className="mt-2 flex items-start gap-1.5 text-[11px] text-zinc-500">
                        <Reply className="mt-0.5 h-3 w-3 shrink-0 text-zinc-600" />
                        <span className="line-clamp-2 italic">&ldquo;{c.articleTitle}&rdquo;</span>
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <Link href="/articles" className="block text-center text-xs font-medium text-sky-400 hover:text-sky-300">
              View all on {SITE_CONFIG.name}
            </Link>
          </aside>
        </div>
      </section>
    </main>
  )
}
