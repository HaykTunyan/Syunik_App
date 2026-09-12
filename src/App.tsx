import React, {useEffect, useState} from 'react';
import {StatusBar, StyleSheet, useColorScheme, View} from 'react-native';
import {createNavigationContainerRef, NavigationContainer} from '@react-navigation/native';

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
import {RoadScreen} from './view/RoadScreen';
import {RestaurantsScreen} from './view/RestaurantsScreen';
import {InitialScreen} from './view/InitialScreen';
import {
  VoiceAssistantProvider,
  useVoiceAssistant,
  type AssistantPageContext,
} from './components/VoiceAssistant';
import type {AssistantDestination} from './data/assistantLocations';

type RootStackParamList = {
  Initial: undefined;
  Home: undefined;
  About: undefined;
  History: undefined;
  Contact: undefined;
  Tourism: undefined;
  Products: undefined;
  Roads: undefined;
  Restaurants: undefined;
  CityDetail: {city: string};
  VillageDetail: {village: string};
};

const Stack = createStackNavigator<RootStackParamList>();
const navigationRef = createNavigationContainerRef<RootStackParamList>();

type MainTabRoute = 'Home' | 'About' | 'History' | 'Contact' | 'Tourism' | 'Products' | 'Roads' | 'Restaurants';

const routeNameMap: Record<AppScreen, MainTabRoute> = {
  home: 'Home',
  about: 'About',
  history: 'History',
  contact: 'Contact',
  tourism: 'Tourism',
  products: 'Products',
  roads: 'Roads',
  restaurants: 'Restaurants',
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
      <NavigationContainer ref={navigationRef}>
        <VoiceAssistantProvider onNavigate={navigateToAssistantDestination}>
          <AppNavigator />
        </VoiceAssistantProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

function navigateToAssistantDestination(destination: AssistantDestination) {
  if (!navigationRef.isReady()) {
    return;
  }

  if (destination.kind === 'city') {
    navigationRef.navigate('CityDetail', {city: destination.id});
    return;
  }

  navigationRef.navigate('VillageDetail', {village: destination.id});
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
      <Stack.Screen name="Roads" component={RoadsRoute} />
      <Stack.Screen name="Restaurants" component={RestaurantsRoute} />
      <Stack.Screen name="CityDetail" component={CityDetailRoute} />
      <Stack.Screen name="VillageDetail" component={VillageDetailRoute} />
    </Stack.Navigator>
  );
}

type AppShellProps = {
  activeScreen: AppScreen;
  navigation: StackNavigationProp<RootStackParamList>;
  children: React.ReactNode;
  assistantContext?: AssistantPageContext;
};

function AppShell({activeScreen, navigation, children, assistantContext}: AppShellProps) {
  const safeAreaInsets = useSafeAreaInsets();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {openAssistant, updatePageContext} = useVoiceAssistant();
  const context = assistantContext ?? {
    page: activeScreen,
    title: `${activeScreen.charAt(0).toUpperCase()}${activeScreen.slice(1)} in Syunik Dreams`,
  };

  useEffect(() => {
    updatePageContext(context);
  }, [context.detail, context.page, context.title, updatePageContext]);

  const navigateTo = (nextScreen: AppScreen) => {
    navigation.navigate(routeNameMap[nextScreen]);
  };

  return (
    <View style={[styles.screenArea, {paddingTop: safeAreaInsets.top}]}>
      <View style={styles.containerMain}>
        <AppHeader
          activeScreen={activeScreen}
          onOpenMenu={() => setIsSidebarOpen(true)}
          onOpenAssistant={() => openAssistant(context)}
        />
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
        onSelectCity={(city: string) => navigation.navigate('CityDetail', {city})}
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

function RoadsRoute({navigation}: AppRouteProps) {
  return (
    <AppShell
      activeScreen="roads"
      navigation={navigation}
      assistantContext={{
        page: 'roads',
        title: 'Roads across Syunik',
        detail: 'Regional map, mountain routes, road distances, and travel guidance across Syunik.',
      }}>
      <RoadScreen onBack={() => navigation.navigate('Home')} />
    </AppShell>
  );
}

function RestaurantsRoute({navigation}: AppRouteProps) {
  return (
    <AppShell
      activeScreen="restaurants"
      navigation={navigation}
      assistantContext={{
        page: 'restaurants',
        title: 'Restaurants in Syunik',
        detail: 'Regional dining ideas, local specialties, and practical food tips across Syunik.',
      }}>
      <RestaurantsScreen onBack={() => navigation.navigate('Home')} />
    </AppShell>
  );
}

function CityDetailRoute({navigation, route}: CityDetailRouteProps) {
  const city = route?.params?.city ?? 'Kapan';

  return (
    <AppShell
      activeScreen="home"
      navigation={navigation}
      assistantContext={{
        page: 'city-detail',
        title: `${city} city details`,
        detail: `City information, attractions, landmarks, and visitor highlights for ${city}.`,
      }}>
      <CityDetailScreen city={city} onBack={() => navigation.navigate('Home')} />
    </AppShell>
  );
}

function VillageDetailRoute({navigation, route}: {navigation: StackNavigationProp<RootStackParamList>; route?: {params?: {village?: string}}}) {
  const village = route?.params?.village ?? 'tatev';

  return (
    <AppShell
      activeScreen="tourism"
      navigation={navigation}
      assistantContext={{
        page: 'village-detail',
        title: `${village} destination details`,
        detail: `Road, place information, gallery, and visitor highlights for ${village}.`,
      }}>
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
