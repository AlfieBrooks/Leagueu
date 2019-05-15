import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Search } from './src/modules/Ssarch/Search-container'

export default class App extends React.Component {
  render() {
    const mainNavigatior = createStackNavigator(
      {
        Search: { screen: Search }
      },
      {
        initialRouteName: 'Search',
        defaultNavigationOptions: {
          headerStyle: {
            backgroundColor: "#333",
            height: 100
          },
          headerTitle: <Text style={styles.headerTitle}>Leaguéu</Text>
        }
      }
    )
    const AppContainer = createAppContainer(mainNavigatior);

    return (
      <AppContainer style={styles.container}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: "#efefef"
  }
});
