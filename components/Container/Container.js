import React from "react";
import PropTypes from "prop-types";
import { View, TouchableWithoutFeedback, Keyboard } from "react-native";

import styles from "./styles";

/**
 * Can be used like:
 * 
 *   <Container>...</Container>
 * 
 * or:
 * 
 *   <Container style={styles.container}>...</Container>
 */

const Container = ({ children, style }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={[styles.container, style]}>{children}</View>
  </TouchableWithoutFeedback>
);

Container.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object
};

export default Container;
