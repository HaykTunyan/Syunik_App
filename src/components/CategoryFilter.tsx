import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text} from 'react-native';

type CategoryFilterProps<T extends string> = {
  categories: readonly T[];
  selectedCategory: T;
  onSelectCategory: (category: T) => void;
};

export function CategoryFilter<T extends string>({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps<T>) {

  /**
   * 
   * CategoryFilter is a React component that provides a horizontal scrollable list of categories for filtering content. It takes in an array of categories, the currently selected category, and a callback function to handle category selection. The component uses React Native's ScrollView for horizontal scrolling and Pressable for interactive category buttons. Styles are applied to differentiate between selected and unselected categories, enhancing the user experience.
   * 
   * @template T - A string type representing the category names.
   * @param {CategoryFilterProps<T>} props - The properties for the CategoryFilter component.
   * @returns {JSX.Element}
   * 
   */


  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
      accessibilityLabel="Filter categories">
      {categories.map(category => {
        const isSelected = category === selectedCategory;

        return (
          <Pressable
            key={category}
            onPress={() => onSelectCategory(category)}
            accessibilityRole="button"
            accessibilityState={{selected: isSelected}}
            accessibilityLabel={`Filter by ${category}`}
            style={[styles.category, isSelected && styles.selectedCategory]}>
            <Text style={[styles.label, isSelected && styles.selectedLabel]}>
              {category}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    gap: 8,
    paddingBottom: 4,
  },
  category: {
    borderColor: '#ded6ca',
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 9,
    backgroundColor: '#fffdf8',
  },
  selectedCategory: {
    backgroundColor: '#2D4A3E',
    borderColor: '#2D4A3E',
  },
  label: {
    color: '#6c716c',
    fontSize: 13,
    fontWeight: '700',
  },
  selectedLabel: {
    color: '#fff',
  },
});
