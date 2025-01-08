'use client'

import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

interface CalendarProps {
  selectedDate: Date | null
  setSelectedDate: (date: Date | null) => void
}

export function Calendar({ selectedDate, setSelectedDate }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const handleDateClick = (date: Date) => {
    // Create a new date object that preserves the local date
    const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12); // Set to noon to avoid timezone issues
    setSelectedDate(localDate);
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-white text-zinc-900 p-4 rounded-3xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <Button variant="ghost" onClick={prevMonth}><ChevronLeft className="h-6 w-6" /></Button>
        <h2 className="text-2xl font-semibold">
          {currentMonth.toLocaleString('default', { month: 'long' })}
          <span className="ml-2 text-lg font-normal text-zinc-500">{currentMonth.getFullYear()}</span>
        </h2>
        <Button variant="ghost" onClick={nextMonth}><ChevronRight className="h-6 w-6" /></Button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {daysOfWeek.map(day => (
          <div key={day} className="text-center text-sm font-medium text-zinc-500">{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: (firstDayOfMonth + 6) % 7 }).map((_, index) => (
          <div key={`empty-${index}`} className="h-10" />
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1
          const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
          const isToday = date.toDateString() === new Date().toDateString()
          const isSelected = selectedDate?.toDateString() === date.toDateString()
          return (
            <button
              key={day}
              onClick={() => handleDateClick(date)}
              className={`h-10 flex flex-col items-center justify-center rounded-full transition-colors
                ${isToday ? 'bg-yellow-500 text-black font-bold' : ''}
                ${isSelected ? 'bg-blue-100' : 'hover:bg-zinc-100'}
              `}
              aria-label={`${date.toDateString()}${isToday ? ' (Today)' : ''}`}
            >
              <span className="text-sm">{day}</span>
            </button>
          )
        })}
      </div>
    </Card>
  )
}

