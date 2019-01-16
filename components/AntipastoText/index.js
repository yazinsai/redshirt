import React, {Component} from 'react'
import {Text} from 'react-native'

import fontMaker from '../../util/fontMaker'

export class AntipastoText extends Component {
  render() {
    let weight = 'Regular'
    if(this.props.weight){
      weight = this.props.weight
    }
    return (
      <Text style={[this.props.style, fontMaker({ family: 'Antipasto', weight })]}>
        {this.props.children}
      </Text>
    );
  }
}

export default AntipastoText