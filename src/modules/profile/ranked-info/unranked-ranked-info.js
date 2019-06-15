import React from 'react';
import {
  StyleSheet, Text, View, Image
} from 'react-native';
import FadeIn from 'react-native-fade-in-image';

import colourUtils from '../../../utils/styles/colours';
import rankTypes from '../../../utils/constants/rank-types';

export const UnrankedRankedInfo = ({ queueType }) => (
  <View style={styles.container}>
    <FadeIn placeholderStyle={styles.fadeImage}>
      <Image
        style={styles.image}
        source={{ uri: 'https://s3-us-west-2.amazonaws.com/blitz-client-static-all/ranks/default.png' }}
      />
    </FadeIn>
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
  fadeImage: {
    backgroundColor: colourUtils.linkWater,
  },
  image: {
    height: 150,
    width: 150,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: colourUtils.limerick,
  },
  text: {
    color: colourUtils.apple,
  },
});

export default UnrankedRankedInfo;
