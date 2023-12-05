import {RootState, useAppDispatch} from '../store/configure-store';
import {useSelector} from 'react-redux';
import {fetchProducts, ProductsState} from '../store/features/products';
import {useCallback, useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import ProductListItem from '../components/ProductListItem';
import {Product} from '../models/Product';

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const {products, isLoading, error} = useSelector<RootState, ProductsState>(
    state => state.products,
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const renderProduct = useCallback(
    ({item}: ListRenderItemInfo<Product>) => <ProductListItem product={item} />,
    [],
  );
  const renderUi = useCallback(() => {
    if (isLoading) {
      return (
        <ActivityIndicator style={styles.loader} color="red" size="large" />
      );
    } else if (error) {
      return <Text style={styles.text}>{error}</Text>;
    }

    return (
      <FlatList
        data={products}
        renderItem={renderProduct}
        ListEmptyComponent={<Text style={styles.text}>No products found!</Text>}
      />
    );
  }, [products, isLoading, error, renderProduct]);

  return <SafeAreaView style={styles.container}>{renderUi()}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  loader: {alignSelf: 'center'},
  text: {color: 'black'},
});
