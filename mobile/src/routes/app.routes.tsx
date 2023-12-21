import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home'
import New from '../screens/New'
import Daily from '../screens/Daily'

const { Navigator, Screen } = createNativeStackNavigator()

export default function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="new" component={New} />
      <Screen name="daily" component={Daily} />
    </Navigator>
  )
}
