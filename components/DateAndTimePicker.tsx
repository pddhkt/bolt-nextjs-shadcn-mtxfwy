"use client"

import { useState } from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface DateAndTimePickerProps {
  dateTime: Date | undefined
  setDateTime: (date: Date | undefined) => void
}

export default function DateAndTimePicker({ dateTime, setDateTime }: DateAndTimePickerProps) {
  return (
    <div className="space-y-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !dateTime && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateTime ? format(dateTime, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={dateTime}
            onSelect={setDateTime}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}