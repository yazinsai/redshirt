import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default class OnboardingIntro extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>With Red Shirt, you’ll <Text style={styles.bold}>never go to another laundry</Text> again.</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={[styles.button, styles.btnPrimary]} onPress={() => navigate('OnBoardingSlides')}>
            <Text style={[styles.btnText, styles.textPrimary]}>3 simple steps</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.btnSecondary]} onPress={() => navigate('Home')}>
            <Text style={[styles.btnText, styles.textSecondary]}>Skip Intro</Text>
          </TouchableOpacity>
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
  button: {
    borderRadius: 25,
    padding: 15,
    margin: 10
  },
  btnPrimary: {
    backgroundColor: '#D0021B'
  },
  btnSecondary: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
  },
  btnText: {
    textAlign: 'center',
    fontSize: 14
  },
  textPrimary: {
    color: 'white'
  },
});
