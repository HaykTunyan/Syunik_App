import React, {useState} from 'react';
import {StatusBar, StyleSheet, useColorScheme, View} from 'react-native';
import {NavigationContainer, type RouteProp} from '@react-navigation/native';

import {createStackNavigator, type StackNavigationProp} from '@react-navigation/stack';
import {SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context';
import {AppHeader, type AppScreen} from './components/AppHeader';

// import TabNavigator from './navigation/TabNavigator';

import {BottomNav} from './components/BottomNav';
import {Sidebar} from './components/Sidebar';
import {AboutUsScreen} from './view/AboutUsScreen';
import {ContactUsScreen} from './view/ContactUsScreen';
import {HistoryScreen} from './view/HistoryScreen';
import {HomeScreen} from './view/HomeScreen';
import {TourismScreen} from './view/TourismScreen';
import {ProductsScreen} from './view/ProductsScreen';
import {CityDetailScreen} from './view/CityDetailsScreen';
import {VillageDetailScreen} from './view/VillageDetailScreen';
import {InitialScreen} from './view/InitialScreen';

type RootStackParamList = {
  Initial: undefined;
  Home: undefined;
  About: undefined;
  History: undefined;
  Contact: undefined;
  Tourism: undefined;
  Products: undefined;
  CityDetail: {city: string};
  VillageDetail: {village: string};
};

const Stack = createStackNavigator<RootStackParamList>();

type MainTabRoute = 'Home' | 'About' | 'History' | 'Contact' | 'Tourism' | 'Products';

const routeNameMap: Record<AppScreen, MainTabRoute> = {
  home: 'Home',
  about: 'About',
  history: 'History',
  contact: 'Contact',
  tourism: 'Tourism',
  products: 'Products',
};

type AppRouteProps = {
  navigation: StackNavigationProp<RootStackParamList>;
  route?: {params?: {city?: string; village?: string}};
};

type CityDetailRouteProps = {
  navigation: StackNavigationProp<RootStackParamList>;
  route?: {params?: {city?: string}};
};

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Initial" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Initial" component={InitialRoute} />
      <Stack.Screen name="Home" component={HomeRoute} />
      <Stack.Screen name="About" component={AboutRoute} />
      <Stack.Screen name="History" component={HistoryRoute} />
      <Stack.Screen name="Contact" component={ContactRoute} />
      <Stack.Screen name="Tourism" component={TourismRoute} />
      <Stack.Screen name="Products" component={ProductsRoute} />
      <Stack.Screen name="CityDetail" component={CityDetailRoute} />
      <Stack.Screen name="VillageDetail" component={VillageDetailRoute} />
    </Stack.Navigator>
  );
}

type AppShellProps = {
  activeScreen: AppScreen;
  navigation: StackNavigationProp<RootStackParamList>;
  children: React.ReactNode;
};

function AppShell({activeScreen, navigation, children}: AppShellProps) {
  const safeAreaInsets = useSafeAreaInsets();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigateTo = (nextScreen: AppScreen) => {
    navigation.navigate(routeNameMap[nextScreen]);
  };

  return (
    <View style={[styles.screenArea, {paddingTop: safeAreaInsets.top}]}>
      <View style={styles.containerMain}>
        <AppHeader activeScreen={activeScreen} onOpenMenu={() => setIsSidebarOpen(true)} />
        <View style={styles.contentWrapper}>{children}</View>

        {/* <TabNavigator /> */}
        <BottomNav activeTab={activeScreen as any} onTabChange={navigateTo} />

        <Sidebar
          isOpen={isSidebarOpen}
          activeScreen={activeScreen}
          onClose={() => setIsSidebarOpen(false)}
          onSelectScreen={(nextScreen) => {
            navigateTo(nextScreen);
            setIsSidebarOpen(false);
          }}
        />
      </View>
    </View>
  );
}

function InitialRoute({navigation}: AppRouteProps) {
  return (
    <InitialScreen
      onFinish={() => {
        if ('replace' in navigation && typeof navigation.replace === 'function') {
          navigation.replace('Home');
          return;
        }

        navigation.navigate('Home');
      }}
    />
  );
}

function HomeRoute({navigation}: AppRouteProps) {
  return (
    <AppShell activeScreen="home" navigation={navigation}>
      <HomeScreen
        contentContainerStyle={styles.contentContainer}
        onSelectCity={(city: string) => navigation.navigate('CityDetail', {city})}
      />
    </AppShell>
  );
}

function AboutRoute({navigation}: AppRouteProps) {
  return (
    <AppShell activeScreen="about" navigation={navigation}>
      <AboutUsScreen
        onBack={() => navigation.navigate('Home')}
        onOpenTourism={() => navigation.navigate('Tourism')}
      />
    </AppShell>
  );
}

function HistoryRoute({navigation}: AppRouteProps) {
  return (
    <AppShell activeScreen="history" navigation={navigation}>
      <HistoryScreen onBack={() => navigation.navigate('Home')} />
    </AppShell>
  );
}

function ContactRoute({navigation}: AppRouteProps) {
  return (
    <AppShell activeScreen="contact" navigation={navigation}>
      <ContactUsScreen onBack={() => navigation.navigate('Home')} />
    </AppShell>
  );
}

function TourismRoute({navigation}: AppRouteProps) {
  return (
    <AppShell activeScreen="tourism" navigation={navigation}>
      <TourismScreen
        onBack={() => navigation.navigate('Home')}
        onSelectVillage={(village: string) => navigation.navigate('VillageDetail', {village})}
      />
    </AppShell>
  );
}

function ProductsRoute({navigation}: AppRouteProps) {
  return (
    <AppShell activeScreen="products" navigation={navigation}>
      <ProductsScreen onBack={() => navigation.navigate('Home')} />
    </AppShell>
  );
}

function CityDetailRoute({navigation, route}: CityDetailRouteProps) {
  const city = route?.params?.city ?? 'Kapan';

  return (
    <AppShell activeScreen="home" navigation={navigation}>
      <CityDetailScreen city={city} onBack={() => navigation.navigate('Home')} />
    </AppShell>
  );
}

function VillageDetailRoute({navigation, route}: {navigation: StackNavigationProp<RootStackParamList>; route?: {params?: {village?: string}}}) {
  const village = route?.params?.village ?? 'tatev';

  return (
    <AppShell activeScreen="tourism" navigation={navigation}>
      <VillageDetailScreen village={village} onBack={() => navigation.navigate('Tourism')} />
    </AppShell>
  );
}

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: '#f6efe6',
  },
  screenArea: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 28,
    paddingTop: 16,
  },
});

export default App;
