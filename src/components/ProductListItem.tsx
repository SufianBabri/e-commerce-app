import {Button, Image, StyleSheet, Text, View} from 'react-native';
import {useAppDispatch} from '../store/configure-store';
import {addToCart} from '../store/features/cart';

type Props = {product: Product};

export default function ProductListItem({product}: Props) {
  const {name, colour, price, img} = product;
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Image style={styles.thumbnail} source={{uri: img}} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.color}>Color: {colour}</Text>
        <Text style={styles.price}>${price}</Text>
        <Button
          title="Add to Cart"
          onPress={() => dispatch(addToCart(product))}
        />
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
