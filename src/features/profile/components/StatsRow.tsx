import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../config/theme';
import {profileStrings} from '../strings';

type StatsRowProps = {
  visited: number;
  favorites: number;
  badges: number;
};

export function StatsRow({visited, favorites, badges}: StatsRowProps) {
  const stats = [
    {label: profileStrings.stats.visited, value: visited},
    {label: profileStrings.stats.favorites, value: favorites},
    {label: profileStrings.stats.badges, value: badges},
  ];

  return (
    <View style={styles.row} accessibilityLabel="Profile statistics">
      {stats.map(stat => (
        <View key={stat.label} style={styles.card}>
          <Text style={styles.value}>{stat.value}</Text>
          <Text style={styles.label}>{stat.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {flexDirection: 'row', gap: 10, marginBottom: 24},
  card: {
    flex: 1,
    minHeight: 72,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    borderRadius: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  value: {color: colors.brand, fontSize: 20, fontWeight: '800'},
  label: {color: colors.textSecondary, fontSize: 12, marginTop: 3},
});