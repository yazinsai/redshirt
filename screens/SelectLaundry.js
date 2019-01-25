import React, { Component } from "react";
import {  FlatList, StyleSheet, View } from "react-native";
import { Localization } from 'expo-localization';

import LaundryItem from "../components/LaundryItem";

class ChooseLaundry extends Component {
  constructor(props) {
    super(props)
    this.state= {laundries: []}
  }
  componentWillMount() {
    const { locale } = Localization
    fetch(`https://shine-server-order.herokuapp.com/laundries?locale=${locale}`, {
      method: 'GET'
    }).then((response) => response.json())
      .then((json) => this.setState({laundries: json}))
  }
  onItemClicked(item) {
    const { navigation } = this.props;
    const pickupRequired = navigation.getParam('pickupRequired', 'true');
    navigation.navigate('OrderDetails', {laundry: item.name, pickupRequired});
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.laundries}
          renderItem={({ item }) => <LaundryItem item={item} onPress={() => this.onItemClicked(item)} navigation={navigation}/>}
          keyExtractor={item => ''+item.id}
          ItemSeparatorComponent={({_}) =>
            <View style={styles.separator} />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ececec',
    flex: 1,
    marginTop: 10,
    marginBottom: 10
  },
})

export default ChooseLaundry;
