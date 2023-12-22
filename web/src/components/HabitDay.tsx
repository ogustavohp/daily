'use client'
import '../lib/dayjs'
import * as Popover from '@radix-ui/react-popover'
import * as Checkbox from '@radix-ui/react-checkbox'
import ProgressBar from './ProgressBar'
import clsx from 'clsx'
import { Check } from 'lucide-react'
import dayjs from 'dayjs'

interface HabitDayProps {
  date: Date
  completed?: number
  amount?: number
}

export default function HabitDay({
  amount = 0,
  completed = 0,
  date,
}: HabitDayProps) {
  const completedPercentage =
    amount > 0 ? Math.round((completed / amount) * 100) : 0

  const dayAndMonth = dayjs(date).format('DD/MM')
  const dayOfWeek = dayjs(date).format('dddd')
  const today = dayjs('day').toDate()
  const isCurrentDay = dayjs(date).isSame(today)

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

          <div className="mt-6 flex flex-col gap-3">
            <Checkbox.Root className="group flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-zinc-800 bg-zinc-900 group-data-[state=checked]:border-green-500 group-data-[state=checked]:bg-green-500">
                <Checkbox.Indicator>
                  <Check size={20} className="text-white" />
                </Checkbox.Indicator>
              </div>

              <span className="text-xl font-semibold leading-tight text-white group-data-[state=checked]:text-zinc-400 group-data-[state=checked]:line-through">
                Beber 2L de água
              </span>
            </Checkbox.Root>
          </div>

          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
