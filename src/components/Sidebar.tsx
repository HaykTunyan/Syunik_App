import React from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {AppScreen} from './AppHeader';

type SidebarProps = {
  isOpen: boolean;
  activeScreen: AppScreen;
  onClose: () => void;
  onSelectScreen: (screen: AppScreen) => void;
};

const menuItems: Array<{key: AppScreen; label: string; description: string}> = [
  {key: 'home', label: 'Home', description: 'Main destination overview'},
  {key: 'about', label: 'About us', description: 'Learn more about Syunik'},
  {key: 'tourism', label: 'Tourism', description: 'Scenic places and experiences'},
  {key: 'products', label: 'Products', description: 'Local goods and treats'},
  {key: 'history', label: 'History', description: 'Stories and heritage'},
  {key: 'contact', label: 'Contact', description: 'Reach out to the team'},
];

export function Sidebar({isOpen, activeScreen, onClose, onSelectScreen}: SidebarProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal transparent visible={isOpen} animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={[styles.drawer, {paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24}]}> 
          <View style={styles.drawerHeader}>
            <View>
              <Text style={styles.drawerTitle}>Syunik Menu</Text>
              <Text style={styles.drawerSubtitle}>Jump to any section</Text>
            </View>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </Pressable>
          </View>

          {menuItems.map(item => {
            const isActive = activeScreen === item.key;

            return (
              <Pressable
                key={item.key}
                style={[styles.menuItem, isActive && styles.activeMenuItem]}
                onPress={() => onSelectScreen(item.key)}>
                <View style={styles.menuItemContent}>
                  <Text style={[styles.menuLabel, isActive && styles.activeMenuLabel]}>
                    {item.label}
                  </Text>
                  <Text style={styles.menuDescription}>{item.description}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(22, 25, 22, 0.35)',
  },
  backdrop: {
    flex: 1,
  },
  drawer: {
    width: '78%',
    maxWidth: 320,
    backgroundColor: '#fffef9',
    paddingHorizontal: 18,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2f3e2f',
  },
  drawerSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: '#7a8c5f',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2ebdc',
  },
  closeButtonText: {
    color: '#4b6b3b',
    fontSize: 16,
    fontWeight: '700',
  },
  menuItem: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  activeMenuItem: {
    backgroundColor: '#f2ebdc',
  },
  menuItemContent: {
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
    color: '#7a8c5f',
  },
});
