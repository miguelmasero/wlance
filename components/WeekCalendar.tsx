'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface Event {
  title: string
  time: string
}

interface DayEvents {
  [key: string]: Event[]
}

interface WeekCalendarProps {
  className?: string
}

export function WeekCalendar({ className }: WeekCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  
  // Sample events data - in a real app, this would come from an API or database
  const events: DayEvents = {
  
  "2025-01-02": [
    {
      "title": "Miguel, VB9 1705",
      "time": "1:00 PM - 5:00 PM"
    }
  ],
  "2025-01-05": [
    {
      "title": "Miguel, VB9 1705",
      "time": "1:00 PM - 5:00 PM"
    }
  ],
  "2025-01-09": [
    {
      "title": "Miguel, VB9 1705",
      "time": "1:00 PM - 5:00 PM"
    }
  ],
  "2025-01-12": [
    {
      "title": "Miguel, VB9 1705",
      "time": "1:00 PM - 5:00 PM"
    }
  ],
  "2025-01-16": [
    {
      "title": "Miguel, VB9 1705",
      "time": "1:00 PM - 5:00 PM"
    }
  ],
  "2025-01-19": [
    {
      "title": "Miguel, VB9 1705",
      "time": "1:00 PM - 5:00 PM"
    }
  ],
  "2025-01-23": [
    {
      "title": "Miguel, VB9 1705",
      "time": "1:00 PM - 5:00 PM"
    }
  ],
  "2025-01-26": [
    {
      "title": "Miguel, VB9 1705",
      "time": "1:00 PM - 5:00 PM"
    }
  ],
  "2025-01-30": [
    {
      "title": "Miguel, VB9 1705",
      "time": "1:00 PM - 5:00 PM"
    }
  ]
}
  const currentDate = new Date()
  const month = currentDate.toLocaleString('default', { month: 'long' })
  const year = currentDate.getFullYear()

  // Get the dates for the current week
  const getCurrentWeekDates = () => {
    const dates = []
    const today = new Date()
    const first = today.getDate() - today.getDay()
    
    for (let i = 0; i < 6; i++) {
      const date = new Date(today.getFullYear(), today.getMonth(), first + i)
      dates.push(date)
    }
    return dates
  }

  const weekDates = getCurrentWeekDates()
  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr']

  const formatDateKey = (date: Date) => {
    return date.toISOString().split('T')[0]
  }

  const getEventsForDate = (date: Date) => {
    return events[formatDateKey(date)] || []
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.getFullYear() === today.getFullYear() &&
         date.getMonth() === today.getMonth() &&
         date.getDate() === today.getDate()
  }

  return (
    <>
      <Card className={cn("bg-[#18181b] border-none", className)}>
        <CardHeader className="p-4">
          <h2 className="text-xl font-bold text-white">
            {month} {currentDate.getFullYear()}
          </h2>
        </CardHeader>
        <CardContent className="p-4">
          <div className="mb-4">
            <div className="grid grid-cols-6 gap-2 sm:gap-4">
              {weekDays.map((day) => (
                <div key={day} className="text-center">
                  <span className="text-zinc-300 text-sm font-medium">
                    {day}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-6 gap-2 sm:gap-4">
            {weekDates.map((date) => {
              const hasEvents = getEventsForDate(date).length > 0
              const isCurrentDay = isToday(date)
              return (
                <button
                  key={date.toISOString()}
                  onClick={() => setSelectedDate(date)}
                  className={cn(
                    "aspect-square rounded-md flex items-center justify-center transition-colors",
                    "hover:bg-[#393939]/80 focus:outline-none focus:ring-2 focus:ring-[#ffcc00] focus:ring-offset-2 focus:ring-offset-[#18181b]",
                    isCurrentDay ? "bg-yellow-400 hover:bg-yellow-500" : "bg-[#393939]",
                    hasEvents && !isCurrentDay && "ring-2 ring-[#ffcc00] ring-opacity-50"
                  )}
                >
                  <span
                    className={cn(
                      "text-sm font-medium",
                      isCurrentDay ? "text-black font-bold" : "text-white"
                    )}
                  >
                    {date.getDate()}
                  </span>
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Dialog open={selectedDate !== null} onOpenChange={() => setSelectedDate(null)}>
        <DialogContent className="sm:max-w-[425px] bg-[#18181b] text-white">
          <DialogHeader>
            <DialogTitle>
              Events for {selectedDate?.toLocaleDateString()}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {selectedDate && getEventsForDate(selectedDate).length > 0 ? (
              <div className="space-y-4">
                {getEventsForDate(selectedDate).map((event, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="font-medium">{event.title}</span>
                    <span className="text-sm text-zinc-400">{event.time}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-zinc-400">No events scheduled for this day.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

