import React from 'react';
import {
  StyleSheet, StatusBar, View, ScrollView
} from 'react-native';
import { connect } from 'react-redux';

import colourUtils from '../../utils/styles/colours';
import regionMapping from '../../utils/constants/region-mapping';
import errorAlert from '../../utils/alert-utils';
import { fetchRankedData, clearRankedData } from '../ranked/actions/ranked-actions';
import { addToFavourites, removeFromFavourites } from '../profile-header/actions/favourite-actions';
import { fetchChampionData, clearChampionData } from '../champions/actions/champion-actions';
import { ProfileHeader } from '../profile-header/profile-header';
import { RankedContainer } from '../ranked/ranked-container';
import { ChampionContainer } from '../champions/champion-container';

const MAX_FAVOURITES = 3;

class Profile extends React.Component {
  componentDidMount() {
    const {
      fetchRankedDataAction, fetchChampionDataAction, summonerId
    } = this.props;
    fetchRankedDataAction(regionMapping.EUW, summonerId);
    fetchChampionDataAction(regionMapping.EUW, summonerId);
  }

  componentWillUnmount() {
    const { clearRankedDataAction, clearChampionDataAction } = this.props;
    clearRankedDataAction();
    clearChampionDataAction();
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
      champions,
    } = this.props;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <StatusBar barStyle="light-content" />
        <ProfileHeader
          summonerName={summonerName}
          profileIconURL={profileIconURL}
          summonerLevel={summonerLevel}
          toggleFavourite={this.toggleFavourite}
          isAFavourite={this.isAFavourite(favourites, summonerId)}
        />
        <View style={styles.bottomContainer}>
          <RankedContainer
            rankedSolo={rankedSolo}
            rankedFlexSR={rankedFlexSR}
          />
          <ChampionContainer champions={champions} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    backgroundColor: colourUtils.linkWater,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'space-between',
  }
});

const mapStateToProps = (state) => {
  const {
    searchReducer, rankedReducer, favouriteReducer, championReducer
  } = state;
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
    champions: championReducer.champions,
  };
};

export default connect(mapStateToProps, {
  fetchRankedDataAction: fetchRankedData,
  fetchChampionDataAction: fetchChampionData,
  clearRankedDataAction: clearRankedData,
  clearChampionDataAction: clearChampionData,
  addToFavouritesAction: addToFavourites,
  removeFromFavouritesAction: removeFromFavourites,
})(Profile);
