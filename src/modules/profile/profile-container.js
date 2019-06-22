import React from 'react';
import {
  StyleSheet, StatusBar, View
} from 'react-native';
import { connect } from 'react-redux';

import colourUtils from '../../utils/styles/colours';
import regionMapping from '../../utils/constants/region-mapping';
import rankedUrlTypes from '../../utils/constants/ranked-url-types';
import { ProfileHeader } from '../profile-header/profile-header';
import { UnrankedRankedInfo } from './ranked-info/unranked-ranked-info';
import { RankedInfo } from './ranked-info/ranked-info';
import { fetchRankedData, clearRankedData } from './actions/ranked-actions';
import { addToFavourites, removeFromFavourites } from './actions/favourite-actions';
import errorAlert from '../../utils/alert-utils';
import { fetchChampionData, clearChampionData } from './actions/champion-actions';
import { ChampionInfo } from './champions/champion-info';

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
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ProfileHeader
          summonerName={summonerName}
          profileIconURL={profileIconURL}
          summonerLevel={summonerLevel}
          toggleFavourite={this.toggleFavourite}
          isAFavourite={this.isAFavourite(favourites, summonerId)}
        />
        <View style={styles.bottomContainer}>
          <View style={styles.rankedContainer}>
            { [rankedSolo, rankedFlexSR].map((rank) => {
              if (rank.tier === rankedUrlTypes.UNRANKED) {
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
          <View style={styles.championContiner}>
            { champions.map(champion => (
              <ChampionInfo
                key={champion.championId}
                championLevel={champion.championLevel}
                championPoints={champion.championPoints}
                championName={champion.championName}
                championImg={champion.championImg}
              />
            ))
            }
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: colourUtils.linkWater,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  rankedContainer: {
    flexDirection: 'row',
  },
  championContiner: {
    flexDirection: 'row',
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
