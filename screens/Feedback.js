import React, { Component } from 'react'
import {View, Image, Text, StyleSheet} from 'react-native'
import AntipastoText from '../components/AntipastoText'
import Button from '../components/Button'

import localeStore from "../localization/localeStore"

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
        <AntipastoText style={styles.title} >{localeStore.t('feedbackTop')}</AntipastoText>
        <Image source={require('../assets/tick.png')} />
        <AntipastoText style={styles.subTitle}>{localeStore.t('feedbackBottom')}{"\n"} {this.pickup}.</AntipastoText>
        <Image style={styles.backImage} source={require('../assets/slide1Image.png')} />
        <Button text={localeStore.t('feedbackButton')} variant='white' style={styles.button} onPress={()=> navigate('Home')}/>
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
    fontSize: 33,
    marginTop: 70,
    textAlign: 'center',
    marginBottom: 40
  },
  tickImage: {

  },
  subTitle: {
    fontSize: 24,
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
  button: {
    width: '90%',
    marginTop: 40,
    zIndex: 2,
  }
})

export default Feedback
