import React, { Component } from 'react'
import {View, Image, Text, StyleSheet} from 'react-native'
import StyledText from '../components/StyledText'

import localeStore from "../localization/localeStore"

export class Feedback extends Component {
  componentWillMount(){
    const { navigation } = this.props;
    const pickup = navigation.getParam('meetingTime', '');
    this.pickup = pickup
  }
  render() {
    return (
      <View style={styles.container}>
        <StyledText size='h4' style={styles.title} >{localeStore.t('feedbackTop')}</StyledText>
        <Image source={require('../assets/tick.png')} />
        <StyledText size='h5' style={styles.subTitle}>{localeStore.t('feedbackBottom')}{"\n"} {this.pickup}.</StyledText>
        <Image style={styles.backImage} source={require('../assets/slide1Image.png')} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D0021B',
    display: 'flex',
    alignItems: 'center'
  },
  title: {
    color: 'white',
    marginTop: 70,
    textAlign: 'center',
    marginBottom: 40
  },
  tickImage: {

  },
  subTitle: {
    color: 'white',
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
})

export default Feedback
