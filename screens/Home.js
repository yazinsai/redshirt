import React from "react";
import { StyleSheet, Text, View, Image, AsyncStorage } from "react-native";
import Button from '../components/Button'
import StyledText from '../components/StyledText'
import { Container } from '../components/Container'
import localeStore from "../localization/localeStore"

export default class App extends React.Component {
  render() {
    const {navigate} = this.props.navigation
    return (
      <Container style={styles.container}>
        <View style={styles.appLogo}>
          <Image source={require('../assets/logo.png')} />
          <StyledText style={styles.appLogoText}>{localeStore.t('homeAppLogoText')}</StyledText>
        </View>
        <Button variant='primary' text={localeStore.t('homePickupButton')} onPress={()=> navigate('SelectLaundry', {pickupRequired: true})}/>
        <View style={styles.collectGroup}>
          <StyledText style={styles.collectText}>{localeStore.t('homeCollectAboveText')}</StyledText>
          <Button variant='secondary' text={localeStore.t('homeCollectButton')} onPress={()=> navigate('SelectLaundry', {pickupRequired: false})}/>
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
    alignItems: 'center',
  },
  appLogoText: {
    fontSize: 32,
    color: '#D0021B',
    marginTop: 10,
  },
  collectGroup: {
    marginTop: 30
  },
  collectText: {
    fontSize: 20,
    textAlign: 'center'
  }
});
