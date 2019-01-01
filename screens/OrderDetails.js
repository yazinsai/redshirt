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
import { DateTimePicker } from "../components/DateTimePicker";

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
              <DateTimePicker />

              {/* <DateTimePicker startDate="2019-01-02" startTime="12" /> */}

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
