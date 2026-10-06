import React, {lazy, Suspense} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {CommonActions, useNavigation, type NavigationProp} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationProp,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  createBottomTabNavigator,
  type BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import {Compass, Home, Menu, Utensils, UserRound, type LucideIcon} from 'lucide-react-native';
import {colors} from '../config/theme';
import {useProfile} from '../features/profile/context/ProfileProvider';
import {AppShell} from './AppShell';
import type {
  AppScreen,
  ExploreStackParamList,
  HomeStackParamList,
  MainTabParamList,
  MenuStackParamList,
  RootStackParamList,
} from './types';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const ExploreStack = createNativeStackNavigator<ExploreStackParamList>();
const MenuStack = createNativeStackNavigator<MenuStackParamList>();

const LazyInitialScreen = lazy(() =>
  import('../view/InitialScreen').then(module => ({default: module.InitialScreen})),
);
const LazyHomeScreen = lazy(() =>
  import('../view/HomeScreen').then(module => ({default: module.HomeScreen})),
);
const LazyAboutUsScreen = lazy(() =>
  import('../view/AboutUsScreen').then(module => ({default: module.AboutUsScreen})),
);
const LazyHistoryScreen = lazy(() =>
  import('../view/HistoryScreen').then(module => ({default: module.HistoryScreen})),
);
const LazyContactUsScreen = lazy(() =>
  import('../view/ContactUsScreen').then(module => ({default: module.ContactUsScreen})),
);
const LazyTourismScreen = lazy(() =>
  import('../view/TourismScreen').then(module => ({default: module.TourismScreen})),
);
const LazyProductsScreen = lazy(() =>
  import('../view/ProductsScreen').then(module => ({default: module.ProductsScreen})),
);
const LazyMenuScreen = lazy(() =>
  import('../view/MenuScreen').then(module => ({default: module.MenuScreen})),
);
const LazyRoadScreen = lazy(() =>
  import('../view/RoadScreen').then(module => ({default: module.RoadScreen})),
);
const LazyRestaurantsScreen = lazy(() =>
  import('../view/RestaurantsScreen').then(module => ({default: module.RestaurantsScreen})),
);
const LazyProfileScreen = lazy(() =>
  import('../view/ProfileScreen').then(module => ({default: module.ProfileScreen})),
);
const LazyCityDetailScreen = lazy(() =>
  import('../view/CityDetailsScreen').then(module => ({default: module.CityDetailScreen})),
);
const LazyVillageDetailScreen = lazy(() =>
  import('../view/VillageDetailScreen').then(module => ({default: module.VillageDetailScreen})),
);

type AppNavigation = NavigationProp<MainTabParamList>;
type AppDestination = {tab: keyof MainTabParamList; screen?: string};

const appDestinations: Record<AppScreen, AppDestination> = {
  home: {tab: 'Home'},
  tourism: {tab: 'Explore'},
  restaurants: {tab: 'Food'},
  products: {tab: 'Menu', screen: 'Products'},
  profile: {tab: 'Profile'},
  menu: {tab: 'Menu'},
  about: {tab: 'Menu', screen: 'About'},
  contact: {tab: 'Menu', screen: 'Contact'},
  history: {tab: 'Menu', screen: 'History'},
  roads: {tab: 'Menu', screen: 'Roads'},
};

export function RootNavigator({onInitialComplete}: {onInitialComplete: () => void}) {
  return (
    <RootStack.Navigator screenOptions={{headerShown: false, animation: 'fade'}}>
      <RootStack.Screen name="Initial">
        {({navigation}) => (
          <InitialRoute navigation={navigation} onComplete={onInitialComplete} />
        )}
      </RootStack.Screen>
      <RootStack.Screen name="MainTabs" component={MainTabNavigator} />
    </RootStack.Navigator>
  );
}

function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerShown: false,
        lazy: true,
        tabBarHideOnKeyboard: true,
        tabBarLabel: tabLabels[route.name],
        tabBarAccessibilityLabel: `${tabLabels[route.name]} tab`,
        tabBarActiveTintColor: colors.brand,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIcon: createTabBarIcon(route.name),
      })}>
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="Explore" component={ExploreNavigator} />
      <Tab.Screen name="Food" component={FoodRoute} />
      <Tab.Screen name="Menu" component={MenuNavigator} />
      <Tab.Screen name="Profile" component={ProfileRoute} />
    </Tab.Navigator>
  );
}

function HomeNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <HomeStack.Screen name="Home" component={HomeRoute} />
      <HomeStack.Screen name="CityDetail" component={CityDetailRoute} />
    </HomeStack.Navigator>
  );
}

function ExploreNavigator() {
  return (
    <ExploreStack.Navigator screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <ExploreStack.Screen name="Explore" component={ExploreRoute} />
      <ExploreStack.Screen name="VillageDetail" component={VillageDetailRoute} />
    </ExploreStack.Navigator>
  );
}

