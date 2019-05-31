import React from 'react';
import {
  StyleSheet, StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';

import colourUtils from '../../utils/styles/colours';
import { ProfileHeader } from './header/profile-header';

class Profile extends React.Component {
  componentDidMount() {

  }

  render() {
    const { summonerName, profileIconURL, summonerLevel } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ProfileHeader
          summonerName={summonerName}
          profileIconURL={profileIconURL}
          summonerLevel={summonerLevel}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colourUtils.linkWater,
  },
});

const mapStateToProps = state => ({
  ...state.searchReducer
});

export default connect(mapStateToProps)(Profile);
