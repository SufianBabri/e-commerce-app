import {configStore, Store} from '../src/store/configure-store';
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from '../src/store/features/cart';
import {it, beforeEach, describe, expect} from '@jest/globals';
import {Product} from '../src/models/Product';

describe('products', () => {
  let product: Product;
  let store: Store;

  beforeEach(() => {
    store = configStore();
  });

  beforeEach(() => {
    product = {
      id: 1,
      colour: 'Black',
      name: 'Black Sheet Strappy Textured Glitter Bodycon Dress',
      price: 10,
      img: 'https://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024',
    };
  });

  it('should add product if does not exist already', async () => {
    await store.dispatch(addToCart(product));

    expect(store.getState().cart.items[0].quantity).toBe(1);
  });

  it('should increment quantity of a product when addToCart called again', async () => {
    await store.dispatch(addToCart(product));
    await store.dispatch(addToCart(product));

    expect(store.getState().cart.items[0].quantity).toBe(2);
  });

  it('should increment quantity of a product when incrementQuantity called', async () => {
    await store.dispatch(addToCart(product));
    await store.dispatch(incrementQuantity(product.id));

    expect(store.getState().cart.items[0].quantity).toBe(2);
  });

  it('should decrement quantity of a product if called decrementQuantity', async () => {
    await store.dispatch(addToCart(product));
    await store.dispatch(addToCart(product));
    await store.dispatch(decrementQuantity(product.id));

    expect(store.getState().cart.items[0].quantity).toBe(1);
  });
});
