import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';

const PROFILE_NAME_KEY = 'syunik.profile.name';
const PROFILE_PROMPT_SHOWN_KEY = 'syunik.profile.promptShown';

type ProfileContextValue = {
  name: string;
  isLoaded: boolean;
  shouldPromptForName: boolean;
  saveName: (name: string) => Promise<void>;
  skipNamePrompt: () => Promise<void>;
};

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({children}: {children: React.ReactNode}) {
  const [name, setName] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldPromptForName, setShouldPromptForName] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      try {
        const [savedName, promptShown] = await Promise.all([
          AsyncStorage.getItem(PROFILE_NAME_KEY),
          AsyncStorage.getItem(PROFILE_PROMPT_SHOWN_KEY),
        ]);

        if (isMounted) {
          setName(savedName ?? '');
          setShouldPromptForName(!savedName && promptShown !== 'true');
        }
      } catch {
        // The app remains usable if local profile storage is temporarily unavailable.
        if (isMounted) {
          setName('');
          setShouldPromptForName(false);
        }
      } finally {
        if (isMounted) {
          setIsLoaded(true);
        }
      }
    }

    loadProfile();
    return () => {
      isMounted = false;
    };
  }, []);

  const saveName = useCallback(async (nextName: string) => {
    await Promise.all([
      AsyncStorage.setItem(PROFILE_NAME_KEY, nextName),
      AsyncStorage.setItem(PROFILE_PROMPT_SHOWN_KEY, 'true'),
    ]);
    setName(nextName);
    setShouldPromptForName(false);
  }, []);

  const skipNamePrompt = useCallback(async () => {
    await AsyncStorage.setItem(PROFILE_PROMPT_SHOWN_KEY, 'true');
    setShouldPromptForName(false);
  }, []);

  const value = useMemo(
    () => ({name, isLoaded, shouldPromptForName, saveName, skipNamePrompt}),
    [isLoaded, name, saveName, shouldPromptForName, skipNamePrompt],
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider.');
  }

  return context;
}
