import React, {useState} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NamePromptModal} from './components/NamePromptModal';
import {VoiceAssistantProvider} from './components/VoiceAssistant';
import {colors} from './config/theme';
import {ProfileProvider, useProfile} from './features/profile/context/ProfileProvider';
import {navigationRef} from './navigation/navigationRef';
import {RootNavigator} from './navigation/RootNavigator';
import type {AssistantDestination} from './data/assistantLocations';

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <ProfileProvider>
        <AppContent />
      </ProfileProvider>
    </SafeAreaProvider>
  );
}

function AppContent() {
  const [hasEnteredApp, setHasEnteredApp] = useState(false);
  const {isLoaded, saveName, shouldPromptForName, skipNamePrompt} = useProfile();

  return (
    <NavigationContainer ref={navigationRef}>
      <VoiceAssistantProvider onNavigate={navigateToAssistantDestination}>
        <RootNavigator onInitialComplete={() => setHasEnteredApp(true)} />
      </VoiceAssistantProvider>
      {isLoaded && hasEnteredApp && (
        <NamePromptModal
          visible={shouldPromptForName}
          onSave={saveName}
          onSkip={skipNamePrompt}
        />
      )}
    </NavigationContainer>
  );
}

function navigateToAssistantDestination(destination: AssistantDestination) {
  if (!navigationRef.isReady()) {
    return;
  }

  if (destination.kind === 'city') {
    navigationRef.navigate('MainTabs', {
      screen: 'Home',
      params: {screen: 'CityDetail', params: {city: destination.id}},
    });
    return;
  }

  navigationRef.navigate('MainTabs', {
    screen: 'Explore',
    params: {screen: 'VillageDetail', params: {village: destination.id}},
  });
}
