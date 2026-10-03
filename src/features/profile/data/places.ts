import {citiesData} from '../../../data/citiesData';
import {historicalPlacesByCity} from '../../../data/historicalPlaces';

export type Place = {
  id: string;
  name: string;
  city: string;
};

const placesByName = new Map<string, Place>();

function addPlace(name: string, city: string): void {
  const normalizedName = name.trim();
  const key = normalizedName.toLocaleLowerCase();
  if (normalizedName && !placesByName.has(key)) {
    placesByName.set(key, {
      id: `${city.toLocaleLowerCase().replace(/\s+/g, '-')}-${key.replace(/[^a-z0-9]+/g, '-')}`,
      name: normalizedName,
      city,
    });
  }
}

citiesData.forEach(city => {
  city.mostVisitedPlace.forEach(place => addPlace(place.text, city.latinName));
  city.attractions.forEach(place => addPlace(place.id, city.latinName));
});

historicalPlacesByCity.forEach(city => {
  city.places.forEach(place => addPlace(place.name, city.city));
});

const localPlaces = Array.from(placesByName.values()).sort((left, right) =>
  left.name.localeCompare(right.name),
);

export function searchPlaces(query: string, limit = 8): Place[] {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  if (!normalizedQuery) {
    return [];
  }

  return localPlaces
    .filter(place => `${place.name} ${place.city}`.toLocaleLowerCase().includes(normalizedQuery))
    .slice(0, limit);
}