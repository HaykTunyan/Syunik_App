import React from 'react';
import {AlertTriangle, Bell, Languages, LogOut, Trash2} from 'lucide-react-native';
import {Alert, Pressable, StyleSheet, Switch, Text, View} from 'react-native';
import {colors} from '../../../config/theme';
import type {ProfileLanguage} from '../services/profileStorage';
import {profileStrings} from '../strings';

type SettingsListProps = {
  language: ProfileLanguage;
  notificationsEnabled: boolean;
  onChangeLanguage: (language: ProfileLanguage) => void;
  onToggleNotifications: (enabled: boolean) => void;
};

const languages: ProfileLanguage[] = ['HY', 'EN', 'RU'];

export function SettingsList({
  language,
  notificationsEnabled,
  onChangeLanguage,
  onToggleNotifications,
}: SettingsListProps) {
  const confirmDeleteAccount = () => {
    Alert.alert(profileStrings.settings.deleteTitle, profileStrings.settings.deleteMessage, [
      {text: profileStrings.settings.cancel, style: 'cancel'},
      {
        text: profileStrings.settings.confirmDelete,
        style: 'destructive',
        onPress: () => Alert.alert(profileStrings.settings.deleteAccount, profileStrings.settings.deleteUnavailable),
      },
    ]);
  };

  return (
    <View style={styles.section}>
      <Text style={styles.title}>{profileStrings.settings.title}</Text>
      <View style={styles.settingRow}>
        <View style={styles.settingHeading}>
          <Languages size={18} color={colors.brand} />
          <Text style={styles.label}>{profileStrings.settings.language}</Text>
        </View>
        <View style={styles.languageOptions} accessibilityRole="radiogroup">
          {languages.map(option => (
            <Pressable
              key={option}
              onPress={() => onChangeLanguage(option)}
              style={[styles.languageOption, language === option && styles.languageSelected]}
              accessibilityRole="radio"
              accessibilityState={{selected: language === option}}
              accessibilityLabel={option}>
              <Text style={[styles.languageText, language === option && styles.languageTextSelected]}>{option}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.settingRow}>
        <View style={styles.settingHeading}>
          <Bell size={18} color={colors.brand} />
          <Text style={styles.label}>{profileStrings.settings.notifications}</Text>
        </View>
        <Switch
          value={notificationsEnabled}
          onValueChange={onToggleNotifications}
          trackColor={{false: colors.inputBorder, true: colors.brandSoft}}
          thumbColor={notificationsEnabled ? colors.brand : colors.surface}
          accessibilityRole="switch"
          accessibilityLabel={profileStrings.settings.notifications}
        />
      </View>

      <Pressable
        onPress={() => Alert.alert(profileStrings.settings.logout, profileStrings.settings.logoutUnavailable)}
        style={({pressed}) => [styles.actionRow, pressed && styles.pressed]}
        accessibilityRole="button">
        <LogOut size={18} color={colors.textSecondary} />
        <Text style={styles.label}>{profileStrings.settings.logout}</Text>
      </Pressable>
      <Pressable
        onPress={confirmDeleteAccount}
        style={({pressed}) => [styles.actionRow, pressed && styles.pressed]}
        accessibilityRole="button">
        <Trash2 size={18} color={colors.accent} />
        <Text style={styles.deleteLabel}>{profileStrings.settings.deleteAccount}</Text>
        <AlertTriangle size={16} color={colors.accent} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {marginTop: 32, paddingTop: 20, borderTopWidth: 1, borderTopColor: colors.border},
  title: {color: colors.text, fontSize: 19, fontWeight: '800', marginBottom: 12},
  settingRow: {minHeight: 58, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.inputBorder},
  settingHeading: {flexDirection: 'row', alignItems: 'center', gap: 10},
  label: {color: colors.text, fontSize: 14, fontWeight: '700'},
  languageOptions: {flexDirection: 'row', padding: 3, borderRadius: 8, backgroundColor: colors.surface},
  languageOption: {minWidth: 42, minHeight: 36, alignItems: 'center', justifyContent: 'center', borderRadius: 6},
  languageSelected: {backgroundColor: colors.brand},
  languageText: {color: colors.textSecondary, fontSize: 12, fontWeight: '700'},
  languageTextSelected: {color: colors.white},
  actionRow: {minHeight: 52, flexDirection: 'row', alignItems: 'center', gap: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.inputBorder},
  deleteLabel: {flex: 1, color: colors.accent, fontSize: 14, fontWeight: '700'},
  pressed: {opacity: 0.75},
});