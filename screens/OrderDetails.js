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
import moment from "moment";

import { Formik } from "formik";

const styles = StyleSheet.create({
  text: {
    fontSize: 24
  }
});

const DATE_FORMAT = "YYYY-MM-DD";

class OrderDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      soonestDropOffDate: null,
      soonestDropOffTime: null
    };

    this.onChangePickup = this.onChangePickup.bind(this);
  }

  onChangePickup({ date, time }) {
    console.log("onChangePickup", date, time);
    const dayAfter = moment(date)
      .add(1, "days")
      .format(DATE_FORMAT);

    this.setState({
      soonestDropOffDate: dayAfter,
      soonestDropOffTime: time
    });
  }

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
              <DateTimePicker onChange={this.onChangePickup} />

              <DateTimePicker
                startDate={this.state.soonestDropOffDate}
                startTime={this.state.soonestDropOffTime}
              />

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
