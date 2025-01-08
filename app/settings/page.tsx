'use client'

import { useState } from 'react'
import { Layout } from '@/components/layout'
import { PaymentMethodSelect } from '@/components/PaymentMethodSelect'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function SettingsPage() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card')
  const [amount, setAmount] = useState('')
  const [showCardForm, setShowCardForm] = useState(false)

  const handleNext = () => {
    if (!amount) return
    setShowCardForm(true)
  }

  const handlePaymentMethodSelect = (method: string) => {
    setSelectedPaymentMethod(method)
    if (method === 'card') {
      setShowCardForm(true)
    } else {
      setShowCardForm(false)
    }
  }

  return (
    <Layout title="Settings">
      <div className="mx-auto max-w-4xl space-y-6">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl text-white">Top Up Balance</CardTitle>
            <CardDescription className="text-sm text-zinc-400">
              Add funds to your account using your preferred payment method
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-4 sm:p-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Amount</label>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                />
                <Button 
                  onClick={handleNext}
                  className="bg-white text-black hover:bg-zinc-200 w-full sm:w-auto"
                >
                  Next
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Payment Method</label>
              <PaymentMethodSelect
                selectedMethod={selectedPaymentMethod}
                onSelect={handlePaymentMethodSelect}
                showCardForm={showCardForm}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

