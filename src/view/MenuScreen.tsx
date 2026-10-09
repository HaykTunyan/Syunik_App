import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {colors} from '../config/theme';
import {navigationMenuItems} from '../navigation/menuItems';
import type {AppScreen} from '../navigation/types';

type MenuScreenProps = {
  onNavigate: (screen: AppScreen) => void;
};

export function MenuScreen({onNavigate}: MenuScreenProps) {

  /**
   * 
   * Menu Screen is a React component that displays a list of navigation options for the Syunik app. It provides users with buttons to navigate to different sections of the app, such as home, about, history, contact, tourism, products, roads, restaurants, and profile. The component uses React Native's ScrollView for vertical scrolling and Pressable for interactive buttons. Styles are applied to ensure a consistent look and feel across the menu items.
   * 
   * @param {MenuScreenProps} props - The properties for the MenuScreen component.
   * 
   */


  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.eyebrow}>SYUNIK DREAMS</Text>
      {/* <Text style={styles.title}>Explore the app</Text> */}
      <Text style={styles.description}>
        Choose wich on of the following sections you want to see. 
      </Text>

      <View style={styles.list}>
        {navigationMenuItems.map(item => (
          <Pressable
            key={item.key}
            accessibilityRole="button"
            accessibilityLabel={`${item.label}. ${item.description}`}
            style={({pressed}) => [styles.menuItem, pressed && styles.menuItemPressed]}
            onPress={() => onNavigate(item.key)}>
            <View style={styles.iconWrap}>
              <Text style={styles.icon}>{item.icon}</Text>
            </View>
            <View style={styles.textContent}>
              <Text style={styles.label}>{item.label}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
            <Text accessibilityElementsHidden style={styles.arrow}>›</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {padding: 20, paddingBottom: 32},
  eyebrow: {color: colors.brand, fontSize: 18, fontWeight: '800', letterSpacing: 1.2},
  title: {color: colors.text, fontSize: 28, fontWeight: '800', marginTop: 6},
  description: {color: colors.textMuted, fontSize: 15, lineHeight: 22, marginTop: 8},
  list: {gap: 10, marginTop: 24},
  menuItem: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 70,
    padding: 11,
  },
  menuItemPressed: {opacity: 0.82, transform: [{scale: 0.985}]},
  iconWrap: {
    alignItems: 'center',
    backgroundColor: colors.brandSoft,
    borderRadius: 12,
    height: 42,
    justifyContent: 'center',
    marginRight: 12,
    width: 42,
  },
  icon: {color: colors.brand, fontSize: 20, fontWeight: '700'},
  textContent: {flex: 1},
  label: {color: colors.text, fontSize: 16, fontWeight: '700'},
  itemDescription: {color: colors.textMuted, fontSize: 12, marginTop: 3},
  arrow: {color: colors.brand, fontSize: 26, marginLeft: 8},
});
