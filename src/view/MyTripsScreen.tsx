import React, {memo, useCallback, useState} from 'react';
import DateTimePicker, {
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {
  CalendarDays,
  Clock3,
  MapPin,
  Navigation,
  Plus,
  Share2,
  Trash2,
  Utensils,
  X,
} from 'lucide-react-native';
import {
  Alert,
  FlatList,
  Linking,
  Platform,
  Pressable,
  Share,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {colors} from '../config/theme';
import {HeaderBack} from '../components/HeaderBack';
import {citiesData} from '../data/citiesData';
import {PlaceSearchInput} from '../features/profile/components/PlaceSearchInput';
import {searchPlaces, type Place} from '../features/profile/data/places';
import {
  addTripStop,
  deleteTripStop,
  loadTripStops,
  type TripStop,
} from '../services/tripService';

type PickerMode = 'date' | 'time' | 'filter';

type MyTripsScreenProps = {
  onBack: () => void;
};

function formatDateTime(value: string): string {
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
}

function getDirectionsUrl(place: string, city: string): string {
  const destination = encodeURIComponent(`${place}, ${city}, Armenia`);
  return Platform.select({
    ios: `http://maps.apple.com/?daddr=${destination}&dirflg=d`,
    default: `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving`,
  }) ?? `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
}

function searchTripPlaces(query: string): Place[] {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  if (!normalizedQuery) {
    return [];
  }

  const cities = citiesData
    .filter(city =>
      `${city.name} ${city.latinName}`.toLocaleLowerCase().includes(normalizedQuery),
    )
    .map(city => ({
      id: `city-${city.latinName.toLocaleLowerCase()}`,
      name: city.latinName,
      city: city.latinName,
    }));

  return [...cities, ...searchPlaces(query, 8)].slice(0, 8);
}

type TripStopCardProps = {
  stop: TripStop;
  onShare: (stop: TripStop) => void;
  onDelete: (stop: TripStop) => void;
  onDirections: (stop: TripStop) => void;
  onRestaurantDirections: (stop: TripStop) => void;
};

const TripStopCard = memo(function TripStopCardView({
  stop,
  onShare,
  onDelete,
  onDirections,
  onRestaurantDirections,
}: TripStopCardProps) {
  const share = useCallback(() => onShare(stop), [onShare, stop]);
  const remove = useCallback(() => onDelete(stop), [onDelete, stop]);
  const directions = useCallback(() => onDirections(stop), [onDirections, stop]);
  const restaurantDirections = useCallback(
    () => onRestaurantDirections(stop),
    [onRestaurantDirections, stop],
  );

  return (
    <View style={styles.stopCard}>
      <View style={styles.stopHeading}>
        <View style={styles.placeIcon}>
          <MapPin size={19} color={colors.brand} />
        </View>
        <View style={styles.stopTitleArea}>
          <Text style={styles.stopTitle}>{stop.place}</Text>
          <Text style={styles.stopCity}>{stop.city}, Syunik</Text>
        </View>
        <Pressable
          onPress={remove}
          style={({pressed}) => [styles.iconButton, pressed && styles.pressed]}
          accessibilityRole="button"
          accessibilityLabel={`Remove ${stop.place} from My Trips`}>
          <Trash2 size={18} color={colors.accent} />
        </Pressable>
      </View>
      <View style={styles.detailRow}>
        <CalendarDays size={16} color={colors.textSecondary} />
        <Text style={styles.detailText}>{formatDateTime(stop.scheduledAt)}</Text>
      </View>
      {!!stop.restaurant && (
        <>
          <View style={styles.detailRow}>
            <Utensils size={16} color={colors.textSecondary} />
            <Text style={styles.detailText}>Eat at {stop.restaurant}</Text>
          </View>
          <Pressable
            onPress={restaurantDirections}
            style={({pressed}) => [styles.restaurantRoute, pressed && styles.pressed]}
            accessibilityRole="button"
            accessibilityLabel={`Open route to ${stop.restaurant}`}>
            <Navigation size={15} color={colors.brand} />
            <Text style={styles.restaurantRouteText}>Directions to restaurant</Text>
          </Pressable>
        </>
      )}
      <View style={styles.cardActions}>
        <Pressable
          onPress={directions}
          style={({pressed}) => [styles.actionButton, pressed && styles.pressed]}
          accessibilityRole="button"
          accessibilityLabel={`Open route to ${stop.place}`}>
          <Navigation size={16} color={colors.white} />
          <Text style={styles.actionButtonText}>Open route</Text>
        </Pressable>
        <Pressable
          onPress={share}
          style={({pressed}) => [styles.shareButton, pressed && styles.pressed]}
          accessibilityRole="button"
          accessibilityLabel={`Share trip to ${stop.place}`}>
          <Share2 size={17} color={colors.brand} />
          <Text style={styles.shareButtonText}>Share</Text>
        </Pressable>
      </View>
    </View>
  );
});

export function MyTripsScreen({onBack}: MyTripsScreenProps) {
  const [stops, setStops] = useState<TripStop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [placeQuery, setPlaceQuery] = useState('');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [restaurant, setRestaurant] = useState('');
  const [scheduledAt, setScheduledAt] = useState(new Date());
  const [pickerMode, setPickerMode] = useState<PickerMode | null>(null);
  const [filterDate, setFilterDate] = useState<Date | null>(null);
  const [formError, setFormError] = useState('');

  const reloadStops = useCallback(async () => {
    setIsLoading(true);
    setLoadError('');
    try {
      setStops(await loadTripStops());
    } catch {
      setLoadError('Could not load your trip plans. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      reloadStops();
    }, [reloadStops]),
  );

  const visibleStops = filterDate
    ? stops.filter(
        stop => new Date(stop.scheduledAt).toDateString() === filterDate.toDateString(),
      )
    : stops;

  const onDateTimeChange = useCallback(
    (event: DateTimePickerEvent, selectedDate?: Date) => {
      setPickerMode(null);
      if (event.type !== 'set' || !selectedDate) {
        return;
      }

      if (pickerMode === 'filter') {
        setFilterDate(selectedDate);
      } else if (pickerMode === 'date') {
        const nextDate = new Date(scheduledAt);
        nextDate.setFullYear(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
        );
        setScheduledAt(nextDate);
      } else {
        const nextTime = new Date(scheduledAt);
        nextTime.setHours(selectedDate.getHours(), selectedDate.getMinutes(), 0, 0);
        setScheduledAt(nextTime);
      }
    },
    [pickerMode, scheduledAt],
  );

  const submitTripStop = useCallback(async () => {
    if (isSaving) {
      return;
    }
    if (!selectedPlace) {
      setFormError('Choose a destination from the suggestions.');
      return;
    }

    setIsSaving(true);
    try {
      const nextStops = await addTripStop({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        place: selectedPlace.name,
        city: selectedPlace.city,
        scheduledAt: scheduledAt.toISOString(),
        restaurant: restaurant.trim(),
      });
      setStops(nextStops);
      setPlaceQuery('');
      setSelectedPlace(null);
      setRestaurant('');
      setScheduledAt(new Date());
      setIsAdding(false);
      setFormError('');
    } catch {
      setFormError('Could not save this trip stop. Please try again.');
    } finally {
      setIsSaving(false);
    }
  }, [isSaving, restaurant, scheduledAt, selectedPlace]);

  const shareStop = useCallback(async (stop: TripStop) => {
    const restaurantNote = stop.restaurant
      ? `\nRestaurant: ${stop.restaurant}`
      : '';
    try {
      await Share.share({
        message: `My trip to ${stop.place}, ${stop.city}\n${formatDateTime(stop.scheduledAt)}${restaurantNote}`,
      });
    } catch {
      Alert.alert('Sharing unavailable', 'Could not share this trip stop.');
    }
  }, []);

  const shareItinerary = useCallback(async () => {
    if (visibleStops.length === 0) {
      return;
    }

    const itinerary = visibleStops
      .map(stop => {
        const meal = stop.restaurant ? ` — Restaurant: ${stop.restaurant}` : '';
        return `• ${formatDateTime(stop.scheduledAt)}: ${stop.place}, ${stop.city}${meal}`;
      })
      .join('\n');

    try {
      await Share.share({message: `My Syunik trip plans:\n${itinerary}`});
    } catch {
      Alert.alert('Sharing unavailable', 'Could not share your trip plans.');
    }
  }, [visibleStops]);

  const confirmDeleteStop = useCallback((stop: TripStop) => {
    Alert.alert('Remove trip stop?', `Remove ${stop.place} from My Trips?`, [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => {
          deleteTripStop(stop.id)
            .then(setStops)
            .catch(() => Alert.alert('Could not remove trip stop. Please try again.'));
        },
      },
    ]);
  }, []);

  const openDirections = useCallback(async (stop: TripStop) => {
    try {
      await Linking.openURL(getDirectionsUrl(stop.place, stop.city));
    } catch {
      Alert.alert('Maps unavailable', 'Could not open directions for this destination.');
    }
  }, []);

  const openRestaurantDirections = useCallback(async (stop: TripStop) => {
    try {
      await Linking.openURL(getDirectionsUrl(stop.restaurant, stop.city));
    } catch {
      Alert.alert('Maps unavailable', 'Could not open directions for this restaurant.');
    }
  }, []);

  const renderStop = useCallback(
    ({item}: {item: TripStop}) => (
      <TripStopCard
        stop={item}
        onShare={shareStop}
        onDelete={confirmDeleteStop}
        onDirections={openDirections}
        onRestaurantDirections={openRestaurantDirections}
      />
    ),
    [confirmDeleteStop, openDirections, openRestaurantDirections, shareStop],
  );

  const listHeader = (
    <View>
      <HeaderBack onBack={onBack} />
      <Text style={styles.title}>My Trips</Text>
      <Text style={styles.subtitle}>
        Plan the places you want to visit and where you want to eat.
      </Text>

      <View style={styles.filterRow}>
        <Pressable
          onPress={() => setPickerMode('filter')}
          style={({pressed}) => [styles.filterButton, pressed && styles.pressed]}
          accessibilityRole="button"
          accessibilityLabel="Filter trips by day">
          <CalendarDays size={17} color={colors.brand} />
          <Text style={styles.filterText}>
            {filterDate
              ? new Intl.DateTimeFormat(undefined, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                }).format(filterDate)
              : 'Filter by day'}
          </Text>
        </Pressable>
        {visibleStops.length > 0 && (
          <Pressable
              onPress={shareItinerary}
              style={({pressed}) => [styles.shareItineraryButton, pressed && styles.pressed]}
              accessibilityRole="button"
              accessibilityLabel="Share trip itinerary">
              <Share2 size={16} color={colors.brand} />
              <Text style={styles.clearFilterText}>Share plan</Text>
          </Pressable>
        )}
        {filterDate && (
          <Pressable
            onPress={() => setFilterDate(null)}
            style={({pressed}) => [styles.clearFilter, pressed && styles.pressed]}
            accessibilityRole="button"
            accessibilityLabel="Clear day filter">
            <X size={16} color={colors.textSecondary} />
            <Text style={styles.clearFilterText}>Clear</Text>
          </Pressable>
        )}
      </View>

      {!isAdding ? (
        <Pressable
          onPress={() => setIsAdding(true)}
          style={({pressed}) => [styles.addButton, pressed && styles.pressed]}
          accessibilityRole="button"
          accessibilityLabel="Add a planned trip stop">
          <Plus size={18} color={colors.white} />
          <Text style={styles.addButtonText}>Add a trip stop</Text>
        </Pressable>
      ) : (
        <View style={styles.form}>
          <Text style={styles.formTitle}>Plan a stop</Text>
          <PlaceSearchInput
            label="Destination"
            query={placeQuery}
            placeholder="Search places (e.g. Goris, Tatev)"
            noResultsText="No matching places found."
            suggestions={
              placeQuery === selectedPlace?.name ? [] : searchTripPlaces(placeQuery)
            }
            onChangeQuery={value => {
              setPlaceQuery(value);
              setSelectedPlace(null);
            }}
            onSelect={place => {
              setSelectedPlace(place);
              setPlaceQuery(place.name);
              setFormError('');
            }}
          />
          <View style={styles.pickerRow}>
            <Pressable
              onPress={() => setPickerMode('date')}
              style={({pressed}) => [styles.pickerButton, pressed && styles.pressed]}
              accessibilityRole="button"
              accessibilityLabel="Choose visit date">
              <CalendarDays size={17} color={colors.brand} />
              <Text style={styles.pickerText}>
                {scheduledAt.toLocaleDateString()}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setPickerMode('time')}
              style={({pressed}) => [styles.pickerButton, pressed && styles.pressed]}
              accessibilityRole="button"
              accessibilityLabel="Choose visit time">
              <Clock3 size={17} color={colors.brand} />
              <Text style={styles.pickerText}>
                {scheduledAt.toLocaleTimeString([], {
                  hour: 'numeric',
                  minute: '2-digit',
                })}
              </Text>
            </Pressable>
          </View>
          {pickerMode && (
            <DateTimePicker
              value={pickerMode === 'filter' ? filterDate ?? new Date() : scheduledAt}
              mode={pickerMode === 'time' ? 'time' : 'date'}
              display={Platform.OS === 'ios' ? 'compact' : 'default'}
              onChange={onDateTimeChange}
            />
          )}
          <TextInput
            value={restaurant}
            onChangeText={setRestaurant}
            placeholder="Restaurant (optional)"
            placeholderTextColor={colors.textMuted}
            style={styles.restaurantInput}
            accessibilityLabel="Optional restaurant plan"
          />
          {!!formError && <Text style={styles.errorText}>{formError}</Text>}
          <View style={styles.formActions}>
            <Pressable
              onPress={() => {
                setIsAdding(false);
                setFormError('');
              }}
              style={({pressed}) => [styles.cancelButton, pressed && styles.pressed]}
              accessibilityRole="button">
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={submitTripStop}
              disabled={isSaving}
              style={({pressed}) => [styles.addButton, styles.saveButton, pressed && styles.pressed]}
              accessibilityRole="button"
              accessibilityLabel="Save trip stop">
              <Plus size={17} color={colors.white} />
              <Text style={styles.addButtonText}>
                {isSaving ? 'Saving…' : 'Save stop'}
              </Text>
            </Pressable>
          </View>
        </View>
      )}
      {!!loadError && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{loadError}</Text>
          <Pressable onPress={reloadStops} accessibilityRole="button">
            <Text style={styles.retryText}>Retry</Text>
          </Pressable>
        </View>
      )}
      {isLoading && <Text style={styles.statusText}>Loading your trips…</Text>}
    </View>
  );

  return (
    <FlatList
      data={visibleStops}
      keyExtractor={item => item.id}
      renderItem={renderStop}
      ListHeaderComponent={listHeader}
      ListEmptyComponent={
        !isLoading && !loadError ? (
          <View style={styles.emptyState}>
            <MapPin size={27} color={colors.textMuted} />
            <Text style={styles.emptyTitle}>
              {filterDate ? 'No trips on this day' : 'No trip stops yet'}
            </Text>
            <Text style={styles.emptyText}>
              Add a destination and schedule when you want to visit.
            </Text>
          </View>
        ) : null
      }
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  content: {flexGrow: 1, padding: 20, paddingBottom: 40, backgroundColor: colors.background},
  title: {color: colors.text, fontSize: 28, fontWeight: '800'},
  subtitle: {color: colors.textSecondary, fontSize: 14, lineHeight: 21, marginTop: 6},
  filterRow: {alignItems: 'center', flexDirection: 'row', gap: 12, marginTop: 20},
  filterButton: {alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 10, borderWidth: 1, flexDirection: 'row', gap: 8, minHeight: 42, paddingHorizontal: 12},
  filterText: {color: colors.text, fontSize: 13, fontWeight: '600'},
  shareItineraryButton: {alignItems: 'center', flexDirection: 'row', gap: 5, minHeight: 40, paddingHorizontal: 5},
  clearFilter: {alignItems: 'center', flexDirection: 'row', gap: 4, minHeight: 40, paddingHorizontal: 5},
  clearFilterText: {color: colors.textSecondary, fontSize: 13},
  addButton: {alignItems: 'center', alignSelf: 'flex-start', backgroundColor: colors.brand, borderRadius: 10, flexDirection: 'row', gap: 8, justifyContent: 'center', marginTop: 16, minHeight: 44, paddingHorizontal: 14},
  addButtonText: {color: colors.white, fontSize: 14, fontWeight: '700'},
  form: {backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 14, borderWidth: 1, gap: 12, marginTop: 16, padding: 14},
  formTitle: {color: colors.text, fontSize: 18, fontWeight: '800'},
  pickerRow: {flexDirection: 'row', gap: 10},
  pickerButton: {alignItems: 'center', backgroundColor: colors.background, borderColor: colors.inputBorder, borderRadius: 8, borderWidth: 1, flex: 1, flexDirection: 'row', gap: 8, minHeight: 44, paddingHorizontal: 10},
  pickerText: {color: colors.text, flexShrink: 1, fontSize: 13},
  restaurantInput: {backgroundColor: colors.white, borderColor: colors.inputBorder, borderRadius: 8, borderWidth: 1, color: colors.text, fontSize: 14, minHeight: 48, paddingHorizontal: 12},
  formActions: {alignItems: 'center', flexDirection: 'row', gap: 10, justifyContent: 'flex-end'},
  cancelButton: {alignItems: 'center', justifyContent: 'center', minHeight: 42, paddingHorizontal: 12},
  cancelButtonText: {color: colors.textSecondary, fontSize: 14, fontWeight: '600'},
  saveButton: {alignSelf: 'auto', marginTop: 0},
  errorText: {color: colors.accent, fontSize: 13, lineHeight: 18},
  errorBox: {backgroundColor: colors.surface, borderRadius: 10, gap: 8, marginTop: 14, padding: 12},
  retryText: {color: colors.brand, fontSize: 14, fontWeight: '700'},
  statusText: {color: colors.textMuted, fontSize: 13, marginTop: 14},
  emptyState: {alignItems: 'center', gap: 8, paddingHorizontal: 16, paddingVertical: 38},
  emptyTitle: {color: colors.text, fontSize: 17, fontWeight: '700', marginTop: 4},
  emptyText: {color: colors.textSecondary, fontSize: 13, lineHeight: 19, textAlign: 'center'},
  stopCard: {backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 14, borderWidth: 1, gap: 12, marginTop: 12, padding: 14},
  stopHeading: {alignItems: 'center', flexDirection: 'row', gap: 10},
  placeIcon: {alignItems: 'center', backgroundColor: colors.brandSoft, borderRadius: 10, height: 40, justifyContent: 'center', width: 40},
  stopTitleArea: {flex: 1},
  stopTitle: {color: colors.text, fontSize: 16, fontWeight: '800'},
  stopCity: {color: colors.textSecondary, fontSize: 12, marginTop: 2},
  iconButton: {alignItems: 'center', justifyContent: 'center', minHeight: 40, minWidth: 40},
  detailRow: {alignItems: 'center', flexDirection: 'row', gap: 8},
  detailText: {color: colors.textSecondary, flex: 1, fontSize: 13, lineHeight: 18},
  restaurantRoute: {alignItems: 'center', alignSelf: 'flex-start', flexDirection: 'row', gap: 6, minHeight: 34, paddingLeft: 24},
  restaurantRouteText: {color: colors.brand, fontSize: 12, fontWeight: '700'},
  cardActions: {borderTopColor: colors.border, borderTopWidth: StyleSheet.hairlineWidth, flexDirection: 'row', gap: 10, paddingTop: 12},
  actionButton: {alignItems: 'center', backgroundColor: colors.brand, borderRadius: 8, flex: 1, flexDirection: 'row', gap: 7, justifyContent: 'center', minHeight: 40},
  actionButtonText: {color: colors.white, fontSize: 13, fontWeight: '700'},
  shareButton: {alignItems: 'center', borderColor: colors.brand, borderRadius: 8, borderWidth: 1, flex: 1, flexDirection: 'row', gap: 7, justifyContent: 'center', minHeight: 40},
  shareButtonText: {color: colors.brand, fontSize: 13, fontWeight: '700'},
  pressed: {opacity: 0.75},
});
