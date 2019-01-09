import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Button from '../components/Button'

export default class OnboardingIntro extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>With Red Shirt, you’ll <Text style={styles.bold}>never go to another laundry</Text> again.</Text>
        <View style={styles.buttonsContainer}>
          <Button variant='primary' onPress={() => navigate('OnBoardingSlides')} text='3 simple steps' />
          <Button variant='secondary' onPress={() => navigate('Home')} text='Skip intro' />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 100,
    width: '90%',
    marginLeft: '5%'
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
