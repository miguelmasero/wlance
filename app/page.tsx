'use client'

import { Layout } from '@/components/layout'
import { WeekCalendar } from '@/components/WeekCalendar'
import { RevenueCard } from '@/components/RevenueCard'
import { ClientList } from '@/components/ClientList'

export default function Home() {
  return (
    <Layout title="Dashboard">
      <div className="mx-auto max-w-4xl p-4 space-y-4 sm:space-y-6">
        <div className="grid gap-4 sm:gap-6">
          <WeekCalendar />
          <RevenueCard />
          <ClientList />
        </div>
      </div>
    </Layout>
  )
}

