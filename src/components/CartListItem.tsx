import {Button, Image, StyleSheet, Text, View} from 'react-native';
import {CartItem} from '../models/CartItem';
import {useAppDispatch} from '../store/configure-store';
import {decrementQuantity, incrementQuantity} from '../store/features/cart';

type Props = {item: CartItem};

export default function CartListItem({item}: Props) {
  const {id, name, colour, price, img, quantity} = item;
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Image style={styles.thumbnail} source={{uri: img}} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.color}>Color: {colour}</Text>
        <Text style={styles.price}>${price}</Text>
        <View style={{flexDirection: 'row'}}>
          <Button title="-" onPress={() => dispatch(decrementQuantity(id))} />
          <Text style={styles.quantity}>{quantity}</Text>
          <Button title="+" onPress={() => dispatch(incrementQuantity(id))} />
        </View>
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
  quantity: {
    color: 'black',
    paddingHorizontal: 8,
    textAlignVertical: 'center',
  },
});
