import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface RevenueCardProps {
  className?: string
}

export function RevenueCard({ className }: RevenueCardProps) {
  return (
    <Card className={cn("bg-white rounded-2xl", className)}>
      <CardContent className="p-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-zinc-600">Income last 30 days</span>
            <span className="text-zinc-400">Gross</span>
          </div>
          <div className="space-y-1">
            <h3 className="text-4xl font-bold text-zinc-900">3565 QAR</h3>
            <p className="text-sm text-zinc-600">+6.1% from last month</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )

}

