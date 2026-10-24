import {Linking, Platform} from 'react-native';

type PlaceMapLocation = {
  latitude: number;
  longitude: number;
  label: string;
};

export async function openPlaceInMaps({latitude, longitude, label}: PlaceMapLocation): Promise<boolean> {
  const encodedLabel = encodeURIComponent(label);
  const coordinateQuery = `${latitude},${longitude}`;
  const urls = Platform.select({
    ios: [
      `maps://?ll=${coordinateQuery}&q=${encodedLabel}`,
      `comgooglemaps://?q=${coordinateQuery}&query=${encodedLabel}`,
    ],
    android: [`geo:${coordinateQuery}?q=${coordinateQuery}(${encodedLabel})`],
    default: [],
  });

  for (const url of urls ?? []) {
    try {
      if (await Linking.canOpenURL(url)) {
        await Linking.openURL(url);
        return true;
      }
    } catch {
      // Try the next supported map scheme before reporting failure.
    }
  }

  return false;
}
