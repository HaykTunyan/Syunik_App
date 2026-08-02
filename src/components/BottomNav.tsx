import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

const tabs = [
  {key: 'home', label: 'Home', icon: '🏡'},
  {key: 'tourism', label: 'Tourism', icon: '🌄'},
  {key: 'products', label: 'Products', icon: '🛍️'},
  {key: 'history', label: 'History', icon: '🕰️'},
] as const;

type BottomNavProps = {
  activeTab: 'home' | 'about' | 'history' | 'contact' | 'tourism' | 'products';
  onTabChange: (tab: 'home' | 'about' | 'history' | 'contact' | 'tourism' | 'products') => void;
};

export function BottomNav({activeTab, onTabChange}: BottomNavProps) {

/**
 * 
 * Buttom Nav is a React component that renders a bottom navigation bar for the Syunik App. It displays a set of tabs, each representing a different section of the app (Home, About, Tourism, Products, History). The component highlights the currently active tab and allows users to switch between tabs by pressing them. It accepts two props: activeTab, which indicates the currently selected tab, and onTabChange, a callback function that is called when a user selects a different tab.
 */

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
    alignItems: 'center',
    backgroundColor: '#fffbf7',
    borderTopWidth: 1,
    borderTopColor: '#eee0c5',
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 14,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -3},
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 16,
    minHeight: 62,
  },
  activeTab: {
    backgroundColor: '#edf5ea',
    borderWidth: 1,
    borderColor: '#d7e7d0',
    shadowColor: '#4b6b3b',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 2},
  },
  icon: {
    fontSize: 20,
    marginBottom: 4,
  },
  activeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#375a37',
    letterSpacing: 0.2,
  },
  inactiveText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7f8f72',
    letterSpacing: 0.2,
  },
});
