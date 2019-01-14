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

class OrderDetails extends  React.Component {
  constructor(props) {
    super(props);

    this.state = {
      soonestDropOffDate: moment().format(DATE_FORMAT),
      soonestDropOffTime: 0,
      type: this.getType({}),
      value: {}
    };

    this.onChangePickup = this.onChangePickup.bind(this);
    this.submitForm = this.submitForm.bind(this)
    this.onChange = this.onChange.bind(this)
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

  onChange(value) {
    // recalculate the type only if strictly necessary
    const type = value.pickup !== this.state.value.pickup ?
      this.getType(value) :
      this.state.type;
    
    if(value.pickup !== this.state.value.pickup) {
      // We reset return time
      value.return = ''
    }

    this.setState({ value, type });
  }

  getType(value) {
    const pickup = value.pickup
    const result = {}
    if(pickup) {
      const [pickUpDay, pickUpTime] = pickup.split('/')
      const twoDays = moment(new Date())
        .add(2, "days")
        .format(DATE_FORMAT);
      const threeDays = moment(new Date())
      .add(3, "days")
      .format(DATE_FORMAT);
      if(pickUpDay == 'TD') {
        if(pickUpTime == 'M') {
          result['TM/M'] = 'Tomorrow, morning(9am-12pm)'
          result['TM/A'] = 'Tomorrow, afernoon (12pm-4pm)'
          result['TM/E'] = 'Tomorrow, evening (4pm-8pm)'  
        } else if(pickUpTime == 'A') {
          result['TM/A'] = 'Tomorrow, afernoon (12pm-4pm)'
          result['TM/E'] = 'Tomorrow, evening (4pm-8pm)'
        } else if(pickUpTime == 'E') {
          result['TM/E'] = 'Tomorrow, evening (4pm-8pm)'
        }
        result[`${twoDays}/M`] = `${twoDays}, morning (9am-12pm)`
        result[`${twoDays}/A`] = `${twoDays}, afernoon (12pm-4pm)`
        result[`${twoDays}/E`] = `${twoDays}, evening (4pm-8pm)`
        result[`${threeDays}/M`] = `${threeDays}, morning (9am-12pm)`
        result[`${threeDays}/A`] = `${threeDays}, afernoon (12pm-4pm)`
        result[`${threeDays}/E`] = `${threeDays}, evening (4pm-8pm)`
      } else if(pickUpDay == 'TM') {
        const fourDays = moment(new Date())
        .add(4, "days")
        .format(DATE_FORMAT);
        if(pickUpTime == 'M') {
          result[`${twoDays}/M`] = `${twoDays}, morning (9am-12pm)`
          result[`${twoDays}/A`] = `${twoDays}, afernoon (12pm-4pm)`
          result[`${twoDays}/E`] = `${twoDays}, evening (4pm-8pm)`
        } else if(pickUpTime == 'A') {
          result[`${twoDays}/A`] = `${twoDays}, afernoon (12pm-4pm)`
          result[`${twoDays}/E`] = `${twoDays}, evening (4pm-8pm)`
        } else if(pickUpTime == 'E') {
          result[`${twoDays}/E`] = `${twoDays}, evening (4pm-8pm)`
        }
        result[`${threeDays}/M`] = `${threeDays}, morning (9am-12pm)`
        result[`${threeDays}/A`] = `${threeDays}, afernoon (12pm-4pm)`
        result[`${threeDays}/E`] = `${threeDays}, evening (4pm-8pm)`
        result[`${fourDays}/M`] = `${fourDays}, morning (9am-12pm)`
        result[`${fourDays}/A`] = `${fourDays}, afernoon (12pm-4pm)`
        result[`${fourDays}/E`] = `${fourDays}, evening (4pm-8pm)`
      } else {
        const oneDayFromDate = moment(pickUpDay)
          .add(1, "days")
          .format(DATE_FORMAT);
        const twoDaysFromDate = moment(pickUpDay)
          .add(2, "days")
          .format(DATE_FORMAT);
        const threeDaysFromDate = moment(pickUpDay)
          .add(3, "days")
          .format(DATE_FORMAT);
        if(pickUpTime == 'M') {
          result[`${oneDayFromDate}/M`] = `${oneDayFromDate}, morning (9am-12pm)`
          result[`${oneDayFromDate}/A`] = `${oneDayFromDate}, afernoon (12pm-4pm)`
          result[`${oneDayFromDate}/E`] = `${oneDayFromDate}, evening (4pm-8pm)`
        } else if(pickUpTime == 'A') {
          result[`${oneDayFromDate}/A`] = `${oneDayFromDate}, afernoon (12pm-4pm)`
          result[`${oneDayFromDate}/E`] = `${oneDayFromDate}, evening (4pm-8pm)`
        } else if(pickUpTime == 'E') {
          result[`${oneDayFromDate}/E`] = `${oneDayFromDate}, evening (4pm-8pm)`
        }
        result[`${twoDaysFromDate}/M`] = `${twoDaysFromDate}, morning (9am-12pm)`
        result[`${twoDaysFromDate}/A`] = `${twoDaysFromDate}, afernoon (12pm-4pm)`
        result[`${twoDaysFromDate}/E`] = `${twoDaysFromDate}, evening (4pm-8pm)`
        result[`${threeDaysFromDate}/M`] = `${threeDaysFromDate}, morning (9am-12pm)`
        result[`${threeDaysFromDate}/A`] = `${threeDaysFromDate}, afernoon (12pm-4pm)`
        result[`${threeDaysFromDate}/E`] = `${threeDaysFromDate}, evening (4pm-8pm)`
      }
    }
    const deliverType = t.enums(result);
    const Order = t.struct({
      pickup: t.enums({
        'TD/M': 'Today, morning (9am-12pm)',
        'TD/A': 'Today, afernoon (12pm-4pm)',
        'TD/E': 'Today, evening (4pm-8pm)',
        'TM/M': 'Tomorrow, morning (9am-12pm)',
        'TM/A': 'Tomorrow, afernoon (12pm-4pm)',
        'TM/E': 'Tomorrow, evening (4pm-8pm)',
        ...get2DaysOption()
      }, 'pickUp'),
      deliver: deliverType,
      address: t.String,
      phone: t.Number,
      email: t.String
    });
    return Order
  }

  submitForm() {
    const { navigation } = this.props;
    const formValue = this.refs.form.getValue()
    if(!formValue) return
    const laundry = navigation.getParam('laundry', 'NO-LAUNDRY');
    const result = Object.assign({}, formValue, {laundry})
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
          type={this.state.type} 
          value= {this.state.value}
          options={options}
          onChange={this.onChange}
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
