import React from 'react';
import {
  StyleSheet, Text, View, Image
} from 'react-native';
import FadeIn from 'react-native-fade-in-image';

import colourUtils from '../../utils/styles/colours';

export const ChampionInfo = ({
  championLevel,
  championPoints,
  championName,
  championImg,
}) => (
  <View style={styles.container}>
    <FadeIn placeholderStyle={styles.fadeImage}>
      <Image
        style={styles.image}
        source={{ uri: championImg }}
        resizeMode="contain"
      />
    </FadeIn>
    <Text style={styles.title}>{`${championName}`}</Text>
    <Text style={styles.text}>{`Level ${championLevel}`}</Text>
    <Text style={styles.text}>{`${championPoints} pts`}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 40,
    backgroundColor: colourUtils.seaBlue,
  },
  fadeImage: {
    backgroundColor: colourUtils.seaBlue,
  },
  image: {
    borderRadius: 35,
    height: 70,
    width: 70,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: colourUtils.white,
  },
  text: {
    color: colourUtils.linkWater,
  },
});

export default ChampionInfo;
