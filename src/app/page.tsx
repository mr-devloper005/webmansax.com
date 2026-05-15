import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Bookmark,
  Building2,
  Compass,
  FileText,
  Grid2X2,
  Image as ImageIcon,
  Sparkles,
  Tag,
  User,
} from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'
import { fetchTaskPosts } from '@/lib/task-data'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind, type ProductKind } from '@/design/factory/get-product-kind'
import type { SitePost } from '@/lib/site-connector'
import { HOME_PAGE_OVERRIDE_ENABLED, HomePageOverride } from '@/overrides/home-page'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/',
    title: siteContent.home.metadata.title,
    description: siteContent.home.metadata.description,
    openGraphTitle: siteContent.home.metadata.openGraphTitle,
    openGraphDescription: siteContent.home.metadata.openGraphDescription,
    image: SITE_CONFIG.defaultOgImage,
    keywords: [...siteContent.home.metadata.keywords],
  })
}

type EnabledTask = (typeof SITE_CONFIG.tasks)[number]
type TaskFeedItem = { task: EnabledTask; posts: SitePost[] }

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: Bookmark,
  classified: Tag,
  image: ImageIcon,
  profile: User,
}

function resolveTaskKey(value: unknown, fallback: TaskKey): TaskKey {
  if (value === 'listing' || value === 'classified' || value === 'article' || value === 'image' || value === 'profile' || value === 'sbm') return value
  return fallback
}

function getTaskHref(task: TaskKey, slug: string) {
  const route = SITE_CONFIG.tasks.find((item) => item.key === task)?.route || `/${task}`
  return `${route}/${slug}`
}

function getPostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const contentImage = typeof post?.content === 'object' && post?.content && Array.isArray((post.content as any).images)
    ? (post.content as any).images.find((url: unknown) => typeof url === 'string' && url)
    : null
  const logo = typeof post?.content === 'object' && post?.content && typeof (post.content as any).logo === 'string'
    ? (post.content as any).logo
    : null
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

function getPostMeta(post?: SitePost | null) {
  if (!post || typeof post.content !== 'object' || !post.content) return { location: '', category: '' }
  const content = post.content as Record<string, unknown>
  return {
    location: typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : '',
    category: typeof content.category === 'string' ? content.category : typeof post.tags?.[0] === 'string' ? post.tags[0] : '',
  }
}

