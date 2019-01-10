import React, { Component } from "react";
import {  FlatList, StyleSheet, View } from "react-native";
import { Card } from 'react-native-elements'

import laundries from "../data/laundries";
import LaundryItem from "../components/LaundryItem";

class ChooseLaundry extends Component {
  static navigationOptions = {
    headerMode: 'float',
  }
  render() {
    return (
      <Card>
        <FlatList
          data={laundries}
          renderItem={({ item }) => <LaundryItem item={item} />}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={({separator}) =>
            <View style={styles.separator} />
          }
        />
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#DDD',
    opacity: 0.4,
    marginTop: 20,
    marginBottom: 20
  },
})

export default ChooseLaundry;
