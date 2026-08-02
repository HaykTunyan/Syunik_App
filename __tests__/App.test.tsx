/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import {Text} from 'react-native';
import App from '../src/App';

jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({children}: {children: React.ReactNode}) => children,
}));

jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: () => ({
    Navigator: ({children}: {children: React.ReactNode}) => children,
    Screen: ({component: Component}: {component: React.ComponentType<any>}) => (
      <Component navigation={{navigate: jest.fn()}} />
    ),
  }),
}));

test('renders the about and history entry points', async () => {
  let renderer: ReactTestRenderer.ReactTestRenderer;

  await ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(<App />);
  });

  const labels = renderer!.root.findAllByType(Text).map(node => node.props.children);
  expect(labels).toContain('About');
  expect(labels).toContain('History');
});

test('every city has a most visited place, and Goris highlights Tatev', () => {
  const {citiesData} = require('../src/data/citiesData');

  expect(citiesData.length).toBeGreaterThan(0);
  for (const city of citiesData) {
    expect(city.mostVisitedPlace).toBeTruthy();
  }

  expect(citiesData.find((city: {latinName: string}) => city.latinName === 'Goris')?.mostVisitedPlace).toBe('Tatev Monastery');
});
