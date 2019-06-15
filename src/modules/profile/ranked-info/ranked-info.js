import React from 'react';
import {
  StyleSheet, Text, View, Image
} from 'react-native';
import FadeIn from 'react-native-fade-in-image';

import colourUtils from '../../../utils/styles/colours';
import rankedQueueTypes from '../../../utils/constants/ranked-queue-type';

export const RankedInfo = ({
  queueType,
  wins,
  losses,
  winRatio,
  rank,
  tier,
  leaguePoints,
  rankIcon,
}) => (
  <View style={styles.container}>
    <FadeIn placeholderStyle={styles.fadeImage}>
      <Image
        style={styles.image}
        source={{ uri: rankIcon }}
      />
    </FadeIn>
    <Text style={styles.title}>{rankedQueueTypes[queueType]}</Text>
    <Text style={styles.text}>{`${tier} ${rank} (${leaguePoints} LP)`}</Text>
    <Text style={styles.text}>{`${wins}W / ${losses}L`}</Text>
    <Text style={styles.text}>{`${winRatio}% Win Rate`}</Text>
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

export default RankedInfo;
