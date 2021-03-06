import { createStackNavigator, createAppContainer } from "react-navigation";
import { Easing, Animated } from 'react-native';


import StartingScreen from './screens/StartingScreen'
import OnBoardingSlides from './screens/OnboardingSlides'
import Home from './screens/Home'
import SelectLaundry from './screens/SelectLaundry'
import LaundryPrices from './screens/LaundryPrices'
import OrderDetails from "./screens/OrderDetails";
import Feedback from "./screens/Feedback";

import { Localization } from "expo-localization";
import localeStore from "./localization/localeStore";
import colors from "./config/colors";


Localization.locale = Localization.locale.substr(0,2)
localeStore.locale = Localization.locale

let noHeader = () => ({
  header: null,
  headerBackTitle: localeStore.t('backButton'),
});

let redHeader = title => () => ({
  title: localeStore.t(title),
  headerMode: "float",
  headerTintColor: colors.$white,
  headerBackTitle: localeStore.t('backButton'),
  headerStyle: {
    backgroundColor: colors.$primaryRed
  }
});

const priceListHeader = ({navigation}) => ({
  title: `${localeStore.t('prices')} - ${navigation.getParam('name', '')}`,
  headerMode: 'float',
  headerTintColor: colors.$white,
  headerBackTitle: localeStore.t('backButton'),
  headerStyle: {
    backgroundColor: colors.$primaryRed
  }
})

const RtlTransition = () => ({
  transitionSpec: {
    duration: 300,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing
  },
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps;
    const { index } = scene;

    const width = layout.initWidth;
    const translateX = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [-width, 0, 0]
    });

    const opacity = position.interpolate({
      inputRange: [index - 1, index - 0.99, index],
      outputRange: [0, 1, 1]
    });

    return { opacity, transform: [{ translateX: translateX }] };
  }
});

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
      navigationOptions: redHeader("headerSelectLaundry")
    },
    LaundryPrices: {
      screen: LaundryPrices,
      navigationOptions: priceListHeader
    },
    OrderDetails : {
      screen: OrderDetails,
      navigationOptions: redHeader("headerOrderDetails")
    },
    Feedback: {
      screen: Feedback,
      navigationOptions: noHeader
    }
  },
  {
    transitionConfig: Localization.isRTL ? RtlTransition : undefined,
    initialRouteName: "StartingScreen"
  }
);

export default createAppContainer(AppNavigator);
