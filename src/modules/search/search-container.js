import React from 'react';
import {
  StyleSheet, Button, StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import colourUtils from '../../utils/styles/colours';
import regionMapping from '../../utils/region-mapping';
import errorAlert from '../../utils/alert-utils';
import { Logo } from '../logo/logo';
import { Loading } from '../loading/loading';
import { fetchDdragonVersion, storeSummonerName, fetchSummonerId } from './actions/search-actions';

class Search extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    text: '',
    // region: regionMapping.EUW
  };

  componentDidMount() {
    const { fetchDdragonVersionAction } = this.props;
    fetchDdragonVersionAction();
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
              color={colourUtils.apple}
            />
      )}
        />
        <Button
          title="Search"
          onPress={() => this.handleSubmit()}
        />
      </React.Fragment>
    );
  }

  render() {
    const { searchLoading } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Logo />
        { searchLoading ? this.renderLoading() : this.renderInput() }
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colourUtils.linkWater,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  searchBar: {
    paddingLeft: 30,
    paddingRight: 30,
  },
  searchBarInput: {
    paddingLeft: 10,
    borderColor: colourUtils.apple,
  }
});

const mapStateToProps = (state) => {
  const { searchReducer } = state;
  return {
    searchLoading: searchReducer.loading,
  };
};

export default connect(mapStateToProps, {
  fetchDdragonVersionAction: fetchDdragonVersion,
  storeSummonerNameAction: storeSummonerName,
  fetchSummonerIdAction: fetchSummonerId
})(Search);
