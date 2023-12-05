import {RootState, useAppDispatch} from './store/configure-store';
import {useSelector} from 'react-redux';
import {fetchProducts, ProductsState} from './store/features/products';
import {useCallback, useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
} from 'react-native';
import ProductItem from './components/ProductItem';

export default function HomeTab() {
  const dispatch = useAppDispatch();
  const {products, isLoading, error} = useSelector<RootState, ProductsState>(
    state => state.products,
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    isLoading && console.log('Loading');
    error && console.log(error);
    products && console.log('products', products);
  }, []);

  const renderProduct = useCallback(
    ({item}: ListRenderItemInfo<Product>) => <ProductItem product={item} />,
    [],
  );

  if (isLoading) {
    return <ActivityIndicator style={styles.loader} color="red" size="large" />;
  }

  return (
    <FlatList
      data={products}
      renderItem={renderProduct}
      ListEmptyComponent={<Text style={styles.empty}>No products found!</Text>}
    />
  );
}

const styles = StyleSheet.create({
  loader: {alignSelf: 'center'},
  empty: {color: 'black'},
});
