import React, {Component} from 'react'
import {Text, StyleSheet} from 'react-native'
import PropTypes from "prop-types";

import { Localization } from 'expo-localization';

import fontMaker from '../../util/fontMaker'

export class StyledText extends Component {
  componentWillMount() {
    this.locale = Localization.locale
    this.family = this.locale == 'ar' ? 'Geezapro' : 'Antipasto'
    this.localeStyle = {}
    if(this.locale == 'ar') {
      this.localeStyle = {
        writingDirection: 'rtl'
      }
    }
  }

  render() {
    const weight = this.props.weight ? this.props.weight : 'Regular'
    let sizeClass = this.props.size ? this.props.size : 'body'

    if(this.locale == 'ar'){
      sizeClass += 'AR'
    }

    return (
      <Text style={[this.props.style, fontMaker({ family: this.family, weight }), 
        this.localeStyle, styles[sizeClass]]}>
        {this.props.children}
      </Text>
    );
  }
}

StyledText.propTypes = {
  weight: PropTypes.string,
  style: PropTypes.any,
  size: PropTypes.string,
};

const styles = StyleSheet.create({
  body: {
    fontSize: 18
  },
  bodyAR: {
    fontSize: 16
  },
  h1: {
    fontSize: 150
  },
  h1AR: {
    fontSize: 140
  },
  h2: {
    fontSize: 72
  },
  h2AR: {
    fontSize: 60
  },
  h3: {
    fontSize: 54
  },
  h3AR: {
    fontSize: 48
  },
  h4: {
    fontSize: 32
  },
  h4AR: {
    fontSize: 28
  },
  h5: {
    fontSize: 24
  },
  h5AR: {
    fontSize: 21
  }
})

export default StyledText