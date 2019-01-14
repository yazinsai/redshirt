import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Button from '../components/Button'
import { Container } from '../components/Container'

export default class App extends React.Component {
  render() {
    const {navigate} = this.props.navigation
    return (
      <Container style={styles.container}>
        <View style={styles.appLogo}>
          <Image source={require('../assets/logo.png')} />
          <Text style={styles.appLogoText}>Red Shirt</Text>
        </View>
        <Button variant='primary' text='Schedule a pickup' onPress={()=> navigate('SelectLaundry')}/>
        <View style={styles.collectGroup}>
          <Text style={styles.collectText}> Already dropped off your laundry?</Text>
          <Button variant='secondary' text='Collect from the laundry' onPress={()=> navigate('OrderDetails')}/>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  appLogo: {
    height: '60%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  appLogoText: {
    fontSize: 32,
    color: '#D0021B',
    marginTop: 10
  },
  collectGroup: {
    marginTop: 30
  },
  collectText: {
    fontSize: 20,
    fontWeight: '100',
    textAlign: 'center'
  }
});
