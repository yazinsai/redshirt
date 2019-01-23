import React from 'react'
import {AsyncStorage} from 'react-native'
import {Font, AppLoading} from 'expo'

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
  }

  async loadFont() {
    const AntipastoLight = Font.loadAsync({ 'Antipasto-Light': require('../assets/fonts/Antipasto-Light.otf') });
    const AntipastoRegular = Font.loadAsync({ 'Antipasto-Regular': require('../assets/fonts/Antipasto-Regular.otf') });
    const AntipastoDemibold = Font.loadAsync({ 'Antipasto-Demibold': require('../assets/fonts/Antipasto-Demibold.otf') });
    const Antipasto = Font.loadAsync({ 'Antipasto': require('../assets/fonts/Antipasto.ttf') });  

    const GeezaproDemibold = Font.loadAsync({ 'Geezapro-Demibold': require('../assets/fonts/Geezapro-Demibold.ttf') });
    const GeezaproRegular = Font.loadAsync({ 'Geezapro-Regular': require('../assets/fonts/Geezapro-Regular.ttf') });
    const Geezapro = Font.loadAsync({ 'Geezapro': require('../assets/fonts/Geezapro-Regular.ttf') });

    return Promise.all([AntipastoLight, AntipastoRegular, AntipastoDemibold, Antipasto, GeezaproDemibold, GeezaproRegular, Geezapro]);
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