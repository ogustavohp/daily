import { generateDatesFromYearBeginning } from '@/utils/generateDatesFromYearBeginning'
import HabitDay from './HabitDay'

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const summaryDates = generateDatesFromYearBeginning()
const minimumSummaryDatesSize = 18 * 7
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length

export default function SummaryTable() {
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
        {summaryDates.map((date) => (
          <HabitDay key={date.toString()} />
        ))}
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
