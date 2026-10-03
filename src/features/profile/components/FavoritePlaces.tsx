import React, {useState} from 'react';
import {Compass, Heart, X} from 'lucide-react-native';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../config/theme';
import {searchPlaces, type Place} from '../data/places';
import {profileStrings} from '../strings';
import {PlaceSearchInput} from './PlaceSearchInput';

type FavoritePlacesProps = {
  favorites: string[];
  onAdd: (place: Place) => void;
  onRemove: (place: string) => void;
  onBrowsePlaces: () => void;
};

export function FavoritePlaces({favorites, onAdd, onRemove, onBrowsePlaces}: FavoritePlacesProps) {
  const [query, setQuery] = useState('');

  const selectPlace = (place: Place) => {
    onAdd(place);
    setQuery('');
  };

  return (
    <View style={styles.section}>
      <View style={styles.heading}>
        <Heart size={19} color={colors.accent} />
        <Text style={styles.title}>{profileStrings.favorites.title}</Text>
      </View>
      <Text style={styles.description}>{profileStrings.favorites.description}</Text>
      <PlaceSearchInput
        label={profileStrings.favorites.search}
        query={query}
        placeholder={profileStrings.favorites.search}
        noResultsText={profileStrings.favorites.noMatches}
        suggestions={searchPlaces(query)}
        onChangeQuery={setQuery}
        onSelect={selectPlace}
      />
      {favorites.length ? (
        <View style={styles.chips}>
          {favorites.map(place => (
            <View key={place} style={styles.chip}>
              <Text style={styles.chipText}>{place}</Text>
              <Pressable
                onPress={() => onRemove(place)}
                style={styles.removeButton}
                accessibilityRole="button"
                accessibilityLabel={`Remove ${place} from favorites`}>
                <X size={16} color={colors.brand} />
              </Pressable>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Heart size={24} color={colors.textMuted} />
          <Text style={styles.emptyTitle}>{profileStrings.favorites.emptyTitle}</Text>
          <Text style={styles.emptyDescription}>{profileStrings.favorites.emptyDescription}</Text>
          <Pressable
            onPress={onBrowsePlaces}
            style={({pressed}) => [styles.browseButton, pressed && styles.pressed]}
            accessibilityRole="button">
            <Compass size={17} color={colors.white} />
            <Text style={styles.browseButtonText}>{profileStrings.favorites.browse}</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {marginTop: 28},
  heading: {flexDirection: 'row', alignItems: 'center', gap: 9},
  title: {color: colors.text, fontSize: 19, fontWeight: '800'},
  description: {color: colors.textSecondary, fontSize: 14, lineHeight: 20, marginTop: 6, marginBottom: 14},
  chips: {flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 14},
  chip: {minHeight: 44, flexDirection: 'row', alignItems: 'center', borderRadius: 22, backgroundColor: colors.brandSoft, paddingLeft: 14, paddingRight: 2},
  chipText: {color: colors.brand, fontSize: 13, fontWeight: '700'},
  removeButton: {width: 44, height: 44, alignItems: 'center', justifyContent: 'center'},
  emptyState: {alignItems: 'center', paddingVertical: 22},
  emptyTitle: {color: colors.text, fontSize: 16, fontWeight: '800', marginTop: 10},
  emptyDescription: {color: colors.textSecondary, fontSize: 13, marginTop: 5, textAlign: 'center'},
  browseButton: {minHeight: 46, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 8, backgroundColor: colors.brand, paddingHorizontal: 18, marginTop: 14},
  browseButtonText: {color: colors.white, fontSize: 14, fontWeight: '800'},
  pressed: {opacity: 0.8},
});