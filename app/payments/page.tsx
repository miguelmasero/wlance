'use client'

import { useState } from 'react'
import { Layout } from '@/components/layout'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'

interface Payment {
  id: string
  date: string
  client: string
  amount: number
}

const payments: Payment[] = [
  { id: '1', date: '2025-01-02', client: 'Miguel', amount: 500 },
  { id: '2', date: '2025-01-05', client: 'Olivia', amount: 250 },
  { id: '3', date: '2025-01-10', client: 'Jack', amount: 400 },
  { id: '4', date: '2025-01-15', client: 'Isabella', amount: 300 },
  { id: '5', date: '2025-01-20', client: 'Emma', amount: 450 },
]

export default function PaymentsPage() {
  const [selectedRows, setSelectedRows] = useState<string[]>([])

  const toggleSelectAll = () => {
    if (selectedRows.length === payments.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(payments.map(p => p.id))
    }
  }

  const toggleSelectRow = (id: string) => {
    setSelectedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    )
  }

  return (
    <Layout title="Payments">
      <div className="mx-auto max-w-[1200px] p-4">
        <div className="rounded-lg border border-zinc-800 bg-black">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-zinc-900">
                <TableHead className="w-[40px]">
                  <Checkbox
                    checked={selectedRows.length === payments.length}
                    onCheckedChange={toggleSelectAll}
                    aria-label="Select all"
                  />
                </TableHead>
                <TableHead className="text-zinc-400">Date</TableHead>
                <TableHead>
                  <Button variant="ghost" className="p-0 text-zinc-400 hover:text-white">
                    Client
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right text-zinc-400">Amount</TableHead>
                <TableHead className="w-[40px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow 
                  key={payment.id} 
                  className="border-zinc-800 hover:bg-zinc-900"
                  data-state={selectedRows.includes(payment.id)}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(payment.id)}
                      onCheckedChange={() => toggleSelectRow(payment.id)}
                      aria-label={`Select payment ${payment.id}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium text-zinc-400">{payment.date}</TableCell>
                  <TableCell className="font-medium text-white">{payment.client}</TableCell>
                  <TableCell className="text-right font-medium text-zinc-400">
                    {payment.amount} QAR
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 text-zinc-400 hover:text-white">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuItem>
                          Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          View customer
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          View payment details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between p-4">
            <div className="text-sm text-zinc-400">
              {selectedRows.length} of {payments.length} row(s) selected.
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-zinc-400 border-zinc-800"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-zinc-400 border-zinc-800"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

