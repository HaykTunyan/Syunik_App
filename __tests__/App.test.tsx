/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import {Text} from 'react-native';
import App from '../src/App';
import {navigationMenuItems} from '../src/navigation/menuItems';
import {MenuScreen} from '../src/view/MenuScreen';

jest.mock('../src/navigation/RootNavigator', () => {
  const TestReact = require('react');
  const {AppHeader} = require('../src/components/AppHeader');
  const {HomeScreen} = require('../src/view/HomeScreen');

  return {
    RootNavigator: () =>
      TestReact.createElement(
        TestReact.Fragment,
        null,
        TestReact.createElement(AppHeader, {
          activeScreen: 'home',
          onOpenMenu: jest.fn(),
          onOpenAssistant: jest.fn(),
        }),
        TestReact.createElement(HomeScreen, {contentContainerStyle: {}, onSelectCity: jest.fn()}),
      ),
  };
});

jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({children}: {children: React.ReactNode}) => children,
  CommonActions: {navigate: (payload: unknown) => ({type: 'NAVIGATE', payload})},
  useFocusEffect: (effect: () => void | (() => void)) => {
    const TestReact = jest.requireActual<typeof React>('react');
    TestReact.useEffect(effect, [effect]);
  },
  createNavigationContainerRef: () => ({
    isReady: () => false,
    navigate: jest.fn(),
  }),
  useNavigation: () => ({
    navigate: jest.fn(),
    dispatch: jest.fn(),
    getParent: () => ({navigate: jest.fn(), dispatch: jest.fn()}),
  }),
}));

test('renders the app home screen content', async () => {
  let renderer: ReactTestRenderer.ReactTestRenderer;

  await ReactTestRenderer.act(async () => {
    renderer = ReactTestRenderer.create(<App />);
  });

  const labels = renderer!.root.findAllByType(Text).map(node => node.props.children);
  expect(labels).toContain('Welcome to Syunik');
  expect(labels).toContain('WELCOME TO SYUNIK');

  await ReactTestRenderer.act(() => renderer!.unmount());
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

test('the Menu tab exposes every drawer destination and opens local products', async () => {
  const onNavigate = jest.fn();
  let renderer: ReactTestRenderer.ReactTestRenderer;

  await ReactTestRenderer.act(async () => {
    renderer = ReactTestRenderer.create(<MenuScreen onNavigate={onNavigate} />);
  });

  expect(navigationMenuItems.map(item => item.key)).toEqual([
    'home',
    'about',
    'tourism',
    'restaurants',
    'roads',
    'products',
    'history',
    'contact',
    'profile',
  ]);

  const productButton = renderer!.root.findByProps({
    accessibilityLabel: 'Local products. Made in Syunik',
  });

  await ReactTestRenderer.act(() => productButton!.props.onPress());
  expect(onNavigate).toHaveBeenCalledWith('products');

  await ReactTestRenderer.act(() => renderer!.unmount());
});
