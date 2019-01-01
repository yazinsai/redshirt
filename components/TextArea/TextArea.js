import React, { Component } from "react";
import { View, TextInput, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  textAreaContainer: {
    borderColor: "#eee",
    borderWidth: 1,
    padding: 5
  },
  textArea: {
    justifyContent: "flex-start",
    textAlignVertical: "top"
  }
});

class TextArea extends Component {
  render() {
    return (
      <View style={styles.textAreaContainer}>
        <TextInput
          style={styles.textArea}
          underlineColorAndroid="transparent"
          placeholderTextColor="grey"
          numberOfLines={3}
          multiline={true}
          {...this.props}
        />
      </View>
    );
  }
}

export default TextArea;
