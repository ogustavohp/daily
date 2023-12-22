import {
  Dimensions,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'
import { generateProgressPercentage } from '../utils/generateProgressPercentage'
import clsx from 'clsx'
import dayjs from 'dayjs'

const WEEK_DAYS = 7
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5

export const DAY_MARGIN_BETWEEN = 8
export const DAY_SIZE =
  Dimensions.get('screen').width / WEEK_DAYS - (SCREEN_HORIZONTAL_PADDING + 5)

interface DailyDayProps extends TouchableOpacityProps {
  amountOfHabits?: number
  amountCompleted?: number
  date: Date
}

export default function DailyDay({
  amountOfHabits = 0,
  amountCompleted = 0,
  date,
  ...rest
}: DailyDayProps) {
  const completedPercentage =
    amountOfHabits > 0
      ? generateProgressPercentage(amountOfHabits, amountCompleted)
      : 0

  const today = dayjs().startOf('day').toDate()
  const isCurrentDay = dayjs(date).isSame(today)

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={clsx(
        'm-1 rounded-lg border-2',
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
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
      {...rest}
    />
  )
}
