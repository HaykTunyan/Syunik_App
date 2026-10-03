import React from 'react';
import {CircleAlert, RefreshCw} from 'lucide-react-native';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../config/theme';
import {profileStrings} from '../strings';

export function ProfileSkeleton() {
  return (
    <View style={styles.skeleton} accessibilityLabel={profileStrings.common.loading}>
      <View style={styles.headerRow}>
        <View style={styles.avatarBlock} />
        <View style={styles.identityBlock}>
          <View style={[styles.line, styles.nameLine]} />
          <View style={[styles.line, styles.subtitleLine]} />
        </View>
      </View>
      <View style={styles.statsRow}>
        {[0, 1, 2].map(item => <View key={item} style={styles.statBlock} />)}
      </View>
      <View style={styles.formBlock}>
        {[0, 1, 2].map(item => (
          <View key={item}>
            <View style={[styles.line, styles.labelLine]} />
            <View style={styles.inputBlock} />
          </View>
        ))}
      </View>
    </View>
  );
}

type ProfileErrorStateProps = {
  message: string;
  onRetry: () => void;
};

export function ProfileErrorState({message, onRetry}: ProfileErrorStateProps) {
  return (
    <View style={styles.errorState}>
      <CircleAlert size={26} color={colors.accent} />
      <Text style={styles.errorText}>{message}</Text>
      <Pressable
        onPress={onRetry}
        style={({pressed}) => [styles.retryButton, pressed && styles.pressed]}
        accessibilityRole="button">
        <RefreshCw size={17} color={colors.white} />
        <Text style={styles.retryText}>{profileStrings.common.retry}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  skeleton: {paddingTop: 6},
  headerRow: {flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 20},
  avatarBlock: {width: 84, height: 84, borderRadius: 42, backgroundColor: colors.border},
  identityBlock: {flex: 1, gap: 10},
  line: {borderRadius: 6, backgroundColor: colors.border},
  nameLine: {width: '68%', height: 22},
  subtitleLine: {width: '48%', height: 14},
  statsRow: {flexDirection: 'row', gap: 10, marginBottom: 24},
  statBlock: {flex: 1, height: 72, borderRadius: 8, backgroundColor: colors.border},
  formBlock: {padding: 16, borderRadius: 8, backgroundColor: colors.surface},
  labelLine: {width: '28%', height: 13, marginBottom: 8},
  inputBlock: {height: 48, borderRadius: 8, backgroundColor: colors.background, marginBottom: 18},
  errorState: {minHeight: 240, alignItems: 'center', justifyContent: 'center', padding: 24},
  errorText: {color: colors.text, fontSize: 15, textAlign: 'center', marginTop: 12},
  retryButton: {minHeight: 46, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 8, backgroundColor: colors.brand, paddingHorizontal: 18, marginTop: 16},
  retryText: {color: colors.white, fontSize: 14, fontWeight: '800'},
  pressed: {opacity: 0.8},
});