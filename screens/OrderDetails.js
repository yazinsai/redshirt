import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Picker
} from "react-native";
import { Container } from "../components/Container";
import TextArea from "../components/TextArea";

import { Formik } from "formik";

const styles = StyleSheet.create({
  text: {
    fontSize: 24
  }
});

class OrderDetails extends Component {
  render() {
    return (
      <Container>
        <Text style={styles.text}>I'm the order details screen!</Text>
        <Formik
          initialValues={{ firstName: "" }}
          onSubmit={values => console.log(values)}
        >
          {({ handleChange, handleSubmit, values }) => (
            <View>
              <Text>Pickup </Text>
              <Picker
                selectedValue={null}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ language: itemValue })
                }
              >
                <Picker.Item label="Today" value="java" />
                <Picker.Item label="Tomorrow" value="js" />
                <Picker.Item label="Thursday, 3rd Jan" value="js" />
                <Picker.Item label="Friday, 4th Jan" value="js" />
                <Picker.Item label="Saturday, 5th Jan" value="js" />
                <Picker.Item label="Sunday, 6th Jan" value="js" />
              </Picker>
              <Picker>
                <Picker.Item label="Morning (9am to 12pm)" value="js" />
                <Picker.Item label="Afternoon (12pm - 4pm)" value="js" />
                <Picker.Item label="Evening (4pm - 8pm)" value="js" />
              </Picker>

              <TextInput
                value={values.email}
                placeholder="email"
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <TextInput
                value={values.phone}
                placeholder="phone"
                keyboardType="numeric"
              />

              <TextArea placeholder="Your address" />

              <Button onPress={handleSubmit} title="submit" />
            </View>
          )}
        </Formik>
      </Container>
    );
  }
}

export default OrderDetails;
