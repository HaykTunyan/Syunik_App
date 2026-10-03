import AsyncStorage from '@react-native-async-storage/async-storage';
import type {Visit} from '../components/VisitHistory';
import {phoneCountries} from '../data/phoneCountries';

export type ProfileLanguage = 'HY' | 'EN' | 'RU';

export type StoredProfileData = {
  email: string;
  phone: string;
  countryCode: string;
  photoUri: string | null;
  favorites: string[];
  visits: Visit[];
  language: ProfileLanguage;
  notificationsEnabled: boolean;
};

export type PersonalInfo = {
  email: string;
  phone: string;
  countryCode: string;
};

const keys = {
  email: 'syunik.profile.email',
  phone: 'syunik.profile.phone',
  countryCode: 'syunik.profile.countryCode',
  photo: 'syunik.profile.photo',
  favorites: 'syunik.profile.favorites',
  visits: 'syunik.profile.visits',
  language: 'syunik.profile.language',
  notifications: 'syunik.profile.notifications',
} as const;

function parseStringList(value: string | null): string[] {
  if (!value) {
    return [];
  }
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === 'string')
      : [];
  } catch {
    return [];
  }
}

function parseVisits(value: string | null): Visit[] {
  if (!value) {
    return [];
  }
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter(
          (item): item is Visit =>
            typeof item?.id === 'string' &&
            typeof item?.place === 'string' &&
            typeof item?.visitedAt === 'string' &&
            Number.isFinite(Date.parse(item.visitedAt)),
        )
      : [];
  } catch {
    return [];
  }
}

export async function loadProfileData(): Promise<StoredProfileData> {
  const [email, storedPhone, storedCountryCode, photoUri, favorites, visits, language, notifications] =
    await Promise.all([
      AsyncStorage.getItem(keys.email),
      AsyncStorage.getItem(keys.phone),
      AsyncStorage.getItem(keys.countryCode),
      AsyncStorage.getItem(keys.photo),
      AsyncStorage.getItem(keys.favorites),
      AsyncStorage.getItem(keys.visits),
      AsyncStorage.getItem(keys.language),
      AsyncStorage.getItem(keys.notifications),
    ]);

  const phoneCountry = phoneCountries.find(country => country.dialCode === storedCountryCode)
    ?? phoneCountries.find(country => storedPhone?.startsWith(country.dialCode))
    ?? phoneCountries[0];
  let phone = storedPhone?.startsWith(phoneCountry.dialCode)
    ? storedPhone.slice(phoneCountry.dialCode.length).replace(/\D/g, '')
    : (storedPhone ?? '').replace(/\D/g, '');
  if (phoneCountry.dialCode === '+374' && phone.length === 9 && phone.startsWith('0')) {
    phone = phone.slice(1);
  }

  return {
    email: email ?? '',
    phone,
    countryCode: phoneCountry.dialCode,
    photoUri,
    favorites: parseStringList(favorites),
    visits: parseVisits(visits).sort(
      (left, right) => Date.parse(right.visitedAt) - Date.parse(left.visitedAt),
    ),
    language: language === 'HY' || language === 'RU' ? language : 'EN',
    notificationsEnabled: notifications === 'true',
  };
}

export async function savePersonalInfo(info: PersonalInfo): Promise<void> {
  // TODO: Replace local persistence with the profile update API when an endpoint is available.
  await Promise.all([
    AsyncStorage.setItem(keys.email, info.email),
    AsyncStorage.setItem(keys.phone, `${info.countryCode}${info.phone}`),
    AsyncStorage.setItem(keys.countryCode, info.countryCode),
  ]);
}

export async function loadFavorites(): Promise<string[]> {
  return parseStringList(await AsyncStorage.getItem(keys.favorites));
}

export async function toggleFavorite(place: string): Promise<boolean> {
  const favorites = await loadFavorites();
  const normalizedPlace = place.trim();
  const isFavorite = favorites.some(
    favorite => favorite.toLocaleLowerCase() === normalizedPlace.toLocaleLowerCase(),
  );

  await saveFavorites(
    isFavorite
      ? favorites.filter(favorite => favorite.toLocaleLowerCase() !== normalizedPlace.toLocaleLowerCase())
      : [...favorites, normalizedPlace],
  );

  return !isFavorite;
}

export function saveProfilePhoto(photoUri: string): Promise<void> {
  return AsyncStorage.setItem(keys.photo, photoUri);
}

export function saveFavorites(favorites: string[]): Promise<void> {
  return AsyncStorage.setItem(keys.favorites, JSON.stringify(favorites));
}

export function saveVisits(visits: Visit[]): Promise<void> {
  return AsyncStorage.setItem(keys.visits, JSON.stringify(visits));
}

export function saveProfileSettings(language: ProfileLanguage, notificationsEnabled: boolean): Promise<void> {
  return Promise.all([
    AsyncStorage.setItem(keys.language, language),
    AsyncStorage.setItem(keys.notifications, String(notificationsEnabled)),
  ]).then(() => undefined);
}