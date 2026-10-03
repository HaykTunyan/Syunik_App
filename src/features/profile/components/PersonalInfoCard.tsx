import React, {useState} from 'react';
import {ChevronDown, Pencil, Save, X} from 'lucide-react-native';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {colors} from '../../../config/theme';
import {phoneCountries, type PhoneCountry} from '../data/phoneCountries';
import type {ProfileFieldErrors, ProfileFormValues} from '../hooks/useProfileForm';
import {profileStrings} from '../strings';

type PersonalInfoCardProps = {
  values: ProfileFormValues;
  errors: ProfileFieldErrors;
  submitError: string;
  isEditing: boolean;
  isSaving: boolean;
  onChange: <K extends keyof ProfileFormValues>(field: K, value: ProfileFormValues[K]) => void;
  onBeginEditing: () => void;
  onCancel: () => void;
  onSave: () => void;
};

function formatPhone(digits: string): string {
  const cleanDigits = digits.slice(0, 12);
  if (cleanDigits.length <= 2) {
    return cleanDigits;
  }
  if (cleanDigits.length <= 5) {
    return `${cleanDigits.slice(0, 2)} ${cleanDigits.slice(2)}`;
  }
  return `${cleanDigits.slice(0, 2)} ${cleanDigits.slice(2, 5)} ${cleanDigits.slice(5)}`;
}

