import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { BackButton } from '../components/BackButton'
import { Checkbox } from '../components/Checkbox'
import { useState } from 'react'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import { api } from '../lib/axios'

const availableWeekDays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
]

export default function New() {
  const [title, setTitle] = useState('')
  const [weekDays, setWeekDays] = useState<number[]>([])

  function handleToggleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays((prevState) =>
        prevState.filter((weekDay) => weekDay !== weekDayIndex),
      )
    } else {
      setWeekDays((prevState) => [...prevState, weekDayIndex])
    }
  }

  async function handleCreateNewDaily() {
    try {
      if (!title.trim() || weekDays.length === 0) {
        Alert.alert(
          'Nova daily',
          'Informe o nome da daily e escolha a periodicidade.',
        )
      }

      await api.post('/habits', { title, weekDays }).then(() => {
        setTitle('')
        setWeekDays([])
        Alert.alert('Nova daily', 'Daily criada com sucesso!')
      })
    } catch (err) {
      console.log(err)
      Alert.alert('Vix', 'não foi possível criar a nova daily.')
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className="mt-6 text-3xl font-extrabold text-white">
          Criar Daily
        </Text>

        <Text className="mt-6 text-base font-semibold text-white">
          Qual seu comprometimento?
        </Text>

        <TextInput
          placeholder="Ex: Exercícios, dormir bem e etc ..."
          placeholderTextColor={colors.zinc[400]}
          className="mt-3 h-12 rounded-lg border-2 border-zinc-800 bg-zinc-900 pl-4 text-white focus:border-green-600"
          onChangeText={setTitle}
          value={title}
        />

        <Text className="mb-3 mt-4 text-base font-semibold text-white">
          Qual a recorrência?
        </Text>

        {availableWeekDays.map((day, i) => (
          <Checkbox
            key={`${day}-${i}`}
            title={day}
            checked={weekDays.includes(i)}
            onPress={() => handleToggleWeekDay(i)}
          />
        ))}

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleCreateNewDaily}
          className="mt-6 h-14 w-full flex-row items-center justify-center rounded-md bg-green-600"
        >
          <Feather name="check" size={20} color={colors.white} />

          <Text className="ml-2 text-base font-semibold text-white">
            Confirmar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}
