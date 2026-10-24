// Ensure globalThis.expo and EventEmitter exist before any modules initialize
if (!globalThis.expo) {
  try {
    const { TurboModuleRegistry } = require('react-native');
    TurboModuleRegistry.get('ExpoModulesCore')?.installModules();
  } catch (e) {}
}

if (!globalThis.expo?.EventEmitter) {
  try {
    const { installExpoGlobalPolyfill } = require('expo-modules-core/build/polyfill/dangerous-internal');
    installExpoGlobalPolyfill();
  } catch (e) {}
}

import { registerRootComponent } from 'expo';
import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
