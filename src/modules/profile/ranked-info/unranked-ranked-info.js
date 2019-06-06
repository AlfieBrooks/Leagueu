import React from 'react';
import {
  StyleSheet, Text, View, Image
} from 'react-native';

import colourUtils from '../../../utils/styles/colours';
import rankedQueueTypes from '../../../utils/ranked-queue-type';

export const UnrankedRankedInfo = () => (
  <View style={styles.container}>
    <Image style={styles.image} source={{ uri: 'https://s3-us-west-2.amazonaws.com/blitz-client-static-all/ranks/default.png' }} />
    <Text style={styles.text}>{rankedQueueTypes.UNRANKED}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: colourUtils.linkWater,
  },
  image: {
    height: 150,
    width: 150
  },
  text: {
    color: colourUtils.apple,
  }
});

export default UnrankedRankedInfo;
