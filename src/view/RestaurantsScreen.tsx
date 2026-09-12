import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {HeaderBack} from '../components/HeaderBack';

type Restaurant = {
  id: number;
  name: string;
  city: string;
  region: string;
  street: string | null;
  address: string;
  phone: string | null;
  rating: number;
  reviews: number;
  status?: string;
};

export const topRestaurants: Restaurant[] = [
  {
    id: 1,
    name: 'Manveli Mot - Eco Food',
    city: 'Sisian',
    region: 'Syunik',
    street: 'Shaki Roadway',
    address: 'Shaki 9, Sisian',
    phone: '+374 93 77 00 40',
    rating: 4.9,
    reviews: 110,
  },
  {
    id: 2,
    name: 'Van Tavern',
    city: 'Sisian',
    region: 'Syunik',
    street: 'Israelyan Street',
    address: '39/1 Israelyan Street, Sisian',
    phone: '+374 93 97 91 99',
    rating: 4.6,
    reviews: 67,
  },
  {
    id: 3,
    name: 'Old Goris Restaurant',
    city: 'Goris',
    region: 'Syunik',
    street: 'Mesrop Mashtots Street',
    address: '25/1 Mashtots Street, Goris',
    phone: '+374 93 11 82 55',
    rating: 4.8,
    reviews: 242,
  },
  {
    id: 4,
    name: 'Go Gyro',
    city: 'Goris',
    region: 'Syunik',
    street: 'Syunik Street',
    address: '11 Syunik Street, Goris',
    phone: '+374 98 04 50 55',
    rating: 4.9,
    reviews: 114,
  },
  {
    id: 5,
    name: 'Khoreayi Dzor',
    city: 'Goris',
    region: 'Syunik',
    street: 'Arzoumanyan Street',
    address: '28 Arzoumanyan Street, Goris',
    phone: '+374 99 35 04 50',
    rating: 4.1,
    reviews: 83,
  },
  {
    id: 6,
    name: 'Cafe SYUNIK',
    city: 'Kapan',
    region: 'Syunik',
    street: null,
    address: '6C32+VQ6, Kapan',
    phone: '+374 77 70 84 08',
    rating: 4.8,
    reviews: 12,
  },
  {
    id: 7,
    name: 'Cafe 48',
    city: 'Kapan',
    region: 'Syunik',
    street: 'Melik Stepanyan Street',
    address: 'Melik Stepanyan Street, Kapan',
    phone: '+374 96 48 96 48',
    rating: 4.9,
    reviews: 956,
    status: 'Temporarily Closed',
  },
  {
    id: 8,
    name: 'Vanatour',
    city: 'Kapan',
    region: 'Syunik',
    street: 'M2',
    address: 'M2, Kapan',
    phone: '+374 93 19 94 61',
    rating: 4.6,
    reviews: 26,
  },
  {
    id: 9,
    name: 'La Regina',
    city: 'Qajaran',
    region: 'Syunik',
    street: 'E117',
    address: 'E117, Qajaran',
    phone: null,
    rating: 4.9,
    reviews: 9,
  },
  {
    id: 10,
    name: 'Pokr Tagh Pizza',
    city: 'Meghri',
    region: 'Syunik',
    street: 'Mejlumyan Street',
    address: '15 Mejlumyan Street, Meghri',
    phone: '+374 55 32 32 55',
    rating: 5,
    reviews: 148,
  },
];

const diningTips = [
  'Ask what is fresh and seasonal; menus can change with the harvest.',
  'Reserve ahead for a large group or a late dinner outside the main cities.',
  'Try a small selection of regional dishes to share around the table.',
];

type RestaurantsScreenProps = {
  onBack: () => void;
};

