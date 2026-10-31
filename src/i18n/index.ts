import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeModules, Platform} from 'react-native';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './locales/en.json';
import hy from './locales/hy.json';
import ru from './locales/ru.json';

export const LANGUAGE_STORAGE_KEY = 'lang';
export const supportedLanguages = ['hy', 'en', 'ru'] as const;
export type AppLanguage = (typeof supportedLanguages)[number];

const resources = {hy: {translation: hy}, en: {translation: en}, ru: {translation: ru}} as const;

export function normalizeLanguage(language: string | null | undefined): AppLanguage {
  const code = language?.toLowerCase().split('-')[0];
  return code === 'hy' || code === 'ru' ? code : 'en';
}

function getDeviceLanguage(): string | undefined {
  const settingsManager: unknown = NativeModules.SettingsManager;
  if (Platform.OS === 'ios' && settingsManager && typeof settingsManager === 'object') {
    const settings = (settingsManager as {settings?: unknown}).settings;
    if (settings && typeof settings === 'object') {
      const locale = (settings as {AppleLocale?: unknown}).AppleLocale;
      if (typeof locale === 'string') return locale;
      const languages = (settings as {AppleLanguages?: unknown}).AppleLanguages;
      if (Array.isArray(languages) && typeof languages[0] === 'string') return languages[0];
    }
  }

  const i18nManager: unknown = NativeModules.I18nManager;
  if (i18nManager && typeof i18nManager === 'object') {
    const locale = (i18nManager as {localeIdentifier?: unknown}).localeIdentifier;
    if (typeof locale === 'string') return locale;
  }

  return undefined;
}

export async function initializeI18n(): Promise<void> {
  const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
  const deviceLanguage = getDeviceLanguage();
  const language = normalizeLanguage(savedLanguage ?? deviceLanguage);

  if (!i18n.isInitialized) {
    await i18n.use(initReactI18next).init({
      compatibilityJSON: 'v4',
      resources,
      lng: language,
      fallbackLng: 'en',
      interpolation: {escapeValue: false},
      react: {useSuspense: false},
    });
  } else {
    await i18n.changeLanguage(language);
  }
}

export default i18n;
