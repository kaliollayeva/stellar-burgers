import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, TFeedsResponse } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

type State = {
  data: {
    orders: TOrder[];
    total: number;
    totalToday: number;
  };
  isLoading: boolean;
  error: string | null;
};

const initialState: State = {
  data: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  isLoading: false,
  error: null
};

export const fetchFeed = createAsyncThunk<TFeedsResponse>(
  'orders/all',
  async (_, { rejectWithValue }) => {
    try {
      return await getFeedsApi();
    } catch (err) {
      return rejectWithValue('Не удалось загрузить feed');
    }
  }
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});
