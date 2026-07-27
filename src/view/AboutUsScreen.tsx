import React from 'react';
import {
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
            To share inspiring stories, local voices, and memorable destinations
            in a simple and welcoming experience.
          </Text>
        </View>

        <Pressable style={styles.ctaButton} onPress={onOpenTourism}>
          <Text style={styles.ctaButtonText}>Explore Tourism in Syunik</Text>
        </Pressable>
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
    alignSelf: 'flex-start',
  },
  ctaButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});
