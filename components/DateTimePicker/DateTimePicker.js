import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, Picker, View } from "react-native";
import moment from "moment";

import styles from "./styles";

/**
 * Props:
 * - startDate: Earliest date that can be selected (Optional, but becomes
 *              required if startTime is specified; default = Today)
 * - startTime: Earliest time on "startDate" that can be selected (Optional)
 *
 * Example usage:
 *
 *  <DateTimePicker />
 *  <DateTimePicker startDate="2019-01-01" />
 *  <DateTimePicker startDate="2019-01-02" startTime={12} />
 *
 */

const NUM_DAYS_TO_SHOW = 7;
const GMT_OFFSET = 3; // We're GMT + 3
const times = [
  { value: 12, label: "Morning (9am to 12pm)" },
  { value: 16, label: "Afternoon (12pm to 4pm)" },
  { value: 20, label: "Evening (4pm to 8pm)" }
];

class DateTimePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      availableDates: [],
      availableTimes: [],
      selectedDate: null,
      selectedTime: null
    };
  }

  componentDidMount() {
    this.reloadDates();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.startDate !== this.props.startDate) {
      this.reloadDates();
    }
    if (prevProps.startTime !== this.props.startTime) {
      this.reloadTimes();
    }
  }

  onChange() {
    // Bubbles up to the prop
    if (this.props.onChange) {
      this.props.onChange({
        date: this.state.selectedDate,
        time: this.state.selectedTime
      });
    }
  }

  reloadDates() {
    const startTime = this.props.startDate || Date.now();
    let dates = [];

    // Load date entries
    const startDate = moment(startTime).startOf("day");
    for (i = 0; i < NUM_DAYS_TO_SHOW; i++) {
      let newDate = moment(startDate)
        .add(i, "days")
        .format("YYYY-MM-DD");
      dates.push(newDate);
    }

    // Update our state
    const selectedDate = this.state.selectedDate || dates[0];
    this.setState(
      {
        availableDates: dates,
        selectedDate: selectedDate
      },
      // Load the times after the default date selection completes
      () => this.reloadTimes()
    );
  }

  reloadTimes() {
    let nowHours = new Date().getUTCHours() + GMT_OFFSET;
    let availableTimes = times.map(time => time.value);

    // Filter slots that are < 1 hour away from expiring
    if (moment(this.state.selectedDate).isSame(moment(), "day")) {
      availableTimes = availableTimes.filter(time => nowHours + 1 < time);
    }

    // Filter slots before startTime on startDate
    if (
      this.props.startTime &&
      this.props.startDate &&
      moment(this.props.startDate).isSame(
        moment(this.state.selectedDate),
        "day"
      )
    ) {
      availableTimes = availableTimes.filter(
        time => time >= this.props.startTime
      );
    }

    // Update state
    const selectedTime = this.state.selectedTime || availableTimes[0] || null;
    this.setState({
      availableTimes,
      selectedTime
    });
  }

  formatDateForDisplay(strDate) {
    const now = moment().startOf("day");
    const later = moment(strDate);

    const diffInDays = later.diff(now, "days");
    if (diffInDays == 0) {
      return "Today";
    } else if (diffInDays == 1) {
      return "Tomorrow";
    } else {
      return later.format("dddd, MMM Do");
    }
  }

  formatTimeForDisplay(intTime) {
    return times.find(elem => elem.value == intTime).label;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Pickup </Text>
        <Picker
          selectedValue={this.state.selectedDate}
          onValueChange={itemValue => {
            this.setState({ selectedDate: itemValue }, () => {
              this.onChange();
              this.reloadTimes();
            });
          }}
        >
          {this.state.availableDates.map(date => {
            return (
              <Picker.Item
                label={this.formatDateForDisplay(date)}
                value={date}
                key={date}
              />
            );
          })}
        </Picker>
        <Picker
          selectedValue={this.state.selectedTime}
          onValueChange={itemValue =>
            this.setState({ selectedTime: itemValue }, () => this.onChange())
          }
        >
          {this.state.availableTimes.map(time => {
            return (
              <Picker.Item
                label={this.formatTimeForDisplay(time)}
                value={time}
                key={time}
              />
            );
          })}
        </Picker>
      </View>
    );
  }
}

DateTimePicker.propTypes = {
  startDate: PropTypes.string,
  startTime: PropTypes.number,
  onChange: PropTypes.func
};

export default DateTimePicker;
