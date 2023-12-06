import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {Product} from '../../models/Product';

export type ProductsState = {
  items: Product[] | undefined;
  isLoading: boolean;
  error: string | undefined;
};

const initialState: ProductsState = {
  items: undefined,
  isLoading: false,
  error: undefined,
};

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  {
    rejectValue: string;
  }
>('products/fetchProducts', async (_, thunkApi) => {
  try {
    const response = await axios.get<Product[]>(
      'https://my-json-server.typicode.com/benirvingplt/products/products',
    );

    return response.data.map(p => {
      if (p.img.startsWith('http://'))
        return {...p, img: p.img.replace('http://', 'https://')};
      else return p;
    });
  } catch (e) {
    return thunkApi.rejectWithValue('An error has occurred');
  }
});

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.items = undefined;
        state.error = action.payload;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.error = undefined;
      });
  },
});

export default productsSlice.reducer;
