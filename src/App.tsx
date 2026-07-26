import React, {useState} from 'react';
import {StatusBar, StyleSheet, useColorScheme, View} from 'react-native';
import {SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context';
import {AppHeader} from './components/AppHeader';
import {BottomNav} from './components/BottomNav';
import {AboutUsScreen} from './view/AboutUsScreen';
import {ContactUsScreen} from './view/ContactUsScreen';
import {HistoryScreen} from './view/HistoryScreen';
import {HomeScreen} from './view/HomeScreen';
import {TourismScreen} from './view/TourismScreen';
import {ProductsScreen} from './view/ProductsScreen';

function App() {

  /**
   * App is the main entry point of the Syunik App. It sets up the overall structure of the application, including the status bar, safe area handling, and navigation between different screens. The component uses the useState hook to manage the current active screen and renders the appropriate screen based on user interaction with the bottom navigation bar.
   * 
   * The App component is wrapped in a SafeAreaProvider to ensure that content is displayed correctly on devices with notches or other screen insets. It also uses the useColorScheme hook to determine the current color scheme (light or dark) and adjusts the status bar style accordingly.
   */

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  const [screen, setScreen] = useState<'home' | 'about' | 'history' | 'contact' | 'tourism' | 'products'>('home');

  const renderScreen = () => {
    switch (screen) {
      case 'about':
        return (
          <AboutUsScreen
            onBack={() => setScreen('home')}
            onOpenTourism={() => setScreen('tourism')}
          />
        );
      case 'history':
        return <HistoryScreen onBack={() => setScreen('home')} />;
      case 'contact':
        return <ContactUsScreen onBack={() => setScreen('home')} />;
      case 'tourism':
        return <TourismScreen onBack={() => setScreen('home')} />;
      case 'products':
        return <ProductsScreen onBack={() => setScreen('home')} />;
      default:
        return <HomeScreen contentContainerStyle={styles.contentContainer} />;
    }
  };

  return (
    <View style={styles.containerMain}>
      <AppHeader />
      <View style={[styles.screenArea, {paddingTop: safeAreaInsets.top}]}>
        {renderScreen()}
      </View>
      <BottomNav activeTab={screen} onTabChange={setScreen} />
    </View>
  );
}

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: '#f6efe6',
    paddingTop: 60,
  },
  screenArea: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 28,
    paddingTop: 12,
  },
});

export default App;
