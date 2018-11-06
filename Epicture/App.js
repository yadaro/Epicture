import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Gallery from './Components/Gallery'
import Profile from './Components/Profile'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Gallery/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09545b',
    justifyContent: 'center',
  },
});
