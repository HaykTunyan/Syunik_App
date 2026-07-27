import React, {useState} from 'react';
import {StatusBar, StyleSheet, useColorScheme, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

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

type RootStackParamList = {
  Home: undefined;
  About: undefined;
  History: undefined;
  Contact: undefined;
  Tourism: undefined;
  Products: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const routeNameMap: Record<AppScreen, keyof RootStackParamList> = {
  home: 'Home',
  about: 'About',
  history: 'History',
  contact: 'Contact',
  tourism: 'Tourism',
  products: 'Products',
};

type AppRouteProps = {
  navigation: StackNavigationProp<RootStackParamList>;
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
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeRoute} />
      <Stack.Screen name="About" component={AboutRoute} />
      <Stack.Screen name="History" component={HistoryRoute} />
      <Stack.Screen name="Contact" component={ContactRoute} />
      <Stack.Screen name="Tourism" component={TourismRoute} />
      <Stack.Screen name="Products" component={ProductsRoute} />
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
        <BottomNav activeTab={activeScreen} onTabChange={navigateTo} />

        
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

function HomeRoute({navigation}: AppRouteProps) {
  return (
    <AppShell activeScreen="home" navigation={navigation}>
      <HomeScreen contentContainerStyle={styles.contentContainer} />
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
      <TourismScreen onBack={() => navigation.navigate('Home')} />
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
