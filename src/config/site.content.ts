import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Content platform',
  },
  footer: {
    tagline: 'Content platform',
  },
  hero: {
    badge: 'Fresh updates and highlights',
    title: ['A modern home for', 'publishing and discovery.'],
    description: 'A flexible platform for sharing content, exploring updates, and helping visitors discover what matters quickly.',
    primaryCta: {
      label: 'Explore content',
      href: '/articles',
    },
    secondaryCta: {
      label: 'View highlights',
      href: '/images',
    },
    searchPlaceholder: 'Search content, pages, and resources',
    focusLabel: 'Focus',
    featureCardBadge: 'recent highlights',
    featureCardTitle: 'Fresh content stays visible and easy to discover.',
    featureCardDescription:
      'New updates and featured content stay connected to the rest of the platform for smoother browsing.',
  },
  home: {
    metadata: {
      title: 'A connected content experience',
      description: 'A flexible platform for sharing content, exploring updates, and improving discovery across the site.',
      openGraphTitle: 'A connected content experience',
      openGraphDescription:
        'Explore stories, visuals, and resources through one consistent and easy-to-browse platform.',
      keywords: ['content platform', 'content discovery', 'digital publishing', 'web experience'],
    },
    introBadge: 'About this platform',
    introTitle: 'Built for clear publishing, smooth browsing, and connected discovery.',
    introParagraphs: [
      'This site brings different content formats into one consistent experience so visitors can discover more without friction.',
      'Everything is structured to keep navigation clear, surface relevant updates quickly, and make each section easy to browse.',
      'Whether someone starts from the homepage or a specific section, they can continue exploring naturally through related content.',
    ],
    sideBadge: 'At a glance',
    sidePoints: [
      'Clean, reading-friendly layouts across the site.',
      'Connected sections for content, visuals, and resources.',
      'Simple navigation built for faster exploration.',
      'Lightweight interactions for a smooth experience.',
    ],
    primaryLink: {
      label: 'Start exploring',
      href: '/articles',
    },
    secondaryLink: {
      label: 'View updates',
      href: '/images',
    },
  },
  cta: {
    badge: 'Get started',
    title: 'Discover content, updates, and useful resources in one place.',
    description: 'A flexible platform for publishing and discovery, designed for clarity, speed, and continuity.',
    primaryCta: {
      label: 'Explore now',
      href: '/articles',
    },
    secondaryCta: {
      label: 'Contact us',
      href: '/contact',
    },
  },
  taskSectionHeading: 'Latest {label}',
  taskSectionDescriptionSuffix: 'Browse recent updates in this section.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Content updates',
    description: 'Explore recent updates and discover new content across the platform.',
  },
  listing: {
    title: 'Content updates',
    description: 'Explore recent updates and discover new content across the platform.',
  },
  classified: {
    title: 'Content updates',
    description: 'Explore recent updates and discover new content across the platform.',
  },
  image: {
    title: 'Content updates',
    description: 'Explore recent updates and discover new content across the platform.',
  },
  profile: {
    title: 'Content updates',
    description: 'Explore recent updates and discover new content across the platform.',
  },
  sbm: {
    title: 'Content updates',
    description: 'Explore recent updates and discover new content across the platform.',
  },
  pdf: {
    title: 'Content updates',
    description: 'Explore recent updates and discover new content across the platform.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: {
    title: 'Discover and browse content',
    paragraphs: [
      'This section helps visitors discover updates quickly through a clear and easy-to-scan layout.',
      'Each item stays connected to related content so visitors can continue exploring without losing context.',
      'Use categories and filters to move smoothly through content and find relevant updates faster.',
    ],
    links: [
      { label: 'Explore content', href: '/articles' },
      { label: 'Browse updates', href: '/classifieds' },
      { label: 'View profiles', href: '/profile' },
    ],
  },
  article: {
    title: 'Discover and browse content',
    paragraphs: [
      'This section is designed for clear reading, smooth exploration, and meaningful discovery.',
      'Content stays connected with related updates so visitors can continue learning and exploring naturally.',
      'Use this area to find fresh posts, revisit useful insights, and navigate to related pages easily.',
    ],
    links: [],
  },
  classified: {
    title: 'Discover and browse content',
    paragraphs: [
      'This section presents timely updates in a concise format that is easy to scan.',
      'Visitors can quickly move from short updates to deeper pages when more context is needed.',
      'Browse recent posts by category and continue into related content with minimal effort.',
    ],
    links: [
      { label: 'Explore content', href: '/listings' },
      { label: 'Read updates', href: '/articles' },
      { label: 'View profiles', href: '/profile' },
    ],
  },
  image: {
    title: 'Discover and browse content',
    paragraphs: [
      'This section highlights visual-first content while keeping discovery simple and fast.',
      'Visual updates connect to related posts so users can move from browsing to deeper context naturally.',
      'Explore fresh highlights and continue into related pages for more details when needed.',
    ],
    links: [
      { label: 'Read content', href: '/articles' },
      { label: 'Explore updates', href: '/listings' },
      { label: 'Open latest posts', href: '/classifieds' },
    ],
  },
  profile: {
    title: 'Discover and browse content',
    paragraphs: [
      'This section provides identity and trust context behind published content.',
      'Visitors can understand people, teams, or brands and continue into related updates from the same source.',
      'Use these pages to strengthen credibility and keep discovery connected across the platform.',
    ],
    links: [
      { label: 'Open content', href: '/listings' },
      { label: 'Read updates', href: '/articles' },
      { label: 'Browse highlights', href: '/images' },
    ],
  },
  sbm: {
    title: 'Discover and browse content',
    paragraphs: [
      'This section organizes useful links and references in a focused browsing format.',
      'Saved resources stay connected to the broader platform to support deeper discovery.',
      'Use it to revisit helpful sources and continue exploring related content in one flow.',
    ],
    links: [
      { label: 'Browse content', href: '/articles' },
      { label: 'Explore updates', href: '/listings' },
      { label: 'Open resources', href: '/pdf' },
    ],
  },
  pdf: {
    title: 'Discover and browse content',
    paragraphs: [
      'This section offers downloadable resources as part of the same connected site experience.',
      'Documents and reference files remain linked with related content for easier exploration.',
      'Browse by category to find what you need, then continue to related updates for more context.',
    ],
    links: [
      { label: 'Read updates', href: '/articles' },
      { label: 'See more content', href: '/listings' },
      { label: 'Explore profiles', href: '/profile' },
    ],
  },
  social: {
    title: 'Discover and browse content',
    paragraphs: [
      'This section surfaces quick updates that keep activity visible across the platform.',
      'Short posts can lead visitors into deeper pages when they want more context.',
      'Use it as a lightweight discovery layer tied to the broader content experience.',
    ],
    links: [
      { label: 'Open content', href: '/listings' },
      { label: 'Read updates', href: '/articles' },
      { label: 'View resources', href: '/pdf' },
    ],
  },
  comment: {
    title: 'Discover and browse content',
    paragraphs: [
      'This section keeps conversations close to the content they relate to.',
      'Responses add context while preserving a clean browsing flow for visitors.',
      'Use comments as a supporting layer and continue exploring related pages naturally.',
    ],
    links: [
      { label: 'Explore updates', href: '/articles' },
      { label: 'View content', href: '/listings' },
      { label: 'See latest posts', href: '/classifieds' },
    ],
  },
  org: {
    title: 'Discover and browse content',
    paragraphs: [
      'This section supports structured presence for teams, brands, and communities.',
      'It connects identity with published updates to create a clearer site structure.',
      'Link these pages with related content to keep navigation cohesive and discoverable.',
    ],
    links: [
      { label: 'Open content', href: '/listings' },
      { label: 'Read updates', href: '/articles' },
      { label: 'Browse resources', href: '/pdf' },
    ],
  },
}
