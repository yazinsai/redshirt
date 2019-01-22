import { createStackNavigator, createAppContainer } from "react-navigation";
import ReactNative from 'react-native';
import StartingScreen from './screens/StartingScreen'
import OnBoardingSlides from './screens/OnboardingSlides'
import Home from './screens/Home'
import SelectLaundry from './screens/SelectLaundry'
import OrderDetails from './screens/OrderDetails'
import Feedback from './screens/Feedback'

import { Localization } from 'expo-localization';
import localeStore  from "./localization/localeStore"

Localization.locale = Localization.locale.substr(0,2)
localeStore.locale = Localization.locale

ReactNative.I18nManager.allowRTL(true)

let noHeader = () => ({
  header: null
})

let redHeader = (title) => (() => ({
  title: localeStore.t(title),
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
      navigationOptions: redHeader('headerSelectLaundry')
    },
    OrderDetails : {
      screen: OrderDetails,
      navigationOptions: redHeader('headerOrderDetails')
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
