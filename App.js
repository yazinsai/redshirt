import { createStackNavigator, createAppContainer } from "react-navigation";
import OnBoardingIntro from './screens/OnboardingIntro'
import OnBoardingSlides from './screens/OnboardingSlides'
import Home from './screens/Home'
import SelectLaundry from './screens/SelectLaundry'
import OrderDetails from './screens/OrderDetails'
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
    OnBoardingIntro: {
      screen: OnBoardingIntro,
      navigationOptions: noHeader
    },
    OnBoardingSlides: {
      screen: OnBoardingSlides,
      navigationOptions: noHeader
    },
    Home: {
      screen: Home,
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
    Feedback: {
      screen: Feedback,
      navigationOptions: noHeader
    }
  },
  {
    initialRouteName: "OnBoardingIntro",
  }
);



export default createAppContainer(AppNavigator);
