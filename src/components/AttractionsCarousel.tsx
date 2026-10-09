import React, { useCallback, useState } from 'react';
import {
  Image,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import type { Attraction } from '../data/citiesData';

type AttractionsCarouselProps = {
  attractions: Attraction[];
};

const ASPECT_RATIO = 16 / 9;

export function AttractionsCarousel({ attractions }: AttractionsCarouselProps) {

  /**
   * 
   * AttractionsCarousel is a React component that displays a carousel of attractions for a specific city. It takes an array of attractions as a prop and renders them in a horizontally scrollable carousel format. The component calculates the height of the carousel based on the width and a predefined aspect ratio. It also handles layout changes to ensure the carousel adjusts its size correctly when the device orientation changes or when the screen size changes.
   * 
   */


  const [carouselWidth, setCarouselWidth] = useState(0);

  const carouselHeight = carouselWidth / ASPECT_RATIO;
  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setCarouselWidth(currentWidth =>
      Math.abs(currentWidth - width) < 1 ? currentWidth : width,
    );
  }, []);

  return (
    <View onLayout={handleLayout} style={styles.container}>
      {carouselWidth > 0 && (
        <Carousel
          autoPlay
          autoPlayInterval={3500}
          data={attractions}
          height={carouselHeight}
          loop={attractions.length > 1}
          pagingEnabled
          width={carouselWidth}
          renderItem={({ item }) => (
            <View style={styles.slide}>
              <Image
                source={item.image}
                resizeMode="cover"
                style={styles.image}
              />
              <View style={styles.caption}>
                <Text style={styles.captionText}>{item.id}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  slide: {
    borderRadius: 14,
    flex: 1,
    overflow: 'hidden',
  },
  image: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#f4ede2',
    width: '100%',
    height: '100%',
  },
  caption: {
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    bottom: 0,
    left: 0,
    paddingHorizontal: 14,
    paddingVertical: 10,
    position: 'absolute',
    right: 0,
  },
  captionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
