import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type HistoryScreenProps = {
  onBack: () => void;
};

export function HistoryScreen({onBack}: HistoryScreenProps) {

    /**
     * HistoryScreen is a React component that displays historical information about the Kingdom of Syunik. It includes a back button, a title, a body of text, an image, and two cards with additional historical details. The component uses the useSafeAreaInsets hook to ensure that content is displayed correctly on devices with notches or other screen insets.
     *
     * Props:
     * - onBack: A function that is called when the back button is pressed. This allows the parent component to handle navigation back to the previous screen.
     */

  const safeAreaInsets = useSafeAreaInsets();

  if (!onBack) {
    throw new Error('onBack prop is required for HistoryScreen');
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

        <Text style={styles.title}>Kingdom of Syunik</Text>
        <Text style={styles.body}>
          The world of Syunik has been one of the strong pillars of Armenian
          statehood for centuries. Due to its strategic position and
          spiritual-cultural potential, Syunik played an important role in the
          formation of Armenian identity and state thinking.
        </Text>

        <Image
          source={require('../assets/images/syunik_view.png')}
          style={styles.heroImage}
        />

        <View style={styles.card}>
          <Text style={styles.cardTitle}>A sovereign Armenian state</Text>
          <Text style={styles.cardText}>
            In the second half of the 10th century, the Kingdom of Syunik (also
            known as the Kingdom of Kapan) was formed here as an independent
            and sovereign Armenian state. The kingdom existed until 1170,
            becoming a significant political, administrative, and cultural center
            of the region.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Capital and legacy</Text>
          <Text style={styles.cardText}>
            The capital of the kingdom, Kapan fortress city, served not only as
            a powerful defensive fortress but also as a center of state
            administration and cultural life. With its historical mission, the
            Kingdom of Syunik played an important role in preserving Armenian
            statehood and ensuring regional stability.
          </Text>
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
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2f3e2f',
    marginBottom: 10,
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
});
