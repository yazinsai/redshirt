import React, { Component } from "react";
import { Picker } from "react-native";

class Temp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      selectedItem: null
    };

    setTimeout(() => this.loadItems(), 1000);
    setTimeout(() => this.clearItems(), 5000);
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  componentDidUpdate(prepProps, prevState) {
    console.log(
      "componentDidUpdate",
      prevState.selectedItem,
      this.state.selectedItem
    );

    if (!this.state.selectedItem && this.state.items.length) {
      // Fix bug with React where onChange isn't triggered when
      // we load items into the Picker following an empty state
      this.onValueChange(this.state.items[0].value);
    } else if (!this.state.items.length && this.state.selectedItem) {
      // ..and where onChange isn't triggered when the list is
      // cleared and no item is selected
      this.onValueChange(null);
    }
  }

  onValueChange(newValue) {
    console.log(`  onValueChange(${newValue})`);
    this.setState({
      selectedItem: newValue
    });
  }

  loadItems() {
    this.setState(
      {
        items: [
          { label: "Morning", value: "1" },
          { label: "Afternoon", value: "2" },
          { label: "Evening", value: "3" }
        ]
      },
      () => console.log("loadItems: setState() completed")
    );
  }

  clearItems() {
    console.log("clearItems");
    this.setState({ items: [] });
  }

  render() {
    return (
      <Picker
        selectedValue={this.state.selectedItem}
        onValueChange={val => this.onValueChange(val)}
      >
        {this.state.items.map(item => {
          return (
            <Picker.Item
              label={item.label}
              value={item.value}
              key={item.value}
            />
          );
        })}
      </Picker>
    );
  }
}

export default Temp;
