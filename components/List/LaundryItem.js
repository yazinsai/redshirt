import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

const LaundryItem = ({ item }) => (
  <TouchableOpacity>
    <View style={styles.container}>
      <Text style={styles.text}>{item.name}</Text>
      <Text style={styles.rating}>
        {item.reviews.rating} of 5 (from {item.reviews.count} reviews)
      </Text>
    </View>
  </TouchableOpacity>
);

LaundryItem.propTypes = {
  item: PropTypes.object
};

export default LaundryItem;
