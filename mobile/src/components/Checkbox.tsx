import {
  Text,
  View,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'

interface CheckboxProps extends TouchableOpacityProps {
  checked?: boolean
  title: string
}

export function Checkbox({ checked = false, title, ...rest }: CheckboxProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="mb-2 flex-row items-center"
      {...rest}
    >
      {checked ? (
        <View className="h-8 w-8 items-center justify-center rounded-lg bg-green-500">
          <Feather name="check" size={20} color={colors.white} />
        </View>
      ) : (
        <View className="h-8 w-8 rounded-lg bg-zinc-900" />
      )}

      <Text className="ml-3 text-base font-semibold text-white">{title}</Text>
    </TouchableOpacity>
  )
}
