import { useRoute } from '@react-navigation/native'
import { Alert, ScrollView, Text, View } from 'react-native'
import { BackButton } from '../components/BackButton'
import dayjs from 'dayjs'
import { ProgressBar } from '../components/ProgressBar'
import { Checkbox } from '../components/Checkbox'
import Loading from '../components/Loading'
import { useEffect, useState } from 'react'
import { api } from '../lib/axios'
import { generateProgressPercentage } from '../utils/generateProgressPercentage'
import { DailyEmpty } from '../components/DailyEmpty'
import clsx from 'clsx'

interface DailyParams {
  date: string
}

interface DayInfoType {
  completedHabits: string[]
  possibleHabits: {
    id: string
    title: string
  }[]
}

export default function Daily() {
  const [loading, setLoading] = useState(true)
  const [dayInfo, setDayInfo] = useState<DayInfoType | null>(null)
  const [completedDaily, setCompletedDaily] = useState<string[]>([])

  const route = useRoute()
  const { date } = route.params as DailyParams

  const parsedDate = dayjs(date)
  const dayOfWeek = parsedDate.format('dddd')
  const dayAndMount = parsedDate.format('DD/MM')
  const isDateInPast = parsedDate.endOf('day').isBefore(new Date())

  const dailyProgress = dayInfo?.possibleHabits.length
    ? generateProgressPercentage(
        dayInfo.possibleHabits.length,
        completedDaily.length,
      )
    : 0

  async function fetchDaily() {
    try {
      setLoading(true)
      await api.get('/day', { params: { date } }).then((res) => {
        setDayInfo(res.data)
        setCompletedDaily(res.data.completedHabits)
      })
    } catch (err) {
      console.log(err)

      Alert.alert(
        'Vix',
        'Não foi possível carregar as informações dos hábitos.',
      )
    } finally {
      setLoading(false)
    }
  }

  async function handleToggleHabit(dailyId: string) {
    try {
      await api.patch(`/habits/${dailyId}/toggle`)
      if (completedDaily.includes(dailyId)) {
        setCompletedDaily((prev) => prev.filter((daily) => daily !== dailyId))
      } else {
        setCompletedDaily((prev) => [...prev, dailyId])
      }
    } catch (err) {
      console.log(err)
      Alert.alert(
        'Vix',
        'Não foi possível carregar as informações dos hábitos.',
      )
    }
  }

  useEffect(() => {
    fetchDaily()
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className="mt-6 text-base font-semibold lowercase text-zinc-400">
          {dayOfWeek}
        </Text>

        <Text className="text-3xl font-extrabold text-white">
          {dayAndMount}
        </Text>

        <ProgressBar progress={dailyProgress} />

        <View
          className={clsx('mt-6', {
            'opacity-50': isDateInPast,
          })}
        >
          {dayInfo?.possibleHabits ? (
            dayInfo.possibleHabits.map((daily, i) => (
              <Checkbox
                key={`${daily.id}-${i}`}
                title={daily.title}
                disabled={isDateInPast}
                onPress={() => handleToggleHabit(daily.id)}
                checked={completedDaily.includes(daily.id)}
              />
            ))
          ) : (
            <DailyEmpty />
          )}
        </View>

        {isDateInPast && (
          <Text className="mt-10 text-center text-white">
            Você não pode editar daily`s de uma data passada.
          </Text>
        )}
      </ScrollView>
    </View>
  )
}
