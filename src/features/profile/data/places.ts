import {places, type Place} from '../../../data/places';

export type {Place} from '../../../data/places';

export function searchPlaces(query: string, limit = 8): Place[] {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  if (!normalizedQuery) {
    return [];
  }

  return places
    .filter(place => [place.name, place.cityName, place.category, ...place.tags]
      .join(' ')
      .toLocaleLowerCase()
      .includes(normalizedQuery))
    .sort((left, right) => left.name.localeCompare(right.name))
    .slice(0, limit);
}
