import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Loading } from '../loading/loading';
import { ChampionInfo } from './champion-info';
import colourUtils from '../../utils/styles/colours';

const renderLoading = size => <Loading size={size} color={colourUtils.linkWater} />;

export const ChampionContainer = ({ champions, championsLoading }) => (
  <View style={styles.championContainer}>
    { championsLoading ? renderLoading()
      : champions.map(champion => (
        <ChampionInfo
          key={champion.championId}
          championLevel={champion.championLevel}
          championPoints={champion.championPoints}
          championName={champion.championName}
          championImg={champion.championImg}
        />
      ))
    }
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
});

export default ChampionContainer;
