import React from 'react';
import {
  StyleSheet, StatusBar, View
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';

import colourUtils from '../../utils/styles/colours';
import regionMapping from '../../utils/region-mapping';
import { ProfileHeader } from './header/profile-header';
import { UnrankedRankedInfo } from './ranked-info/unranked-ranked-info';
import { RankedInfo } from './ranked-info/ranked-info';
import { fetchRankedData, clearRankedData } from './actions/ranked-actions';
import rankTypes from '../../utils/rank-types';

class Profile extends React.Component {
  componentDidMount() {
    const { fetchRankedDataAction, summonerId } = this.props;
    fetchRankedDataAction(regionMapping.EUW, summonerId);
  }

  componentWillUnmount() {
    const { clearRankedDataAction } = this.props;
    clearRankedDataAction();
  }

  render() {
    const {
      summonerName,
      profileIconURL,
      summonerLevel,
      rankedSolo,
      rankedFlex,
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
          { [rankedSolo, rankedFlex].map((rank) => {
            if (rank.tier === rankTypes.UNRANKED) {
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
                rankIcon={rank.rankIcon}
              />
            );
          })
        }
        </View>
      </SafeAreaView>
    );
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
    marginTop: 10,
  }
});

const mapStateToProps = (state) => {
  const { searchReducer, rankedReducer } = state;
  return {
    summonerName: searchReducer.summonerName,
    summonerId: searchReducer.summonerId,
    profileIconURL: searchReducer.profileIconURL,
    summonerLevel: searchReducer.summonerLevel,
    rankedSolo: rankedReducer.rankedSolo,
    rankedFlex: rankedReducer.rankedFlex,
  };
};

export default connect(mapStateToProps, {
  fetchRankedDataAction: fetchRankedData,
  clearRankedDataAction: clearRankedData
})(Profile);
