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
    let family = 'Antipasto'
    let localeStyle = {}
    let fontSize = this.props.style ? this.props.style.fontSize : undefined;
    if(Localization.locale == 'ar'){
      localeStyle = {
        writingDirection: 'rtl'
      }
      family = 'Geezapro'
      if(fontSize) {
        localeStyle.fontSize = fontSize - 10;
      }
    }
    return (
      <Text style={[this.props.style, fontMaker({ family, weight }), localeStyle]}>
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