export function RestaurantsScreen({onBack}: RestaurantsScreenProps) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <HeaderBack onBack={onBack} />
        <Text style={styles.eyebrow}>TASTE THE REGION</Text>
        <Text style={styles.title}>Restaurants in Syunik</Text>
        <Text style={styles.intro}>
          From mountain kitchens to sunny Meghri courtyards, discover what to eat and where to pause during a Syunik journey.
        </Text>

        <View style={styles.featureCard}>
          <Text style={styles.featureLabel}>LOCAL TABLE</Text>
          <Text style={styles.featureTitle}>Food is part of the route</Text>
          <Text style={styles.featureText}>
            Syunik cooking is generous, seasonal, and made for sharing. Follow the landscape from Goris to Kapan, Sisian, and Meghri through its local flavors.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Where to eat</Text>
        {topRestaurants.map(restaurant => (
          <View key={restaurant.id} style={styles.restaurantCard}>
            <View style={styles.restaurantContent}>
              <View style={styles.cityRow}>
                <Text style={styles.restaurantName}>{restaurant.name}</Text>
                <Text style={styles.cityBadge}>{restaurant.city}</Text>
              </View>
              <Text style={styles.region}>{restaurant.region}</Text>
              {restaurant.street && <Text style={styles.detail}>Street: {restaurant.street}</Text>}
              <Text style={styles.detail}>Address: {restaurant.address}</Text>
              {restaurant.phone && <Text style={styles.detail}>Phone: {restaurant.phone}</Text>}
              <View style={styles.ratingRow}>
                <Text style={styles.rating}>★ {restaurant.rating.toFixed(1)}</Text>
                <Text style={styles.reviews}>({restaurant.reviews} reviews)</Text>
              </View>
              {restaurant.status && <Text style={styles.status}>{restaurant.status}</Text>}
            </View>
          </View>
        ))}

        <View style={styles.tipsCard}>
          <Text style={styles.sectionTitle}>Good to know</Text>
          {diningTips.map((tip, index) => (
            <View key={tip} style={styles.tipRow}>
              <Text style={styles.tipNumber}>{String(index + 1).padStart(2, '0')}</Text>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
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
    paddingBottom: 32,
    paddingTop: 16,
  },
  eyebrow: {
    color: '#a45c3c',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.4,
    marginBottom: 5,
  },
  title: {
    color: '#2f3e2f',
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 9,
  },
  intro: {
    color: '#5d6255',
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 18,
  },
  featureCard: {
    backgroundColor: '#314d36',
    borderRadius: 18,
    marginBottom: 24,
    padding: 18,
  },
  featureLabel: {
    color: '#c7d8b8',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 7,
  },
  featureTitle: {
    color: '#fffaf0',
    fontSize: 21,
    fontWeight: '800',
    marginBottom: 7,
  },
  featureText: {
    color: '#e2eadb',
    fontSize: 14,
    lineHeight: 21,
  },
  sectionTitle: {
    color: '#2f3e2f',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 12,
  },
  restaurantCard: {
    backgroundColor: '#fffdf8',
    borderColor: '#e8dccb',
    borderRadius: 17,
    borderWidth: 1,
    marginBottom: 14,
    overflow: 'hidden',
  },
  restaurantContent: {
    padding: 15,
  },
  cityRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 7,
  },
  restaurantName: {
    color: '#2f3e2f',
    flex: 1,
    fontSize: 18,
    fontWeight: '800',
  },
  cityBadge: {
    backgroundColor: '#edf3e8',
    borderRadius: 10,
    color: '#4b6b3b',
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  region: {
    color: '#71866a',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
  },
  detail: {
    color: '#5d6255',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  ratingRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  rating: {
    color: '#a45c3c',
    fontSize: 15,
    fontWeight: '700',
  },
  reviews: {
    color: '#7d8476',
    fontSize: 13,
  },
  status: {
    color: '#b04d3b',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 8,
  },
  tipsCard: {
    backgroundColor: '#eef3e9',
    borderColor: '#d8e3d1',
    borderRadius: 17,
    borderWidth: 1,
    marginTop: 10,
    padding: 16,
  },
  tipRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 11,
    marginTop: 10,
  },
  tipNumber: {
    color: '#a45c3c',
    fontSize: 12,
    fontWeight: '800',
    paddingTop: 2,
  },
  tipText: {
    color: '#4d5d48',
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
});
