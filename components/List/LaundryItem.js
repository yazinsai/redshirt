import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

const LaundryItem = ({ children }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{children}</Text>
  </View>
);

LaundryItem.propTypes = {
  children: PropTypes.any
};

export default LaundryItem;
