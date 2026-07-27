import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

export type AppScreen = 'home' | 'about' | 'history' | 'contact' | 'tourism' | 'products';

type AppHeaderProps = {
  activeScreen: AppScreen;
  onOpenMenu: () => void;
};

const screenTitles: Record<AppScreen, string> = {
  home: 'Discover Armenia’s soul',
  about: 'About Syunik',
  history: 'History & Heritage',
  contact: 'Contact Us',
  tourism: 'Tourism Highlights',
  products: 'Local Products',
};

const screenBadges: Record<AppScreen, string> = {
  home: 'Explore',
  about: 'Learn',
  history: 'Discover',
  contact: 'Reach out',
  tourism: 'Visit',
  products: 'Shop',
};

export function AppHeader({activeScreen, onOpenMenu}: AppHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        <Pressable onPress={onOpenMenu} style={styles.menuButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </Pressable>
        <View>
          <Text style={styles.title}>{screenTitles[activeScreen]}</Text>
          <Text style={styles.subtitle}>Syunik App</Text>
        </View>
      </View>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{screenBadges[activeScreen]}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#f6efe6',
    borderBottomWidth: 1,
    borderBottomColor: '#e6d8c3',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e6d8c3',
  },
  menuIcon: {
    fontSize: 18,
    color: '#2f3e2f',
    fontWeight: '700',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2f3e2f',
  },
  subtitle: {
    fontSize: 12,
    color: '#7a8c5f',
    marginTop: 2,
  },
  badge: {
    backgroundColor: '#4b6b3b',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
});
