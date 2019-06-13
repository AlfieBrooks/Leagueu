import React from 'react';
import {
  StyleSheet, Text, View, Image
} from 'react-native';

import colourUtils from '../../../utils/styles/colours';
import rankTypes from '../../../utils/constants/rank-types';

export const UnrankedRankedInfo = ({ queueType }) => (
  <View style={styles.container}>
    <Image
      style={styles.image}
      source={{ uri: 'https://s3-us-west-2.amazonaws.com/blitz-client-static-all/ranks/default.png' }}
    />
    <Text style={styles.title}>{queueType}</Text>
    <Text style={styles.text}>{rankTypes.UNRANKED}</Text>
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
    width: 150,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: colourUtils.apple,
  },
  text: {
    color: colourUtils.apple,
  }
});

export default UnrankedRankedInfo;