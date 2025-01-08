'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Zap } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [apartmentNumber, setApartmentNumber] = useState('')
  const [accessCode, setAccessCode] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate a brief loading state
    await new Promise(resolve => setTimeout(resolve, 500))

    // Any combination will grant access
    router.push('/lights')
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Left Section */}
      <div className="flex-1 p-8">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <Zap className="h-6 w-6" />
          <span>leap.qa</span>
        </div>
        <div className="absolute bottom-8">
          <span className="text-zinc-400">Miguel Anton</span>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full max-w-md bg-zinc-950 p-8 flex flex-col justify-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome Home
            </h1>
            <p className="text-sm text-zinc-400">
              Enter your apartment number
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <Input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="1201"
                value={apartmentNumber}
                onChange={(e) => setApartmentNumber(e.target.value)}
                className="bg-transparent border-zinc-800 text-white placeholder:text-zinc-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <Input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Access Code"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                className="bg-transparent border-zinc-800 text-white placeholder:text-zinc-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-white text-black hover:bg-zinc-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <p className="text-sm text-zinc-400">
            By clicking continue, you agree to our{' '}
            <Link href="/terms" className="underline underline-offset-4 hover:text-white">
              Terms of Service
            </Link>
            {' '}and{' '}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-white">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

