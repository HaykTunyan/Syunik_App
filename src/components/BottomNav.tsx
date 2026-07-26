import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

const tabs = [
  {key: 'home', label: 'Home', icon: '🏡'},
  {key: 'about', label: 'About', icon: 'ℹ️'},
  {key: 'tourism', label: 'Tourism', icon: '🌄'},
  {key: 'products', label: 'Products', icon: '🛍️'},
  {key: 'history', label: 'History', icon: '🕰️'},
  {key: 'contact', label: 'Contact', icon: '📞'},
] as const;

type BottomNavProps = {
  activeTab: 'home' | 'about' | 'history' | 'contact' | 'tourism' | 'products';
  onTabChange: (tab: 'home' | 'about' | 'history' | 'contact' | 'tourism' | 'products') => void;
};

export function BottomNav({activeTab, onTabChange}: BottomNavProps) {
  return (
    <View style={styles.container}>
      {tabs.map(tab => {
        const isActive = activeTab === tab.key;

        return (
          <Pressable
            key={tab.key}
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => onTabChange(tab.key as 'home' | 'about' | 'history' | 'contact' | 'tourism' | 'products')}>
            <Text style={styles.icon}>{tab.icon}</Text>
            <Text style={isActive ? styles.activeText : styles.inactiveText}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fffef9',
    borderTopWidth: 1,
    borderTopColor: '#e6d8c3',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: '#f2ebdc',
  },
  icon: {
    fontSize: 18,
    marginBottom: 2,
  },
  activeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4b6b3b',
  },
  inactiveText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7a8c5f',
  },
});
