import React, {useMemo, useRef, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import {CITIES, type CityCard} from '../data/cities';
import {citiesData} from '../data/citiesData';
import {SectionHeader} from '../components/SectionHeader';

type HomeScreenProps = {
  contentContainerStyle?: StyleProp<ViewStyle>;
  onSelectCity: (city: string) => void;
};

const POPULAR_ATTRACTIONS = [
  {
    id: 'Tatev Monastery',
    image: require('../assets/images/for-travel/tatev.png'),
    location: 'Goris area',
  },
  {
    id: 'Karahunj (Zorats Karer)',
    image: require('../assets/images/for-travel/karahunj.png'),
    location: 'Sisian area',
  },
  {
    id: 'Khndzoresk Cave Village',
    image: require('../assets/images/for-travel/khndzoresk.png'),
    location: 'Goris area',
  },
  {
    id: "Devil's Bridge",
    image: require('../assets/images/for-travel/devils_bridge.png'),
    location: 'Tatev road',
  },
  {
    id: 'Vorotnavanq',
    image: require('../assets/images/for-travel/vorotnavanq.png'),
    location: 'Vorotan gorge',
  },
];

function CityCardItem({city, onPress}: {city: CityCard; onPress: () => void}) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [styles.card, pressed && styles.cardPressed]}
      accessibilityRole="button"
      accessibilityLabel={`Open ${city.title}`}>
      <View style={styles.cardImageWrap}>
        <Image source={city.image} resizeMode="cover" style={styles.cardImage} />
        <View style={styles.cardImageOverlay} />
        <Text style={styles.cardTitle}>{city.title}</Text>
      </View>
      <Text numberOfLines={2} style={styles.cardText}>
        {city.description}
      </Text>
      <View style={styles.cardFooter}>
        <Text style={styles.cardLink}>Discover</Text>
        <Text style={styles.cardArrow}>→</Text>
      </View>
    </Pressable>
  );
}

function chunkIntoRows<T>(items: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    rows.push(items.slice(i, i + size));
  }
  return rows;
}

