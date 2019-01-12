import React from "react";
import { StyleSheet, StatusBar, Text, View, TouchableOpacity } from "react-native";
import Button from '../components/Button'
import { Container } from '../components/Container'

export default class OnboardingIntro extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <Container style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Text style={styles.title}>With Red Shirt, you’ll <Text style={styles.bold}>never go to another laundry</Text> again.</Text>
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
  },
  title: {
    fontSize: 44,
    color: '#D0021B',
    fontFamily: 'Helvetica',
    fontWeight: '100'
  },
  bold: {
    fontWeight: "bold"
  },
  buttonsContainer: {
    marginTop: 100
  },
});