function MenuNavigator() {
  return (
    <MenuStack.Navigator screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <MenuStack.Screen name="Menu" component={MenuRoute} />
      <MenuStack.Screen name="About" component={AboutRoute} />
      <MenuStack.Screen name="Contact" component={ContactRoute} />
      <MenuStack.Screen name="History" component={HistoryRoute} />
      <MenuStack.Screen name="Roads" component={RoadsRoute} />
      <MenuStack.Screen name="Products" component={ProductsRoute} />
    </MenuStack.Navigator>
  );
}

function InitialRoute({
  navigation,
  onComplete,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Initial'>;
  onComplete: () => void;
}) {
  return (
    <DeferredScreen>
      <LazyInitialScreen
        onFinish={() => {
          onComplete();
          navigation.replace('MainTabs');
        }}
      />
    </DeferredScreen>
  );
}

function HomeRoute({navigation}: NativeStackScreenProps<HomeStackParamList, 'Home'>) {
  return (
    <AppShell activeScreen="home" onNavigate={screen => navigateToAppScreen(navigation, screen)}>
      <DeferredScreen>
        <LazyHomeScreen
          contentContainerStyle={styles.contentContainer}
          onSelectCity={city => navigation.navigate('CityDetail', {city})}
        />
      </DeferredScreen>
    </AppShell>
  );
}

function ExploreRoute({navigation}: NativeStackScreenProps<ExploreStackParamList, 'Explore'>) {
  return (
    <AppShell activeScreen="tourism" onNavigate={screen => navigateToAppScreen(navigation, screen)}>
      <DeferredScreen>
        <LazyTourismScreen
          onBack={() => navigateToAppScreen(navigation, 'home')}
          onSelectCity={city => navigateToAppScreen(navigation, 'home', {screen: 'CityDetail', params: {city}})}
          onSelectVillage={village => navigation.navigate('VillageDetail', {village})}
        />
      </DeferredScreen>
    </AppShell>
  );
}

function FoodRoute() {
  const navigation = useNavigation<AppNavigation>();

  return (
    <AppShell activeScreen="restaurants" onNavigate={screen => navigateToAppScreen(navigation, screen)}>
      <DeferredScreen>
        <LazyRestaurantsScreen onBack={() => navigateToAppScreen(navigation, 'home')} />
      </DeferredScreen>
    </AppShell>
  );
}

function MenuRoute({navigation}: NativeStackScreenProps<MenuStackParamList, 'Menu'>) {
  return (
    <AppShell activeScreen="menu" onNavigate={screen => navigateFromMenu(navigation, screen)}>
      <DeferredScreen>
        <LazyMenuScreen onNavigate={screen => navigateFromMenu(navigation, screen)} />
      </DeferredScreen>
    </AppShell>
  );
}

function ProfileRoute() {
  const navigation = useNavigation<AppNavigation>();
  const {name, saveName} = useProfile();

  return (
    <AppShell activeScreen="profile" onNavigate={screen => navigateToAppScreen(navigation, screen)}>
      <DeferredScreen>
        <LazyProfileScreen
          name={name}
          onSaveName={saveName}
          onBrowsePlaces={() => navigateToAppScreen(navigation, 'tourism')}
        />
      </DeferredScreen>
    </AppShell>
  );
}

function AboutRoute({navigation}: NativeStackScreenProps<MenuStackParamList, 'About'>) {
  return (
    <AppShell activeScreen="about" onNavigate={screen => navigateFromMenu(navigation, screen)}>
      <DeferredScreen>
        <LazyAboutUsScreen
          onBack={() => goBackOrHome(navigation)}
          onOpenTourism={() => navigateToAppScreen(navigation, 'tourism')}
        />
      </DeferredScreen>
    </AppShell>
  );
}

function ContactRoute({navigation}: NativeStackScreenProps<MenuStackParamList, 'Contact'>) {
  return (
    <AppShell activeScreen="contact" onNavigate={screen => navigateFromMenu(navigation, screen)}>
      <DeferredScreen>
        <LazyContactUsScreen onBack={() => goBackOrHome(navigation)} />
      </DeferredScreen>
    </AppShell>
  );
}

function HistoryRoute({navigation}: NativeStackScreenProps<MenuStackParamList, 'History'>) {
  return (
    <AppShell activeScreen="history" onNavigate={screen => navigateFromMenu(navigation, screen)}>
      <DeferredScreen>
        <LazyHistoryScreen onBack={() => goBackOrHome(navigation)} />
      </DeferredScreen>
    </AppShell>
  );
}

function RoadsRoute({navigation}: NativeStackScreenProps<MenuStackParamList, 'Roads'>) {
  return (
    <AppShell
      activeScreen="roads"
      onNavigate={screen => navigateFromMenu(navigation, screen)}
      assistantContext={{
        page: 'roads',
        title: 'Roads across Syunik',
        detail: 'Regional map, mountain routes, road distances, and travel guidance across Syunik.',
      }}>
      <DeferredScreen>
        <LazyRoadScreen onBack={() => goBackOrHome(navigation)} />
      </DeferredScreen>
    </AppShell>
  );
}

