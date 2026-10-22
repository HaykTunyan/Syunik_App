import React, {useCallback, useMemo, useState} from 'react';
import {Alert, FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {Bot, Check, Clock3, MapPin, Navigation, Save, Sparkles} from 'lucide-react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {HeaderBack} from '../components/HeaderBack';
import {colors} from '../config/theme';
import {useTripPlannerStore, type ItineraryItem} from '../features/trips/store/tripPlannerStore';
import type {TripInterest, TripDuration, TransportType} from '../features/trips/types';

type TripItineraryScreenProps = {onBack: () => void; onSaveTrip: () => void};

export function TripItineraryScreen({onBack, onSaveTrip}: TripItineraryScreenProps) {
  const preferences = useTripPlannerStore(state => state.preferences);
  const insets = useSafeAreaInsets();
  const itinerary = useTripPlannerStore(state => state.itinerary);
  const trips = useTripPlannerStore(state => state.trips);
  const saveGeneratedTrip = useTripPlannerStore(state => state.saveGeneratedTrip);
  const [saved, setSaved] = useState(false);

  const tripSummary = useMemo(
    () => `${formatDuration(preferences.duration)} · ${formatTransport(preferences.transportation)} · ${formatInterests(preferences.interests)}`,
    [preferences.duration, preferences.interests, preferences.transportation],
  );

  const totalDistance = itinerary.length * 18;
  const totalDuration = itinerary.reduce(
    (total, item) => total + item.durationMinutes + (item.travelTimeMinutes ?? 0),
    0,
  );

  const saveTrip = useCallback(() => {
    if (saved) {
      return;
    }
    saveGeneratedTrip();
    setSaved(true);
    onSaveTrip();
  }, [onSaveTrip, saveGeneratedTrip, saved]);

  const renderStop = useCallback(({item, index}: {item: ItineraryItem; index: number}) => (
    <ItineraryStop item={item} index={index} />
  ), []);

  return (
    <FlatList
      data={itinerary}
      keyExtractor={item => item.id}
      renderItem={renderStop}
      contentContainerStyle={[styles.content, {paddingBottom: Math.max(42, insets.bottom + 28)}]}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View>
          <HeaderBack onBack={onBack} />
          <View style={styles.eyebrowRow}><Sparkles size={17} color={colors.accent} /><Text style={styles.eyebrow}>YOUR GENERATED PLAN</Text></View>
          <Text style={styles.title}>Your Syunik Adventure</Text>
          <Text style={styles.summary}>{tripSummary}</Text>
          <View style={styles.routeIntro}><Navigation size={17} color={colors.brand} /><Text style={styles.routeIntroText}>A thoughtful route starting from {preferences.startingLocation}</Text></View>
          <Text style={styles.sectionTitle}>Your route</Text>
        </View>
      }
      ListFooterComponent={
        <View>
          <View style={styles.totalsCard}>
            <Total label="Total distance" value={`${totalDistance} km`} />
            <Total label="Total duration" value={formatTotalDuration(totalDuration)} />
            <Total label="Stops" value={`${itinerary.length}`} />
          </View>
          <View style={styles.actions}>
            <Pressable
              accessibilityLabel="Start trip"
              accessibilityRole="button"
              onPress={() => Alert.alert('Coming soon', 'Live trip navigation will be available in a future update.')}
              style={({pressed}) => [styles.primaryAction, pressed && styles.pressed]}>
              <Navigation size={17} color={colors.white} />
              <Text style={styles.primaryActionText}>Start Trip</Text>
            </Pressable>
            <View style={styles.secondaryActions}>
              <Pressable
                accessibilityLabel={saved ? 'Trip saved' : 'Save trip'}
                accessibilityRole="button"
                accessibilityState={{disabled: saved, selected: saved}}
                disabled={saved}
                onPress={saveTrip}
                style={({pressed}) => [styles.secondaryAction, saved && styles.savedAction, pressed && styles.pressed]}>
                {saved ? <Check size={17} color={colors.brand} /> : <Save size={17} color={colors.brand} />}
                <Text style={styles.secondaryActionText}>{saved ? 'Trip Saved' : 'Save Trip'}</Text>
              </Pressable>
              <Pressable
                accessibilityLabel="Ask AI about this trip"
                accessibilityRole="button"
                onPress={() => Alert.alert('Ask AI', 'The AI travel assistant will be connected here soon.')}
                style={({pressed}) => [styles.secondaryAction, pressed && styles.pressed]}>
                <Bot size={17} color={colors.brand} />
                <Text style={styles.secondaryActionText}>Ask AI</Text>
              </Pressable>
            </View>
          </View>
          <Text style={styles.disclaimer}>{trips.length > 0 && saved ? 'Saved to your Trips state.' : 'Review this mock plan before saving it to your Trips.'}</Text>
        </View>
      }
    />
  );
}

function ItineraryStop({item, index}: {item: ItineraryItem; index: number}) {
  return (
    <View>
      {index > 0 && item.travelTimeMinutes && <View style={styles.travelConnector}><View style={styles.connectorLine} /><Text style={styles.travelText}>🚗 {item.travelTimeMinutes} min</Text><View style={styles.connectorLine} /></View>}
      <View style={styles.stopCard}>
        <View style={styles.stopTimeRow}><Clock3 size={15} color={colors.accent} /><Text style={styles.stopTime}>{item.time}</Text><Text style={styles.stopDay}>DAY {item.day}</Text></View>
        <View style={styles.stopTitleRow}><View style={styles.placeIcon}><MapPin size={17} color={colors.brand} /></View><View style={styles.stopTitleArea}><Text style={styles.stopTitle}>{item.title}</Text><Text style={styles.stopCity}>{item.city}, Syunik</Text></View></View>
        <Text style={styles.stopDescription}>{item.description}</Text>
        <View style={styles.stopDuration}><Clock3 size={14} color={colors.textMuted} /><Text style={styles.stopDurationText}>{formatStopDuration(item.durationMinutes)}</Text></View>
      </View>
    </View>
  );
}

