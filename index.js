/**
 * @format
 */

import 'react-native-gesture-handler';
import {enableScreens} from 'react-native-screens';
import {
  getMessaging,
  setBackgroundMessageHandler,
} from '@react-native-firebase/messaging';
enableScreens();

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

setBackgroundMessageHandler(getMessaging(), async _remoteMessage => {
  // Background data processing can be added here when the app requires it.
});

AppRegistry.registerComponent(appName, () => App);
