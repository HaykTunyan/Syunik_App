import React, {useState} from 'react';
import {Alert, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {Clock, Heart, MapPin, Navigation, Plus, Route, Sparkles} from 'lucide-react-native';
import {HeaderBack} from '../components/HeaderBack';
import {PlaceImage} from '../components/PlaceImage';
import {SectionHeader} from '../components/SectionHeader';
import {getPlaceById} from '../data/places';
import {NearbyPlaces} from '../components/NearbyPlaces';
import {colors} from '../config/theme';
import {openPlaceInMaps} from '../features/places/mapLinks';
import {usePlacesStore} from '../features/places/store/placesStore';
import {useTripPlannerStore} from '../features/trips/store/tripPlannerStore';

type PlaceDetailsScreenProps = {placeId: string; onBack: () => void; onSelectPlace: (placeId: string) => void};

export function PlaceDetailsScreen({placeId, onBack, onSelectPlace}: PlaceDetailsScreenProps) {
  const place = getPlaceById(placeId);
  const [isAddedToTrip, setIsAddedToTrip] = useState(false);
  const favoritePlaceIds = usePlacesStore(state => state.favoritePlaceIds);
  const togglePlaceFavorite = usePlacesStore(state => state.toggleFavorite);
  const addPlaceToCurrentTrip = useTripPlannerStore(state => state.addPlaceToCurrentTrip);

  if (!place) {
    return <View style={styles.centered}><HeaderBack onBack={onBack} /><Text style={styles.title}>Place not found</Text></View>;
  }
  const isFavorite = favoritePlaceIds.includes(place.id);
  const coordinates = place.coordinates;

  const handleFavorite = async () => {
    try {
      togglePlaceFavorite(place.id);
    } catch {
      Alert.alert('Favorites unavailable', 'We could not update this favorite right now.');
    }
  };

  const handleAddToTrip = () => {
    const added = addPlaceToCurrentTrip(place.id);
    setIsAddedToTrip(added || isAddedToTrip);
    Alert.alert(added ? 'Added to trip' : 'Already in trip', added ? `${place.name} was added to your current trip.` : `${place.name} is already in your current trip.`);
  };

  const handleNavigate = async () => {
    if (!coordinates) {
      Alert.alert('Location unavailable', 'Exact coordinates for this place are still being verified.');
      return;
    }

    const opened = await openPlaceInMaps({...coordinates, label: place.name});
    if (!opened) {
      Alert.alert('Navigation unavailable', 'Could not open maps on this device.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HeaderBack onBack={onBack} />
      <PlaceImage accessibilityLabel={`${place.name} image`} source={place.image} style={styles.hero} />
      <Text style={styles.eyebrow}>{place.cityName.toUpperCase()} · {place.category.toUpperCase()}</Text>
      <Text style={styles.title}>{place.name}</Text>
      <Text style={styles.placeContext}>{place.cityName} · Syunik · {place.type ?? 'place'}</Text>
      <Text style={styles.description}>{place.description}</Text>
      <View style={styles.tagsRow}>
        {place.tags.map(tag => <View key={tag} style={styles.tag}><Text style={styles.tagText}>#{tag}</Text></View>)}
      </View>
      <View style={styles.metaRow}>
        <Meta icon={MapPin} text={coordinates ? `${coordinates.latitude.toFixed(4)}, ${coordinates.longitude.toFixed(4)}` : 'Coordinates pending'} />
        <Meta icon={Clock} text={`Recommended visit: ${formatDuration(place.recommendedDuration)}`} />
      </View>
      <View style={styles.actionsRow}>
        <ActionButton icon={Plus} label={isAddedToTrip ? 'Added' : 'Add to Trip'} onPress={handleAddToTrip} selected={isAddedToTrip} />
        <ActionButton icon={Navigation} label="Navigate" onPress={handleNavigate} />
        <Pressable accessibilityRole="button" accessibilityLabel={`${isFavorite ? 'Remove' : 'Add'} ${place.name} favorite`} accessibilityState={{selected: isFavorite}} onPress={handleFavorite} style={[styles.iconAction, isFavorite && styles.iconActionSelected]}>
          <Heart size={19} color={isFavorite ? colors.accent : colors.brand} fill={isFavorite ? colors.accent : 'transparent'} />
        </Pressable>
      </View>
      <View style={styles.mapCard}>
        <SectionHeader title="Location" />
        {place.coordinates ? <MapView style={styles.map} initialRegion={{...place.coordinates, latitudeDelta: 0.08, longitudeDelta: 0.08}} accessibilityLabel={`Map showing ${place.name}`}>
          <Marker coordinate={place.coordinates} title={place.name} description={place.shortDescription} />
        </MapView> : <Text style={styles.practicalInfo}>Exact coordinates are still being verified.</Text>}
        <View style={styles.routeRow}><Route size={17} color={colors.brand} /><Text style={styles.practicalInfo}>{place.address ?? place.bestTimeToVisit ?? 'Check local conditions before visiting.'}</Text></View>
      </View>
      {coordinates && <NearbyPlaces latitude={coordinates.latitude} longitude={coordinates.longitude} excludePlaceId={place.id} onSelectPlace={onSelectPlace} />}
      <View style={styles.askAiCard}>
        <View style={styles.askAiIcon}><Sparkles size={18} color={colors.accent} /></View>
        <View style={styles.askAiContent}><Text style={styles.askAiTitle}>Ask AI</Text><Text style={styles.askAiText}>Ask questions about this place</Text></View>
        <Pressable accessibilityRole="button" accessibilityLabel={`Ask AI about ${place.name}`} onPress={() => Alert.alert('Ask AI', 'The place assistant will be connected in a future update.')} style={styles.askAiButton}><Text style={styles.askAiButtonText}>Ask</Text></Pressable>
      </View>
    </ScrollView>
  );
}

function Meta({icon: Icon, text}: {icon: typeof MapPin; text: string}) { return <View style={styles.meta}><Icon size={16} color={colors.brand} /><Text style={styles.metaText}>{text}</Text></View>; }

function ActionButton({icon: Icon, label, onPress, selected = false}: {icon: typeof Plus; label: string; onPress: () => void; selected?: boolean}) {
  return <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress} style={[styles.actionButton, selected && styles.actionButtonSelected]}><Icon size={17} color={selected ? colors.brand : colors.white} /><Text style={[styles.actionButtonText, selected && styles.actionButtonTextSelected]}>{label}</Text></Pressable>;
}

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h${remainingMinutes ? ` ${remainingMinutes}m` : ''}`;
}

const styles = StyleSheet.create({container: {padding: 20, paddingBottom: 36, backgroundColor: colors.background}, centered: {flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background}, hero: {width: '100%', height: 230, borderRadius: 20, marginBottom: 18}, eyebrow: {color: colors.accent, fontSize: 11, fontWeight: '800', letterSpacing: 1, marginBottom: 7}, title: {color: colors.text, fontSize: 30, fontWeight: '800', marginBottom: 5}, placeContext: {color: colors.brand, fontSize: 13, fontWeight: '700', textTransform: 'capitalize'}, description: {color: colors.textSecondary, fontSize: 16, lineHeight: 24, marginTop: 10}, tagsRow: {flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginTop: 14}, tag: {backgroundColor: colors.brandSoft, borderRadius: 999, paddingHorizontal: 9, paddingVertical: 5}, tagText: {color: colors.brand, fontSize: 11, fontWeight: '700'}, metaRow: {flexDirection: 'row', flexWrap: 'wrap', gap: 14, marginVertical: 18}, meta: {alignItems: 'center', flexDirection: 'row', gap: 6}, metaText: {color: colors.textSecondary, fontSize: 12}, actionsRow: {alignItems: 'center', flexDirection: 'row', gap: 8, marginBottom: 22}, actionButton: {alignItems: 'center', backgroundColor: colors.brand, borderRadius: 12, flex: 1, flexDirection: 'row', gap: 6, justifyContent: 'center', minHeight: 46, paddingHorizontal: 8}, actionButtonSelected: {backgroundColor: colors.brandSoft}, actionButtonText: {color: colors.white, fontSize: 12, fontWeight: '800'}, actionButtonTextSelected: {color: colors.brand}, iconAction: {alignItems: 'center', borderColor: colors.brand, borderRadius: 12, borderWidth: 1, height: 46, justifyContent: 'center', width: 46}, iconActionSelected: {backgroundColor: colors.brandSoft, borderColor: colors.accent}, mapCard: {backgroundColor: colors.surface, borderRadius: 18, padding: 14, marginBottom: 22}, map: {height: 220, borderRadius: 14, overflow: 'hidden'}, routeRow: {alignItems: 'flex-start', flexDirection: 'row', gap: 8, marginTop: 12}, practicalInfo: {color: colors.textSecondary, flex: 1, fontSize: 13, lineHeight: 19}, nearbyRow: {gap: 12, paddingBottom: 8}, nearbyCard: {backgroundColor: colors.surface, borderRadius: 14, overflow: 'hidden', paddingBottom: 12, width: 170}, nearbyImage: {height: 105, width: '100%'}, nearbyName: {color: colors.text, fontSize: 14, fontWeight: '700', marginHorizontal: 10, marginTop: 9}, nearbyCity: {color: colors.textMuted, fontSize: 12, marginHorizontal: 10, marginTop: 3}, askAiCard: {alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 16, borderWidth: 1, flexDirection: 'row', gap: 10, marginTop: 24, padding: 14}, askAiIcon: {alignItems: 'center', backgroundColor: colors.brandSoft, borderRadius: 20, height: 38, justifyContent: 'center', width: 38}, askAiContent: {flex: 1}, askAiTitle: {color: colors.text, fontSize: 16, fontWeight: '800'}, askAiText: {color: colors.textSecondary, fontSize: 12, marginTop: 3}, askAiButton: {backgroundColor: colors.accent, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 9}, askAiButtonText: {color: colors.white, fontSize: 12, fontWeight: '800'}});
