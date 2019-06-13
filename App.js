import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import colourUtils from './src/utils/styles/colours';
import Search from './src/modules/search/search-container';
import Profile from './src/modules/profile/profile-container';
import rootReducer from './src/reducers';
import { getPersistantData } from './src/utils/storage-utils';
import { Loading } from './src/modules/loading/loading';

export default class App extends React.Component {
  state = {
    loading: true,
    initialState: [],
  }

  componentWillMount() {
    getPersistantData('@favourites').then((favourites) => {
      this.setState({
        loading: false,
        initialState: {
          favouriteReducer: {
            favourites
          }
        }
      });
    });
  }

  renderLoading = () => (
    <Loading />
  )

  renderPage(initialState) {
    this.mainNavigatior = createStackNavigator(
      {
        Search: { screen: Search },
        Profile: { screen: Profile }
      },
      {
        initialRouteName: 'Search',
        defaultNavigationOptions: {
          headerStyle: {
            backgroundColor: colourUtils.seaBlue,
          },
          headerTintColor: colourUtils.white,
          headerTitle: <Text style={styles.headerTitle}>Leaguéu</Text>
        }
      }
    );
    const store = createStore(
      rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk))
    );
    const AppContainer = createAppContainer(this.mainNavigatior);
    return (
      <Provider store={store}>
        <AppContainer style={styles.container} />
      </Provider>
    );
  }

  render() {
    const { loading, initialState } = this.state;
    return loading ? this.renderLoading() : this.renderPage(initialState);
  }
}

const styles = StyleSheet.create({
  container: {
    fontFamily: 'san-serif'
  },
  headerTitle: {
    color: colourUtils.linkWater
  }
});
