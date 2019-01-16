import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Swiper from 'react-native-swiper';
import Button from "../components/Button"
import AntipastoText from '../components/AntipastoText'

export default class OnboardingSlides extends React.Component {
  render() {
    const whiteDot= <View style={styles.customDot} />
    const { navigate } = this.props.navigation;
    return (
      <Swiper style={styles.wrapper} showsButtons={false} activeDot={whiteDot} loop={false}>
        <View style={styles.slide}>
          <AntipastoText style={styles.number}>1</AntipastoText>
          <Text style={styles.content}>
            <AntipastoText weight='Demibold'>Choose a laundry</AntipastoText>
            <AntipastoText weight='Light'> and a pickup time</AntipastoText>
          </Text>
          <Image source={require('../assets/slide1Image.png')} style={styles.image} />
        </View>
        <View style={styles.slide}>
          <AntipastoText style={styles.number}>2</AntipastoText>
          <Text style={styles.content}>
            <AntipastoText weight='Demibold'>We collect</AntipastoText>
            <AntipastoText weight='Light'> your laundry in a bag</AntipastoText>
          </Text>
          <Image source={require('../assets/slide2Image.png')} style={styles.image} />
        </View>
        <View style={styles.slide}>
          <AntipastoText style={styles.number}>3</AntipastoText>
          <Text style={styles.content}>
            <AntipastoText weight='Demibold'>We return</AntipastoText>
            <AntipastoText weight='Light'> your clean laundry</AntipastoText>
          </Text>
          <Image source={require('../assets/slide3Image.png')} style={styles.image} />
          <Button style={styles.button} variant='white' onPress={() => navigate('Home')} text='Place order' />
        </View>
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#D0021B',
  },
  slide: {
    flex: 1
  },
  number: {
    color: "#A90015",
    fontSize: 150,
    marginLeft: '5%'
  },
  content: {
    color: '#fff',
    fontSize: 72,
    width: '80%',
    marginLeft: '5%',
    zIndex: 2
  },
  image: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 1
  },
  customDot: {
    backgroundColor: 'white', 
    width: 8, 
    height: 8, 
    borderRadius: 4, 
    marginLeft: 3, 
    marginRight: 3, 
    marginTop: 3, 
    marginBottom: 3,
  },
  button: {
    zIndex: 1,
    position: 'absolute',
    bottom: 50,
    width: '90%',
    marginLeft: '5%'
  }
});
