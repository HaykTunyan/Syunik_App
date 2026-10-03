import React, {useCallback, useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import {ProfileHeader} from '../features/profile/components/ProfileHeader';
import {StatsRow} from '../features/profile/components/StatsRow';
import {PersonalInfoCard} from '../features/profile/components/PersonalInfoCard';
import {useProfileForm} from '../features/profile/hooks/useProfileForm';
import {profileStrings} from '../features/profile/strings';
import {FavoritePlaces} from '../features/profile/components/FavoritePlaces';
import {VisitHistory, type Visit} from '../features/profile/components/VisitHistory';
import {ProfileErrorState, ProfileSkeleton} from '../features/profile/components/ProfileLoadingState';
import {SettingsList} from '../features/profile/components/SettingsList';
import type {Place} from '../features/profile/data/places';
import {
  loadProfileData as loadStoredProfileData,
  loadFavorites,
  saveFavorites,
  savePersonalInfo,
  saveProfilePhoto,
  saveProfileSettings,
  saveVisits,
  type ProfileLanguage,
} from '../features/profile/services/profileStorage';
import {colors} from '../config/theme';

type ProfileScreenProps = {
  name: string;
  onSaveName: (name: string) => Promise<void>;
  onBrowsePlaces: () => void;
};

export function ProfileScreen({name, onSaveName, onBrowsePlaces}: ProfileScreenProps) {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [isProfileDataLoaded, setIsProfileDataLoaded] = useState(false);
  const [loadingError, setLoadingError] = useState('');
  const [language, setLanguage] = useState<ProfileLanguage>('EN');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [message, setMessage] = useState('');
  const {
    values,
    errors,
    submitError,
    isEditing,
    isSaving,
    hydrate,
    setField,
    beginEditing,
    cancelEditing,
    save: saveForm,
  } = useProfileForm({
    initialName: name,
    onSave: async nextValues => {
      await Promise.all([
        onSaveName(nextValues.name),
        savePersonalInfo(nextValues),
      ]);
    },
  });

  const loadProfile = useCallback(async () => {
    setIsProfileDataLoaded(false);
    setLoadingError('');
    try {
      const stored = await loadStoredProfileData();
      hydrate({
        name,
        email: stored.email,
        phone: stored.phone,
        countryCode: stored.countryCode,
      });
      setPhotoUri(stored.photoUri);
      setFavorites(stored.favorites);
      setVisits(stored.visits);
      setLanguage(stored.language);
      setNotificationsEnabled(stored.notificationsEnabled);
      setMessage('');
    } catch {
      setLoadingError(profileStrings.common.loadError);
    } finally {
      setIsProfileDataLoaded(true);
    }
  }, [hydrate, name]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      loadFavorites()
        .then(savedFavorites => {
          if (isActive) {
            setFavorites(savedFavorites);
          }
        })
        .catch(() => {
          if (isActive) {
            setMessage(profileStrings.favorites.exploreSaveError);
          }
        });

      return () => {
        isActive = false;
      };
    }, []),
  );

  const saveProfile = async () => {
    const saved = await saveForm();
    if (saved) {
      setMessage(profileStrings.personalInfo.saveSuccess);
    }
  };

  const chooseProfilePhoto = async () => {
    try {
      const result = await launchImageLibrary({mediaType: 'photo', selectionLimit: 1});
      if (result.didCancel) {
        return;
      }

      const selectedUri = result.assets?.[0]?.uri;
      if (result.errorCode || !selectedUri) {
        setMessage(result.errorMessage ?? profileStrings.photoSelectError);
        return;
      }

      await saveProfilePhoto(selectedUri);
      setPhotoUri(selectedUri);
      setMessage(profileStrings.photoUpdated);
    } catch {
      setMessage(profileStrings.photoSaveError);
    }
  };

  const addFavorite = async (place: Place) => {
    if (!isProfileDataLoaded) {
      return;
    }

    if (favorites.some(item => item.toLocaleLowerCase() === place.name.toLocaleLowerCase())) {
      setMessage(profileStrings.favorites.duplicate);
      return;
    }

    const nextFavorites = [...favorites, place.name];
    try {
      await saveFavorites(nextFavorites);
      setFavorites(nextFavorites);
      setMessage(profileStrings.favorites.added);
    } catch {
      setMessage(profileStrings.favorites.addError);
    }
  };

  const removeFavorite = async (place: string) => {
    const nextFavorites = favorites.filter(item => item !== place);
    try {
      await saveFavorites(nextFavorites);
      setFavorites(nextFavorites);
      setMessage(profileStrings.favorites.removed);
    } catch {
      setMessage(profileStrings.favorites.removeError);
    }
  };

  const addVisit = async (place: string, visitDate: Date): Promise<boolean> => {
    if (!isProfileDataLoaded) {
      return false;
    }

    const nextVisits = [
      ...visits,
      {id: `${Date.now()}`, place, visitedAt: visitDate.toISOString()},
    ].sort((left, right) => new Date(right.visitedAt).getTime() - new Date(left.visitedAt).getTime());
    try {
      await saveVisits(nextVisits);
      setVisits(nextVisits);
      setMessage(profileStrings.visits.added);
      return true;
    } catch {
      setMessage(profileStrings.visits.addError);
      return false;
    }
  };

  const removeVisit = async (id: string) => {
    const nextVisits = visits.filter(visit => visit.id !== id);
    try {
      await saveVisits(nextVisits);
      setVisits(nextVisits);
      setMessage(profileStrings.visits.deleted);
    } catch {
      setMessage(profileStrings.visits.removeError);
    }
  };

  const updateLanguage = async (nextLanguage: ProfileLanguage) => {
    try {
      await saveProfileSettings(nextLanguage, notificationsEnabled);
      setLanguage(nextLanguage);
    } catch {
      setMessage(profileStrings.settings.saveError);
    }
  };

  const updateNotifications = async (enabled: boolean) => {
    try {
      await saveProfileSettings(language, enabled);
      setNotificationsEnabled(enabled);
    } catch {
      setMessage(profileStrings.settings.saveError);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag">
      {!isProfileDataLoaded ? (
        <ProfileSkeleton />
      ) : loadingError ? (
        <ProfileErrorState message={loadingError} onRetry={loadProfile} />
      ) : (
        <>
          <ProfileHeader name={values.name} photoUri={photoUri} onChoosePhoto={chooseProfilePhoto} />
          <Text style={styles.description}>{profileStrings.description}</Text>
          <StatsRow visited={visits.length} favorites={favorites.length} badges={0} />
          <PersonalInfoCard
            values={values}
            errors={errors}
            submitError={submitError}
            isEditing={isEditing}
            isSaving={isSaving}
            onChange={setField}
            onBeginEditing={beginEditing}
            onCancel={cancelEditing}
            onSave={saveProfile}
          />
          <FavoritePlaces
            favorites={favorites}
            onAdd={addFavorite}
            onRemove={removeFavorite}
            onBrowsePlaces={onBrowsePlaces}
          />
          <VisitHistory visits={visits} onAdd={addVisit} onDelete={removeVisit} />
          <SettingsList
            language={language}
            notificationsEnabled={notificationsEnabled}
            onChangeLanguage={updateLanguage}
            onToggleNotifications={updateNotifications}
          />
        </>
      )}
      {!!message && <Text accessibilityRole="text" style={styles.message}>{message}</Text>}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {flex: 1},
  scrollView: {flex: 1},
  container: {flexGrow: 1, paddingHorizontal: 20, paddingTop: 24, paddingBottom: 140, backgroundColor: colors.background},
  description: {color: colors.textSecondary, fontSize: 15, lineHeight: 22, marginTop: 10, marginBottom: 24},
  message: {color: colors.brand, fontSize: 13, marginTop: 18},
});
