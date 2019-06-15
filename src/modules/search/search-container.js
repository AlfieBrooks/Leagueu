import React from 'react';
import {
  StyleSheet, Button, StatusBar, View, TextInput
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';

import colourUtils from '../../utils/styles/colours';
import regionMapping from '../../utils/constants/region-mapping';
import errorAlert from '../../utils/alert-utils';
import { Logo } from '../logo/logo';
import { Loading } from '../loading/loading';
import { FavouritesList } from '../favourites-list/favourites-list';
import {
  fetchDdragonVersion, storeSummonerName, fetchSummonerId
} from './actions/search-actions';

class Search extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    text: '',
    // region: regionMapping.EUW
  };

  componentDidMount() {
    // const { fetchDdragonVersionAction } = this.props;
    // fetchDdragonVersionAction();
  }

  handleFavouriteClick = (summonerName) => {
    const { fetchSummonerIdAction, navigation: { navigate } } = this.props;
    return fetchSummonerIdAction(regionMapping.EUW, summonerName)
      .then(() => navigate('Profile'))
      .catch(err => errorAlert(err.message));
  }

  handleSubmit() {
    const { text } = this.state;
    const { storeSummonerNameAction, fetchSummonerIdAction, navigation: { navigate } } = this.props;

    if (!text) return errorAlert('Please enter a name');

    storeSummonerNameAction(text);
    return fetchSummonerIdAction(regionMapping.EUW, text)
      .then(() => navigate('Profile'))
      .catch(err => errorAlert(err.message));
  }

  renderLoading = () => (
    <Loading />
  )

  renderInput() {
    const { text } = this.state;
    return (
      <React.Fragment>
        <TextInput
          style={styles.searchBar}
          placeholder="Enter Summoner Name"
          onChangeText={input => this.setState({ text: input })}
          onSubmitEditing={() => this.handleSubmit()}
          value={text}
          returnKeyType="search"
          leftIcon={(
            <Icon
              name="user"
              size={24}
              type="font-awesome"
              color={colourUtils.apple}
            />
        )}
        />
        <Button
          style={styles.searchButton}
          title="Search"
          onPress={() => this.handleSubmit()}
        />
      </React.Fragment>
    );
  }

  render() {
    const { searchLoading, favourites } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Logo />
        <View style={styles.inputContainer}>
          { searchLoading ? this.renderLoading() : this.renderInput() }
        </View>
        { favourites.length > 0
          && (
            <FavouritesList
              favourites={favourites}
              handleFavouriteClick={this.handleFavouriteClick}
            />
          )
        }
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: colourUtils.linkWater,
  },
  inputContainer: {
    height: 100,
  },
  searchBar: {
    minWidth: 350,
    paddingLeft: 30,
    paddingRight: 30,
    fontSize: 16,
  },
  searchButton: {
    flex: 2,
    marginTop: 50,
  },
});

const mapStateToProps = (state) => {
  const { searchReducer, favouriteReducer } = state;
  return {
    searchLoading: searchReducer.loading,
    favourites: favouriteReducer.favourites,
  };
};

export default connect(mapStateToProps, {
  fetchDdragonVersionAction: fetchDdragonVersion,
  storeSummonerNameAction: storeSummonerName,
  fetchSummonerIdAction: fetchSummonerId
})(Search);
