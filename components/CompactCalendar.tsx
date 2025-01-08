import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

interface CompactCalendarProps {
  className?: string
}

export function CompactCalendar({ className }: CompactCalendarProps) {
  const currentDate = new Date()
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' })
  const currentYear = currentDate.getFullYear()

  // Get the current week's dates
  const getCurrentWeekDates = () => {
    const dates = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate)
      date.setDate(currentDate.getDate() - currentDate.getDay() + i)
      dates.push(date)
    }
    return dates
  }

  const weekDates = getCurrentWeekDates()

  return (
    <Card className={cn("w-[252px] bg-[#08080a] border-none", className)}>
      <CardHeader className="p-2.5">
        <CardTitle className="text-[#f9f9f9] text-base font-bold leading-tight">
          {currentMonth} {currentYear}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2.5 space-y-2.5">
        <div className="flex justify-between">
          {daysOfWeek.map((day) => (
            <div key={day} className="w-9 text-center">
              <span className="text-neutral-300 text-base font-medium leading-tight">
                {day}
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          {weekDates.map((date, index) => {
            const isToday = date.toDateString() === currentDate.toDateString()
            return (
              <div
                key={index}
                className={cn(
                  "w-9 h-9 rounded-[5px] flex items-center justify-center",
                  isToday
                    ? "bg-[#ffcc00] opacity-80"
                    : "bg-[#383838]"
                )}
              >
                <span
                  className={cn(
                    "text-sm font-normal leading-tight",
                    isToday ? "text-zinc-800" : "text-[#f9f9f9]"
                  )}
                >
                  {date.getDate()}
                </span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

