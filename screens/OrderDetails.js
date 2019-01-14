import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Picker
} from "react-native";
import { Container } from "../components/Container";
import TextArea from "../components/TextArea";
import { DateTimePicker } from "../components/DateTimePicker";
import moment from "moment";

import t from 'tcomb-form-native';
import Button from '../components/Button'

import { Formik } from "formik";

const Form = t.form.Form;

const User = t.struct({
  pickUp: t.enums({
    'todayMorning': 'Today, morning (9am-12pm)',
    'todayAfternoon': 'Today, afernoon (12pm-4pm)',
    'todayEvening': 'Today, evening (4pm-8pm)',
    'tomorrowMorning': 'Tomorrow, morning (9am-12pm)',
    'tomorrowAfternoon': 'Tomorrow, afernoon (12pm-4pm)',
    'tomorrowEvening': 'Tomorrow, evening (4pm-8pm)',
  }, 'pickUp'),
  return: t.enums({
    'todayMorning': 'Today, morning (9am-12pm)',
    'todayAfternoon': 'Today, afernoon (12pm-4pm)',
    'todayEvening': 'Today, evening (4pm-8pm)',
    'tomorrowMorning': 'Tomorrow, morning (9am-12pm)',
    'tomorrowAfternoon': 'Tomorrow, afernoon (12pm-4pm)',
    'tomorrowEvening': 'Tomorrow, evening (4pm-8pm)',
  }, 'return'),
  address: t.String,
  mobileNumber: t.Number,
  email: t.String
});

var options = {
  fields: {
    pickUp: {
      label: 'When can we pick up your laundry?' // <= label for the name field
    },
    return: {
      label: 'When can we return your laundry?' // <= label for the name field
    },
    address: {
      label: 'What is your address?' // <= label for the name field
    },
    mobileNumber: {
      label: 'Your mobile number' // <= label for the name field
    },
    email: {
      label: 'Your email address (for your receipt)' // <= label for the name field
    }
  }
}

const DATE_FORMAT = "YYYY-MM-DD";

class OrderDetails extends  React.Component {
  constructor(props) {
    super(props);

    this.state = {
      soonestDropOffDate: moment().format(DATE_FORMAT),
      soonestDropOffTime: 0
    };

    this.onChangePickup = this.onChangePickup.bind(this);
  }

  onChangePickup({ date, time }) {
    const tomorrow = moment(date)
      .add(1, "days")
      .format(DATE_FORMAT);

    this.setState({
      soonestDropOffDate: tomorrow,
      soonestDropOffTime: time
    });
  }

  
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Form 
          type={User} 
          options={options}
          />
        <Button text='Place my order' variant='primary' onPress={() => navigate('Feedback') }/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 30,
    padding: 20,
    backgroundColor: '#ffffff',
  },
});

export default OrderDetails;
