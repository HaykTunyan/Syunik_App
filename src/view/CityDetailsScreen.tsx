//

import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { AttractionsCarousel } from '../components/AttractionsCarousel';
import { citiesData } from '../data/citiesData';
import { historicalPlacesByCity } from '../data/historicalPlaces';

const MAP_BOUNDS = {
  minLatitude: 38.84,
  maxLatitude: 39.56,
  minLongitude: 45.98,
  maxLongitude: 46.46,
};

type CityDetailScreenProps = {
  city: string;
  onBack: () => void;
};

export function CityDetailScreen({ city, onBack }: CityDetailScreenProps) {
  /**
   * City Detail Screen is a React component that displays detailed information about a specific city in the Syunik region. It includes a back button, a hero image of the city, the city's title, and a description. The component uses a ScrollView to allow users to scroll through the content vertically.
   */

  const cityData = citiesData.find(c => c.latinName === city);
  const historicalPlaces = historicalPlacesByCity.find(item => item.city === city)?.places ?? [];

  if (!cityData) {
    return (
      <View style={styles.centered}>
        <Text style={styles.notFoundText}>City not found.</Text>
        <Pressable onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back to Home</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable onPress={onBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </Pressable>
      <Image
        source={cityData.image}
        resizeMode="stretch"
        style={styles.heroImage}
      />
      <Text style={styles.title}>{cityData.latinName}</Text>
      <Text style={styles.description}>{cityData.description}</Text>

      {/* <View style={styles.mapCard}>
        <View style={styles.mapHeader}>
          <View>
            <Text style={styles.mapEyebrow}>EXPLORE THE REGION</Text>
            <Text style={styles.infoTitle}>Syunik city map</Text>
          </View>
          <Text style={styles.mapCompass}>N ↑</Text>
        </View>
        <View style={styles.mapSurface}>
          <View style={[styles.mapContour, styles.mapContourOne]} />
          <View style={[styles.mapContour, styles.mapContourTwo]} />
          <View style={[styles.mapContour, styles.mapContourThree]} />
          {citiesData.map(city => {
            const left = ((city.coords[1] - MAP_BOUNDS.minLongitude) /
              (MAP_BOUNDS.maxLongitude - MAP_BOUNDS.minLongitude)) * 100;
            const top = ((MAP_BOUNDS.maxLatitude - city.coords[0]) /
              (MAP_BOUNDS.maxLatitude - MAP_BOUNDS.minLatitude)) * 100;
            const isSelected = city.latinName === cityData.latinName;

            return (
              <View
                key={city.id}
                style={[styles.mapPin, {left: `${left}%`, top: `${top}%`}]}
                accessibilityLabel={`${city.latinName} city on Syunik map`}>
                <View style={[styles.pinDot, isSelected && styles.pinDotSelected]} />
                <Text style={[styles.pinLabel, isSelected && styles.pinLabelSelected]}>
                  {city.latinName}
                </Text>
              </View>
            );
          })}
          <Text style={styles.mapRegionLabel}>SYUNIK</Text>
          <Text style={styles.mapRiverLabel}>VOROTAN</Text>
        </View>
        <View style={styles.mapLegend}>
          <View style={[styles.legendDot, styles.legendDotSelected]} />
          <Text style={styles.legendText}>{cityData.latinName}</Text>
          <View style={styles.legendDivider} />
          <View style={styles.legendDot} />
          <Text style={styles.legendText}>Other cities</Text>
        </View>
      </View> */}

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Most visited place</Text>
        {cityData.mostVisitedPlace.map(place => (
          <View key={place.id} style={styles.mostVisitedWrap}>
            <Image source={place.image} style={styles.mostVisitedImage} resizeMode="cover" />
            <Text style={styles.highlightText}>{place.text}</Text>
          </View>
        ))}
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>City information</Text>
        <InfoRow label="Population" value={cityData.population} />
        <InfoRow label="Area" value={cityData.size} />
        <InfoRow label="Founded" value={cityData.founding} />
        <InfoRow
          label="Coordinates"
          value={`${cityData.coords[0]}, ${cityData.coords[1]}`}
        />
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Attractions</Text>
        <AttractionsCarousel attractions={cityData.attractions} />
      </View>

      <View style={styles.historyCard}>
        <View style={styles.historyHeader}>
          <View>
            <Text style={styles.historyEyebrow}>SYUNIK HERITAGE</Text>
            <Text style={styles.infoTitle}>Historical places</Text>
          </View>
          <Text style={styles.historyIcon}>🏛️</Text>
        </View>
        {historicalPlaces.map(place => (
          <View key={place.name} style={styles.historyPlaceRow}>
            <Text style={styles.historyPlaceName}>{place.name}</Text>
            <Text style={styles.historyPlaceAddress}>{place.address}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 28,
    paddingTop: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  notFoundText: {
    fontSize: 16,
    color: '#4d4d4d',
    marginBottom: 16,
  },
  heroImage: {
    width: '100%',
    height: 250,
    borderRadius: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2f3e2f',
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#4d4d4d',
    marginBottom: 18,
  },
  mapCard: {
    backgroundColor: '#eef3e9',
    borderRadius: 18,
    borderColor: '#d8e3d1',
    borderWidth: 1,
    marginBottom: 16,
    padding: 14,
  },
  mapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  mapEyebrow: {
    color: '#71866a',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 3,
  },
  mapCompass: {
    color: '#61785b',
    fontSize: 12,
    fontWeight: '800',
  },
  mapSurface: {
    height: 214,
    overflow: 'hidden',
    position: 'relative',
    borderRadius: 14,
    backgroundColor: '#dbe8d4',
    borderWidth: 1,
    borderColor: '#c8d9bf',
  },
  mapContour: {
    position: 'absolute',
    borderColor: '#c2d6b9',
    borderWidth: 1,
    borderRadius: 120,
    transform: [{rotate: '-22deg'}],
  },
  mapContourOne: {
    width: 320,
    height: 110,
    top: 28,
    left: -70,
  },
  mapContourTwo: {
    width: 350,
    height: 135,
    top: 88,
    left: 48,
  },
  mapContourThree: {
    width: 240,
    height: 90,
    top: -12,
    left: 118,
  },
  mapPin: {
    position: 'absolute',
    alignItems: 'center',
    transform: [{translateX: -8}, {translateY: -8}],
  },
  pinDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#6c8b61',
    borderWidth: 2,
    borderColor: '#f4f8f1',
  },
  pinDotSelected: {
    width: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: '#c16b48',
  },
  pinLabel: {
    marginTop: 3,
    color: '#50664a',
    fontSize: 10,
    fontWeight: '700',
  },
  pinLabelSelected: {
    color: '#9b4e32',
    fontSize: 11,
  },
  mapRegionLabel: {
    position: 'absolute',
    right: 16,
    bottom: 17,
    color: '#a8c09f',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 3,
  },
  mapRiverLabel: {
    position: 'absolute',
    left: 16,
    bottom: 16,
    color: '#76999a',
    fontSize: 9,
    fontStyle: 'italic',
    letterSpacing: 1,
    transform: [{rotate: '-20deg'}],
  },
  mapLegend: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6c8b61',
    marginRight: 5,
  },
  legendDotSelected: {
    backgroundColor: '#c16b48',
  },
  legendText: {
    color: '#5d7056',
    fontSize: 11,
    fontWeight: '600',
  },
  legendDivider: {
    width: 1,
    height: 14,
    backgroundColor: '#c7d7c0',
    marginHorizontal: 10,
  },
  infoCard: {
    backgroundColor: '#fffdf8',
    borderRadius: 16,
    borderColor: '#e8dccb',
    borderWidth: 1,
    marginBottom: 16,
    padding: 16,
  },
  infoTitle: {
    color: '#2f3e2f',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  mostVisitedWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
  },
  mostVisitedImage: {
    width: 52,
    height: 52,
    borderRadius: 12,
  },
  highlightText: {
    color: '#4b6b3b',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    flex: 1,
  },
  infoRow: {
    borderBottomColor: '#eee5d9',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 9,
  },
  infoLabel: {
    color: '#5f5f5f',
    fontSize: 14,
    fontWeight: '600',
  },
  infoValue: {
    color: '#2f3e2f',
    fontSize: 14,
  },
  historyCard: {
    backgroundColor: '#efe8db',
    borderColor: '#e1d4c2',
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
    padding: 16,
  },
  historyHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  historyEyebrow: {
    color: '#a45c3c',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.15,
    marginBottom: 3,
  },
  historyIcon: {
    fontSize: 24,
  },
  historyPlaceRow: {
    borderTopColor: '#e1d4c2',
    borderTopWidth: 1,
    paddingVertical: 11,
  },
  historyPlaceName: {
    color: '#2f3e2f',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 4,
  },
  historyPlaceAddress: {
    color: '#687362',
    fontSize: 13,
    lineHeight: 18,
  },
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#6d7a5d',
    fontWeight: '600',
  },
});
