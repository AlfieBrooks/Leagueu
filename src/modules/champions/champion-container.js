import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { Loading } from '../loading/loading';
import { ChampionInfo } from './champion-info';
import colourUtils from '../../utils/styles/colours';

const renderLoading = size => <Loading size={size} color={colourUtils.linkWater} />;

const renderChampions = (champions) => {
  if (!champions.length) {
    return <Text style={styles.noChampsText}>No Top Champions</Text>;
  }
  return (
    champions.map(champion => (
      <ChampionInfo
        key={champion.championId}
        championLevel={champion.championLevel}
        championPoints={champion.championPoints}
        championName={champion.championName}
        championImg={champion.championImg}
      />
    ))
  );
};

export const ChampionContainer = ({ champions, championsLoading }) => (
  <View style={styles.championContainer}>
    { championsLoading ? renderLoading() : renderChampions(champions) }
  </View>
);

const styles = StyleSheet.create({
  championContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colourUtils.seaBlue,
  },
  noChampsText: {
    textAlign: 'center',
    color: colourUtils.linkWater,
  }
});

export default ChampionContainer;
