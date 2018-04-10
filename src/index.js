// @flow

import { AppRegistry } from 'react-native';
import { name } from '../app.json';
import App from './components/App';

/**
 * Render the entry component
 *
 * @return {ReactElement} Component to render
 */
export function render() {
  return App;
}

/**
 * Register the app
 *
 * @return {Undefined} No return value
 */
function init() {
  AppRegistry.registerComponent(name, render);
}

export default init;
