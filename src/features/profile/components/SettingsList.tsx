import React from 'react';
import {AlertTriangle, Bell, Languages, MapPin, Trash2} from 'lucide-react-native';
import {Alert, Pressable, StyleSheet, Switch, Text, View} from 'react-native';
import {colors} from '../../../config/theme';
import type {ProfileLanguage} from '../services/profileStorage';
import {profileStrings} from '../strings';
import {useTranslation} from 'react-i18next';

type SettingsListProps = {
  language: ProfileLanguage;
  notificationsEnabled: boolean;
  locationEnabled: boolean;
  onChangeLanguage: (language: ProfileLanguage) => void;
  onToggleNotifications: (enabled: boolean) => void;
  onToggleLocation: (enabled: boolean) => void;
  // onShareLocation: () => void;
};

const languages: Array<{code: ProfileLanguage; labelKey: 'settings.languageArmenian' | 'settings.languageEnglish' | 'settings.languageRussian'}> = [
  {
    code: 'HY', 
    labelKey: 'settings.languageArmenian',

  },
  {
    code: 'EN', 
    labelKey: 'settings.languageEnglish'
  },
  { 
    code: 'RU', 
    labelKey: 'settings.languageRussian'
  },
];

export function SettingsList({
  language,
  notificationsEnabled,
  locationEnabled,
  onChangeLanguage,
  onToggleNotifications,
  onToggleLocation,
  // onShareLocation,
}: SettingsListProps) {
  const {t} = useTranslation();


  /**
   * 
   * SettingsList is a React component that renders a list of user settings for the profile screen. It includes options for changing the app's language, toggling notifications, logging out, and deleting the account. The component uses React Native's Pressable and Switch components for interactive elements and applies styles to ensure a consistent look and feel. It also includes accessibility features for better user experience.
   * 
   * @param {SettingsListProps} props - The properties for the SettingsList component.
   * @returns {JSX.Element}
   * 
   * 
   */

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
              key={option.code}
              onPress={() => onChangeLanguage(option.code)}
              style={[styles.languageOption, language === option.code && styles.languageSelected]}
              accessibilityRole="radio"
              accessibilityState={{selected: language === option.code}}
              accessibilityLabel={t(option.labelKey)}>
              <Text style={[styles.languageText, language === option.code && styles.languageTextSelected]}>
                {t(option.code)}
              </Text>
              {/* {language === option.code && <Text style={styles.checkmark}>✓</Text>} */}
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.settingRow}>
        <View style={styles.settingHeading}>
          <Bell size={18} color={colors.brand} />
          <Text style={styles.label}>
            {profileStrings.settings.notifications}
          </Text>
        </View>
        <View style={{ alignItems: 'flex-end'}}>
        <Switch
          value={notificationsEnabled}
          onValueChange={onToggleNotifications}
          trackColor={{false: colors.inputBorder, true: colors.brandSoft}}
          thumbColor={notificationsEnabled ? colors.brand : colors.surface}
          accessibilityRole="switch"
          accessibilityLabel={profileStrings.settings.notifications}
        />
        </View>
      </View>

      <View style={styles.settingRow}>
        <View style={styles.settingHeading}>
          <MapPin size={18} color={colors.brand} />
          <Text style={styles.label}>
            {profileStrings.settings.locationAccess}
          </Text>
        </View>
        <Switch
          value={locationEnabled}
          onValueChange={onToggleLocation}
          trackColor={{false: colors.inputBorder, true: colors.brandSoft}}
          thumbColor={locationEnabled ? colors.brand : colors.surface}
          accessibilityRole="switch"
          accessibilityLabel={profileStrings.settings.locationAccess}
        />
      </View>

      {/*  */}
      {/* <Pressable
        onPress={onShareLocation}
        disabled={!locationEnabled}
        style={({pressed}) => [
          styles.actionRow,
          !locationEnabled && styles.disabledAction,
          pressed && locationEnabled && styles.pressed,
        ]}
        accessibilityRole="button"
        accessibilityState={{disabled: !locationEnabled}}
        accessibilityLabel={profileStrings.settings.shareLocation}>
        <MapPin
          size={18}
          color={locationEnabled ? colors.brand : colors.textSecondary}
        />
        <Text
          style={[
            styles.label,
            !locationEnabled && styles.disabledActionText,
          ]}>
          {profileStrings.settings.shareLocation}
        </Text>
      </Pressable> */}

      {/*  */}


      {/* <Pressable
        onPress={() => Alert.alert(profileStrings.settings.logout, profileStrings.settings.logoutUnavailable)}
        style={({pressed}) => [styles.actionRow, pressed && styles.pressed]}
        accessibilityRole="button">
        <LogOut size={18} color={colors.textSecondary} />
        <Text style={styles.label}>{profileStrings.settings.logout}</Text>
      </Pressable> */}

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
  settingRow: {
    minHeight: 58, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.inputBorder
  },
  settingHeading: {flexDirection: 'row', alignItems: 'center', gap: 10},
  label: {color: colors.text, fontSize: 14, fontWeight: '700'},
  languageOptions: {flexDirection: 'row', padding: 3, borderRadius: 8, backgroundColor: colors.surface},
  languageOption: {minWidth: 42, minHeight: 36, alignItems: 'center', justifyContent: 'center', borderRadius: 6},
  languageSelected: {backgroundColor: colors.brand},
  languageText: {color: colors.textSecondary, fontSize: 12, fontWeight: '700'},
  languageTextSelected: {color: colors.white},
  checkmark: {color: colors.white, fontSize: 12, fontWeight: '800', marginLeft: 3},
  actionRow: {minHeight: 52, flexDirection: 'row', alignItems: 'center', gap: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.inputBorder},
  deleteLabel: {flex: 1, color: colors.accent, fontSize: 14, fontWeight: '700'},
  disabledAction: {opacity: 0.55},
  disabledActionText: {color: colors.textSecondary},
  pressed: {opacity: 0.75},
});
