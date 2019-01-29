import React from "react";
import { StyleSheet, Text, View, Image, AsyncStorage } from "react-native";
import Button from '../components/Button'
import StyledText from '../components/StyledText'
import { Container } from '../components/Container'
import localeStore from "../localization/localeStore"

import colors from '../config/colors'

export default class App extends React.Component {
  render() {
    const {navigate} = this.props.navigation
    return (
      <Container style={styles.container}>
        <View style={styles.appLogo}>
          <Image source={require('../assets/logo.png')} />
          <StyledText size='h4' style={styles.appLogoText}>{localeStore.t('homeAppLogoText')}</StyledText>
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
  appLogo: {
    height: '60%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appLogoText: {
    color: colors.$primaryRed,
    marginTop: 10,
  },
  collectGroup: {
    marginTop: 30
  },
  collectText: {
    textAlign: 'center'
  }
});
