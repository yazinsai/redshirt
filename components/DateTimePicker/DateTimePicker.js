import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, Picker, View } from "react-native";
import moment from "moment";

import styles from "./styles";

const NUM_DAYS_TO_SHOW = 7;
const GMT_OFFSET = 3; // We're GMT + 3

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
    const times = [
      { value: 12, label: "Morning (9am to 12pm)" },
      { value: 16, label: "Afternoon (12pm to 4pm)" },
      { value: 20, label: "Evening (4pm to 8pm)" }
    ];

    let nowHours = new Date().getUTCHours() + GMT_OFFSET;
    let availableTimes = [...times];

    // Filter slots that are < 1 hour away from expiring
    if (moment(this.state.selectedDate).isSame(moment(), "day")) {
      availableTimes = times.filter(time => nowHours + 1 < time.value);
    }

    // Filter slots before our startDate / startTime
    if (
      this.props.startTime &&
      this.props.startDate &&
      moment(this.props.startDate).isSame(moment(), "day")
    ) {
      availableTimes = availableTimes.filter(time => {
        time.value > this.props.startTime;
      });
    }

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
            this.setState({ selectedTime: itemValue })
          }
        >
          {this.state.availableTimes.map(({ value, label }) => {
            return <Picker.Item label={label} value={value} key={value} />;
          })}
        </Picker>
      </View>
    );
  }
}

DateTimePicker.propTypes = {
  startDate: PropTypes.string
};

export default DateTimePicker;
