import React from 'react';
import { StyleSheet, Image } from 'react-native';
import logoSrc from '../../../assets/logo.png';

export const Logo = () => (
  <Image
    style={styles.logo}
    source={logoSrc}
  />
);

const styles = StyleSheet.create({
  logo: {
    height: 80,
    width: 280,
    padding: 10,
    marginTop: 15
  }
});

export default Logo;
