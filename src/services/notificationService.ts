import {Alert, Platform} from 'react-native';
import {
  AuthorizationStatus,
  getMessaging,
  type Messaging,
  type RemoteMessage,
} from '@react-native-firebase/messaging';
import {
  getInstallations,
  getId,
} from '@react-native-firebase/installations';

function hasNotificationPermission(status: number): boolean {
  return (
    status === AuthorizationStatus.AUTHORIZED ||
    status === AuthorizationStatus.PROVISIONAL
  );
}

export async function logInstallationId() {
  try {
    const id = await getId(getInstallations());
    console.log('Firebase Installation ID:', id);
  } catch (e) {
    console.log('Installation ID error:', e);
  }
}

function getIOSMessaging(): Messaging | null {
  return Platform.OS === 'ios' ? getMessaging() : null;
}

let remoteMessagesRegistration: Promise<void> | null = null;

export function subscribeToForegroundNotifications(): () => void {
  const messaging = getIOSMessaging();
  if (!messaging) {
    return () => {};
  }

  return messaging.onMessage((message: RemoteMessage) => {
    const notification = message.notification;
    if (!notification?.title && !notification?.body) {
      return;
    }

    Alert.alert(
      notification.title ?? 'Syunik Dreams',
      notification.body ?? '',
    );
  });
}

export function subscribeToNotificationOpenedApp(
  onNotificationOpened: (message: RemoteMessage) => void,
): () => void {
  try {
    return getMessaging().onNotificationOpenedApp(onNotificationOpened);
  } catch (error) {
    console.error('Could not subscribe to notification-open events.', error);
    throw error;
  }
}

export async function getInitialNotification(): Promise<RemoteMessage | null> {
  try {
    return await getMessaging().getInitialNotification();
  } catch (error) {
    console.error('Could not retrieve the initial notification.', error);
    throw error;
  }
}

async function registerIfNeeded(messaging: Messaging): Promise<void> {
  if (
    Platform.OS !== 'ios' ||
    messaging.isDeviceRegisteredForRemoteMessages
  ) {
    return;
  }

  if (!remoteMessagesRegistration) {
    const registration = messaging.registerDeviceForRemoteMessages();
    remoteMessagesRegistration = registration;
    try {
      await registration;
    } finally {
      if (remoteMessagesRegistration === registration) {
        remoteMessagesRegistration = null;
      }
    }
    return;
  }

  await remoteMessagesRegistration;
}

export async function requestNotificationPermission(): Promise<boolean> {
  try {
    const messaging = getIOSMessaging();
    if (!messaging) {
      return false;
    }
    return hasNotificationPermission(await messaging.requestPermission());
  } catch (error) {
    console.error('Could not request notification permission.', error);
    throw error;
  }
}

export async function registerDeviceForRemoteMessagesIfNeeded(): Promise<void> {
  try {
    const messaging = getIOSMessaging();
    if (!messaging) {
      return;
    }
    await registerIfNeeded(messaging);
  } catch (error) {
    console.error('Could not register for remote messages.', error);
    throw error;
  }
}

export async function getFcmToken(): Promise<string> {
  try {
    const messaging = getMessaging();
    await registerIfNeeded(messaging);
    return await messaging.getToken();
  } catch (error) {
    console.error('Could not retrieve the FCM token.', error);
    throw error;
  }
}

export function subscribeToFcmTokenRefresh(
  onToken: (token: string) => void | Promise<void>,
): () => void {
  try {
    return getMessaging().onTokenRefresh(token => {
      Promise.resolve()
        .then(() => onToken(token))
        .catch(error => {
          console.error('FCM token refresh handler failed.', error);
        });
    });
  } catch (error) {
    console.error('Could not subscribe to FCM token refresh events.', error);
    throw error;
  }
}

export async function setFirebaseNotificationsEnabled(
  enabled: boolean,
  requestPermission = true,
): Promise<boolean> {
  if (Platform.OS !== 'ios') {
    return enabled;
  }

  try {
    const messaging = getMessaging();
    if (!enabled) {
      await messaging.setAutoInitEnabled(false);
      await messaging.deleteToken();
      return false;
    }

    const authorizationStatus = requestPermission
      ? await messaging.requestPermission()
      : await messaging.hasPermission();

    if (!hasNotificationPermission(authorizationStatus)) {
      await messaging.setAutoInitEnabled(false);
      await messaging.deleteToken();
      return false;
    }

    await messaging.setAutoInitEnabled(true);
    await registerIfNeeded(messaging);
    await messaging.getToken();
    return true;
  } catch (error) {
    console.error('Could not update Firebase notification settings.', error);
    throw error;
  }
}
