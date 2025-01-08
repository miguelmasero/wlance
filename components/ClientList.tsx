import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface Client {
  name: string
  avatar: string
  note?: string
}

interface ClientListProps {
  className?: string
}

export function ClientList({ className }: ClientListProps) {
  const clients: Client[] = [
    {
      name: "Miguel",   
      avatar: "/placeholder.svg?height=32&width=32",
      note: "Usually late with payments"
    },
    {
      name: "Olivia",      
      avatar: "/placeholder.svg?height=32&width=32"
    },
    {
      name: "Jack",     
      avatar: "/placeholder.svg?height=32&width=32"
    },
    {
      name: "Isabella",      
      avatar: "/placeholder.svg?height=32&width=32"
    }
  ]

  return (
    <Card className={cn("bg-[#18181b] border-none", className)}>
      <CardHeader className="p-4">
        <h2 className="text-xl font-bold text-white">My Clients</h2>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          {clients.map((client) => (
            <div key={client.name} className="flex items-center gap-3">
              <Avatar className="h-8 w-8 rounded-full bg-zinc-800">
                <AvatarImage src={client.avatar} alt={client.name} />
                <AvatarFallback>{client.name[0]}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h3 className="text-sm font-medium leading-none text-white">
                  {client.name}
                </h3>
                {client.note && (
                  <p className="text-xs text-zinc-400">{client.note}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

