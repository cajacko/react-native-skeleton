// @flow

import { AppRegistry } from 'react-native';
import { name } from '../app.json';
import App from './components/App';

/**
 * Register the app
 *
 * @return {Undefined} No return value
 */
function init() {
  AppRegistry.registerComponent(name, () => App);
}

export default init;
