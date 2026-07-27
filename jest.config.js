module.exports = {
  preset: '@react-native/jest-preset',
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|@react-navigation|react-native-gesture-handler|react-native-safe-area-context)/)',
  ],
};
