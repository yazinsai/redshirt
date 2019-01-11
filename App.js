import { createStackNavigator, createAppContainer } from "react-navigation";
import OnBoardingIntro from './screens/OnboardingIntro'
import OnBoardingSlides from './screens/OnboardingSlides'
import Home from './screens/Home'

const AppNavigator = createStackNavigator(
  {
    OnBoardingIntro: OnBoardingIntro,
    OnBoardingSlides: OnBoardingSlides,
    Home: Home
  },
  {
    initialRouteName: "OnBoardingIntro",
    headerMode: 'none'
  }
);

export default createAppContainer(AppNavigator);
