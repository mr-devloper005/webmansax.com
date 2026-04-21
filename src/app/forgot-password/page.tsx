"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NavbarShell } from "@/components/shared/navbar-shell"
import { Footer } from "@/components/shared/footer"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsSubmitted(true)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[#070708] text-zinc-100">
      <NavbarShell />
      <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-4 py-16 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md rounded-3xl border border-white/[0.08] bg-[#121214] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
        >
          <Link
            href="/login"
            className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>

          {!isSubmitted ? (
            <>
              <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">Reset your password</h1>
              <p className="mt-2 text-sm text-zinc-500">
                Enter your email and we&apos;ll send a secure link to reset your password.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-zinc-300">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-white/10 bg-white/5 pl-10 text-zinc-100 placeholder:text-zinc-600"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-sky-500 text-white hover:bg-sky-400" disabled={isLoading}>
                  {isLoading ? "Sending…" : "Send reset link"}
                </Button>
              </form>
            </>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15">
                <CheckCircle className="h-8 w-8 text-emerald-400" />
              </div>
              <h1 className="text-2xl font-semibold text-zinc-50">Check your email</h1>
              <p className="mt-2 text-sm text-zinc-500">
                We sent a reset link to <strong className="text-zinc-300">{email}</strong>
              </p>
              <Button asChild variant="outline" className="mt-8 w-full border-white/15 text-zinc-100 hover:bg-white/10">
                <Link href="/login">Back to login</Link>
              </Button>
              <p className="mt-6 text-sm text-zinc-600">
                Didn&apos;t receive it?{" "}
                <button type="button" onClick={() => setIsSubmitted(false)} className="text-sky-400 hover:text-sky-300">
                  Try again
                </button>
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
      <Footer />
    </div>
  )
}
