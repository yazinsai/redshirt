import React from "react";
import { Text, View, TouchableHighlight, StyleSheet, Image } from "react-native";
import { Card, Rating } from 'react-native-elements'
import PropTypes from "prop-types";
import colors from "../../config/colors";

import localeStore from "../../localization/localeStore"
import StyledText from '../StyledText'

import { Localization } from 'expo-localization';

const LaundryItem = ({ item, onPress }) => {
  let containerStyle = styles.container
  let informationStyle = {}
  if(Localization.locale == 'ar') {
    containerStyle = styles.containerRTL
    informationStyle = styles.informationRTL
  }
  return (
  <TouchableHighlight onPress={onPress} underlayColor={colors.$border}>
    <View style={containerStyle}>
      <View style={informationStyle}>
        <StyledText fontFamily='Helvetica' size='h6' style={styles.text}>{item.name}</StyledText>
        <View style={styles.rating}>
          <Rating
            readonly
            startingValue={item.reviews.rating}
            imageSize={15}
          />
          <StyledText fontFamily='Helvetica' style={styles.ratingText}>
          ({item.reviews.count} {localeStore.t('laundryReview')})
          </StyledText>
        </View>
        <View style={styles.details}>
          <StyledText fontFamily='Helvetica' size='small' style={styles.detailsText}>{localeStore.t('laundryPrice')} {'$'.repeat(item.pricing)}</StyledText>
          <StyledText fontFamily='Helvetica' size='small' style={styles.detailsText}>{localeStore.t('laundryMinimumOrder')} {item.minimumOrder}</StyledText>
        </View>
      </View>
      <View style= {styles.imageContainer}>
        <Image style={styles.image} source={{uri: item.image}}/>
      </View>
    </View>
  </TouchableHighlight>
  
)};

LaundryItem.propTypes = {
  item: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  containerRTL: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    padding: 10,
  },
  informationRTL: {
    marginLeft: 10
  },
  text: {
    fontSize: 18
  },
  rating: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  ratingText: {
    fontSize: 15,
    marginLeft: 10
  },
  details: {
    marginTop: 10,
  },
  detailsText: {
    fontSize: 10,
  },
  image: {
    height: 75,
    width: 75,
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center'
  }
});

export default LaundryItem;
