import React from 'react';
import {MapPin} from 'lucide-react-native';
import {Pressable, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {colors} from '../../../config/theme';
import type {Place} from '../data/places';

type PlaceSearchInputProps = {
  label: string;
  query: string;
  placeholder: string;
  noResultsText: string;
  suggestions: Place[];
  onChangeQuery: (query: string) => void;
  onSelect: (place: Place) => void;
};

export function PlaceSearchInput({
  label,
  query,
  placeholder,
  noResultsText,
  suggestions,
  onChangeQuery,
  onSelect,
}: PlaceSearchInputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        value={query}
        onChangeText={onChangeQuery}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        returnKeyType="search"
        style={styles.input}
        accessibilityLabel={label}
      />
      {!!query.trim() && (
        <View style={styles.suggestions}>
          {suggestions.length ? (
            <ScrollView keyboardShouldPersistTaps="handled" nestedScrollEnabled>
              {suggestions.map(place => (
                <Pressable
                  key={place.id}
                  onPress={() => onSelect(place)}
                  style={({pressed}) => [styles.suggestion, pressed && styles.pressed]}
                  accessibilityRole="button"
                  accessibilityLabel={`Select ${place.name}, ${place.city}`}>
                  <MapPin size={16} color={colors.textMuted} />
                  <View style={styles.placeText}>
                    <Text style={styles.placeName}>{place.name}</Text>
                    <Text style={styles.placeCity}>{place.city}</Text>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.noResults}>{noResultsText}</Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {zIndex: 1},
  input: {
    minHeight: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    paddingHorizontal: 14,
    color: colors.text,
    fontSize: 15,
    backgroundColor: colors.white,
  },
  suggestions: {
    maxHeight: 224,
    marginTop: 4,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.surface,
    elevation: 3,
    zIndex: 2,
  },
  suggestion: {minHeight: 52, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 12},
  placeText: {flex: 1},
  placeName: {color: colors.text, fontSize: 14, fontWeight: '700'},
  placeCity: {color: colors.textSecondary, fontSize: 12, marginTop: 2},
  noResults: {color: colors.textSecondary, fontSize: 14, padding: 14},
  pressed: {backgroundColor: colors.brandSoft},
});