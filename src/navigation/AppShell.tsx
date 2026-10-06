import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AppHeader} from '../components/AppHeader';
import {Sidebar} from '../components/Sidebar';
import {
  useVoiceAssistant,
  type AssistantPageContext,
} from '../components/VoiceAssistant';
import {colors} from '../config/theme';
import type {AppScreen} from './types';

type AppShellProps = {
  activeScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  children: React.ReactNode;
  assistantContext?: AssistantPageContext;
};

export function AppShell({activeScreen, onNavigate, children, assistantContext}: AppShellProps) {
  const safeAreaInsets = useSafeAreaInsets();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {openAssistant, updatePageContext} = useVoiceAssistant();
  const {page, title, detail} = assistantContext ?? {};
  const context = useMemo(
    () => ({
      page: page ?? activeScreen,
      title: title ?? `${activeScreen.charAt(0).toUpperCase()}${activeScreen.slice(1)} in Syunik Dreams`,
      ...(detail ? {detail} : {}),
    }),
    [activeScreen, detail, page, title],
  );

  useEffect(() => {
    updatePageContext(context);
  }, [context, updatePageContext]);

  return (
    <View style={[styles.screenArea, {paddingTop: safeAreaInsets.top}]}> 
      <View style={styles.container}>
        <AppHeader
          activeScreen={activeScreen}
          onOpenMenu={() => setIsSidebarOpen(true)}
          onOpenAssistant={() => openAssistant(context)}
        />
        <View style={styles.content}>{children}</View>
        <Sidebar
          isOpen={isSidebarOpen}
          activeScreen={activeScreen}
          onClose={() => setIsSidebarOpen(false)}
          onSelectScreen={screen => {
            setIsSidebarOpen(false);
            onNavigate(screen);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenArea: {flex: 1},
  container: {flex: 1, backgroundColor: colors.background},
  content: {flex: 1},
});
