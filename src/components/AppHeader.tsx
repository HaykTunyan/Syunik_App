import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export function AppHeader() {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.title}>Discover Armenia’s soul</Text>
      </View>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Explore</Text>
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

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2f3e2f',
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
