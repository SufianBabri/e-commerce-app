import {Image, StyleSheet, Text, View} from 'react-native';

type Props = {product: Product};

export default function ProductItem({product}: Props) {
  const {name, colour, price, img} = product;

  return (
    <View style={styles.container}>
      <Image style={styles.thumbnail} source={{uri: img}} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.color}>Color: {colour}</Text>
        <Text style={styles.price}>${price}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  thumbnail: {width: 80, height: 80},
  infoContainer: {
    flex: 1,
    paddingHorizontal: 8,
  },
  name: {color: 'black'},
  color: {color: 'black'},
  price: {color: 'black'},
});
