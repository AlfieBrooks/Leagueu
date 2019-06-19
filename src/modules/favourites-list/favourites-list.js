import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';

import colourUtils from '../../utils/styles/colours';

export const FavouritesList = ({ favourites, handleFavouriteClick }) => (
  <View style={styles.favouritesContainer}>
    <View style={styles.favouritesTitle}>
      <Icon
        name="star"
        type="font-awesome"
        size={20}
        color={colourUtils.purple}
      />
      <Text style={styles.favouritesText}>Favourites:</Text>
    </View>
    { favourites.map(favourite => (
      <ListItem
        Component={TouchableScale}
        friction={90}
        tension={100}
        activeScale={0.8}
        style={styles.listItem}
        key={favourite.summonerId}
        title={favourite.summonerName}
        titleStyle={styles.listItemTitle}
        clearButtonMode="always"
        onPress={() => handleFavouriteClick(favourite.region, favourite.summonerName)}
        leftAvatar={{ source: { uri: favourite.profileIconURL } }}
        chevron
      />
    ))
    }
  </View>
);

const styles = StyleSheet.create({
  favouritesTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },
  favouritesText: {
    color: colourUtils.purple,
    fontSize: 18,
    marginLeft: 5
  },
  favouritesContainer: {
    width: 300
  },
  listItem: {
    marginBottom: 3,
  },
  listItemTitle: {
    color: colourUtils.darkGray
  }
});

export default FavouritesList;
