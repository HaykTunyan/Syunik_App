import React from 'react';
import {Modal, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {AppScreen} from './AppHeader';

type SidebarProps = {
  isOpen: boolean;
  activeScreen: AppScreen;
  onClose: () => void;
  onSelectScreen: (screen: AppScreen) => void;
};

const menuItems: Array<{key: AppScreen; label: string; description: string; icon: string}> = [
  {key: 'home', label: 'Home', description: 'Your Syunik overview', icon: '⌂'},
  {key: 'about', label: 'About Syunik', description: 'The region, at a glance', icon: 'i'},
  {key: 'tourism', label: 'Tourism', description: 'Places worth discovering', icon: '⌖'},
  {key: 'products', label: 'Local products', description: 'Made in Syunik', icon: '✦'},
  {key: 'history', label: 'History', description: 'Stories and heritage', icon: '◷'},
  {key: 'contact', label: 'Contact us', description: 'Get in touch with our team', icon: '✉'},
];

export function Sidebar({isOpen, activeScreen, onClose, onSelectScreen}: SidebarProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal transparent visible={isOpen} animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable
          accessibilityLabel="Close navigation menu"
          accessibilityRole="button"
          style={styles.backdrop}
          onPress={onClose}
        />
        <View
          accessibilityViewIsModal
          style={[styles.drawer, {paddingTop: insets.top + 16, paddingBottom: insets.bottom + 20}]}>
          <View style={styles.drawerHeader}>
            <View style={styles.brandGroup}>
              <View style={styles.brandMark}>
                <Text style={styles.brandMarkText}>S</Text>
              </View>
              <View>
                <Text style={styles.drawerTitle}>Syunik</Text>
                <Text style={styles.drawerSubtitle}>Travel companion</Text>
              </View>
            </View>
            <Pressable
              accessibilityLabel="Close navigation menu"
              accessibilityRole="button"
              hitSlop={8}
              onPress={onClose}
              style={({pressed}) => [styles.closeButton, pressed && styles.closeButtonPressed]}>
              <Text style={styles.closeButtonText}>✕</Text>
            </Pressable>
          </View>

          <Text style={styles.navigationLabel}>NAVIGATION</Text>
          <ScrollView
            style={styles.navigationScroll}
            contentContainerStyle={styles.navigationList}
            showsVerticalScrollIndicator={false}>
            {menuItems.map(item => {
              const isActive = activeScreen === item.key;

              return (
                <Pressable
                  key={item.key}
                  accessibilityRole="button"
                  accessibilityState={{selected: isActive}}
                  accessibilityLabel={`${item.label}. ${item.description}`}
                  style={({pressed}) => [
                    styles.menuItem,
                    isActive && styles.activeMenuItem,
                    pressed && styles.menuItemPressed,
                  ]}
                  onPress={() => onSelectScreen(item.key)}>
                  <View style={[styles.menuIconWrap, isActive && styles.activeMenuIconWrap]}>
                    <Text style={[styles.menuIcon, isActive && styles.activeMenuIcon]}>{item.icon}</Text>
                  </View>
                  <View style={styles.menuItemContent}>
                    <Text style={[styles.menuLabel, isActive && styles.activeMenuLabel]}>
                      {item.label}
                    </Text>
                    <Text style={[styles.menuDescription, isActive && styles.activeMenuDescription]}>
                      {item.description}
                    </Text>
                  </View>
                  <Text style={[styles.menuArrow, isActive && styles.activeMenuArrow]}>›</Text>
                </Pressable>
              );
            })}
          </ScrollView>

          <View style={styles.footerCard}>
            <Text style={styles.footerEyebrow}>EXPLORE SYUNIK</Text>
            <Text style={styles.footerText}>Mountains, heritage, and warm hospitality.</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(20, 29, 22, 0.48)',
  },
  backdrop: {
    flex: 1,
  },
  drawer: {
    width: '78%',
    maxWidth: 340,
    backgroundColor: '#fcfaf5',
    paddingHorizontal: 18,
    shadowColor: '#172116',
    shadowOffset: {width: -8, height: 0},
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 12,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },
  brandGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  brandMark: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4b6b3b',
  },
  brandMarkText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
  },
  drawerTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: '#2f3e2f',
  },
  drawerSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: '#72815c',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2ebdc',
    borderWidth: 1,
    borderColor: '#e5d9c5',
  },
  closeButtonPressed: {
    opacity: 0.72,
    transform: [{scale: 0.96}],
  },
  closeButtonText: {
    color: '#4b6b3b',
    fontSize: 16,
    fontWeight: '700',
  },
  navigationLabel: {
    marginBottom: 10,
    paddingHorizontal: 8,
    color: '#899478',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.15,
  },
  navigationList: {
    gap: 8,
    paddingBottom: 16,
  },
  navigationScroll: {
    flex: 1,
  },
  menuItem: {
    minHeight: 68,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#efe8dc',
  },
  activeMenuItem: {
    backgroundColor: '#eaf1e5',
    borderColor: '#bad0ad',
  },
  menuItemPressed: {
    opacity: 0.82,
    transform: [{scale: 0.985}],
  },
  menuIconWrap: {
    width: 40,
    height: 40,
    marginRight: 11,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f0e7',
  },
  activeMenuIconWrap: {
    backgroundColor: '#4b6b3b',
  },
  menuIcon: {
    color: '#637253',
    fontSize: 20,
    fontWeight: '700',
  },
  activeMenuIcon: {
    color: '#fff',
  },
  menuItemContent: {
    flex: 1,
    gap: 2,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2f3e2f',
  },
  activeMenuLabel: {
    color: '#4b6b3b',
  },
  menuDescription: {
    fontSize: 12,
    color: '#7b886d',
  },
  activeMenuDescription: {
    color: '#667b57',
  },
  menuArrow: {
    marginLeft: 8,
    color: '#a2aa96',
    fontSize: 24,
    fontWeight: '400',
  },
  activeMenuArrow: {
    color: '#4b6b3b',
  },
  footerCard: {
    marginTop: 'auto',
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#314a2b',
  },
  footerEyebrow: {
    marginBottom: 5,
    color: '#c9d8ba',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.05,
  },
  footerText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 19,
  },
});
