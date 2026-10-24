import React, {useCallback, useMemo, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {MapPin} from 'lucide-react-native';
import {PlaceCard} from './PlaceCard';
import {SectionHeader} from './SectionHeader';
import {getNearbyPlacesFromLocation, type Place, type PlaceCategory} from '../data/places';
import {usePlacesStore} from '../features/places/store/placesStore';
import {colors} from '../config/theme';

type NearbyCategory = 'attractions' | 'nature' | 'food' | 'viewpoints' | 'history';

type NearbyPlacesProps = {
  latitude: number;
  longitude: number;
  radius?: number;
  excludePlaceId?: string;
  onSelectPlace?: (placeId: string) => void;
};

const categories: Array<{label: string; value: NearbyCategory}> = [
  {label: 'Attractions', value: 'attractions'},
  {label: 'Nature', value: 'nature'},
  {label: 'Food', value: 'food'},
  {label: 'Viewpoints', value: 'viewpoints'},
  {label: 'History', value: 'history'},
];

export function NearbyPlaces({latitude, longitude, radius = 25, excludePlaceId, onSelectPlace}: NearbyPlacesProps) {
  const [selectedCategory, setSelectedCategory] = useState<NearbyCategory>('attractions');
  const favoritePlaceIds = usePlacesStore(state => state.favoritePlaceIds);
  const toggleFavorite = usePlacesStore(state => state.toggleFavorite);
  const nearbyPlaces = useMemo(
    () => getNearbyPlacesFromLocation(latitude, longitude, 50)
      .filter(({place, distanceKm}) => place.id !== excludePlaceId && distanceKm <= radius),
    [latitude, longitude, radius, excludePlaceId],
  );
  const filteredPlaces = useMemo(
    () => nearbyPlaces.filter(({place}) => matchesCategory(place, selectedCategory)),
    [nearbyPlaces, selectedCategory],
  );

  const renderPlace = useCallback(({item}: {item: (typeof nearbyPlaces)[number]}) => (
    <PlaceCard
      place={item.place}
      distance={formatDistance(item.distanceKm)}
      isFavorite={favoritePlaceIds.includes(item.place.id)}
      onPress={() => onSelectPlace?.(item.place.id)}
      onToggleFavorite={() => toggleFavorite(item.place.id)}
    />
  ), [favoritePlaceIds, onSelectPlace, toggleFavorite]);

  return (
    <View style={styles.container}>
      <SectionHeader title="Nearby" />
      <FlatList
        horizontal
        data={categories}
        keyExtractor={item => item.value}
        contentContainerStyle={styles.categoryList}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <Text
            accessibilityRole="button"
            accessibilityState={{selected: selectedCategory === item.value}}
            onPress={() => setSelectedCategory(item.value)}
            style={[styles.category, selectedCategory === item.value && styles.categorySelected]}>
            {item.label}
          </Text>
        )}
      />
      <FlatList
        horizontal
        data={filteredPlaces}
        keyExtractor={({place}) => place.id}
        renderItem={renderPlace}
        ItemSeparatorComponent={Separator}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={<EmptyNearby radius={radius} />}
      />
    </View>
  );
}

function matchesCategory(place: Place, category: NearbyCategory): boolean {
  if (category === 'viewpoints') return place.tags.includes('viewpoint');
  if (category === 'attractions') return !['nature', 'food'].includes(place.category) && !place.tags.includes('viewpoint');
  return place.category === category as PlaceCategory;
}

function formatDistance(distanceKm: number): string {
  return distanceKm < 1 ? `${Math.round(distanceKm * 1000)} m` : `${distanceKm.toFixed(1)} km`;
}

function EmptyNearby({radius}: {radius: number}) {
  return <View style={styles.empty}><MapPin size={16} color={colors.textMuted} /><View><Text style={styles.emptyText}>No places found.</Text><Text style={styles.emptySubtext}>Try another search. ({radius} km radius)</Text></View></View>;
}

function Separator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  container: {marginBottom: 22},
  categoryList: {gap: 8, paddingBottom: 12},
  category: {backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 999, borderWidth: 1, color: colors.textSecondary, fontSize: 12, fontWeight: '700', overflow: 'hidden', paddingHorizontal: 12, paddingVertical: 8},
  categorySelected: {backgroundColor: colors.brandSoft, borderColor: colors.brand, color: colors.brand},
  separator: {width: 12},
  empty: {alignItems: 'center', backgroundColor: colors.surface, borderRadius: 14, flexDirection: 'row', gap: 7, padding: 16},
  emptyText: {color: colors.textMuted, fontSize: 13},
  emptySubtext: {color: colors.textMuted, fontSize: 12, marginTop: 3},
});
