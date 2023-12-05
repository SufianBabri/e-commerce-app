import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CartItem} from '../../models/CartItem';

export type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (cart: CartState, action: PayloadAction<Product>) => {
      const product = action.payload;
      const item = cart.items.find(it => it.id === product.id);
      if (item) {
        item.quantity++;
      } else {
        cart.items.push({...product, quantity: 1});
      }
    },
    incrementQuantity: (cart: CartState, action: PayloadAction<number>) => {
      const productId = action.payload;
      const item = cart.items.find(it => it.id === productId);
      if (!item) {
        return;
      }

      item.quantity++;
    },
    decrementQuantity: (cart: CartState, action: PayloadAction<number>) => {
      const productId = action.payload;
      const item = cart.items.find(it => it.id === productId);
      if (!item) {
        return;
      }

      item.quantity--;
      if (item.quantity <= 0) {
        cart.items = cart.items.filter(it => it.id !== productId);
      }
    },
  },
});

export const {addToCart, incrementQuantity, decrementQuantity} =
  cartSlice.actions;
export default cartSlice.reducer;
