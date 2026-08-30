import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
} from 'react-native';
import {HeaderBack} from '../components/HeaderBack';

type TourismScreenProps = {
  onBack: () => void;
  onSelectVillage: (villageId: string) => void;
};

type CitySpot = {
  name: string;
  image: any;
  description: string;
  highlights: string[];
};

export type VillageSpot = {
  id: string;
  name: string;
  location: string;
  description: string;
  road: string;
  place: string;
  gallery: ImageSourcePropType[];
  mostVisitedPlaces: Array<{id: string; title: string; image: ImageSourcePropType}>;
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

export const topVisitingVillages: VillageSpot[] = [
  {
    id: 'tatev',
    name: 'Tatev',
    location: 'Tatev Municipality, Syunik Province',
    description:
      'Tatev is one of the most famous historical villages of Syunik, known for the medieval Tatev Monastery, its cableway, and the dramatic mountain panorama surrounding it.',
    road: 'The road to Tatev follows the mountain route from Goris through the highlands of Syunik, and the Tatev cableway is the most popular way to reach the monastery area.',
    place: 'Tatev Monastery and the surrounding cliffs are the main landmarks, offering one of the most impressive views in Armenia.',
    gallery: [
      require('../assets/images/for-travel/tatev.png'),
      require('../assets/images/for-travel/hermitage_tatev.png'),
      require('../assets/images/for-travel/syuniks_gate.png'),
    ],
    mostVisitedPlaces: [
      {id: 'tatev-monastery', title: 'Tatev Monastery', image: require('../assets/images/for-travel/tatev.png')},
      {id: 'tatev-cableway', title: 'Tatev Cableway viewpoint', image: require('../assets/images/for-travel/hermitage_tatev.png')},
    ],
  },
  {
    id: 'khndzoresk',
    name: 'Khndzoresk',
    location: 'Goris Municipality, Syunik Province',
    description:
      'Khndzoresk is one of Syunik’s most distinctive villages, famous for its cave houses, ancient bridge, and dramatic canyon setting that reflects the region’s historical architecture.',
    road: 'The route from Goris to Khndzoresk leads into the canyon area, where the road climbs through steep slopes and offers panoramic views before reaching the village.',
    place: 'The cave village and the historical hanging bridge are the village’s signature sights and the main photo points for visitors.',
    gallery: [
      require('../assets/images/for-travel/khndzoresk.png'),
      require('../assets/images/for-travel/khndzoresk_caves.png'),
      require('../assets/images/for-travel/old_goris.png'),
    ],
    mostVisitedPlaces: [
      {id: 'khndzoresk-bridge', title: 'Khndzoresk Bridge', image: require('../assets/images/for-travel/khndzoresk.png')},
      {id: 'khndzoresk-caves', title: 'Cave Village', image: require('../assets/images/for-travel/khndzoresk_caves.png')},
    ],
  },
  {
    id: 'halidzor',
    name: 'Halidzor',
    location: 'Tatev Municipality, Syunik Province',
    description:
      'Halidzor is a historic village close to Tatev, associated with the military and cultural heritage of Syunik and known for its strategic location in the mountain landscape.',
    road: 'The road to Halidzor follows the historic Tatev route through the high plateau, with open mountain views and a strong sense of the region’s medieval past.',
    place: 'Halidzor Fortress and the surrounding valley viewpoints are the village’s most important cultural and scenic highlights.',
    gallery: [
      require('../assets/images/for-travel/halidzor.png'),
      require('../assets/images/for-travel/halizdor-view.png'),
      require('../assets/images/syunik_view.png'),
    ],
    mostVisitedPlaces: [
      {id: 'halidzor-fortress', title: 'Halidzor fortress view', image: require('../assets/images/for-travel/halidzor.png')},
      {id: 'halidzor-viliges', title: 'Halidzor Viliges view', image: require('../assets/images/for-travel/halizdor-view.png')},
    ],
  },
  {
    id: 'shaki',
    name: 'Shaki',
    location: 'Sisian Municipality, Syunik Province',
    description:
      'Shaki is a picturesque mountain village in the Sisian region, surrounded by greenery and known for its waterfall, rural atmosphere, and close links to the natural landscapes of Syunik.',
    road: 'The road to Shaki goes through the Sisian highland route, offering open valley views and a quiet rural approach before the village itself.',
    place: 'The village is best known for the Shaki waterfall and the scenic surroundings that create one of the most peaceful nature stops in the area.',
    gallery: [
      require('../assets/images/for-travel/shake.png'),
      require('../assets/images/for-travel/vorotnaberd.png'),
      require('../assets/images/moutain.png'),
    ],
    mostVisitedPlaces: [
      {id: 'shaki-waterfall', title: 'Shaki Waterfall', image: require('../assets/images/for-travel/shake.png')},
      {id: 'vorotnaberd', title: 'Vorotnaberd viewpoint', image: require('../assets/images/for-travel/vorotnaberd.png')},
    ],
  },

  {
    id: 'shikahogh',
    name: 'Shikahogh',
    location: 'Kapan Municipality, Syunik Province',
    description:
      'Shikahogh is a quiet mountain village in the Kapan region, valued for its green surroundings, peaceful rural life, and traditional Syunik atmosphere.',
    road: 'The road to Shikahogh follows the Kapan mountain route, where the landscape becomes more rolling and wooded before reaching the village.',
    place: 'The village’s surrounding valley, local landscape, and nearby viewpoints are the main points of interest for visitors seeking a calm and authentic stop.',
    gallery: [
      require('../assets/images/for-travel/old_goris.png'),
      require('../assets/images/for-travel/syuniks_gate.png'),
      require('../assets/images/syunik_landscape.png'),
    ],
    mostVisitedPlaces: [
      {id: 'shikahogh-view', title: 'Shikahogh Viewpoint', image: require('../assets/images/for-travel/old_goris.png')},
      {id: 'shikahogh-valley', title: 'Village Valley', image: require('../assets/images/syunik_landscape.png')},
    ],
  },
  {
    id: 'Khot',
    name: 'Khot',
    location: 'Goris Municipality, Syunik Province',
    description:
      'Khot is a traditional mountain village in the Goris area, appreciated for its village atmosphere, local heritage, and the peaceful rural character of the Syunik highlands.',
    road: 'The road to Khot runs through the Goris mountain corridor, with wide views of the valleys and a gradual approach into the village.',
    place: 'The village center and nearby viewpoints offer a calm look at local life and the surrounding natural landscape.',
    gallery: [
      require('../assets/images/for-travel/khot.png'),
      require('../assets/images/for-travel/old_goris.png'),
      require('../assets/images/for-travel/syuniks_gate.png'),
    ],
    mostVisitedPlaces: [
      {id: 'khot-village', title: 'Khot Village Center', image: require('../assets/images/for-travel/khot.png')},
      {id: 'khot-viewpoint', title: 'Khot Viewpoint', image: require('../assets/images/for-travel/old_goris.png')},
    ],
  },

];

export function TourismScreen({onBack, onSelectVillage}: TourismScreenProps) {
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

        <View style={styles.villagesSection}>
          <View style={styles.villagesHeading}>
            <View>
              <Text style={styles.villagesTitle}>Top visiting villages</Text>
              <Text style={styles.villagesSubtitle}>Small places with unforgettable Syunik stories</Text>
            </View>
            <Text style={styles.villagesCount}>{topVisitingVillages.length}</Text>
          </View>

          <View style={styles.villagesList}>
            {topVisitingVillages.map((village, index) => (
              <Pressable key={village.id} onPress={() => onSelectVillage(village.id)} style={styles.villageItem}>
                <View style={styles.villageNumber}>
                  <Text style={styles.villageNumberText}>{String(index + 1).padStart(2, '0')}</Text>
                </View>
                <View style={styles.villageInfo}>
                  <Text style={styles.villageName}>{village.name}</Text>
                  <Text style={styles.villageLocation}>📍 {village.location}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
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
  villagesSection: {
    marginTop: 10,
    padding: 16,
    borderRadius: 18,
    backgroundColor: '#314a2b',
  },
  villagesHeading: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  villagesTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
  },
  villagesSubtitle: {
    maxWidth: 235,
    marginTop: 4,
    color: '#cfdbc5',
    fontSize: 13,
    lineHeight: 18,
  },
  villagesCount: {
    minWidth: 30,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: '#dce9d1',
    color: '#36542f',
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'center',
  },
  villagesList: {
    gap: 8,
  },
  villageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 13,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  villageNumber: {
    width: 35,
    height: 35,
    marginRight: 11,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dce9d1',
  },
  villageNumberText: {
    color: '#36542f',
    fontSize: 11,
    fontWeight: '800',
  },
  villageInfo: {
    flex: 1,
  },
  villageName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  villageLocation: {
    marginTop: 3,
    color: '#d4dfca',
    fontSize: 12,
  },
});