export function PersonalInfoCard({
  values,
  errors,
  submitError,
  isEditing,
  isSaving,
  onChange,
  onBeginEditing,
  onCancel,
  onSave,
}: PersonalInfoCardProps) {
  const [isCountryPickerOpen, setIsCountryPickerOpen] = useState(false);
  const selectedCountry = phoneCountries.find(country => country.dialCode === values.countryCode) ?? phoneCountries[0];

  const selectCountry = (country: PhoneCountry) => {
    onChange('countryCode', country.dialCode);
    onChange('phone', values.phone.slice(0, country.nationalDigits));
    setIsCountryPickerOpen(false);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{profileStrings.personalInfo.title}</Text>
      <Text style={styles.label}>{profileStrings.personalInfo.name}</Text>
      <TextInput
        value={values.name}
        onChangeText={value => onChange('name', value)}
        editable={isEditing && !isSaving}
        placeholder={profileStrings.personalInfo.namePlaceholder}
        placeholderTextColor={colors.textMuted}
        autoCapitalize="words"
        style={[styles.input, !isEditing && styles.readOnlyInput, errors.name && styles.invalidInput]}
        accessibilityLabel={profileStrings.personalInfo.name}
      />
      {!!errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      <Text style={styles.label}>{profileStrings.personalInfo.email}</Text>
      <TextInput
        value={values.email}
        onChangeText={value => onChange('email', value)}
        editable={isEditing && !isSaving}
        placeholder={profileStrings.personalInfo.emailPlaceholder}
        placeholderTextColor={colors.textMuted}
        autoCapitalize="none"
        autoComplete="email"
        keyboardType="email-address"
        style={[styles.input, !isEditing && styles.readOnlyInput, errors.email && styles.invalidInput]}
        accessibilityLabel={profileStrings.personalInfo.email}
      />
      {!!errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <Text style={styles.label}>{profileStrings.personalInfo.phone}</Text>
      <View style={[styles.phoneRow, errors.phone && styles.invalidInput, !isEditing && styles.readOnlyInput]}>
        <Pressable
          onPress={() => setIsCountryPickerOpen(true)}
          disabled={!isEditing || isSaving}
          style={styles.countryButton}
          accessibilityRole="button"
          accessibilityLabel={`${profileStrings.personalInfo.selectCountry}: ${selectedCountry.name} ${selectedCountry.dialCode}`}>
          <Text style={styles.countryText}>{selectedCountry.flag} {selectedCountry.dialCode}</Text>
          <ChevronDown size={16} color={colors.textSecondary} />
        </Pressable>
        <TextInput
          value={formatPhone(values.phone)}
          onChangeText={value => onChange('phone', value.replace(/\D/g, ''))}
          editable={isEditing && !isSaving}
          placeholder={profileStrings.personalInfo.phonePlaceholder}
          placeholderTextColor={colors.textMuted}
          autoComplete="tel-national"
          keyboardType="phone-pad"
          style={styles.phoneInput}
          accessibilityLabel={profileStrings.personalInfo.phone}
        />
      </View>
      {!!errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

      {!!submitError && <Text style={styles.errorText}>{submitError}</Text>}
      {isEditing ? (
        <View style={styles.actionRow}>
          <Pressable
            onPress={onCancel}
            disabled={isSaving}
            style={({pressed}) => [styles.secondaryButton, pressed && styles.pressed]}
            accessibilityRole="button">
            <X size={17} color={colors.brand} />
            <Text style={styles.secondaryButtonText}>{profileStrings.personalInfo.cancel}</Text>
          </Pressable>
          <Pressable
            onPress={onSave}
            disabled={isSaving}
            style={({pressed}) => [styles.primaryButton, pressed && styles.pressed]}
            accessibilityRole="button">
            <Save size={17} color={colors.white} />
            <Text style={styles.primaryButtonText}>
              {isSaving ? profileStrings.personalInfo.saving : profileStrings.personalInfo.save}
            </Text>
          </Pressable>
        </View>
      ) : (
        <Pressable
          onPress={onBeginEditing}
          style={({pressed}) => [styles.primaryButton, styles.editButton, pressed && styles.pressed]}
          accessibilityRole="button">
          <Pencil size={17} color={colors.white} />
          <Text style={styles.primaryButtonText}>{profileStrings.personalInfo.edit}</Text>
        </Pressable>
      )}

      <Modal
        visible={isCountryPickerOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsCountryPickerOpen(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.countryModal}>
            <Text style={styles.title}>{profileStrings.personalInfo.selectCountry}</Text>
            <ScrollView>
              {phoneCountries.map(country => (
                <Pressable
                  key={country.dialCode}
                  onPress={() => selectCountry(country)}
                  style={styles.countryOption}
                  accessibilityRole="button"
                  accessibilityLabel={`${country.name}, ${country.dialCode}`}>
                  <Text style={styles.countryText}>{country.flag}  {country.name}</Text>
                  <Text style={styles.countryCode}>{country.dialCode}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {padding: 16, borderRadius: 8, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border},
  title: {color: colors.text, fontSize: 18, fontWeight: '800', marginBottom: 18},
  label: {color: colors.text, fontSize: 13, fontWeight: '800', marginBottom: 8},
  input: {
    minHeight: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    paddingHorizontal: 14,
    color: colors.text,
    fontSize: 16,
    backgroundColor: colors.white,
    marginBottom: 15,
  },
  readOnlyInput: {backgroundColor: colors.background},
  invalidInput: {borderColor: colors.accent},
  errorText: {color: colors.accent, fontSize: 12, marginTop: -10, marginBottom: 12},
  phoneRow: {
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 8,
    backgroundColor: colors.white,
    marginBottom: 15,
    paddingLeft: 8,
  },
  countryButton: {minHeight: 44, flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8},
  countryText: {color: colors.text, fontSize: 14, fontWeight: '700'},
  phoneInput: {flex: 1, minHeight: 48, paddingHorizontal: 8, color: colors.text, fontSize: 16},
  actionRow: {flexDirection: 'row', gap: 10, marginTop: 2},
  primaryButton: {
    minHeight: 48,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 8,
    backgroundColor: colors.brand,
    paddingHorizontal: 12,
  },
  editButton: {marginTop: 2},
  primaryButtonText: {color: colors.white, fontSize: 14, fontWeight: '800'},
  secondaryButton: {
    minHeight: 48,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.brand,
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
  },
  secondaryButtonText: {color: colors.brand, fontSize: 14, fontWeight: '800'},
  pressed: {opacity: 0.8},
  modalOverlay: {flex: 1, justifyContent: 'center', padding: 24, backgroundColor: 'rgba(20, 29, 22, 0.52)'},
  countryModal: {maxHeight: '70%', padding: 18, borderRadius: 8, backgroundColor: colors.surface},
  countryOption: {minHeight: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.inputBorder},
  countryCode: {color: colors.textSecondary, fontSize: 14},
});