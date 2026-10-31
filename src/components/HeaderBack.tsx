import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';

type HeaderBackProps = {
  onBack: () => void;
};

export function HeaderBack({ onBack }: HeaderBackProps) {
  const {t} = useTranslation();
    /**
     * 
     * HeaderBack is a React component that renders a back button for navigation purposes. It accepts a single prop, onBack, which is a function that gets called when the back button is pressed. This allows the parent component to handle the navigation logic, such as going back to the previous screen or performing any other action when the user wants to go back.
     * 
     * Props:
     * - onBack: A function that is called when the back button is pressed. This allows the parent component to handle navigation back to the previous screen.
     */

  return (
    <View
      style={styles.container}
    >
      <Pressable
        onPress={onBack}
        style={styles.button}
        accessibilityRole="button"
        accessibilityLabel={t('common.back')}
      >
        <Text
          style={styles.text}
        >
          ← {t('common.back')}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {alignItems: 'center', flexDirection: 'row', marginBottom: 14},
  button: {alignSelf: 'flex-start'},
  text: {color: '#4b6b3b', fontSize: 15, fontWeight: '600'},
});
