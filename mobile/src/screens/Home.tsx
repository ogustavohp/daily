import { Alert, ScrollView, Text, View } from 'react-native'
import Header from '../components/Header'
import { generateDatesFromYearBeginning } from '../utils/generateDatesFromYearBeginning'
import { useNavigation } from '@react-navigation/native'
import DailyDay, { DAY_SIZE } from '../components/DailyDay'
import { useEffect, useState } from 'react'
import { api } from '../lib/axios'
import Loading from '../components/Loading'
import dayjs from 'dayjs'

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const datesFromYearStart = generateDatesFromYearBeginning()
const minimumSummaryDatesSizes = 18 * 5
const amountOfDaysToFill = minimumSummaryDatesSizes - datesFromYearStart.length

type SummaryType = {
  id: string
  date: string
  amount: number
  completed: number
}[]

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [summary, setSummary] = useState<SummaryType | null>(null)

  const { navigate } = useNavigation()

  async function fetchData() {
    try {
      setLoading(true)

      const response = await api.get('/summary')

      setSummary(response.data)
    } catch (err) {
      Alert.alert('Vix', 'não foi possível carregar o sumário de hábitos.')

      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return <Loading />
  }

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
        {summary && (
          <View className="flex-row flex-wrap">
            {datesFromYearStart.map((date) => {
              const dayWithHabits = summary.find((day) => {
                return dayjs(date).isSame(day.date, 'day')
              })

              return (
                <DailyDay
                  key={date.toISOString()}
                  date={date}
                  amountOfHabits={dayWithHabits?.amount}
                  amountCompleted={dayWithHabits?.completed}
                  onPress={() =>
                    navigate('daily', { date: date.toISOString() })
                  }
                />
              )
            })}

            {amountOfDaysToFill > 0 &&
              Array.from({ length: amountOfDaysToFill }).map((_, i) => (
                <View
                  key={i}
                  className="m-1 rounded-lg border-2 border-zinc-800 bg-zinc-900 opacity-40"
                  style={{ width: DAY_SIZE, height: DAY_SIZE }}
                />
              ))}
          </View>
        )}
      </ScrollView>
    </View>
  )
}
