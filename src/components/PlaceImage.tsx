import React, {useState} from 'react';
import {Image, StyleSheet, Text, View, type ImageSourcePropType, type ImageStyle, type StyleProp} from 'react-native';
import {ImageOff} from 'lucide-react-native';
import {colors} from '../config/theme';

type PlaceImageProps = {
  source?: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
  accessibilityLabel?: string;
};

export function PlaceImage({source, style, accessibilityLabel = 'Place image'}: PlaceImageProps) {
  const [hasError, setHasError] = useState(!source);

  if (hasError || !source) {
    return (
      <View accessibilityLabel={`${accessibilityLabel} unavailable`} style={[style, styles.placeholder]}>
        <ImageOff size={24} color={colors.textMuted} />
        <Text style={styles.placeholderText}>Image unavailable</Text>
      </View>
    );
  }

  return <Image accessibilityLabel={accessibilityLabel} onError={() => setHasError(true)} source={source} style={style} />;
}

const styles = StyleSheet.create({
  placeholder: {alignItems: 'center', backgroundColor: colors.surfaceAlt, justifyContent: 'center', overflow: 'hidden'},
  placeholderText: {color: colors.textMuted, fontSize: 11, fontWeight: '600', marginTop: 6},
});
