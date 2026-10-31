import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Platform, StatusBar, useColorScheme} from 'react-native';
import type {RemoteMessage} from '@react-native-firebase/messaging';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NamePromptModal} from './components/NamePromptModal';
import {VoiceAssistantProvider} from './components/VoiceAssistant';
import {colors} from './config/theme';
import {ProfileProvider, useProfile} from './features/profile/context/ProfileProvider';
import {navigationRef} from './navigation/navigationRef';
import {RootNavigator} from './navigation/RootNavigator';
import {initializeI18n} from './i18n';
import {LanguageSwitchProvider} from './providers/LanguageSwitchProvider';
import {
  resolveSyunikDestination,
  type AssistantDestination,
} from './data/assistantLocations';
import {loadNotificationsEnabled} from './features/profile/services/profileStorage';
import {
  getInitialNotification,
  logInstallationId,
  setFirebaseNotificationsEnabled,
  subscribeToForegroundNotifications,
  subscribeToNotificationOpenedApp,
} from './services/notificationService';

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [isI18nReady, setIsI18nReady] = useState(false);

  useEffect(() => {
    initializeI18n()
      .catch(error => console.error('Could not initialize translations.', error))
      .finally(() => setIsI18nReady(true));
  }, []);

  if (!isI18nReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <ProfileProvider>
        <LanguageSwitchProvider>
          <AppContent />
        </LanguageSwitchProvider>
      </ProfileProvider>
    </SafeAreaProvider>
  );
}

function AppContent() {
  const [hasEnteredApp, setHasEnteredApp] = useState(false);
  const pendingNotificationRef = useRef<RemoteMessage | null>(null);
  const handleNotificationOpenedRef =
    useRef<((message: RemoteMessage) => void) | null>(null);
  const {isLoaded, saveName, shouldPromptForName, skipNamePrompt} = useProfile();

  const handleNotificationOpened = useCallback(
    (message: RemoteMessage) => {
      if (!hasEnteredApp) {
        pendingNotificationRef.current = message;
        return;
      }

      const destinationName = message.data?.destination;
      if (typeof destinationName !== 'string') {
        return;
      }

      const destination = resolveSyunikDestination(destinationName);
      if (destination) {
        navigateToAssistantDestination(destination);
      }
    },
    [hasEnteredApp],
  );
  handleNotificationOpenedRef.current = handleNotificationOpened;

  useEffect(() => {
    if (Platform.OS !== 'ios') {
      return;
    }

    logInstallationId();
    const unsubscribeFromMessages = subscribeToForegroundNotifications();
    const unsubscribeFromNotificationOpens =
      subscribeToNotificationOpenedApp(message =>
        handleNotificationOpenedRef.current?.(message),
      );

    getInitialNotification()
      .then(message => {
        if (message) {
          handleNotificationOpenedRef.current?.(message);
        }
      })
      .catch(error => {
        console.error('Could not handle the notification that opened the app.', error);
      });

    loadNotificationsEnabled()
      .then(enabled => setFirebaseNotificationsEnabled(enabled, false))
      .catch(error => {
        console.error('Could not initialize Firebase notification settings.', error);
      });

    return () => {
      unsubscribeFromMessages();
      unsubscribeFromNotificationOpens();
    };
  }, []);

  useEffect(() => {
    if (!hasEnteredApp || !pendingNotificationRef.current) {
      return;
    }

    const message = pendingNotificationRef.current;
    pendingNotificationRef.current = null;
    handleNotificationOpened(message);
  }, [handleNotificationOpened, hasEnteredApp]);

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
