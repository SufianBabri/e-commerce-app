import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import productsReducer from './features/products';
import cartReducer from './features/cart';

export const configStore = () =>
  configureStore({
    reducer: {
      products: productsReducer,
      cart: cartReducer,
    },
  });

const store = configStore();
export type Store = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
