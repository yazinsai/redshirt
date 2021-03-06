import React, { Component } from 'react'
import {View, Text, FlatList, StyleSheet, StatusBar} from 'react-native'
import { Localization } from 'expo-localization';

import StyledText from '../components/StyledText'
import colors from '../config/colors';

import localeStore from "../localization/localeStore"

export default class LaundryPrices extends Component {
  static navigationOptions = ({ navigation }) => {
    const laundry = navigation.getParam('name', '');
    return {
      title: `Prices - ${laundry}`
    };
  };
  constructor(props) {
    super(props)
    this.state = {
      items: []
    }
  }
  componentWillMount() {
    const {navigation} = this.props;
    this.id = navigation.getParam('id', '');
    const { locale } = Localization
    fetch(`https://api.redshirt.app/laundries/${this.id}/items?locale=${locale}`, {
      method: 'GET'
    }).then((response) => response.json())
      .then((json) => this.setState({items: json}))
  }
  render() {
    return (
      <View style={{flex:1}}>
        <StatusBar barStyle="light-content" />
        <FlatList
          data={this.state.items}
          renderItem={({item, index}) => <PriceRow item={item} index={index}/>}
          keyExtractor={item => item.item}
          style={styles.list}
          ListHeaderComponent={<ListHeader />}
          stickyHeaderIndices={[0]}
        />
      </View>
    )
  }
}

const PriceRow = ({item, index}) => {
  const colorClass = index%2 == 0 ? styles.evenColor : styles.oddColor
  return (
    <View style={[styles.row, colorClass]}>
      <View style={styles.column}>
        <StyledText fontFamily='Helvetica' style={styles.text}>{item.item}</StyledText>
      </View>
      <View style={styles.column}>
        <StyledText fontFamily='Helvetica' style={styles.text}>{item.pressing}</StyledText>
      </View>
      <View style={styles.column}>
        <StyledText fontFamily='Helvetica' style={styles.text}>{item.laundry}</StyledText>
      </View>
      <View style={styles.column}>
        <StyledText fontFamily='Helvetica' style={styles.text}>{item.dryClean}</StyledText>
      </View>
    </View>
  );
}

const ListHeader = ({}) => {
  return(
    <View style={[styles.row, styles.headerColor]}>
      <View style={styles.column}>
        <StyledText fontFamily='Helvetica' weight='Bold' style={styles.text}>{localeStore.t('laundryPricesItem')}</StyledText>
      </View>
      <View style={styles.column}>
        <StyledText fontFamily='Helvetica' weight='Bold' style={styles.text}>{localeStore.t('laundryPricesPressing')}</StyledText>
      </View>
      <View style={styles.column}>
        <StyledText fontFamily='Helvetica' weight='Bold' style={styles.text}>{localeStore.t('laundryPricesLaundry')}</StyledText>
      </View>
      <View style={styles.column}>
        <StyledText fontFamily='Helvetica' weight='Bold' style={styles.text}>{localeStore.t('laundryPricesDryClean')}</StyledText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    width: '90%',
    margin: '5%'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  column: {
    width: '25%',
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center',
    color: colors.$primaryGrey
  },
  oddColor: {
    backgroundColor: colors.$white,
  },
  evenColor: {
    backgroundColor: colors.$lightestGrey
  },
  headerColor: {
    backgroundColor:  colors.$lighterGrey
  }
})