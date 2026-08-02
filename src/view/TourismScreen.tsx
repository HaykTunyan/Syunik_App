import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {HeaderBack} from '../components/HeaderBack';

type TourismScreenProps = {
  onBack: () => void;
};

type CitySpot = {
  name: string;
  image: any;
  description: string;
  highlights: string[];
};

const cities: CitySpot[] = [
  {
    name: 'Kapan',
    image: require('../assets/images/kapan_city.png'),
    description:
      'A lively mountain city known for its green valleys, old bridges, and welcoming local culture.',
    highlights: ['Historic center', 'River views', 'Local food and markets'],
  },
  {
    name: 'Goris',
    image: require('../assets/images/goris_city.png'),
    description:
      'One of the most scenic cities in Syunik, famous for its dramatic rock formations and nearby monasteries.',
    highlights: ['Tatev cableway access', 'Stone architecture', 'Mountain landscapes'],
  },
  {
    name: 'Sisian',
    image: require('../assets/images/sisian_city.png'),
    description:
      'A calm gateway to ancient heritage sites, wide open plains, and peaceful countryside.',
    highlights: ['Ancient landmarks', 'Rural landscapes', 'Local vineyards'],
  },
  {
    name: 'Meghri',
    image: require('../assets/images/meghri_city.png'),
    description:
      'A warm and sunny town known for its orchards, wine tradition, and southern Armenian atmosphere.',
    highlights: ['Fruit gardens', 'Wine culture', 'Border landscapes'],
  },
  {
    name: 'Qajaran',
    image: require('../assets/images/qajaran_city.png'),
    description:
      'A historic city that blends natural beauty with a strong sense of regional identity and heritage.',
    highlights: ['Cultural heritage', 'Mountain routes', 'Traditional villages'],
  },
  {
    name: 'Agarak',
    image: require('../assets/images/agarak_city.png'),
    description:
      'A vibrant border town surrounded by mountains, where local life and nature meet in a unique way.',
    highlights: ['Border scenery', 'Friendly local community', 'Nature trails'],
  },
];

export function TourismScreen({onBack}: TourismScreenProps) {

    /**
     * TourismScreen is a React component that displays information about tourism in the Syunik region. It includes a back button, a title, a body of text, and a series of cards showcasing different cities with their images, descriptions, and highlights. The component uses a ScrollView to allow users to scroll through the content vertically.
     * Props:
     * - onBack: A function that is called when the back button is pressed. This allows the parent component to handle navigation back to the previous screen.
     * 
     */

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
            <HeaderBack onBack={onBack} />

        <Text style={styles.title}>Tourism in Syunik</Text>
        <Text style={styles.body}>
          Syunik offers a rich mix of mountains, monasteries, villages, and local traditions. Each city brings its own story, landscape, and experience for travelers.
        </Text>

        {cities.map(city => (
          <View key={city.name} style={styles.card}>
            <Image source={city.image} resizeMode="stretch" style={styles.image} />
            <Text style={styles.cityName}>{city.name}</Text>
            <Text style={styles.description}>{city.description}</Text>
            {city.highlights.map(item => (
              <Text key={item} style={styles.highlight}>
                • {item}
              </Text>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6efe6',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 28,
    paddingTop: 16,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 14,
  },
  backButtonText: {
    color: '#4b6b3b',
    fontSize: 15,
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2f3e2f',
    marginBottom: 8,
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    color: '#4d4d4d',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 3},
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 225,
    borderRadius: 12,
    marginBottom: 10,
  },
  cityName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2f3e2f',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#5f5f5f',
    marginBottom: 8,
  },
  highlight: {
    fontSize: 13,
    color: '#4b6b3b',
    marginBottom: 4,
  },
});
