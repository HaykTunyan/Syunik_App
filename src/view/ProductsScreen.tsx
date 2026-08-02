import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type ProductsScreenProps = {
  onBack: () => void;
};

type ProductItem = {
  name: string;
  price: string;
  size: string;
  description: string;
  image: any;
};

const products: ProductItem[] = [
  {
    name: 'Cultural Print Cap',
    price: '$16',
    size: 'One Size',
    description: 'A casual cap inspired by the heritage and colors of the region.',
    image: require('../assets/images/products/Khustup-shute.jpg'),
  },
];

export function ProductsScreen({onBack}: ProductsScreenProps) {

    /**
     * 
     * ProductsScreen is a React component that displays a list of products related to the Syunik region. It includes a back button, a title, a body of text, and a series of cards showcasing different products with their images, names, prices, sizes, and descriptions. The component uses a ScrollView to allow users to scroll through the content vertically.
     * Props:
     * - onBack: A function that is called when the back button is pressed. This allows the parent component to handle navigation back to the previous screen.
     */

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14 }}>
        <Pressable style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </Pressable>
        </View>

        <Text style={styles.title}>Our Products</Text>
        <Text style={styles.body}>
          Discover handcrafted and locally inspired merchandise from Syunik.
        </Text>

        {products.map(product => (
          <View key={product.name} style={styles.card}>
            <Image source={product.image} resizeMode="stretch" style={styles.image} />
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Price</Text>
              <Text style={styles.metaValue}>{product.price}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Size</Text>
              <Text style={styles.metaValue}>{product.size}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6efe6',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 28,
    paddingTop: 16,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 14,
  },
  backButtonText: {
    color: '#4b6b3b',
    fontSize: 15,
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2f3e2f',
    marginBottom: 8,
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    color: '#4d4d4d',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 3},
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 270,
    borderRadius: 12,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2f3e2f',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#5f5f5f',
    marginBottom: 10,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  metaLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4b6b3b',
  },
  metaValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2f3e2f',
  },
});
