import React from 'react'
import ReactNative, {AsyncStorage} from 'react-native'
import {Font, AppLoading, Util} from 'expo'
import { Localization } from 'expo-localization';

import Home from './Home'
import OnboardingIntro from './OnboardingIntro'



export class StartingScreen extends React.Component {
  constructor(){
    super();
    this.state = {
      firstLaunch: null,
      isReady: false
    };
  }
  componentDidMount(){
    AsyncStorage.getItem("alreadyLaunched").then(value => {
      if(value == null){
        AsyncStorage.setItem('alreadyLaunched', 'true'); 
        this.setState({firstLaunch: true});
      } else{
        this.setState({firstLaunch: false});
      }
    })
    AsyncStorage.getItem("isRTL").then(value => {
      const isRTL = ''+(Localization.locale == 'ar')
      console.log(typeof value,typeof isRTL)
      if(value != isRTL) {
        console.log('entra')
        ReactNative.I18nManager.forceRTL(Localization.locale == 'ar')
        AsyncStorage.setItem('isRTL', ''+isRTL).then(()=> {
          Util.reload()
        })
      }
    })
  }

  async loadFont() {
    const AntipastoLight = Font.loadAsync({ 'Antipasto-Light': require('../assets/fonts/Antipasto-Light.otf') });
    const AntipastoRegular = Font.loadAsync({ 'Antipasto-Regular': require('../assets/fonts/Antipasto-Regular.otf') });
    const AntipastoDemibold = Font.loadAsync({ 'Antipasto-Demibold': require('../assets/fonts/Antipasto-Demibold.otf') });
    const Antipasto = Font.loadAsync({ 'Antipasto': require('../assets/fonts/Antipasto.ttf') });  

    const GeezaproDemibold = Font.loadAsync({ 'Geezapro-Demibold': require('../assets/fonts/Geezapro-Demibold.ttf') });
    const GeezaproRegular = Font.loadAsync({ 'Geezapro-Regular': require('../assets/fonts/Geezapro-Regular.ttf') });
    const Geezapro = Font.loadAsync({ 'Geezapro': require('../assets/fonts/Geezapro-Regular.ttf') });

    const Helvetica = Font.loadAsync({ 'Helvetica': require('../assets/fonts/Helvetica.ttf') });
    const HelveticaRegular = Font.loadAsync({ 'Helvetica-Regular': require('../assets/fonts/Helvetica.ttf') });
    const HelveticaBold = Font.loadAsync({ 'Helvetica-Bold': require('../assets/fonts/Helvetica-Bold.ttf') });    

    return Promise.all([AntipastoLight, AntipastoRegular, AntipastoDemibold, Antipasto, 
      GeezaproDemibold, GeezaproRegular, Geezapro, 
      Helvetica, HelveticaRegular, HelveticaBold]);
  }
  
  render(){
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this.loadFont}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    if(this.state.firstLaunch === null){
      return null; 
    }else if(this.state.firstLaunch == true){
      return <OnboardingIntro navigation={this.props.navigation}/>
    }else{
      return <Home navigation={this.props.navigation}/>
    }
  }

  

}



export default StartingScreen