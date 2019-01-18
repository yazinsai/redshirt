import React, {Component} from 'react'
import {Text, StyleSheet} from 'react-native'
import PropTypes from "prop-types";

import { Localization } from 'expo-localization';

import fontMaker from '../../util/fontMaker'

export class AntipastoText extends Component {
  render() {
    let weight = 'Regular'
    if(this.props.weight){
      weight = this.props.weight
    }
    this.locale = Localization.locale
    let localeStyle = {}
    if(Localization.locale == 'ar'){
      localeStyle = {
        writingDirection: 'rtl'
      }
    }
    return (
      <Text style={[this.props.style, fontMaker({ family: 'Antipasto', weight }), localeStyle]}>
        {this.props.children}
      </Text>
    );
  }
}

AntipastoText.propTypes = {
  weight: PropTypes.string,
  style: PropTypes.any
};

export default AntipastoText