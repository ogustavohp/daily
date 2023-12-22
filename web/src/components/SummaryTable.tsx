'use client'
import { generateDatesFromYearBeginning } from '@/utils/generateDatesFromYearBeginning'
import HabitDay from './HabitDay'
import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'
import dayjs from 'dayjs'

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const summaryDates = generateDatesFromYearBeginning()
const minimumSummaryDatesSize = 18 * 7
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length

type SummaryType = {
  id: string
  date: string
  amount: number
  completed: number
}[]

export default function SummaryTable() {
  const [summary, setSummary] = useState<SummaryType>([])

  useEffect(() => {
    api.get('/summary').then((response) => setSummary(response.data))
  }, [])
  return (
    <div className="flex w-full">
      <div className="grid grid-flow-row grid-rows-7 gap-3">
        {weekDays.map((day, i) => (
          <div
            key={`${day}-${i}`}
            className="flex h-10 w-10 items-center justify-center text-xl font-bold text-zinc-400"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-flow-col grid-rows-7 gap-3 overflow-x-auto">
        {summary.length > 0 &&
          summaryDates.map((date) => {
            const dayInSummary = summary.find((day) => {
              return dayjs(date).isSame(day.date, 'day')
            })
            return (
              <HabitDay
                key={date.toString()}
                date={date}
                amount={dayInSummary?.amount}
                defaultCompleted={dayInSummary?.completed}
              />
            )
          })}
        {amountOfDaysToFill > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((_, i) => {
            return (
              <div
                key={i}
                className="h-10 w-10 rounded-lg border-2 border-zinc-800 bg-zinc-900 opacity-40"
              />
            )
          })}
      </div>
    </div>
  )
}
