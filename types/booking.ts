export interface Booking {
  id?: string
  created_at?: string
  date: string
  time: string
  duration: number
  status: 'confirmed' | 'pending' | 'cancelled'
  client_name?: string
  client_email?: string
  notes?: string
}

