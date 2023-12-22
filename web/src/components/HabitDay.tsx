'use client'
import '../lib/dayjs'
import * as Popover from '@radix-ui/react-popover'
import ProgressBar from './ProgressBar'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { DailyList } from './DailyList'
import { useState } from 'react'

interface HabitDayProps {
  date: Date
  defaultCompleted?: number
  amount?: number
}

export default function HabitDay({
  amount = 0,
  defaultCompleted = 0,
  date,
}: HabitDayProps) {
  const [completed, setCompleted] = useState(defaultCompleted)

  const completedPercentage =
    amount > 0 ? Math.round((completed / amount) * 100) : 0

  const dayAndMonth = dayjs(date).format('DD/MM')
  const dayOfWeek = dayjs(date).format('dddd')
  const today = dayjs().startOf('day').toDate()
  const isCurrentDay = dayjs(date).isSame(today)

  function handleCompletedChange(completed: number) {
    setCompleted(completed)
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx(
          'h-10 w-10 rounded-lg border-2 ',
          {
            'border-zinc-800 bg-zinc-900': completedPercentage === 0,
          },
          {
            'border-violet-700 bg-violet-900':
              completedPercentage > 0 && completedPercentage < 20,
          },
          {
            'border-violet-600 bg-violet-800':
              completedPercentage >= 20 && completedPercentage < 40,
          },
          {
            'border-violet-500 bg-violet-700':
              completedPercentage >= 40 && completedPercentage < 60,
          },
          {
            'border-violet-500 bg-violet-600':
              completedPercentage >= 60 && completedPercentage < 80,
          },
          { 'border-violet-400 bg-violet-500': completedPercentage >= 80 },
          { 'border-white': isCurrentDay },
        )}
      />
      <Popover.Portal>
        <Popover.Content className="flex min-w-[320px] flex-col rounded-2xl bg-zinc-900 p-6">
          <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
          <span className="mt-1 text-3xl font-extrabold leading-tight">
            {dayAndMonth}
          </span>

          <ProgressBar progress={completedPercentage} />

          <DailyList date={date} onCompletedChanged={handleCompletedChange} />

          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
