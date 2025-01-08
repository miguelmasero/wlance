import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import type { Booking } from '@/types/booking'

export async function POST(req: Request) {
  try {
    const { date, time, duration } = await req.json()

    // Create the booking object
    const booking: Booking = {
      date,
      time,
      duration,
      status: 'confirmed',
      created_at: new Date().toISOString(),
    }

    // Insert the booking into Supabase
    const { data, error } = await supabase
      .from('bookings')
      .insert([booking])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to create booking' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, booking: data })
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create booking' },
      { status: 500 }
    )
  }
}

