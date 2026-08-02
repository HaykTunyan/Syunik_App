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
                resizeMode="contain"
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
