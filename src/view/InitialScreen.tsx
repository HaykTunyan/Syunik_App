import React from 'react';
import {Animated, Image, StyleSheet, Text, View} from 'react-native';

type InitialScreenProps = {
  onFinish: () => void;
};

export function InitialScreen({onFinish}: InitialScreenProps) {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.96)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 850,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      onFinish();
    }, 2000);

    return () => clearTimeout(timer);
  }, [fadeAnim, onFinish, scaleAnim]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/syunik_landscape.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.overlay} />

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{scale: scaleAnim}],
          },
        ]}>
        <View style={styles.badgeWrap}>
          <Text style={styles.badgeText}>Syunik Region</Text>
        </View>

        <Text style={styles.title}>Explore the soul of Armenia</Text>
        <Text style={styles.subtitle}>Mountains, monasteries, villages and unforgettable views.</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e2f1f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(17, 29, 20, 0.52)',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  badgeWrap: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 18,
  },
  badgeText: {
    color: '#f3efe8',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  title: {
    color: '#fffaf4',
    fontSize: 34,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 40,
    letterSpacing: 0.5,
  },
  subtitle: {
    marginTop: 14,
    color: '#e8e2d7',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 300,
  },
});
