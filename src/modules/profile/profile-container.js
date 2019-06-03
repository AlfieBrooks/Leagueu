import React from 'react';
import {
  StyleSheet, StatusBar, Text, View
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';

import colourUtils from '../../utils/styles/colours';
import { fetchRankedData } from './actions/ranked-actions';
import { ProfileHeader } from './header/profile-header';
import { RankedInfo } from './ranked-info/ranked-info';
import regionMapping from '../../utils/region-mapping';

class Profile extends React.Component {
  componentDidMount() {
    const { fetchRankedDataAction, summonerId } = this.props;
    fetchRankedDataAction(regionMapping.EUW, summonerId);
  }

  renderLoading = () => (
    <SafeAreaView style={styles.container}>
      <Text>Loading...</Text>
    </SafeAreaView>
  )

  renderPage() {
    const {
      summonerName,
      profileIconURL,
      summonerLevel,
      ranks
    } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ProfileHeader
          summonerName={summonerName}
          profileIconURL={profileIconURL}
          summonerLevel={summonerLevel}
        />
        <View style={styles.rankedContainer}>
          { ranks && ranks.map(rank => (
            <RankedInfo
              key={rank.queueType}
              queueType={rank.queueType}
              wins={rank.wins}
              losses={rank.losses}
              winRatio={rank.winRatio}
              rank={rank.rank}
              tier={rank.tier}
              leaguePoints={rank.leaguePoints}
            />
          ))
          }
        </View>
      </SafeAreaView>
    );
  }

  render() {
    const { searchLoading } = this.props;
    return searchLoading ? this.renderLoading() : this.renderPage();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: colourUtils.linkWater,
  },
  rankedContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  }
});

const mapStateToProps = (state) => {
  const { searchReducer, rankedReducer } = state;
  return {
    summonerName: searchReducer.summonerName,
    summonerId: searchReducer.summonerId,
    profileIconURL: searchReducer.profileIconURL,
    summonerLevel: searchReducer.summonerLevel,
    searchLoading: searchReducer.loading,
    ranks: rankedReducer.ranks
  };
};

export default connect(mapStateToProps, {
  fetchRankedDataAction: fetchRankedData
})(Profile);
