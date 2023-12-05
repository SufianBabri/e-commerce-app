import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export type ProductsState = {
  products: Product[] | undefined;
  isLoading: boolean;
  error: string | undefined;
};

const initialState: ProductsState = {
  products: undefined,
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
    return response.data;
  } catch (e) {
    console.error('error-in-api', e);
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
        state.products = undefined;
        state.error = action.payload;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
        state.error = undefined;
      });
  },
});

export default productsSlice.reducer;
