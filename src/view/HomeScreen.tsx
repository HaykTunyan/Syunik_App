import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';

type HomeScreenProps = {
  contentContainerStyle?: object;
};

export function HomeScreen({contentContainerStyle}: HomeScreenProps) {

  /**
   * HomeScreen is a React component that serves as the main entry point for the Syunik App. It displays a hero image, a title, a subtitle, a description, and several cards showcasing different locations and aspects of the Syunik region. The component uses a ScrollView to allow users to scroll through the content vertically. It accepts an optional contentContainerStyle prop to customize the styling of the ScrollView's content container.
   *  Props:
   * 
   */


  return (
    <ScrollView contentContainerStyle={contentContainerStyle}>
      <Image
        source={require('../assets/images/syunik_view.png')}
        style={styles.heroImage}
      />
      <Text style={styles.title}>Syunik Landscape</Text>
      <Text style={styles.subtitle}>
        Discover the beauty, history, and spirit of Syunik.
      </Text>
      <Text style={styles.description}>
        Syunik App is a welcoming guide to Armenia’s southern region. Explore
        breathtaking mountain landscapes, historic towns, and local culture
        through rich imagery and simple, inspiring information.
      </Text>

      <View style={styles.heroCard}>
        <Text style={styles.heroCardTitle}>Why Syunik?</Text>
        <Text style={styles.heroCardText}>
          Mountains, memory, and warm hospitality come together in every visit.
        </Text>
      </View>

      <View style={styles.cardRow}>

        <View style={styles.card}>
          <Image
            source={require('../assets/images/kapan_city.png')}
            style={styles.cardImage}
          />
          <Text style={styles.cardTitle}>Kapan</Text>
          <Text style={styles.cardText}>
            The regional center of Syunik, located at the foot of Mount Khustup.
          </Text>
        </View>

        <View style={styles.card}>
          <Image
            source={require('../assets/images/goris_city.png')}
            style={styles.cardImage}
          />
          <Text style={styles.cardTitle}>Goris</Text>
          <Text style={styles.cardText}>
            A city with unique architectural style, famous for its caves.
          </Text>
        </View>

        
      </View>

     
      <View style={styles.cardRow}>
        <View style={styles.card}>
          <Image
            source={require('../assets/images/sisian_city.png')}
            style={styles.cardImage}
          />
          <Text style={styles.cardTitle}>Sisian</Text>
          <Text style={styles.cardText}>
            Located on the banks of the Vorotan River, with a rich history.
          </Text>
        </View>

        <View style={styles.card}>
          <Image
            source={require('../assets/images/meghri_city.png')}
            style={styles.cardImage}
          />
          <Text style={styles.cardTitle}>Meghri</Text>
          <Text style={styles.cardText}>
            Armenia's southernmost city with a mild climate.
          </Text>
        </View>
      </View>

      <View style={styles.cardRow}>
        <View style={styles.card}>
          <Image
            source={require('../assets/images/qajaran_city.png')}
            style={styles.cardImage}
          />
          <Text style={styles.cardTitle}>Qajaran</Text>
          <Text style={styles.cardText}>
            Industrial city in Eastern Syunik, known for mining.
          </Text>
        </View>

        <View style={styles.card}>
          <Image
            source={require('../assets/images/agarak_city.png')}
            style={styles.cardImage}
          />
          <Text style={styles.cardTitle}>Agarak</Text>
          <Text style={styles.cardText}>
            Mining city of Syunik, famous for molybdenum and copper mines.
          </Text>
        </View>
      </View>


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  heroImage: {
    width: '100%',
    height: 220,
    borderRadius: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#2f3e2f',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#6d7a5d',
    marginBottom: 12,
    fontWeight: '600',
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#4d4d4d',
    marginBottom: 20,
  },
  heroCard: {
    backgroundColor: '#fffdf8',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e8dccb',
  },
  heroCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2f3e2f',
    marginBottom: 6,
  },
  heroCardText: {
    fontSize: 14,
    color: '#5f5f5f',
    lineHeight: 20,
  },
  cardRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  card: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 3},
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 100,
    borderRadius: 12,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2f3e2f',
    marginBottom: 4,
  },
  cardText: {
    fontSize: 13,
    lineHeight: 18,
    color: '#5f5f5f',
  },
});
