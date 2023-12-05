import {RootState} from '../store/configure-store';
import {useSelector} from 'react-redux';
import {useCallback} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import {CartState} from '../store/features/cart';
import {CartItem} from '../models/CartItem';
import CartListItem from '../components/CartListItem';

export default function CartScreen() {
  const {items} = useSelector<RootState, CartState>(state => state.cart);

  const renderCart = useCallback(
    ({item}: ListRenderItemInfo<CartItem>) => <CartListItem item={item} />,
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderCart}
        ListEmptyComponent={
          <Text style={styles.text}>Your cart is empty!</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  loader: {alignSelf: 'center'},
  text: {color: 'black'},
});
