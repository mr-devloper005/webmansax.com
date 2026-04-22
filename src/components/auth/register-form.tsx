'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

type RegisterFormProps = {
  actionClassName: string
  mutedClassName: string
  inputClassName?: string
}

export function RegisterForm({ actionClassName, mutedClassName, inputClassName }: RegisterFormProps) {
  const inputBase =
    inputClassName ||
    'h-12 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-zinc-100 placeholder:text-zinc-500'
  const router = useRouter()
  const { signup, isLoading } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    await signup(name, email, password)
    router.push('/')
    router.refresh()
  }

  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Create account</p>
      <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
        <input
          className={inputBase}
          placeholder="Full name"
          autoComplete="name"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
          required
        />
        <input
          className={inputBase}
          placeholder="Email address"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          required
        />
        <input
          className={inputBase}
          placeholder="Password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold disabled:opacity-60 ${actionClassName}`}
        >
          {isLoading ? 'Creating…' : 'Create account'}
        </button>
      </form>
      <div className={`mt-6 flex items-center justify-between text-sm ${mutedClassName}`}>
        <span>Already have an account?</span>
        <Link href="/login" className="inline-flex items-center gap-2 font-semibold hover:underline">
          <Sparkles className="h-4 w-4" />
          Sign in
        </Link>
      </div>
    </>
  )
}
