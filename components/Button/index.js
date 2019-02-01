import React, { Component } from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import PropTypes from "prop-types";
import StyledText from '../StyledText'
import colors from '../../config/colors';

export class Button extends Component {
  render() {
    let variantButton;
    let variantText;
    if(this.props.variant == 'primary'){
      variantButton = styles.btnPrimary
      variantText = styles.textPrimary
    } else if(this.props.variant == 'secondary') {
      variantButton = styles.btnSecondary
      variantText = styles.textSecondary
    } else if(this.props.variant == 'white') {
      variantButton = styles.btnWhite
      variantText = styles.textWhite
    }
    return (
      <TouchableOpacity style={[styles.button, variantButton, this.props.style]} onPress={this.props.onPress}>
        <StyledText size='h6' fontFamily='Helvetica' style={[styles.btnText, variantText]}>{this.props.text}</StyledText>
      </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    padding: 15,
    margin: 10
  },
  btnPrimary: {
    backgroundColor: colors.$primaryRed
  },
  btnSecondary: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.$black,
  },
  btnText: {
    textAlign: 'center',
  },
  textPrimary: {
    color: colors.$white
  },
  btnWhite: {
    backgroundColor: colors.$white,
  },
  textWhite: {
    color: colors.$black
  }
})

Button.propTypes = {
  variant: PropTypes.string,
  onPress: PropTypes.func,
  text: PropTypes.string,
  style: PropTypes.object
};

export default Button
