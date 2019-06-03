import React from 'react';
import {
  StyleSheet, Text, View
} from 'react-native';

import colourUtils from '../../../utils/styles/colours';
import rankedQueueTypes from '../../../utils/ranked-queue-type';

export const RankedInfo = ({
  queueType,
  wins,
  losses,
  winRatio,
  rank,
  tier,
  leaguePoints,
}) => (
  <View style={styles.container}>
    <Text style={styles.summonerNameText}>{rankedQueueTypes[queueType]}</Text>
    <Text style={styles.summonerNameText}>{`${wins} Wins`}</Text>
    <Text style={styles.summonerNameText}>{`${losses} Losses`}</Text>
    <Text style={styles.summonerNameText}>{`${winRatio}% Win Rate`}</Text>
    <Text style={styles.summonerNameText}>{`${tier} ${rank}`}</Text>
    <Text style={styles.summonerNameText}>{`${leaguePoints} LP`}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: colourUtils.linkWater,
  },
  summonerLevelText: {
    color: colourUtils.apple,
  },
});

export default RankedInfo;
