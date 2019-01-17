import React from "react";
import {
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";
import moment from "moment";
let _ = require('lodash');

import t from 'tcomb-form-native';
import Button from '../components/Button'

const Form = t.form.Form;
const DATE_FORMAT = "YYYY-MM-DD";
const SEP = '|'

const SLOTS = [
  { label: "morning", start: 9, end: 12, display: "morning (9am - 12pm)" },
  { label: "afternoon", start: 12, end: 16, display: "afternoon (12pm - 4pm)"},
  { label: "evening", start: 16, end: 20, display: "evening (4pm - 8pm)" },
]
const NUM_DAYS_TO_SHOW = 4
const DISPLAY_DATE_FORMAT = "dddd Do,"

// Subtype that supports email address
const Email = t.refinement(t.String, email => {
  const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return reg.test(email);
});

const textareaStyle = _.cloneDeep(t.form.Form.stylesheet);
textareaStyle.textbox.normal.height = 72;
textareaStyle.textbox.normal.textAlignVertical = "top";

var options = {
  fields: {
    pickup: {
      label: 'When can we pick up your laundry?'
    },
    deliver: {
      label: 'When can we return your laundry?'
    },
    address: {
      label: 'What is your address?',
      stylesheet: textareaStyle, // overrides height
      multiline: true,
      numberOfLines: 2,
    },
    phone: {
      label: 'Your mobile number'
    },
    email: {
      label: 'Your email address (for your receipt)',
      keyboardType: 'email-address',
      autoCapitalize: 'none',
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
      value.deliver = ''
    }

    this.setState({ value, type });
  }

  getType(value) {
    const { navigation } = this.props
    const pickupRequired = navigation.getParam('pickupRequired', true)
    this.pickupRequired = pickupRequired
    
    const orderEnum = {}
    const TODAY = moment().format(DATE_FORMAT)
    
    if(this.pickupRequired) {
      const pickupValue = value.pickup
      let deliverySlots = {}

      if(pickupValue) {
        // Pickup slot selected
        const [pickupDay, slot] = pickupValue.split(SEP)
        const dropoffDay = moment(pickupDay).add(1, 'days').format(DATE_FORMAT)
        deliverySlots = this.getSlotsAfter(dropoffDay, parseInt(slot))
      } else {
        // No pickup slot selected; use current date/time
        deliverySlots = this.getSlotsAfter(TODAY)
      }

      orderEnum.pickup = t.enums(this.getSlotsAfter(TODAY))
      orderEnum.deliver = t.enums(deliverySlots);
    } else {
      // No pickup required

      // Add a single slot buffer for us to pickup then deliver
      nextSlot = this.hourToSlotIndex(moment().hours()) + 1
      orderEnum.deliver = t.enums(this.getSlotsAfter(TODAY, nextSlot))
    }
    
    return t.struct({
      ...orderEnum,
      address: t.String,
      phone: t.Number,
      email: Email
    });
  }

  getSlotsAfter(date, slot = null) {
    // Finds all slots available from date, after slot
    // If no slot is specified, finds slot based on current time
    const result = {}

    const startDate = moment(date).startOf('day')
    const startSlot = slot === null ? this.hourToSlotIndex(moment().hours()) : slot

    for (i = 0; i < NUM_DAYS_TO_SHOW; i++) {
      const dateLabel = moment(startDate).add(i, 'days').format(DATE_FORMAT)

      for (j = 0; j < SLOTS.length; j++) {
        // On startDate, show only slots after startSlot
        if (i == 0 && j < startSlot) continue;

        result[`${dateLabel}${SEP}${j}`] = this.humanDate(dateLabel) + " " + SLOTS[j].display
      }
    }

    return result;
  }

  humanDate(date) {
    // Converts a date into human readable format
    // @param date: String representing a Date in DATE_FORMAT format
    const today = moment().startOf("day")
    const futureDate = moment(date)

    const diffInDays = futureDate.diff(today, "days")
    if (diffInDays == 0) {
      return "Today,";
    } else if (diffInDays == 1) {
      return "Tomorrow,";
    } else {
      return futureDate.format(DISPLAY_DATE_FORMAT);
    }
  }

  hourToSlotIndex(hour) {
    // Finds the earliest available slot at "hour", or INFINITY
    // @param hour: Integer between 0 - 24 representing an hour
    for (i = 0; i < SLOTS.length; i++) {
      if (hour + 1 < SLOTS[i].end) return i;
    }
    return Infinity
  }

  submitForm() {
    const { navigation } = this.props;
    const formValue = this.refs.form.getValue()
    if(!formValue) return
    const laundry = navigation.getParam('laundry', 'NO-LAUNDRY');
    let pickup
    if(formValue.pickup) {
      pickup = this.formatDate(formValue.pickup)
    } else {
      pickup = 'NO PICKUP'
    }
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
    }).then(()=> {
      if(pickup == 'NO PICKUP') {
        navigation.navigate('Feedback', {meetingTime: deliver})
      } else {
        navigation.navigate('Feedback', {meetingTime: pickup})
      }
    })
  }

  formatDate(selectValue){
    const [date, slot] = selectValue.split(SEP)
    const slotIndex = parseInt(slot)

    return this.humanDate(date) + " " + SLOTS[slotIndex].display;
  }
  
  render() {
    const { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="position" enabled>
        <Form 
          ref="form"
          type={this.state.type} 
          value= {this.state.value}
          options={options}
          onChange={this.onChange}
          />
        <Button text='Place my order' variant='primary' onPress={this.submitForm}/>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
});

export default OrderDetails;
