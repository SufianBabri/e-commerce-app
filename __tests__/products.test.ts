import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import {configStore, Store} from '../src/store/configure-store';
import {fetchProducts} from '../src/store/features/products';
import {beforeEach, describe, expect, it} from '@jest/globals';

describe('products', () => {
  const fetchProductsUrl =
    'https://my-json-server.typicode.com/benirvingplt/products/products';
  let fakeAxios: MockAdapter;
  let store: Store;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configStore();
  });

  it('should fetch data from server', async () => {
    const fetchedProducts = [
      {
        id: 1,
        colour: 'Black',
        name: 'Black Sheet Strappy Textured Glitter Bodycon Dress',
        price: 10,
        img: 'https://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024',
      },
    ];
    fakeAxios.onGet(fetchProductsUrl).reply(200, fetchedProducts);

    await store.dispatch(fetchProducts());

    expect(store.getState().products.items).toEqual(fetchedProducts);
    expect(store.getState().products.error).toBeFalsy();
  });

  it('should handle failed responses', async () => {
    fakeAxios.onGet(fetchProductsUrl).reply(500);

    await store.dispatch(fetchProducts());

    expect(store.getState().products.items).toBeUndefined();
    expect(store.getState().products.error).toBeTruthy();
  });
});
