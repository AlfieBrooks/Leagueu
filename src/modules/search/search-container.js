import React from 'react';
import {
  StyleSheet, Button, StatusBar, View, Text
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { Input, ListItem, Icon } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';

import colourUtils from '../../utils/styles/colours';
import regionMapping from '../../utils/constants/region-mapping';
import errorAlert from '../../utils/alert-utils';
import { Logo } from '../logo/logo';
import { Loading } from '../loading/loading';
import {
  fetchDdragonVersion, storeSummonerName, storeSummonerInfo, fetchSummonerId
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

  handleFavouriteClick(summonerInfo) {
    const { storeSummonerInfoAction, navigation: { navigate } } = this.props;
    storeSummonerInfoAction(summonerInfo);
    navigate('Profile');
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
        <Input
          containerStyle={styles.searchBar}
          inputStyle={styles.searchBarInput}
          placeholder="Enter Summoner Name"
          onChangeText={input => this.setState({ text: input })}
          value={text}
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

  renderList = favourite => (
    <ListItem
      Component={TouchableScale}
      friction={90}
      tension={100}
      activeScale={0.95}
      style={styles.listItem}
      key={favourite.summonerId}
      title={favourite.summonerName}
      onPress={() => this.handleFavouriteClick(favourite)}
      leftAvatar={{ source: { uri: favourite.profileIconURL } }}
      chevron
    />
  )

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
          <View style={styles.favouritesContainer}>
            <Text style={styles.favouritesTitle}>Favourites:</Text>
              { favourites.map(this.renderList) }
          </View>
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
  },
  searchBarInput: {
    paddingLeft: 10,
    borderColor: colourUtils.apple,
  },
  searchButton: {
    flex: 2,
    marginTop: 50,
  },
  favouritesTitle: {
    color: colourUtils.apple,
    fontSize: 18,
    marginBottom: 15
  },
  favouritesContainer: {
    width: 300
  },
  listItem: {
    marginBottom: 3
  }
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
  storeSummonerInfoAction: storeSummonerInfo,
  fetchSummonerIdAction: fetchSummonerId
})(Search);
