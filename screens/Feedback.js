import React, { Component } from 'react'
import {View, Image, Text, StyleSheet} from 'react-native'
import AntipastoText from '../components/AntipastoText'

export class Feedback extends Component {
  componentWillMount(){
    const { navigation } = this.props;
    const pickup = navigation.getParam('meetingTime', '');
    this.pickup = pickup
  }
  render() {
    return (
      <View style={styles.container}>
        <AntipastoText style={styles.title} >You're all {"\n"} set.</AntipastoText>
        <Image source={require('../assets/tick.png')} />
        <AntipastoText style={styles.subTitle}>See you {"\n"} {this.pickup}.</AntipastoText>
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
})

export default Feedback
