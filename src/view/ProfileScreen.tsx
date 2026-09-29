import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Heart, MapPin, Plus, X} from 'lucide-react-native';
import {Pressable, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';

type Visit = {
  id: string;
  place: string;
  visitedAt: string;
};

const PROFILE_EMAIL_KEY = 'syunik.profile.email';
const PROFILE_PHONE_KEY = 'syunik.profile.phone';
const PROFILE_FAVORITES_KEY = 'syunik.profile.favorites';
const PROFILE_VISITS_KEY = 'syunik.profile.visits';

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
            typeof item?.visitedAt === 'string',
        )
      : [];
  } catch {
    return [];
  }
}

type ProfileScreenProps = {
  name: string;
  onBack: () => void;
  onSaveName: (name: string) => void;
};

export function ProfileScreen({name, onBack, onSaveName}: ProfileScreenProps) {
  const [draftName, setDraftName] = useState(name);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [favoriteDraft, setFavoriteDraft] = useState('');
  const [visitDraft, setVisitDraft] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [isProfileDataLoaded, setIsProfileDataLoaded] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setDraftName(name);
  }, [name]);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const [savedEmail, savedPhone, savedFavorites, savedVisits] = await Promise.all([
          AsyncStorage.getItem(PROFILE_EMAIL_KEY),
          AsyncStorage.getItem(PROFILE_PHONE_KEY),
          AsyncStorage.getItem(PROFILE_FAVORITES_KEY),
          AsyncStorage.getItem(PROFILE_VISITS_KEY),
        ]);
        setEmail(savedEmail ?? '');
        setPhone(savedPhone ?? '');
        setFavorites(parseStringList(savedFavorites));
        setVisits(parseVisits(savedVisits));
      } catch {
        setMessage('Could not load saved profile details.');
      } finally {
        setIsProfileDataLoaded(true);
      }
    };

    loadProfileData();
  }, []);

  const saveName = () => {
    const nextName = draftName.trim();
    if (!nextName) {
      setMessage('Enter your name before saving.');
      return;
    }

    if (email.trim() && !/^\S+@\S+\.\S+$/.test(email.trim())) {
      setMessage('Enter a valid email address.');
      return;
    }

    onSaveName(nextName);
    Promise.all([
      AsyncStorage.setItem(PROFILE_EMAIL_KEY, email.trim()),
      AsyncStorage.setItem(PROFILE_PHONE_KEY, phone.trim()),
    ])
      .then(() => setMessage('Profile details saved.'))
      .catch(() => setMessage('Could not save profile details.'));
  };

  const addFavorite = () => {
    const place = favoriteDraft.trim();
    if (!place || favorites.some(item => item.toLowerCase() === place.toLowerCase())) {
      return;
    }

    const nextFavorites = [...favorites, place];
    setFavorites(nextFavorites);
    setFavoriteDraft('');
    AsyncStorage.setItem(PROFILE_FAVORITES_KEY, JSON.stringify(nextFavorites)).catch(() =>
      setMessage('Could not save favorite place.'),
    );
  };

  const removeFavorite = (place: string) => {
    const nextFavorites = favorites.filter(item => item !== place);
    setFavorites(nextFavorites);
    AsyncStorage.setItem(PROFILE_FAVORITES_KEY, JSON.stringify(nextFavorites)).catch(() =>
      setMessage('Could not update favorite places.'),
    );
  };

  const addVisit = () => {
    const place = visitDraft.trim();
    if (!place) {
      return;
    }

    const nextVisits = [
      {id: `${Date.now()}`, place, visitedAt: new Date().toISOString()},
      ...visits,
    ];
    setVisits(nextVisits);
    setVisitDraft('');
    AsyncStorage.setItem(PROFILE_VISITS_KEY, JSON.stringify(nextVisits)).catch(() =>
      setMessage('Could not save visiting history.'),
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Pressable onPress={onBack} style={styles.backButton} accessibilityRole="button">
        <Text style={styles.backButtonText}>← Back</Text>
      </Pressable>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{(draftName.trim() || 'S').charAt(0).toUpperCase()}</Text>
      </View>
      <Text style={styles.eyebrow}>YOUR TRAVEL PROFILE</Text>
      <Text style={styles.title}>Make Syunik yours</Text>
      <Text style={styles.description}>
        Keep your contact details and the places you love in one place.
      </Text>
      <View style={styles.card}>
        <Text style={styles.label}>Your name</Text>
        <TextInput value={draftName} onChangeText={setDraftName} placeholder="Enter your name" placeholderTextColor="#9a9a92" autoCapitalize="words" returnKeyType="next" style={styles.input} accessibilityLabel="Your name" />
        <Text style={styles.label}>Email</Text>
        <TextInput value={email} onChangeText={setEmail} placeholder="you@example.com" placeholderTextColor="#9a9a92" autoCapitalize="none" autoComplete="email" keyboardType="email-address" returnKeyType="next" style={styles.input} accessibilityLabel="Email address" />
        <Text style={styles.label}>Phone number</Text>
        <TextInput value={phone} onChangeText={setPhone} placeholder="Add your phone number" placeholderTextColor="#9a9a92" autoComplete="tel" keyboardType="phone-pad" returnKeyType="done" style={styles.input} accessibilityLabel="Phone number" />
        <Pressable
          onPress={saveName}
          disabled={!isProfileDataLoaded}
          style={({pressed}) => [
            styles.saveButton,
            !isProfileDataLoaded && styles.disabledButton,
            pressed && styles.pressedButton,
          ]}>
          <Text style={styles.saveButtonText}>Save profile</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeading}>
          <Heart size={19} color="#b84f3c" />
          <Text style={styles.sectionTitle}>Favorite places</Text>
        </View>
        <Text style={styles.sectionDescription}>Keep a list of places you want to remember.</Text>
        <View style={styles.addRow}>
          <TextInput value={favoriteDraft} onChangeText={setFavoriteDraft} placeholder="Add a favorite place" placeholderTextColor="#9a9a92" returnKeyType="done" onSubmitEditing={addFavorite} style={[styles.input, styles.addInput]} accessibilityLabel="Favorite place" />
          <Pressable onPress={addFavorite} disabled={!isProfileDataLoaded || !favoriteDraft.trim()} style={({pressed}) => [styles.addButton, (!isProfileDataLoaded || !favoriteDraft.trim()) && styles.disabledButton, pressed && styles.pressedButton]} accessibilityRole="button" accessibilityLabel="Add favorite place">
            <Plus size={20} color="#fff" />
          </Pressable>
        </View>
        {favorites.length ? favorites.map(place => (
          <View key={place} style={styles.listRow}>
            <Text style={styles.listText}>{place}</Text>
            <Pressable onPress={() => removeFavorite(place)} hitSlop={8} accessibilityRole="button" accessibilityLabel={`Remove ${place} from favorites`}>
              <X size={18} color="#738767" />
            </Pressable>
          </View>
        )) : <Text style={styles.emptyText}>No favorite places added yet.</Text>}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeading}>
          <MapPin size={19} color="#4b6b3b" />
          <Text style={styles.sectionTitle}>Visiting history</Text>
        </View>
        <Text style={styles.sectionDescription}>Add places you have visited to keep a dated record.</Text>
        <View style={styles.addRow}>
          <TextInput value={visitDraft} onChangeText={setVisitDraft} placeholder="Place you visited" placeholderTextColor="#9a9a92" returnKeyType="done" onSubmitEditing={addVisit} style={[styles.input, styles.addInput]} accessibilityLabel="Visited place" />
          <Pressable onPress={addVisit} disabled={!isProfileDataLoaded || !visitDraft.trim()} style={({pressed}) => [styles.addButton, (!isProfileDataLoaded || !visitDraft.trim()) && styles.disabledButton, pressed && styles.pressedButton]} accessibilityRole="button" accessibilityLabel="Add to visiting history">
            <Plus size={20} color="#fff" />
          </Pressable>
        </View>
        {visits.length ? visits.map(visit => (
          <View key={visit.id} style={styles.visitRow}>
            <Text style={styles.listText}>{visit.place}</Text>
            <Text style={styles.visitDate}>{new Date(visit.visitedAt).toLocaleDateString()}</Text>
          </View>
        )) : <Text style={styles.emptyText}>Your visited places will appear here.</Text>}
      </View>
      {!!message && <Text accessibilityRole="text" style={styles.message}>{message}</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flexGrow: 1, padding: 20, paddingBottom: 36, backgroundColor: '#f6efe6'},
  backButton: {alignSelf: 'flex-start', marginBottom: 24},
  backButtonText: {color: '#4b6b3b', fontSize: 15, fontWeight: '700'},
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2D4A3E',
    marginBottom: 20,
  },
  avatarText: {color: '#fff', fontSize: 36, fontWeight: '800'},
  eyebrow: {color: '#738767', fontSize: 11, fontWeight: '800', letterSpacing: 1.2},
  title: {color: '#2f3e2f', fontSize: 30, fontWeight: '800', marginTop: 7},
  description: {color: '#586254', fontSize: 15, lineHeight: 22, marginTop: 10, marginBottom: 24},
  card: {padding: 16, borderRadius: 8, backgroundColor: '#fffdf8', borderWidth: 1, borderColor: '#e8dccb'},
  label: {color: '#2f3e2f', fontSize: 13, fontWeight: '800', marginBottom: 8},
  input: {
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d8d0c4',
    paddingHorizontal: 14,
    color: '#2f3e2f',
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  saveButton: {alignItems: 'center', borderRadius: 8, backgroundColor: '#2D4A3E', marginTop: 2, paddingVertical: 14},
  disabledButton: {opacity: 0.45},
  pressedButton: {opacity: 0.8},
  saveButtonText: {color: '#fff', fontSize: 15, fontWeight: '800'},
  section: {marginTop: 28},
  sectionHeading: {flexDirection: 'row', alignItems: 'center', gap: 9},
  sectionTitle: {color: '#2f3e2f', fontSize: 19, fontWeight: '800'},
  sectionDescription: {color: '#586254', fontSize: 14, lineHeight: 20, marginTop: 6, marginBottom: 14},
  addRow: {flexDirection: 'row', alignItems: 'flex-start', gap: 10},
  addInput: {flex: 1, marginBottom: 10},
  addButton: {width: 50, height: 50, borderRadius: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: '#2D4A3E'},
  listRow: {minHeight: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#d8d0c4'},
  visitRow: {minHeight: 54, justifyContent: 'center', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#d8d0c4'},
  listText: {flexShrink: 1, color: '#2f3e2f', fontSize: 15, fontWeight: '600'},
  visitDate: {color: '#738767', fontSize: 12, marginTop: 3},
  emptyText: {color: '#77786e', fontSize: 14, paddingVertical: 10},
  message: {color: '#4b6b3b', fontSize: 13, marginTop: 18},
});
