import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { HeaderBack } from '../components/HeaderBack';

type HistoryScreenProps = {
  onBack: () => void;
};

/**
 * HistoryScreen displays historical information about the Kingdom of Syunik.
 * It renders a back header, a page title, and a series of content sections
 * (each with an eyebrow label, hero image, and body copy), followed by two
 * highlight cards summarizing key facts.
 *
 * Props:
 * - onBack: called when the back button is pressed, letting the parent
 *   handle navigation back to the previous screen.
 */
export function HistoryScreen({ onBack }: HistoryScreenProps) {
  if (!onBack) {
    throw new Error('onBack prop is required for HistoryScreen');
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <HeaderBack onBack={onBack} />

        <Text style={styles.title}>Kingdom of Syunik</Text>
        <Text style={styles.subtitle}>
          A history of statehood, faith, and resistance
        </Text>

        {/* Section One — Origins */}
        <View style={styles.section}>
          <Text style={styles.eyebrow}>Origins</Text>

          <Image
            source={require('../assets/images/syunik_kingdom.png')}
            style={styles.heroImage}
          />

          <Text style={styles.body}>
            The land of Syunik has been one of the strong pillars of Armenian
            statehood for centuries. Due to its strategic position and
            spiritual-cultural potential, Syunik played an important role in
            the formation of Armenian identity and state thinking.
          </Text>

          <Text style={styles.body}>
            In the second half of the 10th century, the Kingdom of Syunik
            (also known as the Kingdom of Kapan) was formed here as an
            independent and sovereign Armenian state. The kingdom existed
            until 1170, becoming a significant political, administrative, and
            cultural center of the region.
          </Text>
        </View>

        <View style={styles.divider} />

        {/* Section Two — Liberation Struggle */}
        
        <View style={styles.section}>
          <Text style={styles.eyebrow}>Liberation Struggle</Text>

          <Image
            source={require('../assets/images/syunik_war.png')}
            style={styles.heroImage}
          />

          <Text style={styles.body}>
            The history of Syunik is full of heroic episodes. The liberation
            struggle, which began in the early 18th century under the
            leadership of Davit Bek, proved that in the face of unity, it is
            possible to resist even the most powerful enemy.
          </Text>

          <Text style={styles.body}>
            The Battle of Halidzor and the heroic battles of Mountainous
            Armenia led by Garegin Nzhdeh not only defended Syunik but also
            ensured it remained Armenian, becoming bright examples of
            patriotism and military talent.
          </Text>
        </View>

        <View style={styles.divider} />

        {/* Section Three — Syunik's Heroic Battle */}
        <View style={styles.section}>
          <Text style={styles.eyebrow}>Syunik's Heroic Battle</Text>
          <Text style={styles.sectionTitle}>
            Garegin Nzhdeh and the Immortal Spirit
          </Text>

          <Image
            source={require('../assets/images/garegin_nzhdeh_syunik.png')}
            style={styles.heroImage}
          />

          <Text style={styles.body}>
            In 1919–1921, when the existence of Armenia was in danger,
            Garegin Nzhdeh organized the self-defense of Mountainous Armenia
            in the mountains of Syunik. His iron will and strategic genius
            united the people of Syunik to wage a life-and-death struggle
            against the invaders.
          </Text>

          <Text style={styles.body}>
            Under Nzhdeh's leadership, Syunik became an impregnable citadel.
            The Republic of Mountainous Armenia was proclaimed at Tatev
            Monastery, which played a decisive role in preserving Syunik
            within Armenia.
          </Text>

          <View style={styles.quoteBlock}>
            <Text style={styles.quoteText}>
              "Syunik is our backbone, without which Armenia cannot exist."
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        


        {/* Highlight cards */}
        <View style={styles.cardGroup}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Cultural Heritage</Text>
            <Text style={styles.cardText}>
                 Syunik is known not only for its fortresses but also for its
            spiritual centers. Tatev Monastery and other monastic complexes
            of the region have been important centers of science, faith, and
            culture for centuries.
            </Text>
          </View>

          
        </View>
      </ScrollView>
    </View>
  );
}

const COLORS = {
  background: '#f6efe6',
  accent: '#f54a00',
  accentMuted: 'rgba(245, 74, 0, 0.65)',
  heading: '#2f3e2f',
  body: '#4a4438',
  cardBody: '#5f5f5f',
  cardBackground: '#ffffff',
  divider: 'rgba(47, 62, 47, 0.12)',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.accent,
    marginTop: 12,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.accentMuted,
    marginBottom: 24,
  },
  section: {
    marginBottom: 8,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: COLORS.heading,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.heading,
    marginBottom: 14,
  },
  quoteBlock: {
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accent,
    paddingLeft: 14,
    marginBottom: 16,
  },
  quoteText: {
    fontSize: 15,
    lineHeight: 22,
    fontStyle: 'italic',
    fontWeight: '600',
    color: COLORS.heading,
  },
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: 18,
    marginBottom: 14,
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.body,
    marginBottom: 14,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.divider,
    marginVertical: 20,
  },
  cardGroup: {
    gap: 12,
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.heading,
    marginBottom: 6,
  },
  cardText: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.cardBody,
  },
});