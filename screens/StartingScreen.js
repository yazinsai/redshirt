import React from 'react'
import {AsyncStorage} from 'react-native'

import Home from './Home'
import OnboardingIntro from './OnboardingIntro'


export class StartingScreen extends React.Component {
  constructor(){
    super();
    this.state = {firstLaunch: null};
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
  render(){
    if(this.state.firstLaunch === null){
      return null; 
    }else if(this.state.firstLaunch == true){
      return <OnboardingIntro navigation={this.props.navigation}/>
    }else{
      console.log('home')
      return <Home navigation={this.props.navigation}/>
    }
  }
}

export default StartingScreen