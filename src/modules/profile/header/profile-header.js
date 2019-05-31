import React from 'react';
import {
  StyleSheet, Text, Image, View
} from 'react-native';

import colourUtils from '../../../utils/styles/colours';

export const ProfileHeader = ({ summonerName, summonerLevel, profileIconURL }) => (
  <View style={styles.container}>
    <View style={styles.innerContainerLeft}>
      <Text style={styles.summonerNameText}>{summonerName}</Text>
      <Text style={styles.summonerLevelText}>
        {`Level: ${summonerLevel}`}
      </Text>
    </View>
    <Image
      style={styles.profileIcon}
      source={{ uri: profileIconURL }}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colourUtils.apple,
  },
  innerContainerLeft: {
    flex: 1,
    marginTop: 20,
    paddingLeft: 15
  },
  summonerNameText: {
    fontSize: 42,
    color: colourUtils.linkWater,
  },
  summonerLevelText: {
    color: colourUtils.linkWater,
  },
  profileIcon: {
    width: 100,
    height: 100,
  }
});

export default ProfileHeader;
