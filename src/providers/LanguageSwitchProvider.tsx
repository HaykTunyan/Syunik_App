import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useCallback, useContext, useMemo, useState} from 'react';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import i18n, {LANGUAGE_STORAGE_KEY, normalizeLanguage, type AppLanguage} from '../i18n';
import {setProfileStringsLanguage} from '../features/profile/strings';

type LanguageSwitchContextValue = {
  currentLanguage: AppLanguage;
  changeLanguage: (language: string) => Promise<void>;
};

const LanguageSwitchContext = createContext<LanguageSwitchContextValue | null>(null);

export function LanguageSwitchProvider({children}: {children: React.ReactNode}) {
  const {i18n: translationI18n} = useTranslation();
  const [isSwitching, setIsSwitching] = useState(false);
  const currentLanguage = normalizeLanguage(translationI18n.language);

  const changeLanguage = useCallback(async (language: string) => {
    const nextLanguage = normalizeLanguage(language);
    const previousLanguage = normalizeLanguage(i18n.language);
    if (nextLanguage === previousLanguage) {
      return;
    }

    setIsSwitching(true);
    const startedAt = Date.now();
    try {
      await i18n.changeLanguage(nextLanguage);
      setProfileStringsLanguage(nextLanguage === 'hy' ? 'HY' : nextLanguage === 'ru' ? 'RU' : 'EN');
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
      const remaining = 400 - (Date.now() - startedAt);
      if (remaining > 0) {
        await new Promise<void>(resolve => setTimeout(resolve, remaining));
      }
    } catch (error) {
      await i18n.changeLanguage(previousLanguage);
      setProfileStringsLanguage(previousLanguage === 'hy' ? 'HY' : previousLanguage === 'ru' ? 'RU' : 'EN');
      throw error;
    } finally {
      setIsSwitching(false);
    }
  }, []);

  const value = useMemo(() => ({currentLanguage, changeLanguage}), [changeLanguage, currentLanguage]);

  return (
    <LanguageSwitchContext.Provider value={value}>
      {children}
      <Modal transparent animationType="fade" statusBarTranslucent visible={isSwitching}>
        <View style={styles.overlay}>
          <ActivityIndicator accessibilityLabel="Changing language" color="#ffffff" size="large" />
        </View>
      </Modal>
    </LanguageSwitchContext.Provider>
  );
}

export function useLanguageSwitch() {
  const context = useContext(LanguageSwitchContext);
  if (!context) {
    throw new Error('useLanguageSwitch must be used within a LanguageSwitchProvider.');
  }
  return context;
}

const styles = StyleSheet.create({
  overlay: {alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.82)', flex: 1, justifyContent: 'center'},
});
