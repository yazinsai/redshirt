import React, { Component } from 'react'
import {View, Image, Text, StyleSheet, StatusBar} from 'react-native'
import StyledText from '../components/StyledText'
import Button from '../components/Button'

import localeStore from "../localization/localeStore"

import colors from '../config/colors'

export class Feedback extends Component {
  componentWillMount(){
    const { navigation } = this.props;
    const pickup = navigation.getParam('meetingTime', '');
    this.pickup = pickup
  }
  render() {
    const {navigate} = this.props.navigation
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <StyledText size='h3' style={styles.title} >{localeStore.t('feedbackTop')}</StyledText>
        <Image source={require('../assets/tick.png')} />
        <StyledText size='h5' style={styles.subTitle}>{localeStore.t('feedbackBottom')}{"\n"} {this.pickup}.</StyledText>
        <Image style={styles.backImage} source={require('../assets/slide1Image.png')} />
        <Button text={localeStore.t('feedbackButton')} variant='white' style={styles.button} onPress={()=> navigate('Home')}/>
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
