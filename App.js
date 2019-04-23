import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Constants } from 'expo'
import { purple } from './utils/colors'
import DeckList from './components/DeckList'

function FlashCardStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <FlashCardStatusBar backgroundColor={purple} barStyle="light-content" />
        <View style={styles.container}>
          <DeckList />
        </View>
      </Provider>
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
});
