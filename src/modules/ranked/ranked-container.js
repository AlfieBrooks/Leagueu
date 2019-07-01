import React from 'react';
import { StyleSheet, View } from 'react-native';

import rankedUrlTypes from '../../utils/constants/ranked-url-types';
import { UnrankedRankedInfo } from './unranked-ranked-info';
import { RankedInfo } from './ranked-info';

export const RankedContainer = ({ rankedSolo, rankedFlexSR }) => (
  <View style={styles.rankedContainer}>
    {
      [rankedSolo, rankedFlexSR].map((rank) => {
        if (rank.tier === rankedUrlTypes.UNRANKED) {
          return (
            <UnrankedRankedInfo
              key={rank.queueType}
              queueType={rank.queueType}
              rankIcon={rank.rankIcon}
            />
          );
        }
        return (
          <RankedInfo
            key={rank.queueType}
            queueType={rank.queueType}
            wins={rank.wins}
            losses={rank.losses}
            winRatio={rank.winRatio}
            rank={rank.rank}
            tier={rank.tier}
            leaguePoints={rank.leaguePoints}
            miniSeries={rank.miniSeries}
            rankIcon={rank.rankIcon}
          />
        );
      })
    }
  </View>
);

const styles = StyleSheet.create({
  rankedContainer: {
    flexDirection: 'row',
  },
});

export default RankedContainer;
