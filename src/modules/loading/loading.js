import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import colourUtils from '../../utils/styles/colours';

export const Loading = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colourUtils.linkWater,
  }
});

export default Loading;
