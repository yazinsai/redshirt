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
const CUTOFF_BEFORE_SLOT_ENDS = 1; // Last order allowed 1 hr before slot ends
const DATE_FORMAT = "YYYY-MM-DD";

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

  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate", prevProps, prevState);
    // Handle state changes
    if (!this.state.selectedDate && this.state.availableDates.length) {
      // Fix bug with React where onChange isn't triggered when
      // we load items into the Picker following an empty state
      this.onChange({ date: this.state.availableDates[0].value });
    } else if (!this.state.availableDates.length && this.state.selectedDate) {
      // ..and where onChange isn't triggered when the list is
      // cleared and no item is selected
      this.onChange({ date: null });
    }

    if (!this.state.selectedTime && this.state.availableTimes.length) {
      // Fix bug with React where onChange isn't triggered when
      // we load items into the Picker following an empty state
      this.onChange({ time: this.state.availableTimes[0].value });
    } else if (!this.state.availableTimes.length && this.state.selectedTime) {
      // ..and where onChange isn't triggered when the list is
      // cleared and no item is selected
      this.onChange({ time: null });
    }

    // Handle prop changes
    if (prevProps.startDate !== this.props.startDate) {
      this.reloadDates();
    }
    if (prevProps.startTime !== this.props.startTime) {
      this.reloadTimes();
    }
  }

  onChange(newValue) {
    console.log("onChange", newValue);
    // Bubbles up to the prop
    if (this.props.onChange) {
      this.props.onChange({
        date: newValue.date || this.state.selectedDate,
        time: newValue.time || this.state.selectedTime
      });
    }
  }

  reloadDates() {
    let startDate;
    if (this.props.startDate) {
      startDate = moment(this.props.startDate);
    } else {
      startDate = moment()
        .add(this.isSlotsRemainingToday() ^ 1, "days")
        .startOf("day");
    }
    let dates = [];

    // Load date entries
    for (i = 0; i < NUM_DAYS_TO_SHOW; i++) {
      dates.push(startDate.add(i, "days")).format(DATE_FORMAT);
    }

    this.setState(
      { availableDates: dates },
      // Load the times after the default date selection completes
      () => this.reloadTimes()
    );
  }

  reloadTimes() {
    let nowHours = new Date().getUTCHours() + GMT_OFFSET;
    let availableTimes = times.map(time => time.value);

    // Filter slots that are < 1 hour away from expiring
    if (moment(this.state.selectedDate).isSame(moment(), "day")) {
      availableTimes = availableTimes.filter(
        time => nowHours + CUTOFF_BEFORE_SLOT_ENDS < time
      );
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

    if (availableTimes.length == 0) {
      // TODO: No slots left; do something
    }

    // Update state
    this.setState({ availableTimes });
  }

  isSlotsRemainingToday() {
    const lastSlotEnds = times.slice(-1)[0].value;
    const nowHours = new Date().getUTCHours() + GMT_OFFSET;

    return nowHours + CUTOFF_BEFORE_SLOT_ENDS < lastSlotEnds;
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
            this.setState({ selectedDate: itemValue }, () =>
              this.reloadTimes()
            );
            this.onChange({ date: itemValue });
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
          onValueChange={itemValue => {
            this.setState({ selectedTime: itemValue });
            this.onChange({ time: itemValue });
          }}
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
