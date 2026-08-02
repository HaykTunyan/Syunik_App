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

type CityDetailScreenProps = {
  city: string;
  onBack: () => void;
};

export function CityDetailScreen({ city, onBack }: CityDetailScreenProps) {
  /**
   * City Detail Screen is a React component that displays detailed information about a specific city in the Syunik region. It includes a back button, a hero image of the city, the city's title, and a description. The component uses a ScrollView to allow users to scroll through the content vertically.
   */

  const cityData = citiesData.find(c => c.latinName === city);

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
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#6d7a5d',
    fontWeight: '600',
  },
});
