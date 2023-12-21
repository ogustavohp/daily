import {
  Dimensions,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'

const WEEK_DAYS = 7
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5

export const DAY_MARGIN_BETWEEN = 8
export const DAY_SIZE =
  Dimensions.get('screen').width / WEEK_DAYS - (SCREEN_HORIZONTAL_PADDING + 5)

interface DailyDayProps extends TouchableOpacityProps {}

export default function DailyDay({ ...rest }: DailyDayProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="m-1 rounded-lg border-2 border-zinc-800 bg-zinc-900"
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
      {...rest}
    />
  )
}