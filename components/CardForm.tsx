'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CardFormProps {
  className?: string
}

export function CardForm({ className }: CardFormProps) {
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i)
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1
    return month < 10 ? `0${month}` : `${month}`
  })

  return (
    <div className="space-y-4 animate-in slide-in-from-top-2">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="First Last"
          className="bg-white border-zinc-200"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="card">Card number</Label>
        <Input
          id="card"
          placeholder="4242 4242 4242 4242"
          className="bg-white border-zinc-200"
          inputMode="numeric"
          pattern="[0-9]*"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Expires</Label>
          <Select>
            <SelectTrigger className="bg-white border-zinc-200">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="invisible">Year</Label>
          <Select>
            <SelectTrigger className="bg-white border-zinc-200">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-2 sm:col-span-1 space-y-2">
          <Label htmlFor="cvc">CVC</Label>
          <Input
            id="cvc"
            placeholder="CVC"
            className="bg-white border-zinc-200"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={4}
          />
        </div>
      </div>
    </div>
  )
}

