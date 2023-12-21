import { ScrollView, Text, View } from 'react-native'
import Header from '../components/Header'
import HabitDays, { DAY_SIZE } from '../components/HabitDays'
import { generateDatesFromYearBeginning } from '../utils/generateDatesFromYearBeginning'

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const datesFromYearStart = generateDatesFromYearBeginning()
const minimumSummaryDatesSizes = 18 * 5
const amountOfDaysToFill = minimumSummaryDatesSizes - datesFromYearStart.length

export default function Home() {
  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View className="flex-row">
        {weekDays.map((weekDay, i) => (
          <Text
            className="mx-1 text-center text-xl font-bold text-zinc-400"
            key={`${weekDay}-${i}`}
            style={{ width: DAY_SIZE }}
          >
            {weekDay}
          </Text>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex-row flex-wrap">
          {datesFromYearStart.map((date) => (
            <HabitDays key={date.toISOString()} />
          ))}

          {amountOfDaysToFill > 0 &&
            Array.from({ length: amountOfDaysToFill }).map((_, i) => (
              <View
                key={i}
                className="m-1 rounded-lg border-2 border-zinc-800 bg-zinc-900 opacity-40"
                style={{ width: DAY_SIZE, height: DAY_SIZE }}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  )
}
