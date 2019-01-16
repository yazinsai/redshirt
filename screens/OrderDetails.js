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
const DATE_FORMAT_FULL = "YYYY-MM-DD";
const DATE_FORMAT_DAY = 'dddd'

function get2DaysOption() {
  const twoDays = moment(new Date())
    .add(2, "days")
  const twoDaysFull = twoDays.format(DATE_FORMAT_FULL)
  const twoDaysWeek = twoDays.format(DATE_FORMAT_DAY)

  const result = {} 
  result[`${twoDaysFull}/M`] = `${twoDaysWeek}, morning (9am-12pm)`
  result[`${twoDaysFull}/A`] = `${twoDaysWeek}, afernoon (12pm-4pm)`
  result[`${twoDaysFull}/E`] = `${twoDaysWeek}, evening (4pm-8pm)`
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
      type: this.getType({}),
      value: {}
    };

    this.submitForm = this.submitForm.bind(this)
    this.onChange = this.onChange.bind(this)
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
      const twoDaysFull = twoDays.format(DATE_FORMAT_FULL)
      const twoDaysWeek = twoDays.format(DATE_FORMAT_DAY)

      const threeDays = moment(new Date())
        .add(3, "days")
      const threeDaysFull = threeDays.format(DATE_FORMAT_FULL)
      const threeDaysWeek = threeDays.format(DATE_FORMAT_DAY)
      
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
        result[`${twoDaysFull}/M`] = `${twoDaysWeek}, morning (9am-12pm)`
        result[`${twoDaysFull}/A`] = `${twoDaysWeek}, afernoon (12pm-4pm)`
        result[`${twoDaysFull}/E`] = `${twoDaysWeek}, evening (4pm-8pm)`
        result[`${threeDaysFull}/M`] = `${threeDaysWeek}, morning (9am-12pm)`
        result[`${threeDaysFull}/A`] = `${threeDaysWeek}, afernoon (12pm-4pm)`
        result[`${threeDaysFull}/E`] = `${threeDaysWeek}, evening (4pm-8pm)`
      } else if(pickUpDay == 'TM') {
        const fourDays = moment(new Date())
          .add(4, "days")
        const fourDaysFull = fourDays.format(DATE_FORMAT_FULL)
        const fourDaysWeek = fourDays.format(DATE_FORMAT_DAY)

        if(pickUpTime == 'M') {
          result[`${twoDaysFull}/M`] = `${twoDaysWeek}, morning (9am-12pm)`
          result[`${twoDaysFull}/A`] = `${twoDaysWeek}, afernoon (12pm-4pm)`
          result[`${twoDaysFull}/E`] = `${twoDaysWeek}, evening (4pm-8pm)`
        } else if(pickUpTime == 'A') {
          result[`${twoDaysFull}/A`] = `${twoDaysWeek}, afernoon (12pm-4pm)`
          result[`${twoDaysFull}/E`] = `${twoDaysWeek}, evening (4pm-8pm)`
        } else if(pickUpTime == 'E') {
          result[`${twoDaysFull}/E`] = `${twoDaysWeek}, evening (4pm-8pm)`
        }
        result[`${threeDaysFull}/M`] = `${threeDaysWeek}, morning (9am-12pm)`
        result[`${threeDaysFull}/A`] = `${threeDaysWeek}, afernoon (12pm-4pm)`
        result[`${threeDaysFull}/E`] = `${threeDaysWeek}, evening (4pm-8pm)`
        result[`${fourDaysFull}/M`] = `${fourDaysWeek}, morning (9am-12pm)`
        result[`${fourDaysFull}/A`] = `${fourDaysWeek}, afernoon (12pm-4pm)`
        result[`${fourDaysFull}/E`] = `${fourDaysWeek}, evening (4pm-8pm)`
      } else {
        const oneDayFromDate = moment(pickUpDay)
          .add(1, "days")
          .format(DATE_FORMAT);
        const oneDayFromDateFull = oneDayFromDate.format(DATE_FORMAT_FULL)
        const oneDayFromDateWeek = oneDayFromDate.format(DATE_FORMAT_DAY)

        const twoDaysFromDate = moment(pickUpDay)
          .add(2, "days")
          .format(DATE_FORMAT);
        const twoDaysFromDateFull = twoDaysFromDate.format(DATE_FORMAT_FULL)
        const twoDaysFromDateWeek = twoDaysFromDate.format(DATE_FORMAT_DAY)

        const threeDaysFromDate = moment(pickUpDay)
          .add(3, "days")
          .format(DATE_FORMAT);
        const threeDaysFromDateFull = threeDaysFromDate.format(DATE_FORMAT_FULL)
        const threeDaysFromDateWeek = threeDaysFromDate.format(DATE_FORMAT_DAY)

        if(pickUpTime == 'M') {
          result[`${oneDayFromDateFull}/M`] = `${oneDayFromDateWeek}, morning (9am-12pm)`
          result[`${oneDayFromDateFull}/A`] = `${oneDayFromDateWeek}, afernoon (12pm-4pm)`
          result[`${oneDayFromDateFull}/E`] = `${oneDayFromDateWeek}, evening (4pm-8pm)`
        } else if(pickUpTime == 'A') {
          result[`${oneDayFromDateFull}/A`] = `${oneDayFromDateWeek}, afernoon (12pm-4pm)`
          result[`${oneDayFromDateFull}/E`] = `${oneDayFromDateWeek}, evening (4pm-8pm)`
        } else if(pickUpTime == 'E') {
          result[`${oneDayFromDateFull}/E`] = `${oneDayFromDateWeek}, evening (4pm-8pm)`
        }

        result[`${twoDaysFromDateFull}/M`] = `${twoDaysFromDateWeek}, morning (9am-12pm)`
        result[`${twoDaysFromDateFull}/A`] = `${twoDaysFromDateWeek}, afernoon (12pm-4pm)`
        result[`${twoDaysFromDateFull}/E`] = `${twoDaysFromDateWeek}, evening (4pm-8pm)`

        result[`${threeDaysFromDateFull}/M`] = `${threeDaysFromDateWeek}, morning (9am-12pm)`
        result[`${threeDaysFromDateFull}/A`] = `${threeDaysFromDateWeek}, afernoon (12pm-4pm)`
        result[`${threeDaysFromDateFull}/E`] = `${threeDaysFromDateWeek}, evening (4pm-8pm)`
      }
    }
    const deliverType = t.enums(result);
    const pickupType = this.getPickupBasedOnTime()
    const Order = t.struct({
      pickup: pickupType,
      deliver: deliverType,
      address: t.String,
      phone: t.Number,
      email: t.String
    });
    return Order
  }

  getPickupBasedOnTime() {
    const hour = new Date().getHours()
    const result = {}
    if(hour<19) {
      if(hour<15){
        if(hour<11) {
          result['TD/M'] = 'Today, morning (9am-12pm)'
        }
        result['TD/A'] = 'Today, afternoon (12pm-4pm)'
      }
      result['TD/E'] = 'Today, evening (4pm-8pm)'
    }
    result['TM/M'] = 'Tomorrow, morning (9am-12pm)'
    result['TM/A'] = 'Tomorrow, afternoon (12pm-4pm)'
    result['TM/E'] = 'Tomorrow, evening (4pm-8pm)'
    return t.enums({...result, ...get2DaysOption()})
  }

  submitForm() {
    const { navigation } = this.props;
    const formValue = this.refs.form.getValue()
    if(!formValue) return
    const laundry = navigation.getParam('laundry', 'NO-LAUNDRY');
    const pickup = this.formatDate(formValue.pickup)
    const deliver = this.formatDate(formValue.deliver)
    const result = Object.assign({}, formValue, {laundry, pickup, deliver})
    
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

  formatDate(date){
    const [dateDay, dateTime] = date.split('/')
    let formattedDay = ''
    if(dateDay == 'TD') {
      const today = moment(new Date())
        .format(DATE_FORMAT_FULL);
      formattedDay = today
    } else if (dateDay == 'TM') {
      const tomorrow = moment(new Date())
        .add(1, 'days')
        .format(DATE_FORMAT_FULL);
      formattedDay = tomorrow
    } else {
      formattedDay = dateDay
    }

    let formattedTime = ''

    if(dateTime == 'M') {
      formattedTime = 'before 12pm'
    } else if(dateTime == 'A') {
      formattedTime = 'before 4pm'
    } else {
      formattedTime = 'before 8pm'
    }

    return `${formattedDay} ${formattedTime}`
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
