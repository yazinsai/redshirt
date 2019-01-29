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
  let informationStyle = {}
  if(Localization.locale == 'ar') {
    informationStyle = styles.informationRTL
  }
  const {navigate} = navigation
  return (
  <TouchableHighlight onPress={onPress} underlayColor={colors.$border}>
    <View style={styles.container}>
      <View style={informationStyle}>
        <StyledText fontFamily='Helvetica' size='h6'>{item.name}</StyledText>
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
          <StyledText fontFamily='Helvetica' size='small'>
            {localeStore.t('laundryPrice')} 
            {'$'.repeat(item.pricing)}
            <StyledText fontFamily='Helvetica' size='small' style={styles.lightDollarSigns}>
              {'$'.repeat(3-item.pricing)}
            </StyledText>
          </StyledText>
          <StyledText fontFamily='Helvetica' size='small'>{localeStore.t('laundryMinimumOrder')} {item.minimumOrder}</StyledText>
        </View>
      </View>
      <View style= {styles.imageContainer}>
        <Image style={styles.image} source={{uri: item.image}}/>
        <Button text={localeStore.t('laundryViewPrices')} variant='secondary' style={styles.button} 
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
    color: colors.$lightestGrey
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
