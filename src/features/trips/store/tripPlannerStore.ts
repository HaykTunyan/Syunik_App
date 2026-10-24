import {create} from 'zustand';
import type {TransportType, Trip, TripDuration, TripInterest, TripStop} from '../types';
import {getPlaceById} from '../../../data/places';

export type TripPace = 'Relaxed' | 'Balanced' | 'Full days';
export type TripStartingLocation = 'Use my current location' | 'Kapan' | 'Goris' | 'Tatev' | 'Meghri' | 'Sisian';
export type TripTransportation = TransportType;

export type TripPreferences = {
  duration: TripDuration;
  durationLabel: string;
  pace: TripPace;
  interests: TripInterest[];
  startingLocation: TripStartingLocation;
  transportation: TripTransportation;
  startDate: string;
};

export type ItineraryItem = {
  id: string;
  placeId: string;
  day: number;
  time: string;
  travelTimeMinutes?: number;
};

const durationDays: Record<TripDuration, number> = {
  '2_hours': 1,
  half_day: 1,
  '1_day': 1,
  '2_3_days': 3,
  '1_week': 5,
};

export interface TripState {
  preferences: TripPreferences;
  itinerary: ItineraryItem[];
  trips: Trip[];
  currentTrip?: Trip;
  setPreferences: (preferences: TripPreferences) => void;
  generateItinerary: (preferences?: TripPreferences) => void;
  createTrip: (trip: Trip) => void;
  saveTrip: (trip: Trip) => void;
  setCurrentTrip: (trip: Trip) => void;
  addPlaceToCurrentTrip: (placeId: string) => boolean;
  removeTrip: (tripId: string) => void;
  saveGeneratedTrip: () => Trip;
}

const MOCK_ITINERARY: ItineraryItem[] = [
  {
    id: 'day-1-vahanavank',
    placeId: 'vahanavank',
    day: 1,
    time: '09:30',
  },
  {
    id: 'day-1-khustup',
    placeId: 'khustup-mountain',
    day: 1,
    time: '15:00',
    travelTimeMinutes: 25,
  },
  {
    id: 'day-2-tatev',
    placeId: 'tatev-monastery',
    day: 2,
    time: '09:00',
    travelTimeMinutes: 30,
  },
  {
    id: 'day-2-khndzoresk',
    placeId: 'khndzoresk',
    day: 2,
    time: '14:30',
    travelTimeMinutes: 35,
  },
  {
    id: 'day-3-karahunj',
    placeId: 'zorats-karer',
    day: 3,
    time: '10:00',
    travelTimeMinutes: 30,
  },
  {
    id: 'day-3-shaki',
    placeId: 'shaki-waterfall',
    day: 3,
    time: '15:30',
    travelTimeMinutes: 20,
  },
  {
    id: 'day-4-meghri',
    placeId: 'meghri-old-town',
    day: 4,
    time: '10:30',
    travelTimeMinutes: 40,
  },
  {
    id: 'day-5-qajaran',
    placeId: 'qajaran-historic-district',
    day: 5,
    time: '11:00',
    travelTimeMinutes: 35,
  },
];

const initialPreferences: TripPreferences = {
  duration: '2_3_days',
  durationLabel: '2–3 days',
  pace: 'Balanced',
  interests: ['nature', 'history'],
  startingLocation: 'Kapan',
  transportation: 'car',
  startDate: new Date().toISOString(),
};

function buildGeneratedTrip(preferences: TripPreferences, itinerary: ItineraryItem[]): Trip {
  const stops: TripStop[] = itinerary.map((item, index) => ({
    id: item.id,
    placeId: item.placeId,
    order: index + 1,
    startTime: item.time,
    duration: getPlaceById(item.placeId)?.recommendedDuration ?? 60,
    travelTimeFromPrevious: item.travelTimeMinutes,
  }));

  return {
    id: `trip-${Date.now()}`,
    title: 'Your Syunik Adventure',
    duration: preferences.duration,
    interests: preferences.interests,
    transport: preferences.transportation,
    startLocation: preferences.startingLocation,
    totalDistanceKm: itinerary.length * 18,
    totalDurationMinutes: stops.reduce(
      (total, stop) => total + stop.duration + (stop.travelTimeFromPrevious ?? 0),
      0,
    ),
    stops,
    createdAt: new Date().toISOString(),
  };
}

export const useTripPlannerStore = create<TripState>((set, get) => ({
  preferences: initialPreferences,
  itinerary: MOCK_ITINERARY.slice(0, 6),
  trips: [],
  setPreferences: preferences => set({preferences}),
  generateItinerary: nextPreferences =>
    set(state => {
      const selectedPreferences = nextPreferences ?? state.preferences;
      const preferred = MOCK_ITINERARY.filter(item =>
        selectedPreferences.interests.includes(getPlaceById(item.placeId)?.category ?? 'culture'),
      );
      const remaining = MOCK_ITINERARY.filter(
        item => !selectedPreferences.interests.includes(getPlaceById(item.placeId)?.category ?? 'culture'),
      );
      const itinerary = [...preferred, ...remaining]
        .sort((left, right) => left.day - right.day || left.time.localeCompare(right.time))
        .slice(0, durationDays[selectedPreferences.duration] * 2);

      return {preferences: selectedPreferences, itinerary};
    }),
  createTrip: trip => set({currentTrip: trip}),
  saveTrip: trip =>
    set(state => ({
      trips: [...state.trips.filter(savedTrip => savedTrip.id !== trip.id), trip],
      currentTrip: trip,
    })),
  setCurrentTrip: trip => set({currentTrip: trip}),
  addPlaceToCurrentTrip: placeId => {
    const place = getPlaceById(placeId);
    if (!place) {
      return false;
    }

    const state = get();
    const targetTrip = state.currentTrip ?? state.trips[0];
    const trip = targetTrip ?? {
      id: `trip-${Date.now()}`,
      title: 'Your Syunik Adventure',
      duration: state.preferences.duration,
      interests: state.preferences.interests,
      transport: state.preferences.transportation,
      startLocation: state.preferences.startingLocation,
      stops: [],
      createdAt: new Date().toISOString(),
    };

    if (trip.stops.some(stop => stop.placeId === placeId)) {
      return false;
    }

    const nextStop: TripStop = {
      id: `${trip.id}-${placeId}`,
      placeId,
      order: trip.stops.length + 1,
      duration: place.recommendedDuration,
    };
    const nextTrip: Trip = {
      ...trip,
      stops: [...trip.stops, nextStop],
      totalDurationMinutes: (trip.totalDurationMinutes ?? 0) + nextStop.duration,
    };

    set(current => ({
      currentTrip: nextTrip,
      trips: [...current.trips.filter(item => item.id !== nextTrip.id), nextTrip],
    }));
    return true;
  },
  removeTrip: tripId =>
    set(state => ({
      trips: state.trips.filter(trip => trip.id !== tripId),
      currentTrip: state.currentTrip?.id === tripId ? undefined : state.currentTrip,
    })),
  saveGeneratedTrip: () => {
    const state = get();
    const trip = buildGeneratedTrip(state.preferences, state.itinerary);
    state.saveTrip(trip);
    return trip;
  },
}));
