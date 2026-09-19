import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {
  Compass,
  History,
  Home,
  ShoppingBag,
  Utensils,
} from 'lucide-react-native';

const tabs = [
  {key: 'home', label: 'Home', icon: Home},
  {key: 'tourism', label: 'Tourism', icon: Compass},
  {key: 'restaurants', label: 'Food', icon: Utensils},
  {key: 'products', label: 'Products', icon: ShoppingBag},
  {key: 'history', label: 'History', icon: History},
] as const;

type BottomNavProps = {
  activeTab: 'home' | 'about' | 'history' | 'contact' | 'tourism' | 'products' | 'roads' | 'restaurants';
  onTabChange: (tab: 'home' | 'about' | 'history' | 'contact' | 'tourism' | 'products' | 'roads' | 'restaurants') => void;
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
        const Icon = tab.icon;

        return (
          <Pressable
            key={tab.key}
            style={styles.tab}
            onPress={() => onTabChange(tab.key)}
            accessibilityRole="tab"
            accessibilityState={{selected: isActive}}>
            <View style={[styles.tabContent, isActive && styles.activeTab]}>
              <Icon
                size={22}
                color={isActive ? '#2D4A3E' : '#8C8C8C'}
                strokeWidth={2}
              />
              <Text style={isActive ? styles.activeText : styles.inactiveText}>
                {tab.label}
              </Text>
            </View>
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
    backgroundColor: '#FBF8F3',
    borderTopWidth: 1,
    borderTopColor: '#EDE7DE',
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
    minHeight: 62,
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  activeTab: {
    backgroundColor: '#E3EFEA',
  },
  activeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2D4A3E',
    letterSpacing: 0.2,
    marginTop: 4,
  },
  inactiveText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8C8C8C',
    letterSpacing: 0.2,
    marginTop: 4,
  },
});
