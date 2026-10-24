import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {places as catalogPlaces, type Place, type PlaceCategory} from '../../../data/places';

export interface PlacesState {
  places: Place[];
  favoritePlaceIds: string[];
  searchQuery: string;
  selectedCategory: PlaceCategory | 'all';
  addFavorite: (placeId: string) => void;
  removeFavorite: (placeId: string) => void;
  toggleFavorite: (placeId: string) => void;
  isFavorite: (placeId: string) => boolean;
  setSearchQuery: (query: string) => void;
  setCategory: (category: PlaceCategory | 'all') => void;
};

export const usePlacesStore = create<PlacesState>()(
  persist(
    (set, get) => ({
      places: catalogPlaces,
      favoritePlaceIds: [],
      searchQuery: '',
      selectedCategory: 'all',
      addFavorite: placeId => set(state => ({
        favoritePlaceIds: state.favoritePlaceIds.includes(placeId)
          ? state.favoritePlaceIds
          : [...state.favoritePlaceIds, placeId],
      })),
      removeFavorite: placeId => set(state => ({
        favoritePlaceIds: state.favoritePlaceIds.filter(id => id !== placeId),
      })),
      toggleFavorite: placeId => {
        if (get().isFavorite(placeId)) {
          get().removeFavorite(placeId);
          return;
        }
        get().addFavorite(placeId);
      },
      isFavorite: placeId => get().favoritePlaceIds.includes(placeId),
      setSearchQuery: searchQuery => set({searchQuery}),
      setCategory: selectedCategory => set({selectedCategory}),
    }),
    {
      name: 'syunik.place-favorites',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({favoritePlaceIds: state.favoritePlaceIds}),
    },
  ),
);
