import {create} from 'zustand';
import type {TransportType, Trip, TripDuration, TripInterest, TripStop} from '../types';

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
  day: number;
  time: string;
  title: string;
  city: string;
  description: string;
  category: TripInterest;
  durationMinutes: number;
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
  removeTrip: (tripId: string) => void;
  saveGeneratedTrip: () => Trip;
}

const MOCK_ITINERARY: ItineraryItem[] = [
  {
    id: 'day-1-vahanavank',
    day: 1,
    time: '09:30',
    title: 'Vahanavank Monastery',
    city: 'Kapan',
    description: 'Start among forested hills and discover one of Syunik’s quiet spiritual landmarks.',
    category: 'history',
    durationMinutes: 45,
  },
  {
    id: 'day-1-khustup',
    day: 1,
    time: '15:00',
    title: 'Khustup Mountain viewpoint',
    city: 'Kapan',
    description: 'Take in wide mountain views before a relaxed evening in Kapan.',
    category: 'nature',
    durationMinutes: 45,
    travelTimeMinutes: 25,
  },
  {
    id: 'day-2-tatev',
    day: 2,
    time: '09:00',
    title: 'Tatev Monastery',
    city: 'Goris',
    description: 'Spend the morning at Syunik’s iconic monastery and its dramatic gorge.',
    category: 'history',
    durationMinutes: 90,
    travelTimeMinutes: 30,
  },
  {
    id: 'day-2-khndzoresk',
    day: 2,
    time: '14:30',
    title: 'Khndzoresk caves and bridge',
    city: 'Goris',
    description: 'Walk through the old cave settlement and cross the swinging bridge.',
    category: 'nature',
    durationMinutes: 60,
    travelTimeMinutes: 35,
  },
  {
    id: 'day-3-karahunj',
    day: 3,
    time: '10:00',
    title: 'Zorats Karer (Karahunj)',
    city: 'Sisian',
    description: 'Explore the ancient stone observatory and the stories around its origins.',
    category: 'history',
    durationMinutes: 75,
    travelTimeMinutes: 30,
  },
  {
    id: 'day-3-shaki',
    day: 3,
    time: '15:30',
    title: 'Shaki Waterfall',
    city: 'Sisian',
    description: 'Slow down beside the waterfall and enjoy a peaceful afternoon outdoors.',
    category: 'nature',
    durationMinutes: 60,
    travelTimeMinutes: 20,
  },
  {
    id: 'day-4-meghri',
    day: 4,
    time: '10:30',
    title: 'Meghri old town',
    city: 'Meghri',
    description: 'Wander through warm-colored streets and taste the flavors of southern Syunik.',
    category: 'food',
    durationMinutes: 75,
    travelTimeMinutes: 40,
  },
  {
    id: 'day-5-qajaran',
    day: 5,
    time: '11:00',
    title: 'Qajaran and Lichk',
    city: 'Qajaran',
    description: 'Finish with highland scenery, local stories, and a gentle mountain walk.',
    category: 'culture',
    durationMinutes: 90,
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
    placeId: item.city.toLowerCase(),
    title: item.title,
    description: item.description,
    startTime: item.time,
    durationMinutes: item.durationMinutes,
    travelTimeMinutes: item.travelTimeMinutes,
    order: index + 1,
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
      (total, stop) => total + stop.durationMinutes + (stop.travelTimeMinutes ?? 0),
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
        selectedPreferences.interests.includes(item.category),
      );
      const remaining = MOCK_ITINERARY.filter(
        item => !selectedPreferences.interests.includes(item.category),
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
