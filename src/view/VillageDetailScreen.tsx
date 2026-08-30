import React from 'react';
import {Image, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {topVisitingVillages, type VillageSpot} from './TourismScreen';

type VillageDetailScreenProps = {
  village: string;
  onBack: () => void;
};

export function VillageDetailScreen({village, onBack}: VillageDetailScreenProps) {
  const villageData = topVisitingVillages.find(item => item.id === village);

  if (!villageData) {
    return (
      <View style={styles.centered}>
        <Text style={styles.notFoundText}>Village not found.</Text>
        <Pressable onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable onPress={onBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </Pressable>

      <Image source={villageData.gallery[0]} style={styles.heroImage} resizeMode="cover" />
      <Text style={styles.title}>{villageData.name}</Text>
      <Text style={styles.location}>📍 {villageData.location}</Text>
      <Text style={styles.description}>{villageData.description}</Text>

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Road</Text>
        <Text style={styles.sectionText}>{villageData.road}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Place</Text>
        <Text style={styles.sectionText}>{villageData.place}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Gallery</Text>
        <View style={styles.galleryGrid}>
          {villageData.gallery.map((image, index) => (
            <Image key={`${villageData.id}-${index}`} source={image} style={styles.galleryImage} resizeMode="cover" />
          ))}
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Most visiting places</Text>
        {villageData.mostVisitedPlaces.map(place => (
          <View key={place.id} style={styles.placeRow}>
            <Image source={place.image} style={styles.placeImage} resizeMode="cover" />
            <Text style={styles.placeText}>{place.title}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 32,
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
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    color: '#6d7a5d',
    fontSize: 16,
    fontWeight: '700',
  },
  heroImage: {
    width: '100%',
    height: 260,
    borderRadius: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2f3e2f',
  },
  location: {
    marginTop: 8,
    color: '#4b6b3b',
    fontSize: 15,
    fontWeight: '600',
  },
  description: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 22,
    color: '#4d4d4d',
  },
  infoCard: {
    marginTop: 18,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#fffdf8',
    borderWidth: 1,
    borderColor: '#e8dccb',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2f3e2f',
    marginBottom: 8,
  },
  sectionText: {
    color: '#4d4d4d',
    fontSize: 14,
    lineHeight: 22,
  },
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  galleryImage: {
    width: '31%',
    height: 110,
    borderRadius: 12,
    marginBottom: 8,
  },
  placeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  placeImage: {
    width: 56,
    height: 56,
    borderRadius: 12,
  },
  placeText: {
    flex: 1,
    color: '#2f3e2f',
    fontSize: 15,
    fontWeight: '600',
  },
});
