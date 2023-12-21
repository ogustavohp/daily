import { Text, TouchableOpacity, View } from 'react-native'
import Logo from '../assets/logo.svg'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import { useNavigation } from '@react-navigation/native'

export default function Header() {
  const { navigate } = useNavigation()
  return (
    <View className="w-full flex-row items-center justify-between">
      <Logo />

      <TouchableOpacity
        activeOpacity={0.7}
        className="h-11 flex-row items-center rounded-lg border border-violet-500 px-4"
        onPress={() => navigate('new')}
      >
        <Feather name="plus" color={colors.violet[500]} size={20} />
        <Text className="ml-3 text-base font-semibold text-white">Novo</Text>
      </TouchableOpacity>
    </View>
  )
}
