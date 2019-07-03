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
  ScrollView,
  Modal,
  Picker,
} from 'react-native';
import { connect } from 'react-redux';
import { Hoshi } from 'react-native-textinput-effects';
import { Icon } from 'react-native-elements';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import colourUtils from '../../utils/styles/colours';
import regionMapping from '../../utils/constants/region-mapping';
import countryMapping from '../../utils/constants/country-mapping';
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
    shouldShowModal: false,
    regionLoading: true,
    region: 'EUW',
  };

  async componentWillMount() {
    const region = await this.getLocationAsync();
    this.setState({ regionLoading: false, region });
  }

  componentDidMount() {
    // TODO: Use the result of this in the transformers
    // const { fetchDdragonVersionAction } = this.props;
    // fetchDdragonVersionAction();
  }

  getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      errorAlert('Permission to access location was denied');
      return 'EUW';
    }

    const location = await Location.getCurrentPositionAsync({});
    const { longitude, latitude } = location.coords;
    const currentLocation = await Location.reverseGeocodeAsync({ latitude, longitude });

    const country = currentLocation.map(value => value.isoCountryCode);
    return countryMapping[country];
  }

  setModalVisible(visible) {
    this.setState({ shouldShowModal: visible });
  }

  handleFavouriteClick = (region, summonerName) => {
    const {
      searchLoading, storeRegionAction, fetchSummonerIdAction, navigation: { navigate }
    } = this.props;

    if (!searchLoading) {
      return fetchSummonerIdAction(region, summonerName)
        .then(() => {
          storeRegionAction(region);
          navigate('Profile');
        })
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

  renderLoading = size => <Loading size={size} />;

  renderRegionButton() {
    const { region } = this.state;
    return (
      <TouchableOpacity
        style={styles.regionPickerButton}
        onPress={() => this.setModalVisible(true)}
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
    );
  }

  renderInput() {
    const { text, regionLoading } = this.state;
    return (
      <React.Fragment>

        <View style={styles.regionPickerButtonContainer}>
          { regionLoading ? this.renderLoading('small') : this.renderRegionButton() }
        </View>
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

  renderPicker() {
    const { shouldShowModal, region } = this.state;

    return (
      <Modal
        transparent
        visible={shouldShowModal}
        onRequestClose={() => this.setModalVisible(false)}
        supportedOrientations={['portrait', 'landscape']}
        animationType="fade"
        presentationStyle="overFullScreen"
      >
        <View style={styles.regionPickerWrapper}>
          <View style={styles.regionPickerContainer}>
            <Text>Choose your region</Text>
            <Picker
              style={{ width: 150 }}
              selectedValue={region}
              onValueChange={value => this.setState({ region: value })}
            >
              {
                Object.keys(regionMapping).map(regionValue => (
                  <Picker.Item
                    key={regionValue}
                    label={regionValue}
                    value={regionValue}
                  />
                ))
              }
            </Picker>
            <Button
              title="Confirm"
              color={colourUtils.seaBlue}
              onPress={() => this.setModalVisible(!shouldShowModal)}
            />
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    const { searchLoading, favourites } = this.props;

    return (
      <View style={styles.wrapper}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ScrollView contentContainerStyle={styles.container}>
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
            { this.renderPicker() }
          </ScrollView>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colourUtils.linkWater
  },
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: colourUtils.linkWater
  },
  regionText: {
    color: colourUtils.darkGray
  },
  regionPickerWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    height: 100,
    backgroundColor: colourUtils.transparent
  },
  regionPickerContainer: {
    alignItems: 'center',
    borderRadius: 10,
    padding: 20,
    minWidth: 300,
    backgroundColor: colourUtils.white
  },
  regionPickerButtonContainer: {
    justifyContent: 'center',
    height: 50,
  },
  regionPickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 15
  },
  regionIcon: {
    marginLeft: 5
  },
  inputContainer: {
    justifyContent: 'space-evenly',
    height: 150,
  },
  searchBar: {
    minWidth: 290,
    marginBottom: 10
  },
  favourites: {
    marginTop: 10,
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
