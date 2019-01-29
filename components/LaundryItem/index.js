import React from "react";
import { View, TouchableHighlight, StyleSheet, Image } from "react-native";
import { Rating } from 'react-native-elements'
import PropTypes from "prop-types";

import localeStore from "../../localization/localeStore"
import StyledText from '../StyledText'
import Button from '../Button'

import colors from '../../config/colors'

import { Localization } from 'expo-localization';

const LaundryItem = ({ item, onPress, navigation }) => {
  let containerStyle = styles.container
  let informationStyle = {}
  if(Localization.locale == 'ar') {
    containerStyle = styles.containerRTL
    informationStyle = styles.informationRTL
  }
  const {navigate} = navigation
  return (
  <TouchableHighlight onPress={onPress} underlayColor={colors.$border}>
    <View style={containerStyle}>
      <View style={informationStyle}>
        <StyledText fontFamily='Helvetica' size='h6' style={styles.title}>{item.name}</StyledText>
        <View style={styles.rating}>
          <Rating
            readonly
            startingValue={item.reviews.rating}
            imageSize={15}
          />
          <StyledText fontFamily='Helvetica' style={[styles.contentText, styles.ratingText]}>
            ({item.reviews.count} {localeStore.t('laundryReview')})
          </StyledText>
        </View>
        <View style={styles.details}>
          <StyledText fontFamily='Helvetica' size='small' style={styles.contentText}>
            {localeStore.t('laundryPrice')} 
            {'$'.repeat(item.pricing)}
            <StyledText fontFamily='Helvetica' size='small' style={[styles.contentText, styles.lightDollarSigns]}>
              {'$'.repeat(3-item.pricing)}
            </StyledText>
          </StyledText>
          <StyledText fontFamily='Helvetica' size='small' style={styles.contentText}>
            {localeStore.t('laundryMinimumOrder')} {item.minimumOrder}
          </StyledText>
        </View>
      </View>
      <View style= {styles.imageContainer}>
        <Image style={styles.image} source={{uri: item.image}}/>
        <Button text='View Prices' variant='secondary' style={styles.button} 
          onPress={() => navigate('LaundryPrices', {id: item.id, name: item.name})}/>
      </View>
    </View>
  </TouchableHighlight>
  
)};

LaundryItem.propTypes = {
  item: PropTypes.object,
  navigation: PropTypes.object,
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
  title: {
    color: colors.$darkerGrey
  },
  contentText: {
    color: colors.$primaryGrey
  },
  informationRTL: {
    marginLeft: 10
  },
  rating: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  ratingText: {
    marginLeft: 10
  },
  details: {
    marginTop: 10,
  },
  lightDollarSigns: {
    color: colors.$lighterGrey
  },
  image: {
    height: 75,
    width: 75,
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 5,
    margin: 0,
    marginTop: 2
  }
});

export default LaundryItem;
