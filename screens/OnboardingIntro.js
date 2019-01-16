import React from "react";
import { StyleSheet, StatusBar, Text, View, TouchableOpacity } from "react-native";
import Button from '../components/Button'
import { Container } from '../components/Container'
import AntipastoText from '../components/AntipastoText'

export default class OnboardingIntro extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <Container style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <AntipastoText style={styles.title}>With Red Shirt, you’ll <AntipastoText weight='Demibold'>never go to another laundry</AntipastoText> again.</AntipastoText>
        <View style={styles.buttonsContainer}>
          <Button variant='primary' onPress={() => navigate('OnBoardingSlides')} text='3 simple steps' />
          <Button variant='secondary' onPress={() => navigate('Home')} text='Skip intro' />
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
