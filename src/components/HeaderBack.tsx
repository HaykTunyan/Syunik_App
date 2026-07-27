import React from 'react';
import { Pressable, Text, View } from 'react-native';

type HeaderBackProps = {
  onBack: () => void;
};

export function HeaderBack({ onBack }: HeaderBackProps) {

    /**
     * 
     * HeaderBack is a React component that renders a back button for navigation purposes. It accepts a single prop, onBack, which is a function that gets called when the back button is pressed. This allows the parent component to handle the navigation logic, such as going back to the previous screen or performing any other action when the user wants to go back.
     * 
     * Props:
     * - onBack: A function that is called when the back button is pressed. This allows the parent component to handle navigation back to the previous screen.
     */


  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
      }}
    >
      <Pressable
        onPress={onBack}
        style={{ alignSelf: 'flex-start' }}
      >
        <Text
          style={{
            color: '#4b6b3b',
            fontSize: 15,
            fontWeight: '600',
          }}
        >
          ← Back
        </Text>
      </Pressable>
    </View>
  );
}