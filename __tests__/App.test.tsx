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

test('renders the app home screen content', async () => {
  let renderer: ReactTestRenderer.ReactTestRenderer;

  await ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(<App />);
  });

  const labels = renderer!.root.findAllByType(Text).map(node => node.props.children);
  expect(labels).toContain('Discover Armenia’s soul');
  expect(labels).toContain('WELCOME TO SYUNIK');
});

test('every city has a most visited place, and Goris highlights Tatev', () => {
  const {citiesData} = require('../src/data/citiesData');

  expect(citiesData.length).toBeGreaterThan(0);
  for (const city of citiesData) {
    expect(city.mostVisitedPlace).toBeTruthy();
  }

  const gorisPlaces = citiesData.find((city: {latinName: string}) => city.latinName === 'Goris')?.mostVisitedPlace ?? [];
  expect(gorisPlaces.some((place: {text: string}) => place.text === 'Tatev Monastery')).toBe(true);
});

test('every top village has a detail card with gallery, road, and most-visited places', () => {
  const {topVisitingVillages} = require('../src/view/TourismScreen');

  expect(topVisitingVillages.length).toBeGreaterThan(0);
  for (const village of topVisitingVillages) {
    expect(village.gallery?.length).toBeGreaterThan(0);
    expect(village.road).toBeTruthy();
    expect(village.mostVisitedPlaces?.length).toBeGreaterThan(0);
  }
});
