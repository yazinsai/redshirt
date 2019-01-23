import React from "react";
import { StyleSheet, StatusBar, Text, View, TouchableOpacity } from "react-native";
import Button from '../components/Button'
import { Container } from '../components/Container'
import StyledText from '../components/StyledText'
import localeStore from "../localization/localeStore"

export default class OnboardingIntro extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <Container style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <StyledText style={styles.title}>{localeStore.t('onBoardingIntroLightBefore')} <StyledText weight='Demibold'>{localeStore.t('onBoardingIntroBold')}</StyledText>{localeStore.t('onBoardingIntroLightAfter')}</StyledText>
        <View style={styles.buttonsContainer}>
          <Button variant='primary' onPress={() => navigate('OnBoardingSlides')} text={localeStore.t('onBoardingIntroContinueButton')} />
          <Button variant='secondary' onPress={() => navigate('Home')} text={localeStore.t('onBoardingIntroSkipButton')} />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginLeft: '5%'
  },
  title: {
    fontSize: 54,
    color: '#D0021B',
  },
  buttonsContainer: {
    marginTop: 100
  },
});
