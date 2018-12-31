import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";

import laundries from "../data/laundries";
import { LaundryItem } from "../components/List";
import { Container } from "../components/Container";

class ChooseLaundry extends Component {
  render() {
    return (
      <Container>
        <FlatList
          data={laundries}
          renderItem={({ item }) => <LaundryItem>{item}</LaundryItem>}
          keyExtractor={item => item}
        />
      </Container>
    );
  }
}

export default ChooseLaundry;
