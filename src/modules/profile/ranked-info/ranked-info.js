import React from 'react';
import {
  StyleSheet, Text, View, Image
} from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import PercentageCircle from 'react-native-percentage-circle';

import colourUtils from '../../../utils/styles/colours';
import rankedColours from '../../../utils/styles/ranked-colours';
import rankedQueueTypes from '../../../utils/constants/ranked-queue-type';
import rankedTypes from '../../../utils/constants/ranked-types';

const getPercentage = (tier, leaguePoints) => {
  if (tier === rankedTypes.MASTER
    || tier === rankedTypes.GRANDMASTER
    || tier === rankedTypes.CHALLENGER) {
    return 100;
  }
  return leaguePoints;
};

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
    <View style={styles.percentageCircleContainer}>
      <PercentageCircle
        radius={70}
        borderWidth={4}
        percent={getPercentage(tier, leaguePoints)}
        color={rankedColours[tier]}
        bgcolor={colourUtils.linkWaterAlt}
        innerColor={colourUtils.linkWater}
      >
        <FadeIn placeholderStyle={styles.fadeImage}>
          <Image
            style={styles.image}
            source={{ uri: rankIcon }}
          />
        </FadeIn>
      </PercentageCircle>
    </View>
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
  percentageCircleContainer: {
    marginBottom: 15
  },
  fadeImage: {
    backgroundColor: colourUtils.linkWater,
  },
  image: {
    height: 110,
    width: 110,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: colourUtils.purple,
  },
  text: {
    color: colourUtils.purple,
  },
});

export default RankedInfo;
