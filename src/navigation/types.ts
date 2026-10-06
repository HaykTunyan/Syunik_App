import type {NavigatorScreenParams} from '@react-navigation/native';

export type MainTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList> | undefined;
  Explore: NavigatorScreenParams<ExploreStackParamList> | undefined;
  Food: undefined;
  Menu: NavigatorScreenParams<MenuStackParamList> | undefined;
  Profile: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  CityDetail: {city: string};
};

export type ExploreStackParamList = {
  Explore: undefined;
  VillageDetail: {village: string};
};

export type MenuStackParamList = {
  Menu: undefined;
  About: undefined;
  Contact: undefined;
  History: undefined;
  Roads: undefined;
  Products: undefined;
};

export type RootStackParamList = {
  Initial: undefined;
  MainTabs: NavigatorScreenParams<MainTabParamList> | undefined;
};

export type AppScreen =
  | 'home'
  | 'about'
  | 'history'
  | 'contact'
  | 'tourism'
  | 'products'
  | 'roads'
  | 'restaurants'
  | 'profile'
  | 'menu';
