'use client'
import { api } from '@/lib/axios'
import * as Checkbox from '@radix-ui/react-checkbox'
import dayjs from 'dayjs'
import { Check } from 'lucide-react'
import { useEffect, useState } from 'react'

interface DailyListProps {
  date: Date
  onCompletedChanged: (completed: number) => void
}

interface DailyInfoType {
  possibleHabits: {
    id: string
    title: string
    created_at: string
  }[]
  completedHabits: string[]
}

export function DailyList({ date, onCompletedChanged }: DailyListProps) {
  const [dailyInfo, setDailyInfo] = useState<DailyInfoType>()

  useEffect(() => {
    api
      .get('/day', {
        params: {
          date: date.toISOString(),
        },
      })
      .then((res) => {
        setDailyInfo(res.data)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date())

  async function handleToggleDaily(dailyId: string) {
    const isDailyAlreadyCompleted = dailyInfo!.completedHabits.includes(dailyId)

    await api.patch(`/habits/${dailyId}/toggle`)

    let completedHabits: string[] = []

    if (isDailyAlreadyCompleted) {
      completedHabits = dailyInfo!.completedHabits.filter(
        (id) => id !== dailyId,
      )
    } else {
      completedHabits = [...dailyInfo!.completedHabits, dailyId]
    }

    setDailyInfo({
      possibleHabits: dailyInfo!.possibleHabits,
      completedHabits,
    })

    onCompletedChanged(completedHabits.length)
  }

  return (
    <div className="mt-6 flex flex-col gap-3">
      {dailyInfo?.possibleHabits.map((daily, i) => {
        return (
          <Checkbox.Root
            key={`${daily.id}-${i}`}
            checked={dailyInfo.completedHabits.includes(daily.id)}
            onCheckedChange={() => handleToggleDaily(daily.id)}
            disabled={isDateInPast}
            className="group flex items-center gap-3 focus:outline-none disabled:cursor-not-allowed"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-zinc-800 bg-zinc-900 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background group-data-[state=checked]:border-green-500 group-data-[state=checked]:bg-green-500">
              <Checkbox.Indicator>
                <Check size={20} className="text-white" />
              </Checkbox.Indicator>
            </div>

            <span className="text-xl font-semibold leading-tight text-white group-data-[state=checked]:text-zinc-400 group-data-[state=checked]:line-through">
              {daily.title}
            </span>
          </Checkbox.Root>
        )
      })}
    </div>
  )
}
