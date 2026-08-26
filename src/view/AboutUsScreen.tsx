import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type AboutUsScreenProps = {
  onBack: () => void;
  onOpenTourism: () => void;
};

export function AboutUsScreen({onBack, onOpenTourism}: AboutUsScreenProps) {

    /**
     * AboutUsScreen is a React component that displays information about the Syunik App. It includes a back button, a title, a body of text, and a card with the app's mission statement. The component uses the useSafeAreaInsets hook to ensure that content is displayed correctly on devices with notches or other screen insets.
     *
     * Props:
     */


  if (!onBack || !onOpenTourism) {
    throw new Error('onBack and onOpenTourism props are required for AboutUsScreen');
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.contentContainer,
          {paddingTop: 16},
        ]}>
        <Pressable style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </Pressable>

        <Image
          source={require('../assets/images/syunik_landscape.png')}
          resizeMode="cover"
          style={styles.heroImage}
        />
        <Text style={styles.title}>About Us</Text>
        <Text style={styles.body}>
          Syunik App was created to celebrate the cultural richness, natural
          beauty, and living heritage of Syunik. We aim to make the region more
          accessible to travelers, locals, and anyone curious about Armenia’s
          southern landscapes.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Our Mission</Text>
          <Text style={styles.cardText}>
            To preserve, promote, and share the cultural heritage and natural
            beauty of the Syunik region through innovative digital storytelling,
            making it accessible and inspiring for travelers, historians, and
            adventure seekers worldwide.
          </Text>
        </View>

        <View style={[styles.card, styles.visionCard]}>
          <Text style={styles.cardTitle}>Our Vision</Text>
          <Text style={styles.cardText}>
            To become the most trusted and comprehensive digital platform for
            Syunik tourism and cultural discovery, empowering local communities
            while connecting global audiences with the authentic spirit of
            Armenia's mountain heartland.
          </Text>
        </View>

        <View style={styles.villagesSection}>
        <Pressable style={styles.ctaButton} onPress={onOpenTourism}>
          <Text style={styles.ctaButtonText}>Explore Tourism</Text>
        </Pressable>

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
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  backButtonText: {
    color: '#4b6b3b',
    fontSize: 15,
    fontWeight: '600',
  },
  heroImage: {
    width: '100%',
    height: 190,
    marginBottom: 18,
    borderRadius: 18,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2f3e2f',
    marginBottom: 10,
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    color: '#4d4d4d',
    marginBottom: 18,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 3},
    elevation: 3,
  },
  visionCard: {
    marginTop: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2f3e2f',
    marginBottom: 6,
  },
  cardText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#5f5f5f',
  },
  ctaButton: {
    marginTop: 12,
    backgroundColor: '#4b6b3b',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    // alignSelf: 'flex-start',
  },
  ctaButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  villagesSection : {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  }
});
