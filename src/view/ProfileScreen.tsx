import React, {useEffect, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';

type ProfileScreenProps = {
  name: string;
  onBack: () => void;
  onSaveName: (name: string) => void;
};

export function ProfileScreen({name, onBack, onSaveName}: ProfileScreenProps) {
  const [draftName, setDraftName] = useState(name);

  useEffect(() => {
    setDraftName(name);
  }, [name]);

  const saveName = () => {
    const nextName = draftName.trim();
    if (nextName) {
      onSaveName(nextName);
    }
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
        Add your name so your travel companion can welcome you personally.
      </Text>
      <View style={styles.card}>
        <Text style={styles.label}>Your name</Text>
        <TextInput
          value={draftName}
          onChangeText={setDraftName}
          placeholder="Enter your name"
          placeholderTextColor="#9a9a92"
          autoCapitalize="words"
          returnKeyType="done"
          style={styles.input}
          accessibilityLabel="Your name"
        />
        <Pressable
          onPress={saveName}
          disabled={!draftName.trim()}
          style={({pressed}) => [
            styles.saveButton,
            !draftName.trim() && styles.disabledButton,
            pressed && styles.pressedButton,
          ]}>
          <Text style={styles.saveButtonText}>Save name</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flexGrow: 1, padding: 20, backgroundColor: '#f6efe6'},
  backButton: {alignSelf: 'flex-start', marginBottom: 30},
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
  card: {padding: 16, borderRadius: 18, backgroundColor: '#fffdf8', borderWidth: 1, borderColor: '#e8dccb'},
  label: {color: '#2f3e2f', fontSize: 13, fontWeight: '800', marginBottom: 8},
  input: {
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d8d0c4',
    paddingHorizontal: 14,
    color: '#2f3e2f',
    fontSize: 16,
    backgroundColor: '#fff',
  },
  saveButton: {alignItems: 'center', borderRadius: 12, backgroundColor: '#2D4A3E', marginTop: 14, paddingVertical: 14},
  disabledButton: {opacity: 0.45},
  pressedButton: {opacity: 0.8},
  saveButtonText: {color: '#fff', fontSize: 15, fontWeight: '800'},
});
