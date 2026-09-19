import React, {useState} from 'react';
import {Modal, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';

type NamePromptModalProps = {
  visible: boolean;
  onSave: (name: string) => void;
  onSkip: () => void;
};

export function NamePromptModal({visible, onSave, onSkip}: NamePromptModalProps) {
  const [name, setName] = useState('');
  const save = () => {
    const trimmedName = name.trim();
    if (trimmedName) onSave(trimmedName);
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onSkip}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.eyebrow}>WELCOME TO SYUNIK</Text>
          <Text style={styles.title}>What should we call you?</Text>
          <Text style={styles.description}>Tell us your name to make your travel companion feel more personal.</Text>
          <TextInput
            autoFocus
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            placeholderTextColor="#9a9a92"
            autoCapitalize="words"
            style={styles.input}
          />
          <Pressable onPress={save} disabled={!name.trim()} style={[styles.saveButton, !name.trim() && styles.disabledButton]}>
            <Text style={styles.saveButtonText}>Continue</Text>
          </Pressable>
          <Pressable onPress={onSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Maybe later</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: 'rgba(20, 29, 22, 0.52)'},
  card: {width: '100%', borderRadius: 22, padding: 22, backgroundColor: '#fcfaf5'},
  eyebrow: {color: '#738767', fontSize: 10, fontWeight: '800', letterSpacing: 1.2},
  title: {color: '#2f3e2f', fontSize: 25, fontWeight: '800', marginTop: 8},
  description: {color: '#586254', fontSize: 14, lineHeight: 20, marginTop: 8, marginBottom: 18},
  input: {height: 50, borderRadius: 12, borderWidth: 1, borderColor: '#d8d0c4', paddingHorizontal: 14, color: '#2f3e2f', fontSize: 16, backgroundColor: '#fff'},
  saveButton: {alignItems: 'center', borderRadius: 12, backgroundColor: '#2D4A3E', marginTop: 14, paddingVertical: 14},
  disabledButton: {opacity: 0.45},
  saveButtonText: {color: '#fff', fontSize: 15, fontWeight: '800'},
  skipButton: {alignItems: 'center', paddingVertical: 14},
  skipText: {color: '#6c716c', fontSize: 14, fontWeight: '700'},
});
