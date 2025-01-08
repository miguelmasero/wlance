'use client'

import * as React from "react"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { SendIcon } from 'lucide-react'
import { cn } from "@/lib/utils"
import { useChat } from 'ai/react'

interface ChatProps {
  selectedDate: Date | null
}

interface ConversationStarter {
  title: string
  description: string
  message: string
}

export function Chat({ selectedDate }: ChatProps) {
  const { messages, input, handleInputChange, handleSubmit, append } = useChat({
    api: '/api/chat',
    initialMessages: selectedDate ? [
      {
        id: 'date-system',
        role: 'system',
        content: `The user has selected the date: ${selectedDate.toISOString().split('T')[0]}. Use this information when responding to queries about scheduling or dates.`
      }
    ] : [],
    body: {
      selectedDate: selectedDate ? selectedDate.toISOString().split('T')[0] : null,
    },
    onFinish: async (message) => {
      if (message.function_call?.name === 'createBooking') {
        const args = JSON.parse(message.function_call.arguments as string)
        try {
          const response = await fetch('/api/booking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(args)
          })
          const result = await response.json()
          if (result.success) {
            append({
              role: 'assistant',
              content: `Great! Your booking has been confirmed for ${args.date} at ${args.time} for ${args.duration} hours.`
            })
          } else {
            append({
              role: 'assistant',
              content: 'Im sorry, there was an error creating your booking. Please try again.'
            })
          }
        } catch (error) {
          console.error('Error creating booking:', error)
          append({
            role: 'assistant',
            content: 'Im sorry, there was an error creating your booking. Please try again.'
          })
        }
      }
    }
  });

  const conversationStarters: ConversationStarter[] = [
    {
      title: "New booking",
      description: "",
      message: "I want to make a new booking"
    },
    {
      title: "Modify booking",
      description: "",
      message: "I need to modify an existing booking."
    },
    {
      title: "Cancel booking",
      description: "",
      message: "I need to cancel an existing booking."
    }
  ];

  const handleStarterClick = (starter: ConversationStarter) => {
    const dateString = selectedDate ? ` for ${selectedDate.toLocaleDateString()}` : '';
    append({
      content: `${starter.message}${dateString}`,
      role: 'user'
    })
  }

  return (
    <div className="w-full space-y-4 border border-zinc-800 rounded-lg p-2 sm:p-4">
      {/* Conversation Starters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
        {conversationStarters.map((starter, index) => (
          <Card 
            key={index}
            className="bg-zinc-900 border-zinc-800 p-3 sm:p-4 cursor-pointer hover:bg-zinc-800 transition-colors"
            onClick={() => handleStarterClick(starter)}
          >
            <h3 className="text-zinc-400 text-sm font-medium">{starter.title}</h3>
            <p className="text-zinc-300 mt-1 text-xs sm:text-sm">{starter.description}</p>
          </Card>
        ))}
      </div>

      {selectedDate && (
        <div className="text-sm text-zinc-400">
          Selected date: {selectedDate.toLocaleDateString()}
        </div>
      )}

      {/* Chat Messages */}
      <div className="space-y-4 py-4 max-h-[40vh] overflow-y-auto">
        {messages.filter(message => message.role !== 'system').map((message, index) => (
          <div
            key={index}
            className={cn(
              "flex",
              message.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "rounded-2xl px-3 py-2 max-w-[85%] text-sm",
                message.role === "user"
                  ? "bg-zinc-900 text-white"
                  : "bg-zinc-800 text-zinc-100"
              )}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="relative">
        <Textarea
          value={input}
          onChange={handleInputChange}
          placeholder="Type here"
          className="w-full resize-none rounded-xl bg-white/5 border-zinc-800 text-white placeholder:text-zinc-400 pr-12 text-sm"
          rows={3}
        />
        <Button 
          type="submit" 
          size="icon"
          className="absolute right-2 bottom-2 h-8 w-8 rounded-full bg-zinc-700 hover:bg-zinc-600"
        >
          <SendIcon className="h-4 w-4" />
          <span className="sr-only">Send</span>
        </Button>
      </form>
    </div>
  )
}

