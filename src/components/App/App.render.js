// @flow

import React from 'react';
import { Text, View } from 'react-native';
import styles from './App.styles';

/**
 * Example app
 *
 * @return {ReactElement} The markup to render
 */
const App = () => (
  <View testID="app" style={styles.container}>
    <Text>Open up App.js to start working on your app!</Text>
    <Text>Changes you make will automatically reload.</Text>
    <Text>Shake your phone to open the developer menu.</Text>
  </View>
);

export default App;
