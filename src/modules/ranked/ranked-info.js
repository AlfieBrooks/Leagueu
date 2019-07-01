import React from 'react';
import {
  StyleSheet, Text, View, Image
} from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import PercentageCircle from 'react-native-percentage-circle';
import { Icon } from 'react-native-elements';

import colourUtils from '../../utils/styles/colours';
import rankedColours from '../../utils/styles/ranked-colours';
import rankedQueueTypes from '../../utils/constants/ranked-queue-type';
import rankedTypes from '../../utils/constants/ranked-types';

const isHighRank = tier => tier === rankedTypes.MASTER
|| tier === rankedTypes.GRANDMASTER
|| tier === rankedTypes.CHALLENGER;

const getPercentage = (tier, leaguePoints) => {
  if (isHighRank(tier)) {
    return 100;
  }
  return leaguePoints;
};

const getFilteredRank = (tier, rank) => {
  if (isHighRank(tier)) {
    return '';
  }
  return ` ${rank}`;
};

export const RankedInfo = ({
  queueType,
  wins,
  losses,
  winRatio,
  rank,
  tier,
  leaguePoints,
  miniSeries,
  rankIcon,
}) => {
  const miniSeriesMap = {
    W: {
      name: 'check-circle',
      colour: colourUtils.green,
    },
    L: {
      name: 'times-circle',
      colour: colourUtils.red,
    },
    N: {
      name: 'circle-thin',
      colour: colourUtils.gray,
    },
  };

  return (
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
      <Text style={styles.text}>{`${tier}${getFilteredRank(tier, rank)} (${leaguePoints} LP)`}</Text>
      { miniSeries && (
        <View style={styles.miniSeriesContainer}>
          { miniSeries.map((item, index) => (
            <Icon
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              name={miniSeriesMap[item].name}
              type="font-awesome"
              size={20}
              color={miniSeriesMap[item].colour}
              iconStyle={styles.miniSeriesIcon}
            />
          ))}
        </View>
      )}
      <Text style={styles.text}>{`${wins}W / ${losses}L`}</Text>
      <Text style={styles.text}>{`${winRatio}% Win Rate`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: colourUtils.linkWater,
  },
  percentageCircleContainer: {
    marginBottom: 10
  },
  fadeImage: {
    backgroundColor: colourUtils.linkWater,
  },
  image: {
    height: 110,
    width: 110,
  },
  miniSeriesContainer: {
    flexDirection: 'row',
  },
  miniSeriesIcon: {
    margin: 1,
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
