'use client'
import * as Popover from '@radix-ui/react-popover'
import ProgressBar from './ProgressBar'
import clsx from 'clsx'

interface HabitDayProps {
  completed: number
  amount: number
}

export default function HabitDay({ amount, completed }: HabitDayProps) {
  const completedPercentage = Math.round((completed / amount) * 100)
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
        )}
      />
      <Popover.Portal>
        <Popover.Content className="flex min-w-[320px] flex-col rounded-2xl bg-zinc-900 p-6">
          <span className="font-semibold text-zinc-400">Quinta-feira</span>
          <span className="mt-1 text-3xl font-extrabold leading-tight">
            21/12
          </span>

          <ProgressBar progress={completedPercentage} />

          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
