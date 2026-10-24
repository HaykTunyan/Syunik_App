import React, {memo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Clock3, Heart} from 'lucide-react-native';
import {colors} from '../config/theme';
import type {Place} from '../data/places';
import {PlaceImage} from './PlaceImage';

type PlaceCardProps = {
  place: Place;
  onPress: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  distance?: string;
};

export const PlaceCard = memo(function PlaceCardView({place, onPress, isFavorite = false, onToggleFavorite, distance}: PlaceCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Open ${place.name}`}
      onPress={onPress}
      style={({pressed}) => [styles.card, pressed && styles.cardPressed]}>
      <View style={styles.imageWrap}>
        <PlaceImage accessibilityLabel={`${place.name} image`} source={place.image} style={styles.image} />
        {onToggleFavorite && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${isFavorite ? 'Remove' : 'Add'} ${place.name} ${isFavorite ? 'from' : 'to'} favorites`}
            accessibilityState={{selected: isFavorite}}
            hitSlop={8}
            onPress={event => {
              event.stopPropagation();
              onToggleFavorite();
            }}
            style={styles.favoriteButton}>
            <Heart size={18} color={isFavorite ? colors.accent : colors.white} fill={isFavorite ? colors.accent : 'transparent'} />
          </Pressable>
        )}
      </View>
      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.name}>{place.name}</Text>
        <Text numberOfLines={1} style={styles.meta}>{place.cityName} · {place.category}</Text>
        <Text numberOfLines={2} style={styles.description}>{place.shortDescription ?? place.description}</Text>
        <View style={styles.footer}>
          <View style={styles.duration}><Clock3 size={14} color={colors.textMuted} /><Text style={styles.durationText}>{formatDuration(place.recommendedDuration)}</Text></View>
          {distance && <Text style={styles.distance}>{distance}</Text>}
        </View>
      </View>
    </Pressable>
  );
});

function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h${remainingMinutes ? ` ${remainingMinutes}m` : ''}`;
}

const styles = StyleSheet.create({
  card: {backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 16, borderWidth: 1, overflow: 'hidden', width: 220},
  cardPressed: {opacity: 0.84, transform: [{scale: 0.985}]},
  imageWrap: {height: 132, position: 'relative'},
  image: {height: '100%', width: '100%'},
  favoriteButton: {alignItems: 'center', backgroundColor: 'rgba(45, 74, 62, 0.78)', borderRadius: 18, height: 36, justifyContent: 'center', position: 'absolute', right: 10, top: 10, width: 36},
  content: {padding: 12},
  name: {color: colors.text, fontSize: 16, fontWeight: '800'},
  meta: {color: colors.brand, fontSize: 11, fontWeight: '700', marginTop: 4, textTransform: 'capitalize'},
  description: {color: colors.textSecondary, fontSize: 12, lineHeight: 17, marginTop: 8, minHeight: 34},
  footer: {alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10},
  duration: {alignItems: 'center', flexDirection: 'row', gap: 5},
  durationText: {color: colors.textMuted, fontSize: 11, fontWeight: '700'},
  distance: {color: colors.textMuted, fontSize: 11},
});
