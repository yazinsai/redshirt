import React, { Component } from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import moment from "moment";

import t from 'tcomb-form-native';
import Button from '../components/Button'

const Form = t.form.Form;
const DATE_FORMAT = "YYYY-MM-DD";

function get2DaysOption() {
  const twoDays = moment(new Date())
      .add(2, "days")
      .format(DATE_FORMAT);
  const result = {} 
  result[`${twoDays}/M`] = `${twoDays}, morning (9am-12pm)`
  result[`${twoDays}/A`] = `${twoDays}, afernoon (12pm-4pm)`
  result[`${twoDays}/E`] = `${twoDays}, evening (4pm-8pm)`
  return result
}

const Order = t.struct({
  deliver: t.enums({
    'TD/M': 'Today, morning (9am-12pm)',
    'TD/A': 'Today, afernoon (12pm-4pm)',
    'TD/E': 'Today, evening (4pm-8pm)',
    'TM/M': 'Tomorrow, morning (9am-12pm)',
    'TM/A': 'Tomorrow, afernoon (12pm-4pm)',
    'TM/E': 'Tomorrow, evening (4pm-8pm)',
    ...get2DaysOption()
  }, 'pickUp'),
  address: t.String,
  phone: t.Number,
  email: t.String
});

var options = {
  fields: {
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

class OrderDetails extends  React.Component {
  constructor(props) {
    super(props);

    this.state = {
      soonestDropOffDate: moment().format(DATE_FORMAT),
      soonestDropOffTime: 0,
      value: {}
    };

    this.submitForm = this.submitForm.bind(this)
  }

  submitForm() {
    const { navigation } = this.props;
    const formValue = this.refs.form.getValue()
    if(!formValue) return
    const laundry = navigation.getParam('laundry', 'NO-LAUNDRY');
    const result = Object.assign({}, formValue, {laundry, pickup: 'NO PICKUP'})
    const json = JSON.stringify(result)
    fetch('https://shine-server-order.herokuapp.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: json
  }).then(()=> navigation.navigate('Feedback'))
  }

  
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Form 
          ref="form"
          type={Order} 
          value= {this.state.value}
          options={options}
          />
        <Button text='Place my order' variant='primary' onPress={this.submitForm}/>
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
