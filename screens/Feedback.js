import React, { Component } from 'react'
import {View, Image, Text, StyleSheet} from 'react-native'
import StyledText from '../components/StyledText'
import Button from '../components/Button'

import localeStore from "../localization/localeStore"

import colors from '../config/colors'

export class Feedback extends Component {
  componentWillMount(){
    const { navigation } = this.props;
    const pickup = navigation.getParam('meetingTime', '');
    const result = navigation.getParam('result', 'error');
    this.pickup = pickup;
    this.result = result;

  }
  render() {
    const {navigate} = this.props.navigation
    let icon
    let text
    if(this.result == 'success') {
      icon = require('../assets/tick.png')
      topText = localeStore.t('feedbackTopSuccess')
      bottomText = `${localeStore.t('feedbackBottomSuccess')} \n ${this.pickup}.`
      buttonText = localeStore.t('feedbackButtonSuccess')
    } else {
      icon = require('../assets/cross.png')
      topText = localeStore.t('feedbackTopError')
      bottomText = localeStore.t('feedbackBottomError')
      buttonText = localeStore.t('feedbackButtonError')
    }
    return (
      <View style={styles.container}>
        <StyledText size='h4' style={styles.title} >{topText}</StyledText>
        <Image source={icon} />
        <StyledText size='h5' style={styles.subTitle}>{bottomText}</StyledText>
        <Image style={styles.backImage} source={require('../assets/slide1Image.png')} />
        <Button text={buttonText} variant='white' style={styles.button} onPress={()=> navigate('Home')}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.$primaryRed,
    display: 'flex',
    alignItems: 'center'
  },
  title: {
    color: colors.$white,
    marginTop: 70,
    textAlign: 'center',
    marginBottom: 40
  },
  tickImage: {

  },
  subTitle: {
    color: colors.$white,
    textAlign: 'center',
    marginTop: 70,
    zIndex: 2
  },
  backImage: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 1
  },
  button: {
    width: '90%',
    marginTop: 40,
    zIndex: 2,
  }
})

export default Feedback
