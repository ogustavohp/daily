import { useRoute } from '@react-navigation/native'
import { ScrollView, Text, View } from 'react-native'
import { BackButton } from '../components/BackButton'
import dayjs from 'dayjs'
import { ProgressBar } from '../components/ProgressBar'
import { Checkbox } from '../components/Checkbox'

interface DailyParams {
  date: string
}

export default function Daily() {
  const route = useRoute()
  const { date } = route.params as DailyParams

  const parsedDate = dayjs(date)
  const dayOfWeek = parsedDate.format('dddd')
  const dayAndMount = parsedDate.format('DD/MM')

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

        <ProgressBar progress={30} />

        <View className="mt-6">
          <Checkbox title="Beber 2L de água" />
          <Checkbox title="Caminhar" checked />
        </View>
      </ScrollView>
    </View>
  )
}
