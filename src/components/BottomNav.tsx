import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  Compass,
  History,
  Home,
  ShoppingBag,
  Utensils,
  UserRound,
} from 'lucide-react-native';
import {colors} from '../config/theme';
import type {AppScreen} from './AppHeader';

const tabs = [
  {key: 'home', label: 'Home', icon: Home},
  {key: 'tourism', label: 'Explore', icon: Compass},
  {key: 'restaurants', label: 'Food', icon: Utensils},
  {key: 'products', label: 'Products', icon: ShoppingBag},
  {key: 'history', label: 'History', icon: History},
  {key: 'profile', label: 'Profile', icon: UserRound},
] as const;

type BottomNavProps = {
  activeTab: AppScreen;
  onTabChange: (tab: AppScreen) => void;
};

export function BottomNav({activeTab, onTabChange}: BottomNavProps) {

  /**
   * 
   * Bottom navigation bar component for the app. It displays a row of tabs at the bottom of the screen, allowing users to navigate between different sections of the app. Each tab consists of an icon and a label, and the active tab is highlighted with a different color and background.
   * 
   * Props:
   * - activeTab: The currently active tab (of type AppScreen).
   * - onTabChange: A callback function that is called when a tab is pressed, passing the selected tab as an argument.
   * 
   * The component uses the useSafeAreaInsets hook to ensure that the bottom navigation bar respects the device's safe area insets, providing appropriate padding at the bottom of the screen.
   * 
   */


  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingBottom: Math.max(10, insets.bottom)}]}>
      {tabs.map(tab => {
        const isActive = activeTab === tab.key;
        const Icon = tab.icon;

        return (
          <Pressable
            key={tab.key}
            style={styles.tab}
            onPress={() => onTabChange(tab.key)}
            accessibilityRole="tab"
            accessibilityLabel={tab.label}
            accessibilityState={{selected: isActive}}>
            <View style={[styles.iconPill, isActive && styles.activeIconPill]}>
              <Icon
                size={22}
                color={isActive ? colors.brand : colors.tabInactive}
                strokeWidth={2}
              />
            </View>
            <Text style={[styles.label, isActive && styles.activeLabel]}>{tab.label}</Text>
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
    backgroundColor: colors.surfaceAlt,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: 5,
    paddingTop: 6,
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
    minHeight: 60,
  },
  iconPill: {
    width: 44,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  activeIconPill: {
    backgroundColor: colors.brandSoft,
  },
  label: {
    fontSize: 10,
    lineHeight: 14,
    color: colors.tabInactive,
    marginTop: 2,
  },
  activeLabel: {
    fontWeight: '700',
    color: colors.brand,
  },
});
