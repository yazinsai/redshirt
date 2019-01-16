import React, {Component} from 'react'
import {Text} from 'react-native'

export class AntipastoText extends Component {
  render() {
    return (
      <Text style={[this.props.style,{fontWeight: "600", fontFamily: 'AntipastoPro'}]}>{this.props.children}</Text>
    );
  }
}

export default AntipastoText