import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { Localization } from "expo-localization";
import fontMaker from "../../util/fontMaker";

const FONT_AR = "Geezapro";
const FONT_EN = "Antipasto";

export class StyledText extends Component {
  componentWillMount() {
    this.family = Localization.locale.startsWith("ar") ? FONT_AR : FONT_EN;
    this.localeStyle = { writingDirection: Localization.isRTL ? "rtl" : "ltr" };
  }

  render() {
    const weight = this.props.weight || "Regular";
    let sizeClass = (this.props.size || "body") + "_" + Localization.locale;
    let fontFamily = this.props.fontFamily || this.family;

    return (
      <Text
        {...this.props}
        style={[
          this.props.style,
          fontMaker({ family: fontFamily, weight }),
          this.localeStyle,
          styles[sizeClass]
        ]}
      >
        {this.props.children}
      </Text>
    );
  }
}

StyledText.propTypes = {
  weight: PropTypes.string,
  style: PropTypes.any,
  size: PropTypes.string
};

const styles = StyleSheet.create({
  body_en: {
    fontSize: 15
  },
  body_ar: {
    fontSize: 13
  },
  small_en: {
    fontSize: 10
  },
  small_ar: {
    fontSize: 8
  },
  h1_en: {
    fontSize: 150
  },
  h1_ar: {
    fontSize: 140
  },
  h2_en: {
    fontSize: 72
  },
  h2_ar: {
    fontSize: 60
  },
  h3_en: {
    fontSize: 54
  },
  h3_ar: {
    fontSize: 48
  },
  h4_en: {
    fontSize: 32
  },
  h4_ar: {
    fontSize: 28
  },
  h5_en: {
    fontSize: 24
  },
  h5_ar: {
    fontSize: 21
  },
  h6_en: {
    fontSize: 18
  },
  h6_ar: {
    fontSize: 18
  }
});

export default StyledText;