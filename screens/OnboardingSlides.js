import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Swiper from 'react-native-swiper';

export default class OnboardingSlides extends React.Component {
  render() {
    const whiteDot= <View style={styles.customDot} />
    return (
      <Swiper style={styles.wrapper} showsButtons={false} activeDot={whiteDot}>
        <View style={styles.slide}>
          <Text style={styles.number}>1</Text>
          <Text style={styles.content}>Choose a laundry and a pickup time</Text>
          <Image source={require('../assets/slide1Image.png')} style={styles.image} />
        </View>
        <View style={styles.slide}>
          <Text style={styles.number}>2</Text>
          <Text style={styles.content}>We collect your laundry in a bag</Text>
          <Image source={require('../assets/slide2Image.png')} style={styles.image} />
        </View>
        <View style={styles.slide}>
          <Text style={styles.number}>3</Text>
          <Text style={styles.content}>We return your clean laundry</Text>
          <Image source={require('../assets/slide3Image.png')} style={styles.image} />
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
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    marginLeft: '5%'
  },
  content: {
    color: '#fff',
    fontSize: 60,
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
  }
});
