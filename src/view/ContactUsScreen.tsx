import React from 'react';
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type ContactUsScreenProps = {
  onBack: () => void;
};

export function ContactUsScreen({onBack}: ContactUsScreenProps) {

    /**
     * 
     * ContactUsScreen is a React component that displays contact information for the Syunik App. It includes a back button, a title, a body of text, and several cards with contact details such as email, phone number, address, and working hours. The component uses the Linking API to allow users to initiate email or phone calls directly from the app.
     *   * Props:
     */

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Pressable style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </Pressable>
        <Text style={styles.title}>Contact Us</Text>
        <Text style={styles.body}>
          We would love to hear from you. Whether you have a question, a travel
          suggestion, or a partnership idea, our team is here to help.
        </Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Email</Text>
          <Pressable onPress={() => Linking.openURL('mailto:info@syunikapp.com')}>
            <Text style={styles.linkText}>info@syunikapp.com</Text>
          </Pressable>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Phone</Text>
          <Pressable onPress={() => Linking.openURL('tel:+37477777777')}>
            <Text style={styles.linkText}>+374 77 777 777</Text>
          </Pressable>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Address</Text>
          <Text style={styles.cardText}>
            12 Heritage Street, Kapan, Syunik, Armenia
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Working Hours</Text>
          <Text style={styles.cardText}>Monday – Friday: 09:00 – 18:00</Text>
          <Text style={styles.cardText}>Saturday: 10:00 – 16:00</Text>
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
    marginBottom: 12,
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
  linkText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4b6b3b',
  },
});
