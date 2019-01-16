import { createStackNavigator, createAppContainer } from "react-navigation";
import StartingScreen from './screens/StartingScreen'
import OnBoardingSlides from './screens/OnboardingSlides'
import Home from './screens/Home'
import SelectLaundry from './screens/SelectLaundry'
import OrderDetails from './screens/OrderDetails'
import OrderDetailsNoPickup from './screens/OrderDetailsNoPickup'
import Feedback from './screens/Feedback'

let noHeader = () => ({
  header: null
})

let redHeader = (title) => (() => ({
  title: title,
  headerMode: 'float',
  headerTintColor: 'white',
  headerStyle: {
    backgroundColor: '#D0021B'
  }
}))

const AppNavigator = createStackNavigator(
  {
    StartingScreen: {
      screen: StartingScreen,
      navigationOptions: noHeader
    },
    Home: {
      screen: Home,
      navigationOptions: noHeader
    },
    OnBoardingSlides: {
      screen: OnBoardingSlides,
      navigationOptions: noHeader
    },
    SelectLaundry: {
      screen: SelectLaundry,
      navigationOptions: redHeader('Choose a Laundry')
    },
    OrderDetails : {
      screen: OrderDetails,
      navigationOptions: redHeader('Schedule your order')
    },
    OrderDetailsNoPickup: {
      screen: OrderDetailsNoPickup,
      navigationOptions: redHeader('Schedule your order')
    },
    Feedback: {
      screen: Feedback,
      navigationOptions: noHeader
    },
  },
  {
    initialRouteName: "StartingScreen",
  }
);



export default createAppContainer(AppNavigator);
