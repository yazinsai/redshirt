import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Swiper from 'react-native-swiper';
import Button from "../components/Button"
import StyledText from '../components/StyledText'
import localeStore from "../localization/localeStore"
import { Localization } from 'expo-localization';

export default class OnboardingSlides extends React.Component {
  render() {
    const whiteDot= <View style={styles.customDot} />
    const { navigate } = this.props.navigation;
    let imageStyle = styles.image
    const wrapperStyle = Object.assign({}, styles.wrapper)
    let index = 0
    if(Localization.locale == 'ar') {
      imageStyle = styles.imageRTL
      wrapperStyle.flexDirection = 'row-reverse'
      index = 2
    }
    return (
      <Swiper style={wrapperStyle} showsButtons={false} 
        activeDot={whiteDot} loop={false} index={index}>
        <View style={styles.slide}>
          <StyledText style={styles.number}>1</StyledText>
          <StyledText style={styles.content}>
            <StyledText weight='Demibold'>{localeStore.t('onBoardingFirstSlideBold')}</StyledText>
            <StyledText weight='Light'>{localeStore.t('onBoardingFirstSlideLight')}</StyledText>
          </StyledText>
          <Image source={require('../assets/slide1Image.png')} style={imageStyle} />
        </View>
        <View style={styles.slide}>
          <StyledText style={styles.number}>2</StyledText>
          <StyledText style={styles.content}>
            <StyledText weight='Demibold'>{localeStore.t('onBoardingSecondSlideBold')}</StyledText>
            <StyledText weight='Light'>{localeStore.t('onBoardingSecondSlideLight')}</StyledText>
          </StyledText>
          <Image source={require('../assets/slide2Image.png')} style={imageStyle} />
        </View>
        <View style={styles.slide}>
          <StyledText style={styles.number}>3</StyledText>
          <StyledText style={styles.content}>
            <StyledText weight='Demibold'>{localeStore.t('onBoardingThirdSlideBold')}</StyledText>
            <StyledText weight='Light'>{localeStore.t('onBoardingThirdSlideLight')}</StyledText>
          </StyledText>
          <Image source={require('../assets/slide3Image.png')} style={imageStyle} />
          <Button style={styles.button} variant='white' onPress={() => navigate('Home')} text={localeStore.t('onBoardingThirdSlideButton')} />
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
  imageRTL: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 1,
    transform:[
      {scaleX: - 1}
    ]
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
