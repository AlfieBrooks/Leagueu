import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import logoSrc from '../../../assets/logo.png';

export const Logo = () => (
  <View style={styles.container}>
    <Image
      style={styles.logo}
      source={logoSrc}
    />
  </View>
);

const styles = StyleSheet.create({
  logo: {
    height: 80,
    width: 280,
    padding: 10,
  }
});

export default Logo;
