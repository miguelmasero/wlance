'use client'

import { useState } from 'react'
import { Layout } from '@/components/layout'
import { Calendar } from '@/components/Calendar'
import { Chat } from '@/components/Chat'

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

  return (
    <Layout title="Calendar">
      <div className="mx-auto max-w-4xl space-y-6">
        <Calendar 
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <Chat 
          selectedDate={selectedDate}
        />
      </div>
    </Layout>
  )
}

