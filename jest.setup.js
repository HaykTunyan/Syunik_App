/* global jest */

require('react-native-gesture-handler/jestSetup');

// Voice sessions depend on native WebRTC/audio modules, which are exercised on
// device builds rather than the JS renderer used by this test suite.
jest.mock('@elevenlabs/react-native', () => {
  const React = require('react');

  return {
    ConversationProvider: ({children}) => children,
    useConversation: () => ({
      status: 'disconnected',
      isSpeaking: false,
      isMuted: false,
      startSession: jest.fn(),
      endSession: jest.fn(),
      setMuted: jest.fn(),
      sendContextualUpdate: jest.fn(),
    }),
  };
});

jest.mock('react-native-reanimated-carousel', () => {
  const React = require('react');
  const MockCarousel = () => React.createElement('View');

  return {
    __esModule: true,
    default: MockCarousel,
  };
});

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
