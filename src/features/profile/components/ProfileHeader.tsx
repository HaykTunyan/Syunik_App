import React from 'react';
import {Camera} from 'lucide-react-native';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../config/theme';
import {profileStrings} from '../strings';

type ProfileHeaderProps = {
  name: string;
  photoUri: string | null;
  onChoosePhoto: () => void;
};

function getInitials(name: string): string {
  const initials = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part.charAt(0).toUpperCase())
    .join('');

  return initials || 'S';
}

export function ProfileHeader({name, photoUri, onChoosePhoto}: ProfileHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        {photoUri ? (
          <Image source={{uri: photoUri}} style={styles.photo} accessibilityLabel={profileStrings.photoLabel} />
        ) : (
          <Text style={styles.initials}>{getInitials(name)}</Text>
        )}
        <Pressable
          onPress={onChoosePhoto}
          style={({pressed}) => [styles.cameraButton, pressed && styles.pressed]}
          accessibilityRole="button"
          accessibilityLabel={profileStrings.changePhoto}
          hitSlop={4}>
          <Camera size={18} color={colors.white} />
        </Pressable>
      </View>
      <View style={styles.identity}>
        <Text style={styles.name}>{name.trim() || profileStrings.traveler}</Text>
        <Text style={styles.subtitle}>{profileStrings.profileSubtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 20},
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brand,
  },
  photo: {width: 84, height: 84, borderRadius: 42},
  initials: {color: colors.white, fontSize: 30, fontWeight: '800'},
  cameraButton: {
    position: 'absolute',
    right: -4,
    bottom: -4,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
    borderWidth: 3,
    borderColor: colors.background,
  },
  pressed: {opacity: 0.78},
  identity: {flex: 1},
  name: {color: colors.text, fontSize: 22, fontWeight: '800'},
  subtitle: {color: colors.textSecondary, fontSize: 14, marginTop: 5},
});