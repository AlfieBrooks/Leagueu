import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';

import colourUtils from '../../utils/styles/colours';

export const FavouritesList = ({ favourites, handleFavouriteClick }) => (
  <View style={styles.favouritesContainer}>
    <Text style={styles.favouritesTitle}>Favourites:</Text>
    { favourites.map(favourite => (
      <ListItem
        Component={TouchableScale}
        friction={90}
        tension={100}
        activeScale={0.95}
        style={styles.listItem}
        key={favourite.summonerId}
        title={favourite.summonerName}
        onPress={() => handleFavouriteClick(favourite.summonerName)}
        leftAvatar={{ source: { uri: favourite.profileIconURL } }}
        chevron
      />
    ))
    }
  </View>
);

const styles = StyleSheet.create({
  favouritesTitle: {
    color: colourUtils.apple,
    fontSize: 18,
    marginBottom: 15
  },
  favouritesContainer: {
    width: 300
  },
  listItem: {
    marginBottom: 3
  }
});

export default FavouritesList;
