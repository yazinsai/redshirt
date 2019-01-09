import React, { Component } from "react";
import {  FlatList } from "react-native";
import { Card } from 'react-native-elements'

import laundries from "../data/laundries";
import LaundryItem from "../components/LaundryItem";

class ChooseLaundry extends Component {
  static navigationOptions = {
    headerMode: 'float',
  }
  render() {
    return (
        <FlatList
          data={laundries}
          renderItem={({ item }) => <LaundryItem item={item} />}
          keyExtractor={item => item.id}
        />
      
    );
  }
}

export default ChooseLaundry;
