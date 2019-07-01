import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ChampionInfo } from './champion-info';

export const ChampionContainer = ({ champions }) => (
  <View style={styles.championContiner}>
    {
      champions.map(champion => (
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
  championContiner: {
    flexDirection: 'row',
  },
});

export default ChampionContainer;
