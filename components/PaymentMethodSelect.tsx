'use client'

import { CreditCard, Apple } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { CardForm } from './CardForm'

interface PaymentMethod {
  id: string
  name: string
  icon: React.ReactNode
}

interface PaymentMethodSelectProps {
  selectedMethod: string
  onSelect: (method: string) => void
  className?: string
  showCardForm?: boolean
}

export function PaymentMethodSelect({ 
  selectedMethod, 
  onSelect, 
  className,
  showCardForm = false
}: PaymentMethodSelectProps) {
  const paymentMethods: PaymentMethod[] = [
    {
      id: 'card',
      name: 'Card',
      icon: <CreditCard className="h-6 w-6" />
    },
    {
      id: 'google-pay',
      name: 'Google Pay',
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" />
          <path fill="white" d="M17.625 10.5C17.625 9.9 17.575 9.325 17.475 8.775H12V11.525H15.225C15.075 12.375 14.575 13.075 13.825 13.525V15.025H15.75C16.975 13.9 17.625 12.35 17.625 10.5Z" />
          <path fill="white" d="M12 18C13.575 18 14.925 17.475 15.75 16.525L13.825 15.025C13.225 15.425 12.475 15.65 12 15.65C10.575 15.65 9.375 14.7 8.925 13.4H6.95V14.95C7.775 16.8 9.725 18 12 18Z" />
          <path fill="white" d="M8.925 13.4C8.775 13 8.675 12.575 8.675 12C8.675 11.425 8.775 11 8.925 10.6V9.05H6.95C6.475 10.025 6.175 11.075 6.175 12C6.175 12.925 6.475 13.975 6.95 14.95L8.925 13.4Z" />
          <path fill="white" d="M12 8.35C12.825 8.35 13.575 8.65 14.175 9.2L15.875 7.5C14.925 6.625 13.575 6.1 12 6.1C9.725 6.1 7.775 7.3 6.95 9.15L8.925 10.7C9.375 9.4 10.575 8.35 12 8.35Z" />
        </svg>
      )
    },
    {
      id: 'apple-pay',
      name: 'Apple Pay',
      icon: <Apple className="h-6 w-6" />
    }
  ]

  return (
    <div className={cn("space-y-6", className)}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {paymentMethods.map((method) => (
          <Card
            key={method.id}
            className={cn(
              "flex flex-col items-center justify-center p-4 sm:p-6 cursor-pointer transition-colors hover:bg-zinc-800",
              selectedMethod === method.id ? "bg-zinc-800" : "bg-zinc-900"
            )}
            onClick={() => onSelect(method.id)}
          >
            <div className="mb-2">{method.icon}</div>
            <span className="text-sm font-medium">{method.name}</span>
          </Card>
        ))}
      </div>

      {showCardForm && selectedMethod === 'card' && (
        <CardForm />
      )}
    </div>
  )
}

