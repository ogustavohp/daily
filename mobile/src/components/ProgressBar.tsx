import { View } from 'react-native'

interface ProgressBarProps {
  progress?: number
}

export function ProgressBar({ progress = 0 }: ProgressBarProps) {
  return (
    <View className="mt-4 h-3 w-full rounded-xl bg-zinc-700">
      <View
        className="h-3 rounded-xl bg-violet-600"
        style={{ width: `${progress}%` }}
      />
    </View>
  )
}