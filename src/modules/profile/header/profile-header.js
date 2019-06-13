import React from 'react';
import {
  StyleSheet, Text, Image, View
} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import { Icon } from 'react-native-elements';

import colourUtils from '../../../utils/styles/colours';

export const ProfileHeader = ({
  summonerName,
  summonerLevel,
  profileIconURL,
  toggleFavourite,
  isAFavourite,
}) => (
  <View style={styles.container}>
    <View style={styles.backgroundContainer}>
      <Text style={styles.summonerNameText}>{summonerName}</Text>
      <Text style={styles.summonerLevelText}>
        {`Level: ${summonerLevel}`}
      </Text>
      <Icon
        Component={TouchableScale}
        friction={90}
        tension={100}
        activeScale={0.5}
        onPress={() => toggleFavourite()}
        name={isAFavourite ? 'star' : 'star-o'}
        type="font-awesome"
        size={36}
        color={colourUtils.limerick}
      />
      <Image
        style={styles.profileIcon}
        source={{ uri: profileIconURL }}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: 270,
    alignItems: 'stretch',
  },
  backgroundContainer: {
    maxHeight: 210,
    alignItems: 'center',
    backgroundColor: colourUtils.apple,
  },
  summonerNameText: {
    fontSize: 36,
    marginTop: 30,
    color: colourUtils.linkWater,
  },
  summonerLevelText: {
    marginBottom: 15,
    color: colourUtils.linkWater,
  },
  profileIcon: {
    borderRadius: 60,
    marginTop: 5,
    width: 120,
    height: 120,
  }
});

export default ProfileHeader;
