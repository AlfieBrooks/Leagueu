import React from 'react';
import {
  StyleSheet, Text, StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { connect } from 'react-redux';

import { Logo } from '../logo/logo';
import colourUtils from '../../utils/styles/colours';

class Profile extends React.Component {
  componentDidMount() {

  }

  render() {
    const { summonerName } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Logo />
        <Text>{summonerName}</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colourUtils.linkWater,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  }
});

const mapStateToProps = state => ({
  summonerName: state.searchReducer.summonerName
});

export default connect(mapStateToProps)(Profile);
