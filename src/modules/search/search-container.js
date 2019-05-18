import React from 'react';
import {
  StyleSheet, Button, StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Logo } from '../logo/logo';
import colourUtils from '../../utils/styles/colours';
import { storeSummonerName, fetchSummonerId } from './actions/search-actions';
import regionMap from '../../utils/region-mapping';

class Search extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    text: '',
    // region: regionMap.EUW
  };

  handleSubmit() {
    const { text } = this.state;
    const { storeSummonerNameAction, fetchSummonerIdAction, navigation: { navigate } } = this.props;

    if (!text) return;
    storeSummonerNameAction(text);
    fetchSummonerIdAction(regionMap.EUW, text);
    navigate('Profile');
  }

  render() {
    const { text } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Logo />
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

export default connect(null, {
  storeSummonerNameAction: storeSummonerName,
  fetchSummonerIdAction: fetchSummonerId
})(Search);