function ProductsRoute({navigation}: NativeStackScreenProps<MenuStackParamList, 'Products'>) {
  return (
    <AppShell activeScreen="products" onNavigate={screen => navigateFromMenu(navigation, screen)}>
      <DeferredScreen>
        <LazyProductsScreen onBack={() => goBackOrHome(navigation)} />
      </DeferredScreen>
    </AppShell>
  );
}

function CityDetailRoute({
  navigation,
  route,
}: NativeStackScreenProps<HomeStackParamList, 'CityDetail'>) {
  const {city} = route.params;

  return (
    <AppShell
      activeScreen="home"
      onNavigate={screen => navigateToAppScreen(navigation, screen)}
      assistantContext={{
        page: 'city-detail',
        title: `${city} city details`,
        detail: `City information, attractions, landmarks, and visitor highlights for ${city}.`,
      }}>
      <DeferredScreen>
        <LazyCityDetailScreen city={city} onBack={() => goBackOrHome(navigation)} />
      </DeferredScreen>
    </AppShell>
  );
}

function VillageDetailRoute({
  navigation,
  route,
}: NativeStackScreenProps<ExploreStackParamList, 'VillageDetail'>) {
  const {village} = route.params;

  return (
    <AppShell
      activeScreen="tourism"
      onNavigate={screen => navigateToAppScreen(navigation, screen)}
      assistantContext={{
        page: 'village-detail',
        title: `${village} destination details`,
        detail: `Road, place information, gallery, and visitor highlights for ${village}.`,
      }}>
      <DeferredScreen>
        <LazyVillageDetailScreen village={village} onBack={() => goBackOrHome(navigation)} />
      </DeferredScreen>
    </AppShell>
  );
}

function navigateToAppScreen(
  navigation: {dispatch: (action: ReturnType<typeof CommonActions.navigate>) => void},
  screen: AppScreen,
  params?: {screen: string; params?: Record<string, string>},
) {
  const destination = appDestinations[screen];
  navigation.dispatch(
    CommonActions.navigate({
      name: destination.tab,
      params: params ?? (destination.screen ? {screen: destination.screen} : undefined),
    }),
  );
}

function navigateFromMenu<RouteName extends keyof MenuStackParamList>(
  navigation: NativeStackNavigationProp<MenuStackParamList, RouteName>,
  screen: AppScreen,
) {
  const destination = appDestinations[screen];

  if (destination.tab === 'Menu' && destination.screen) {
    navigation.dispatch(CommonActions.navigate({name: destination.screen}));
    return;
  }

  navigateToAppScreen(navigation, screen);
}

function goBackOrHome(
  navigation: {canGoBack: () => boolean; goBack: () => void; dispatch: (action: ReturnType<typeof CommonActions.navigate>) => void},
) {
  if (navigation.canGoBack()) {
    navigation.goBack();
    return;
  }

  navigateToAppScreen(navigation, 'home');
}

function DeferredScreen({children}: {children: React.ReactNode}) {
  return <Suspense fallback={<LoadingScreen />}>{children}</Suspense>;
}

function LoadingScreen() {
  return (
    <View accessibilityLabel="Loading screen" style={styles.loadingScreen}>
      <ActivityIndicator color={colors.brand} size="large" />
    </View>
  );
}

const tabIcons: Record<keyof MainTabParamList, LucideIcon> = {
  Home,
  Explore: Compass,
  Food: Utensils,
  Menu,
  Profile: UserRound,
};

const tabLabels: Record<keyof MainTabParamList, string> = {
  Home: 'Home',
  Explore: 'Trips',
  Food: 'Food',
  Menu: 'Menu',
  Profile: 'Profile',
};

function createTabBarIcon(
  routeName: keyof MainTabParamList,
): NonNullable<BottomTabNavigationOptions['tabBarIcon']> {
  const Icon = tabIcons[routeName];
  return ({color, focused}) => (
    <View style={[styles.iconPill, focused && styles.activeIconPill]}>
      <Icon size={22} color={color} strokeWidth={2} />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {paddingHorizontal: 20, paddingBottom: 28, paddingTop: 16},
  loadingScreen: {alignItems: 'center', flex: 1, justifyContent: 'center'},
  tabBar: {
    backgroundColor: colors.surfaceAlt,
    borderTopColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
    elevation: 8,
    paddingTop: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -3},
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  tabBarItem: {flex: 1, minWidth: 0, paddingVertical: 2},
  tabBarLabel: {
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 12,
    marginTop: 1,
    textAlign: 'center',
  },
  iconPill: {alignItems: 'center', borderRadius: 16, height: 28, justifyContent: 'center', width: 42},
  activeIconPill: {backgroundColor: colors.brandSoft},
});
