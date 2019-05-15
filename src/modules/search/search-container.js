import React from 'react'
import { StyleSheet, Text, TextInput } from "react-native";

export class Search extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return(
      <View style={styles.container}>
        <TextInput
          style={styles.searchBar}
          placeholder="Enter Summoner Name"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1
  }
});
