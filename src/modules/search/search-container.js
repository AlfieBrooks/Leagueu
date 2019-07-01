import React from 'react';
import {
  StyleSheet,
  Button,
  StatusBar,
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import ReactNativePickerModule from 'react-native-picker-module';
import { Hoshi } from 'react-native-textinput-effects';
import { Icon } from 'react-native-elements';

import colourUtils from '../../utils/styles/colours';
import regionMapping from '../../utils/constants/region-mapping';
import errorAlert from '../../utils/alert-utils';
import { Logo } from '../logo/logo';
import { Loading } from '../loading/loading';
import { FavouritesList } from '../favourites-list/favourites-list';
import {
  fetchDdragonVersion, storeRegion, fetchSummonerId
} from './actions/search-actions';

class Search extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    text: '',
    region: 'EUW',
    selectedIndex: 2
  };

  componentDidMount() {
    // const { fetchDdragonVersionAction } = this.props;
    // fetchDdragonVersionAction();
  }

  handleFavouriteClick = (region, summonerName) => {
    const { searchLoading, fetchSummonerIdAction, navigation: { navigate } } = this.props;

    if (!searchLoading) {
      return fetchSummonerIdAction(region, summonerName)
        .then(() => navigate('Profile'))
        .catch(err => console.log(err));
    }
    return null;
  }

  handleSubmit() {
    const { text, region } = this.state;
    const { storeRegionAction, fetchSummonerIdAction, navigation: { navigate } } = this.props;

    if (!text) return errorAlert('Please enter a name');

    return fetchSummonerIdAction(regionMapping[region], text)
      .then(() => {
        storeRegionAction(regionMapping[region]);
        navigate('Profile');
        this.setState({ text: '' });
      })
      .catch(err => console.log(err));
  }

  renderLoading = () => <Loading />;

  renderInput() {
    const { text, region } = this.state;
    return (
      <React.Fragment>
        <TouchableOpacity
          style={styles.regionPicker}
          onPress={() => { this.pickerRef.show(); }}
        >
          <Text style={styles.regionText}>{region}</Text>
          <Icon
            name="chevron-down"
            type="font-awesome"
            size={16}
            color={colourUtils.purple}
            containerStyle={styles.regionIcon}
          />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <Hoshi
            label="Summoner Name"
            borderColor={colourUtils.purple}
            borderHeight={3}
            inputPadding={16}
            backgroundColor={colourUtils.linkWater}
            onChangeText={input => this.setState({ text: input })}
            onSubmitEditing={() => this.handleSubmit()}
            value={text}
            returnKeyType="search"
          />
        </View>
        <Button
          style={styles.searchButton}
          title="Search"
          color={colourUtils.seaBlue}
          onPress={() => this.handleSubmit()}
        />
      </React.Fragment>
    );
  }

  render() {
    const { searchLoading, favourites } = this.props;
    const { selectedIndex } = this.state;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <Logo />
          <View style={styles.inputContainer}>
            { searchLoading ? this.renderLoading() : this.renderInput() }
          </View>
          <View style={styles.favourites}>
            { favourites.length > 0
            && (
              <FavouritesList
                favourites={favourites}
                handleFavouriteClick={this.handleFavouriteClick}
              />
            )}
          </View>
          <ReactNativePickerModule
            pickerRef={e => this.pickerRef = e} // eslint-disable-line no-return-assign
            value={selectedIndex}
            title="Select a Region"
            items={Object.keys(regionMapping)}
            onValueChange={(value, index) => {
              this.setState({
                region: value,
                selectedIndex: index
              });
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: colourUtils.linkWater
  },
  regionText: {
    color: colourUtils.darkGray
  },
  regionPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15
  },
  regionIcon: {
    marginLeft: 5
  },
  inputContainer: {
    height: 100,
  },
  searchBar: {
    minWidth: 290,
    marginBottom: 10
  },
  favourites: {
    minHeight: 100
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
  storeRegionAction: storeRegion,
  fetchSummonerIdAction: fetchSummonerId
})(Search);
