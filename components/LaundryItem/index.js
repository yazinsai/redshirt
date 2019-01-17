import React from "react";
import { Text, View, TouchableHighlight, StyleSheet, Image } from "react-native";
import { Card, Rating } from 'react-native-elements'
import PropTypes from "prop-types";
import colors from "../../config/colors";

const LaundryItem = ({ item, onPress }) => (
  <TouchableHighlight onPress={onPress} underlayColor={colors.$border}>
    <View style={styles.container}>
      <View styles={styles.information}>
        <Text style={styles.text}>{item.name}</Text>
        <View style={styles.rating}>
          <Rating
            readonly
            startingValue={item.reviews.rating}
            imageSize={15}
            
          />
          <Text style={styles.ratingText}>
          ({item.reviews.count} reviews)
          </Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.detailsText}>Price: {'$'.repeat(item.pricing)}</Text>
          <Text style={styles.detailsText}>Minimum Order: {item.minimumOrder}</Text>
        </View>
      </View>
      <View style= {styles.imageContainer}>
        <Image style={styles.image} source={{uri: item.image}}/>
      </View>
    </View>
  </TouchableHighlight>
  
);

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
