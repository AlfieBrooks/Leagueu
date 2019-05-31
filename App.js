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

export const App = () => {
  const mainNavigatior = createStackNavigator(
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
  const store = createStore(rootReducer, {}, composeWithDevTools(applyMiddleware(thunk)));
  const AppContainer = createAppContainer(mainNavigatior);

  return (
    <Provider store={store}>
      <AppContainer style={styles.container} />
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: 'san-serif'
  },
  headerTitle: {
    color: colourUtils.linkWater
  }
});

export default App;
