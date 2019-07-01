import React from 'react';
import {
  StyleSheet, Text, View, Image
} from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import PercentageCircle from 'react-native-percentage-circle';

import colourUtils from '../../utils/styles/colours';
import rankedUrlTypes from '../../utils/constants/ranked-url-types';

export const UnrankedRankedInfo = ({ queueType }) => (
  <View style={styles.container}>
    <View style={styles.percentageCircleContainer}>
      <PercentageCircle
        radius={70}
        borderWidth={4}
        percent={0}
        bgcolor={colourUtils.linkWaterAlt}
        innerColor={colourUtils.linkWater}
      >
        <FadeIn placeholderStyle={styles.fadeImage}>
          <Image
            style={styles.image}
            source={{ uri: 'https://s3-us-west-2.amazonaws.com/blitz-client-static-all/ranks/default.png' }}
          />
        </FadeIn>
      </PercentageCircle>
    </View>
    <Text style={styles.title}>{queueType}</Text>
    <Text style={styles.text}>{rankedUrlTypes.UNRANKED}</Text>
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

export default UnrankedRankedInfo;