export function HomeScreen({contentContainerStyle, onSelectCity}: HomeScreenProps) {
  const [query, setQuery] = useState('');
  const scrollRef = useRef<ScrollView>(null);
  const attractionsOffset = useRef(0);

  const filteredCities = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return CITIES;
    }
    return CITIES.filter(
      city =>
        city.title.toLowerCase().includes(q) ||
        city.description.toLowerCase().includes(q),
    );
  }, [query]);

  const cityRows = chunkIntoRows(filteredCities, 2);

  const totalAttractions = useMemo(
    () => citiesData.reduce((sum, c) => sum + c.attractions.length, 0),
    [],
  );

  const scrollToSection = (y: number) => {
    scrollRef.current?.scrollTo({y, animated: true});
  };

  return (
    <ScrollView
      ref={scrollRef}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={false}>
      {/* ===== Hero ===== */}
      <View style={styles.hero}>
        <Image
          source={require('../assets/images/syunik_landscape.png')}
          resizeMode="cover"
          style={styles.heroImage}
        />
        <View style={styles.heroScrim} />
        <View style={styles.heroContent}>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>WELCOME TO SYUNIK</Text>
          </View>
          <Text style={styles.heroTitle}>Discover the southern soul of Armenia</Text>
          <Text style={styles.heroSubtitle}>
            Breathtaking mountains, ancient monasteries, and warm hospitality await.
          </Text>
          <View style={styles.heroActions}>
            <Pressable
              onPress={() => scrollToSection(430)}
              style={({pressed}) => [styles.heroCtaPrimary, pressed && styles.ctaPressed]}>
              <Text style={styles.heroCtaPrimaryText}>Explore cities</Text>
            </Pressable>
            <Pressable
              onPress={() => scrollToSection(attractionsOffset.current)}
              style={({pressed}) => [styles.heroCtaSecondary, pressed && styles.ctaPressed]}>
              <Text style={styles.heroCtaSecondaryText}>Attractions</Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* ===== Search ===== */}
      <View style={styles.searchWrap}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search cities…"
            placeholderTextColor="#9aa58c"
            style={styles.searchInput}
            autoCorrect={false}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery('')} hitSlop={8}>
              <Text style={styles.searchClear}>✕</Text>
            </Pressable>
          )}
        </View>
      </View>

      {/* ===== Stats ===== */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{CITIES.length}</Text>
          <Text style={styles.statLabel}>Cities</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{totalAttractions}</Text>
          <Text style={styles.statLabel}>Attractions</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>2000+</Text>
          <Text style={styles.statLabel}>Years of history</Text>
        </View>
      </View>

      {/* ===== Explore Cities ===== */}
      <View style={styles.section}>
        <SectionHeader
          title="Explore cities"
          subtitle={query ? `${filteredCities.length} matching cities` : 'Six gems of the Syunik region'}
        />

        {filteredCities.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No cities found</Text>
            <Text style={styles.emptyText}>Try a different search term.</Text>
          </View>
        )}

        {cityRows.map((row, rowIndex) => (
          <View style={styles.cardRow} key={rowIndex}>
            {row.map(city => (
              <CityCardItem
                key={city.route}
                city={city}
                onPress={() => onSelectCity(city.route)}
              />
            ))}
          </View>
        ))}
      </View>

      {/* ===== Popular Attractions ===== */}
      <View
        style={styles.section}
        onLayout={e => {
          attractionsOffset.current = e.nativeEvent.layout.y;
        }}>
        <SectionHeader
          title="Popular attractions"
          subtitle="Unmissable sights across Syunik"
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.attractionsRow}>
          {POPULAR_ATTRACTIONS.map(place => (
            <Pressable
              key={place.id}
              onPress={() => onSelectCity(place.location.includes('Sisian') ? 'Sisian' : 'Goris')}
              style={({pressed}) => [styles.attractionCard, pressed && styles.cardPressed]}>
              <Image source={place.image} resizeMode="cover" style={styles.attractionImage} />
              <View style={styles.attractionScrim} />
              <View style={styles.attractionInfo}>
                <Text style={styles.attractionName}>{place.id}</Text>
                <Text style={styles.attractionLocation}>📍 {place.location}</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* ===== Why Syunik ===== */}
      <View style={styles.heroCard}>
        <View style={styles.heroCardHeader}>
          <View style={styles.heroCardIconWrap}>
            <Text style={styles.heroCardIcon}>🏔️</Text>
          </View>
          <Text style={styles.heroCardTitle}>Why Syunik?</Text>
        </View>
        <Text style={styles.heroCardText}>
          Mountains, memory, and warm hospitality come together in every visit. From
          the dramatic Tatev monastery to the timeless stone circles of Karahunj,
          Syunik is Armenia's hidden treasure.
        </Text>
      </View>

      <Text style={styles.footer}>Made with ❤️ for Syunik · Explore more in the menu</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hero: {
    width: '100%',
    height: 360,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#3b4a33',
  },
  heroImage: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  heroScrim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(15, 22, 15, 0.45)',
  },
  heroContent: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderColor: 'rgba(255, 255, 255, 0.35)',
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 12,
  },
  heroBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '800',
    marginBottom: 8,
  },
  heroSubtitle: {
    color: 'rgba(255, 255, 255, 0.92)',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 18,
  },
  heroActions: {
    flexDirection: 'row',
    gap: 10,
  },
  heroCtaPrimary: {
    backgroundColor: '#4b6b3b',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 999,
  },
  heroCtaPrimaryText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  heroCtaSecondary: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 999,
  },
  heroCtaSecondaryText: {
    color: '#2f3e2f',
    fontWeight: '700',
    fontSize: 14,
  },
  ctaPressed: {
    opacity: 0.7,
  },
  searchWrap: {
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 52,
    borderWidth: 1,
    borderColor: '#e8dccb',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 2},
    elevation: 2,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#2f3e2f',
    paddingVertical: 0,
  },
  searchClear: {
    color: '#9aa58c',
    fontSize: 15,
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fffdf8',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#e8dccb',
    paddingVertical: 16,
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#e8dccb',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#4b6b3b',
  },
  statLabel: {
    fontSize: 12,
    color: '#7a8c5f',
    marginTop: 2,
    fontWeight: '600',
  },
  section: {
    marginBottom: 28,
  },
  cardRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  card: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 4},
    elevation: 4,
  },
  cardPressed: {
    opacity: 0.75,
    transform: [{scale: 0.98}],
  },
  cardImageWrap: {
    height: 110,
    backgroundColor: '#e8dccb',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardImageOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(15, 22, 15, 0.18)',
  },
  cardTitle: {
    position: 'absolute',
    bottom: 8,
    left: 10,
    color: '#fff',
    fontSize: 17,
    fontWeight: '800',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 4,
  },
  cardText: {
    fontSize: 12,
    lineHeight: 17,
    color: '#5f5f5f',
    paddingHorizontal: 10,
    paddingTop: 10,
    minHeight: 44,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 6,
    paddingBottom: 10,
  },
  cardLink: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4b6b3b',
  },
  cardArrow: {
    fontSize: 13,
    color: '#4b6b3b',
    fontWeight: '700',
  },
  emptyState: {
    backgroundColor: '#fffdf8',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e8dccb',
    padding: 24,
    alignItems: 'center',
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2f3e2f',
    marginBottom: 4,
  },
  emptyText: {
    fontSize: 13,
    color: '#7a8c5f',
  },
  attractionsRow: {
    gap: 14,
    paddingRight: 4,
  },
  attractionCard: {
    width: 220,
    height: 150,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#e8dccb',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 4},
    elevation: 4,
  },
  attractionImage: {
    width: '100%',
    height: '100%',
  },
  attractionScrim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(15, 22, 15, 0.28)',
  },
  attractionInfo: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 10,
  },
  attractionName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 4,
  },
  attractionLocation: {
    color: 'rgba(255, 255, 255, 0.92)',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 3,
  },
  heroCard: {
    backgroundColor: '#fffdf8',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#e8dccb',
  },
  heroCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  heroCardIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#edf5ea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroCardIcon: {
    fontSize: 18,
  },
  heroCardTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#2f3e2f',
  },
  heroCardText: {
    fontSize: 14,
    lineHeight: 21,
    color: '#5f5f5f',
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: '#9aa58c',
    marginTop: 24,
    paddingBottom: 8,
  },
});

