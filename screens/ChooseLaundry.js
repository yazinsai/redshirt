import React, { Component } from "react";
import { Text, FlatList } from "react-native";

import laundries from "../data/laundries";
import { LaundryItem } from "../components/List";
import { Container } from "../components/Container";

class ChooseLaundry extends Component {
  render() {
    return (
      <Container>
        <Text>Select your Laundry from the below:</Text>
        <FlatList
          data={laundries}
          renderItem={({ item }) => <LaundryItem item={item} />}
          keyExtractor={item => item.id}
        />
      </Container>
    );
  }
}

export default ChooseLaundry;
