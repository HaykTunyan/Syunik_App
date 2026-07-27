/* global jest */

require('react-native-gesture-handler/jestSetup');

jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const actual = jest.requireActual('react-native-safe-area-context');
  const insets = {top: 0, right: 0, bottom: 0, left: 0};
  const SafeAreaInsetsContext = React.createContext(insets);

  return {
    ...actual,
    SafeAreaInsetsContext,
    SafeAreaProvider: ({children}) =>
      React.createElement(SafeAreaInsetsContext.Provider, {value: insets}, children),
    useSafeAreaInsets: () => insets,
  };
});
