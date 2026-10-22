import AsyncStorage from '@react-native-async-storage/async-storage';

export type SavedTripStop = {
  id: string;
  place: string;
  city: string;
  scheduledAt: string;
  restaurant: string;
};

const TRIP_STOPS_KEY = 'syunik.trips.stops';

function isTripStop(value: unknown): value is SavedTripStop {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const stop = value as Record<string, unknown>;
  return (
    typeof stop.id === 'string' &&
    typeof stop.place === 'string' &&
    typeof stop.city === 'string' &&
    typeof stop.scheduledAt === 'string' &&
    Number.isFinite(Date.parse(stop.scheduledAt)) &&
    typeof stop.restaurant === 'string'
  );
}

export async function loadTripStops(): Promise<SavedTripStop[]> {
  const stored = await AsyncStorage.getItem(TRIP_STOPS_KEY);
  if (!stored) {
    return [];
  }

  const parsed: unknown = JSON.parse(stored);
  return Array.isArray(parsed) ? parsed.filter(isTripStop) : [];
}

export async function addTripStop(stop: SavedTripStop): Promise<SavedTripStop[]> {
  const stops = await loadTripStops();
  const nextStops = [...stops, stop].sort(
    (left, right) =>
      Date.parse(left.scheduledAt) - Date.parse(right.scheduledAt),
  );
  await AsyncStorage.setItem(TRIP_STOPS_KEY, JSON.stringify(nextStops));
  return nextStops;
}

export async function deleteTripStop(id: string): Promise<SavedTripStop[]> {
  const nextStops = (await loadTripStops()).filter(stop => stop.id !== id);
  await AsyncStorage.setItem(TRIP_STOPS_KEY, JSON.stringify(nextStops));
  return nextStops;
}