function DirectoryHome({ primaryTask, enabledTasks, listingPosts, classifiedPosts, profilePosts }: {
  primaryTask?: EnabledTask
  enabledTasks: EnabledTask[]
  listingPosts: SitePost[]
  classifiedPosts: SitePost[]
  profilePosts: SitePost[]
}) {
  const featured = (listingPosts.length ? listingPosts : classifiedPosts).slice(0, 3)
  const highlightTaskKey: TaskKey = listingPosts.length ? 'listing' : 'classified'

  return (
    <main className="bg-[linear-gradient(180deg,#f7fafc_0%,#ffffff_34%,#f8f5ef_100%)] text-slate-950">
      <section className="mx-auto max-w-7xl px-4 pb-12 pt-12 sm:px-6 lg:px-8 lg:pt-16">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white">
              <Sparkles className="h-3.5 w-3.5" />
              Curated Discoveries
            </span>
            <h1 className="mt-6 max-w-4xl font-['Fraunces',serif] text-5xl leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Discover quality content through a sharper, more intentional homepage.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              We redesigned the flow to make discovery faster, visuals cleaner, and every section easier to explore from the very first scroll.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primaryTask?.route || '/articles'} className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                Start exploring
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
                Contact us
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_28px_70px_rgba(15,23,42,0.12)]">
            <div className="grid gap-4 sm:grid-cols-2">
              {enabledTasks.slice(0, 4).map((task) => {
                const Icon = taskIcons[task.key as TaskKey] || Grid2X2
                return (
                  <Link key={task.key} href={task.route} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:bg-white">
                    <Icon className="h-5 w-5 text-slate-700" />
                    <h3 className="mt-4 text-lg font-semibold">{task.label}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{task.description}</p>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Featured</p>
            <h2 className="mt-3 font-['Fraunces',serif] text-3xl tracking-[-0.03em]">Handpicked highlights</h2>
          </div>
          <Link href={primaryTask?.route || '/articles'} className="text-sm font-semibold text-slate-900 hover:opacity-80">View all</Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {featured.map((post) => (
            <Link key={post.id} href={getTaskHref(highlightTaskKey, post.slug)} className="group overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-[0_16px_36px_rgba(15,23,42,0.08)]">
              <div className="relative h-52 overflow-hidden">
                <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">{getPostMeta(post).category || 'Update'}</p>
                <h3 className="mt-2 text-xl font-semibold leading-snug">{post.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-7 text-slate-600">{post.summary || 'Discover the latest platform updates and highlights.'}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
          {[
            ['Clear Navigation', 'Purposeful layout rhythm that makes every section easier to scan.'],
            ['Stronger Visuals', 'Balanced imagery, spacing, and hierarchy for a premium first impression.'],
            ['Connected Flow', 'Quick paths from discovery to deeper content without dead ends.'],
          ].map(([title, text]) => (
            <div key={title} className="rounded-2xl border border-white/15 bg-white/5 p-5">
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {!!profilePosts.length && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-7 flex items-end justify-between gap-4">
            <h2 className="font-['Fraunces',serif] text-3xl tracking-[-0.03em]">People and teams to follow</h2>
            <Link href="/profile" className="text-sm font-semibold text-slate-900 hover:opacity-80">Explore profiles</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {profilePosts.slice(0, 3).map((post) => (
              <Link key={post.id} href={getTaskHref(resolveTaskKey(post.task, 'profile'), post.slug)} className="overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
                <div className="relative h-44">
                  <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-7 text-slate-600">{post.summary || 'Learn more and discover related updates.'}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

function EditorialHome({ primaryTask, articlePosts, supportTasks }: { primaryTask?: EnabledTask; articlePosts: SitePost[]; supportTasks: EnabledTask[] }) {
  const lead = articlePosts[0]

  return (
    <main className="bg-[linear-gradient(180deg,#fdf8f2_0%,#fffdf9_45%,#ffffff_100%)] text-[#2a1e17]">
      <section className="mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 lg:px-8 lg:pt-16">
        <h1 className="max-w-5xl font-['Fraunces',serif] text-5xl leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
          A refined hero experience designed for deeper reading and stronger first impressions.
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-[#6e5648] sm:text-lg">
          The top section now balances storytelling, navigation clarity, and premium visuals so visitors can move naturally into featured content.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={primaryTask?.route || '/articles'} className="inline-flex items-center gap-2 rounded-full bg-[#2a1e17] px-6 py-3 text-sm font-semibold text-[#fff1e5] hover:bg-[#3b2920]">
            Read latest
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/about" className="inline-flex items-center gap-2 rounded-full border border-[#dbc8b6] px-6 py-3 text-sm font-semibold text-[#2a1e17] hover:bg-[#f8ecdf]">
            About
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            ['Cleaner hierarchy', 'Stronger typographic rhythm across hero and featured blocks.'],
            ['Better discoverability', 'Clearer entry points into sections and highlights.'],
            ['Premium presentation', 'Balanced space, tone, and visual focus above the fold.'],
          ].map(([title, text]) => (
            <div key={title} className="rounded-[1.3rem] border border-[#e4d4c5] bg-[#fff8f0] p-4">
              <p className="text-sm font-semibold text-[#2a1e17]">{title}</p>
              <p className="mt-2 text-sm leading-6 text-[#715a4d]">{text}</p>
            </div>
          ))}
        </div>

        {lead ? (
          <div className="mt-12 overflow-hidden rounded-[2.4rem] border border-[#e4d4c5] bg-white shadow-[0_30px_80px_rgba(92,57,37,0.12)]">
            <div className="grid lg:grid-cols-[1.06fr_0.94fr]">
              <div className="relative min-h-[330px]">
                <ContentImage src={getPostImage(lead)} alt={lead.title} fill className="object-cover" />
              </div>
              <div className="p-8 lg:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8a6a56]">Featured story</p>
                <h2 className="mt-3 font-['Fraunces',serif] text-4xl leading-tight tracking-[-0.03em]">{lead.title}</h2>
                <p className="mt-4 text-sm leading-8 text-[#6e5648]">{lead.summary || 'Thoughtful writing and context-rich updates with a calm reading pace.'}</p>
                <Link href={`/articles/${lead.slug}`} className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#2a1e17] px-5 py-3 text-sm font-semibold text-[#fff1e5] hover:bg-[#3b2920]">
                  Open story
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        ) : null}

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {supportTasks.slice(0, 3).map((task) => (
            <Link key={task.key} href={task.route} className="rounded-[1.6rem] border border-[#e8d9cb] bg-[#fff8f0] p-6 transition hover:-translate-y-0.5">
              <h3 className="text-xl font-semibold">{task.label}</h3>
              <p className="mt-2 text-sm leading-7 text-[#715a4d]">{task.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

function VisualHome({ primaryTask, imagePosts, profilePosts, articlePosts }: { primaryTask?: EnabledTask; imagePosts: SitePost[]; profilePosts: SitePost[]; articlePosts: SitePost[] }) {
  const gallery = imagePosts.length ? imagePosts.slice(0, 5) : articlePosts.slice(0, 5)

  return (
    <main className="bg-[linear-gradient(180deg,#070f1b_0%,#0c1527_45%,#111d34_100%)] text-white">
      <section className="mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 lg:px-8 lg:pt-16">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#8df0c8] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#07111f]">
              <ImageIcon className="h-3.5 w-3.5" />
              Visual-first
            </span>
            <h1 className="mt-6 max-w-4xl font-['Fraunces',serif] text-5xl leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              A cinematic homepage that turns visual browsing into a premium experience.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Bigger frames, calmer grids, and more intentional pacing across every visual touchpoint.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primaryTask?.route || '/images'} className="inline-flex items-center gap-2 rounded-full bg-[#8df0c8] px-6 py-3 text-sm font-semibold text-[#07111f] hover:bg-[#77dfb8]">
                View gallery
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/profile" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">
                Creators
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {gallery.slice(0, 5).map((post, index) => (
              <Link
                key={post.id}
                href={getTaskHref(resolveTaskKey(post.task, 'image'), post.slug)}
                className={index === 0 ? 'col-span-2 row-span-2 overflow-hidden rounded-[2.3rem] border border-white/10 bg-white/5' : 'overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5'}
              >
                <div className={index === 0 ? 'relative h-[360px]' : 'relative h-[170px]'}>
                  <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {!!profilePosts.length && (
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {profilePosts.slice(0, 3).map((post) => (
              <Link key={post.id} href={`/profile/${post.slug}`} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <div className="relative h-36 overflow-hidden rounded-[1rem]">
                  <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{post.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-7 text-slate-300">{post.summary || 'Visual stories and profile highlights.'}</p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

function CurationHome({ primaryTask, bookmarkPosts, profilePosts, articlePosts }: { primaryTask?: EnabledTask; bookmarkPosts: SitePost[]; profilePosts: SitePost[]; articlePosts: SitePost[] }) {
  const collections = bookmarkPosts.length ? bookmarkPosts.slice(0, 4) : articlePosts.slice(0, 4)

  return (
    <main className="bg-[linear-gradient(180deg,#f8f0e8_0%,#fff8f2_42%,#ffffff_100%)] text-[#281812]">
      <section className="mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 lg:px-8 lg:pt-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#5b2b3b] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#fff0f5]">
              <Bookmark className="h-3.5 w-3.5" />
              Smart Collections
            </span>
            <h1 className="mt-6 max-w-4xl font-['Fraunces',serif] text-5xl leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Organize, revisit, and discover through a richer curation-first interface.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#72574c] sm:text-lg">
              Designed like a premium collection board with clear grouping and delightful browsing rhythm.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primaryTask?.route || '/sbm'} className="inline-flex items-center gap-2 rounded-full bg-[#5b2b3b] px-6 py-3 text-sm font-semibold text-[#fff0f5] hover:bg-[#6f3448]">
                Open collections
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/profile" className="inline-flex items-center gap-2 rounded-full border border-[#e1cfc2] px-6 py-3 text-sm font-semibold text-[#281812] hover:bg-[#f3e5d9]">
                Explore curators
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {collections.map((post) => (
              <Link key={post.id} href={getTaskHref(resolveTaskKey(post.task, 'sbm'), post.slug)} className="rounded-[1.6rem] border border-[#e1cfc2] bg-white/80 p-6 shadow-[0_12px_30px_rgba(90,56,37,0.08)]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8a6a5c]">Collection</p>
                <h3 className="mt-2 text-2xl font-semibold leading-snug">{post.title}</h3>
                <p className="mt-3 text-sm leading-8 text-[#71584b]">{post.summary || 'A focused collection with context and discoverability built in.'}</p>
              </Link>
            ))}
          </div>
        </div>

        {!!profilePosts.length && (
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {profilePosts.slice(0, 3).map((post) => (
              <Link key={post.id} href={`/profile/${post.slug}`} className="rounded-[1.5rem] border border-[#e1cfc2] bg-white/70 p-4">
                <div className="relative h-32 overflow-hidden rounded-[1rem]">
                  <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{post.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-7 text-[#71584b]">Curator highlights and connected resources.</p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default async function HomePage() {
  if (HOME_PAGE_OVERRIDE_ENABLED) {
    return <HomePageOverride />
  }

  const enabledTasks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const taskFeed: TaskFeedItem[] = (
    await Promise.all(
      enabledTasks.map(async (task) => ({
        task,
        posts: await fetchTaskPosts(task.key, 8, { allowMockFallback: false, fresh: true }),
      }))
    )
  ).filter(({ posts }) => posts.length)

  const primaryTask = enabledTasks.find((task) => task.key === recipe.primaryTask) || enabledTasks[0]
  const supportTasks = enabledTasks.filter((task) => task.key !== primaryTask?.key)
  const listingPosts = taskFeed.find(({ task }) => task.key === 'listing')?.posts || []
  const classifiedPosts = taskFeed.find(({ task }) => task.key === 'classified')?.posts || []
  const articlePosts = taskFeed.find(({ task }) => task.key === 'article')?.posts || []
  const imagePosts = taskFeed.find(({ task }) => task.key === 'image')?.posts || []
  const profilePosts = taskFeed.find(({ task }) => task.key === 'profile')?.posts || []
  const bookmarkPosts = taskFeed.find(({ task }) => task.key === 'sbm')?.posts || []

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      logo: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${SITE_CONFIG.defaultOgImage}`,
      sameAs: [],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarShell />
      <SchemaJsonLd data={schemaData} />
      {productKind === 'directory' ? (
        <DirectoryHome
          primaryTask={primaryTask}
          enabledTasks={enabledTasks}
          listingPosts={listingPosts}
          classifiedPosts={classifiedPosts}
          profilePosts={profilePosts}
        />
      ) : null}
      {productKind === 'editorial' ? (
        <EditorialHome primaryTask={primaryTask} articlePosts={articlePosts} supportTasks={supportTasks} />
      ) : null}
      {productKind === 'visual' ? (
        <VisualHome primaryTask={primaryTask} imagePosts={imagePosts} profilePosts={profilePosts} articlePosts={articlePosts} />
      ) : null}
      {productKind === 'curation' ? (
        <CurationHome primaryTask={primaryTask} bookmarkPosts={bookmarkPosts} profilePosts={profilePosts} articlePosts={articlePosts} />
      ) : null}
      <Footer />
    </div>
  )
}
