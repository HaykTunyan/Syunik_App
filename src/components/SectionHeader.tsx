import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  actionText?: string;
  onActionPress?: () => void;
};

export function SectionHeader({
  title,
  subtitle,
  actionText,
  onActionPress,
}: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.titleWrap}>
        <View style={styles.accent} />
        <View style={styles.textWrap}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
      </View>
      {actionText && onActionPress ? (
        <Pressable onPress={onActionPress} hitSlop={8}>
          <Text style={styles.action}>{actionText}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  titleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 10,
  },
  accent: {
    width: 4,
    height: 26,
    borderRadius: 2,
    backgroundColor: '#4b6b3b',
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2f3e2f',
  },
  subtitle: {
    fontSize: 13,
    color: '#7a8c5f',
    marginTop: 2,
  },
  action: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4b6b3b',
  },
});

