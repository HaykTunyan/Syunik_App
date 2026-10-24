import AsyncStorage from '@react-native-async-storage/async-storage';
import {getPlaceById, getPlaceByName} from '../data/places';

export type SavedTripStop = {
  id: string;
  placeId: string;
  scheduledAt: string;
  restaurant: string;
};

const TRIP_STOPS_KEY = 'syunik.trips.stops';

function parseTripStop(value: unknown): SavedTripStop | undefined {
  if (!value || typeof value !== 'object') {
    return undefined;
  }

  const stop = value as Record<string, unknown>;
  if (typeof stop.id !== 'string' || typeof stop.scheduledAt !== 'string' || !Number.isFinite(Date.parse(stop.scheduledAt)) || typeof stop.restaurant !== 'string') {
    return undefined;
  }

  if (typeof stop.placeId === 'string' && getPlaceById(stop.placeId)) {
    return {id: stop.id, placeId: stop.placeId, scheduledAt: stop.scheduledAt, restaurant: stop.restaurant};
  }

  if (typeof stop.place === 'string') {
    const place = getPlaceByName(stop.place);
    return place ? {id: stop.id, placeId: place.id, scheduledAt: stop.scheduledAt, restaurant: stop.restaurant} : undefined;
  }

  return undefined;
}

export async function loadTripStops(): Promise<SavedTripStop[]> {
  const stored = await AsyncStorage.getItem(TRIP_STOPS_KEY);
  if (!stored) {
    return [];
  }

  const parsed: unknown = JSON.parse(stored);
  return Array.isArray(parsed)
    ? parsed.map(parseTripStop).filter((stop): stop is SavedTripStop => Boolean(stop))
    : [];
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