function Total({label, value}: {label: string; value: string}) {
  return <View style={styles.total}><Text style={styles.totalValue}>{value}</Text><Text style={styles.totalLabel}>{label}</Text></View>;
}

function formatDuration(duration: TripDuration): string {
  const labels: Record<TripDuration, string> = {'2_hours': '2 Hours', half_day: 'Half Day', '1_day': '1 Day', '2_3_days': '2–3 Days', '1_week': '1 Week'};
  return labels[duration];
}

function formatTransport(transport: TransportType): string {
  const labels: Record<TransportType, string> = {car: 'Car', taxi: 'Taxi', public_transport: 'Public Transport', walking: 'Walking'};
  return labels[transport];
}

function formatInterests(interests: TripInterest[]): string {
  const labels: Record<TripInterest, string> = {nature: 'Nature', history: 'History', adventure: 'Adventure', food: 'Food', photography: 'Photography', culture: 'Culture', relaxation: 'Relaxation'};
  return interests.map(interest => labels[interest]).join(' + ');
}

function formatStopDuration(minutes: number): string {
  return minutes >= 60 ? `${Math.floor(minutes / 60)}h ${minutes % 60 ? `${minutes % 60}m` : ''}`.trim() : `${minutes} min`;
}

function formatTotalDuration(minutes: number): string {
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}

const styles = StyleSheet.create({
  content: {padding: 20, paddingBottom: 42},
  eyebrowRow: {alignItems: 'center', flexDirection: 'row', gap: 8, marginTop: 8},
  eyebrow: {color: colors.accent, fontSize: 10, fontWeight: '800', letterSpacing: 1.2},
  title: {color: colors.text, fontSize: 30, fontWeight: '800', letterSpacing: -0.5, marginTop: 14},
  summary: {color: colors.brand, fontSize: 15, fontWeight: '800', marginTop: 6},
  routeIntro: {alignItems: 'center', backgroundColor: colors.brandSoft, borderRadius: 13, flexDirection: 'row', gap: 8, marginTop: 17, padding: 12},
  routeIntroText: {color: colors.textSecondary, flex: 1, fontSize: 12, fontWeight: '600'},
  sectionTitle: {color: colors.text, fontSize: 19, fontWeight: '800', marginBottom: 11, marginTop: 25},
  stopCard: {backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 17, borderWidth: 1, padding: 15},
  stopTimeRow: {alignItems: 'center', flexDirection: 'row', gap: 6},
  stopTime: {color: colors.text, fontSize: 21, fontWeight: '800'},
  stopDay: {color: colors.textMuted, fontSize: 10, fontWeight: '800', letterSpacing: 1, marginLeft: 'auto'},
  stopTitleRow: {alignItems: 'center', flexDirection: 'row', marginTop: 13},
  placeIcon: {alignItems: 'center', backgroundColor: colors.brandSoft, borderRadius: 11, height: 38, justifyContent: 'center', width: 38},
  stopTitleArea: {flex: 1, marginLeft: 10},
  stopTitle: {color: colors.text, fontSize: 16, fontWeight: '800'},
  stopCity: {color: colors.textSecondary, fontSize: 12, marginTop: 2},
  stopDescription: {color: colors.textSecondary, fontSize: 13, lineHeight: 19, marginTop: 12},
  stopDuration: {alignItems: 'center', alignSelf: 'flex-start', backgroundColor: colors.background, borderRadius: 8, flexDirection: 'row', gap: 5, marginTop: 12, paddingHorizontal: 9, paddingVertical: 6},
  stopDurationText: {color: colors.textSecondary, fontSize: 11, fontWeight: '700'},
  travelConnector: {alignItems: 'center', flexDirection: 'row', gap: 8, paddingVertical: 8},
  connectorLine: {backgroundColor: colors.border, flex: 1, height: StyleSheet.hairlineWidth},
  travelText: {color: colors.textMuted, fontSize: 11, fontWeight: '700'},
  totalsCard: {backgroundColor: colors.brand, borderRadius: 17, flexDirection: 'row', justifyContent: 'space-between', marginTop: 18, padding: 16},
  total: {alignItems: 'center', flex: 1},
  totalValue: {color: colors.white, fontSize: 16, fontWeight: '800'},
  totalLabel: {color: '#b9d0c2', fontSize: 10, marginTop: 4, textAlign: 'center'},
  actions: {marginTop: 14},
  primaryAction: {alignItems: 'center', backgroundColor: colors.accent, borderRadius: 13, flexDirection: 'row', gap: 8, justifyContent: 'center', minHeight: 50},
  primaryActionText: {color: colors.white, fontSize: 15, fontWeight: '800'},
  secondaryActions: {flexDirection: 'row', gap: 10, marginTop: 10},
  secondaryAction: {alignItems: 'center', borderColor: colors.brand, borderRadius: 12, borderWidth: 1, flex: 1, flexDirection: 'row', gap: 7, justifyContent: 'center', minHeight: 46},
  savedAction: {backgroundColor: colors.brandSoft},
  secondaryActionText: {color: colors.brand, fontSize: 13, fontWeight: '800'},
  disclaimer: {color: colors.textMuted, fontSize: 11, lineHeight: 16, marginTop: 11, textAlign: 'center'},
  pressed: {opacity: 0.78},
});
