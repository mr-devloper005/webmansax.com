'use client'

import Link from 'next/link'
import { ChevronDown, LayoutGrid, LogOut, Plus, User, FileText, Building2, Tag, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

export function NavbarAuthControls() {
  const { user, logout } = useAuth()

  return (
    <>
      <div className="hidden items-center gap-3 md:flex">
        <span className="text-sm font-semibold text-emerald-400">+ $2,235.45</span>
        <span className="text-sm font-medium text-zinc-100">$200,000</span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            className="hidden h-10 gap-1 rounded-full border border-white/10 bg-sky-500/90 px-4 text-white shadow-[0_12px_40px_rgba(14,165,233,0.25)] hover:bg-sky-400 sm:flex"
          >
            <Plus className="h-4 w-4" />
            Create
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 border-white/10 bg-[#121214] text-zinc-100">
          {SITE_CONFIG.tasks
            .filter((task) => task.enabled)
            .map((task) => {
              const Icon = taskIcons[task.key] || LayoutGrid
              return (
                <DropdownMenuItem key={task.key} asChild className="focus:bg-white/10">
                  <Link href={`/dashboard/articles/new`}>
                    <Icon className="mr-2 h-4 w-4" />
                    New {task.label.replace(/s$/, '')}
                  </Link>
                </DropdownMenuItem>
              )
            })}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex items-center gap-2 sm:gap-3">
        <Avatar className="h-9 w-9 border border-white/15">
          <AvatarImage src={user?.avatar} alt={user?.name} />
          <AvatarFallback className="bg-zinc-800 text-zinc-100">{user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={logout}
          className="gap-2 rounded-full px-3 text-zinc-200 hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Sign out</span>
        </Button>
      </div>
    </>
  )
}
