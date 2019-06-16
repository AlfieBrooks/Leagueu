import React from 'react';
import {
  StyleSheet, StatusBar, View
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';

import colourUtils from '../../utils/styles/colours';
import regionMapping from '../../utils/constants/region-mapping';
import rankTypes from '../../utils/constants/rank-types';
import { ProfileHeader } from '../profile-header/profile-header';
import { UnrankedRankedInfo } from './ranked-info/unranked-ranked-info';
import { RankedInfo } from './ranked-info/ranked-info';
import { fetchRankedData, clearRankedData } from './actions/ranked-actions';
import { addToFavourites, removeFromFavourites } from './actions/favourite-actions';
import errorAlert from '../../utils/alert-utils';

const MAX_FAVOURITES = 3;

class Profile extends React.Component {
  componentDidMount() {
    const { fetchRankedDataAction, summonerId } = this.props;
    fetchRankedDataAction(regionMapping.EUW, summonerId);
  }

  componentWillUnmount() {
    const { clearRankedDataAction } = this.props;
    clearRankedDataAction();
  }

  isAFavourite = (favourites, summonerId) => favourites && favourites.some(
    favourite => favourite.summonerId === summonerId
  );

  addSummonerToFavourites = () => {
    const {
      favourites,
      addToFavouritesAction,
      region,
      summonerName,
      summonerId,
      profileIconURL,
      summonerLevel,
    } = this.props;

    if (favourites.length + 1 > MAX_FAVOURITES) {
      errorAlert('You can only have a maximum of 3 favourites');
    } else {
      addToFavouritesAction({
        region,
        summonerName,
        summonerId,
        profileIconURL,
        summonerLevel,
      });
    }
  }

  removeSummonerFromFavourites = () => {
    const { removeFromFavouritesAction, summonerId } = this.props;
    removeFromFavouritesAction(summonerId);
  }

  toggleFavourite = () => {
    const { favourites, summonerId } = this.props;
    if (this.isAFavourite(favourites, summonerId)) {
      this.removeSummonerFromFavourites();
    } else {
      this.addSummonerToFavourites();
    }
  }

  render() {
    const {
      summonerName,
      summonerId,
      profileIconURL,
      summonerLevel,
      rankedSolo,
      rankedFlexSR,
      favourites,
    } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ProfileHeader
          summonerName={summonerName}
          profileIconURL={profileIconURL}
          summonerLevel={summonerLevel}
          toggleFavourite={this.toggleFavourite}
          isAFavourite={this.isAFavourite(favourites, summonerId)}
        />
        <View style={styles.rankedContainer}>
          { [rankedSolo, rankedFlexSR].map((rank) => {
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
    justifyContent: 'flex-start',
    backgroundColor: colourUtils.linkWater,
  },
  rankedContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    marginLeft: 15,
    marginRight: 15,
  }
});

const mapStateToProps = (state) => {
  const { searchReducer, rankedReducer, favouriteReducer } = state;
  return {
    region: searchReducer.region,
    summonerName: searchReducer.summonerName,
    summonerId: searchReducer.summonerId,
    profileIconURL: searchReducer.profileIconURL,
    summonerLevel: searchReducer.summonerLevel,
    rankedSolo: rankedReducer.rankedSolo,
    rankedFlexSR: rankedReducer.rankedFlexSR,
    rankedFlexTT: rankedReducer.rankedFlexTT,
    favourites: favouriteReducer.favourites,
  };
};

export default connect(mapStateToProps, {
  fetchRankedDataAction: fetchRankedData,
  clearRankedDataAction: clearRankedData,
  addToFavouritesAction: addToFavourites,
  removeFromFavouritesAction: removeFromFavourites,
})(Profile);
