import React, { Component } from "react";
import {  FlatList, StyleSheet, View } from "react-native";
import { Card } from 'react-native-elements'

import laundries from "../data/laundries";
import LaundryItem from "../components/LaundryItem";

class ChooseLaundry extends Component {
  static navigationOptions = {
    headerMode: 'float',
  }
  onItemClicked(item) {
    const { navigation } = this.props;
    const pickup = navigation.getParam('pickup', 'true');
    console.log(item.name)
    if(pickup) {
      navigation.navigate('OrderDetails', {laundry: item.name});
    } else {
      navigation.navigate('OrderDetailsNoPickup', {laundry: item.name});
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={laundries}
          renderItem={({ item }) => <LaundryItem item={item} onPress={() => this.onItemClicked(item)}/>}
          keyExtractor={item => item.id}
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
