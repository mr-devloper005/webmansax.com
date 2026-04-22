'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command'
import { useToast } from '@/components/ui/use-toast'
import { FileText, Plus, Bookmark, Settings, Search } from 'lucide-react'

const quickLinks = [
  { label: 'Go to Articles', href: '/articles', icon: FileText },
  { label: 'Search', href: '/search', icon: Search },
  { label: 'Reading list', href: '/dashboard/saved', icon: Bookmark },
  { label: 'Go to Settings', href: '/settings', icon: Settings },
]

const createActions = [{ label: 'New article', href: '/dashboard/articles/new', icon: Plus }]

export function CommandPalette() {
  const router = useRouter()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const allItems = useMemo(() => [...quickLinks, ...createActions], [])

  return (
    <CommandDialog open={open} onOpenChange={setOpen} title="Command Palette" description="Search for a command to run...">
      <CommandInput placeholder="Search commands..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigate">
          {quickLinks.map((item) => (
            <CommandItem
              key={item.href}
              onSelect={() => {
                router.push(item.href)
                setOpen(false)
              }}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Create">
          {createActions.map((item) => (
            <CommandItem
              key={item.href}
              onSelect={() => {
                router.push(item.href)
                setOpen(false)
              }}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Quick">
          <CommandItem
            onSelect={() => {
              toast({ title: 'Search opened', description: 'Use the hero search or /search page.' })
              router.push('/search')
              setOpen(false)
            }}
          >
            <Search className="mr-2 h-4 w-4" />
            Open Search
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
