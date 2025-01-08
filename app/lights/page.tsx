'use client'

import { useState, useCallback } from 'react'
import { Layout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ThermostatDial } from '@/components/ThermostatDial'

export default function LightsPage() {
  const [activeRooms, setActiveRooms] = useState<string[]>([])

  const rooms = [
    { name: 'Living Room', entity_id: 'light.living_room_lights' },
    { name: 'Kitchen', entity_id: 'light.cocina' },
    { name: 'Entrance', entity_id: 'light.entrance' }
  ]

  const toggleRoom = useCallback(
    async (roomName: string) => {
      // Immediately toggle the button appearance
      setActiveRooms(prev =>
        prev.includes(roomName)
          ? prev.filter(name => name !== roomName)
          : [...prev, roomName]
      )

      // Call the webhook
      try {
        await fetch('https://hooks.nabu.casa/gAAAAABnd73W53uGIpocj2ZclQn8_aKsEEzknW5dvK9xNXsxPyBmZ_5bKVU4XA4504b_-XjOVN681l3eE5FOHWHmEk2sj_MQJtRILNlouUpip-m23XG5Gd5ZFrZXE1mlUc3jIpqT-xp_89Z24Uy7NRAvJdOFEleXLhIqK7mmskvN0IktD4E7GOI=', {
          method: 'GET',
        });
        console.log(`Webhook called for ${roomName}`);
      } catch (err) {
        // Log the error but don't revert the UI or show an error message
        console.error(`Failed to call webhook for ${roomName}:`, err);
      }
    },
    [activeRooms]
  )

  return (
    <Layout title="Lights Control">
      <div className="mx-auto max-w-4xl p-4 space-y-8">
        <div className="p-4 sm:p-8 rounded-2xl bg-zinc-950 border border-zinc-800">
          <ThermostatDial />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {rooms.map(room => (
            <Button
              key={room.name}
              variant="outline"
              size="lg"
              className={cn(
                'h-16 sm:h-24 text-base sm:text-lg border-zinc-800',
                'hover:border-zinc-700 hover:bg-zinc-800/50',
                activeRooms.includes(room.name)
                  ? 'bg-yellow-500 text-black border-yellow-400'
                  : 'bg-black text-zinc-400'
              )}
              onClick={() => toggleRoom(room.name)}
            >
              {room.name}
            </Button>
          ))}
        </div>
      </div>
    </Layout>
  )
}

