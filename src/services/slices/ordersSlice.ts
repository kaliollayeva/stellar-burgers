import { getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type State = {
  orderRequest: boolean;
  order: TOrder | null;
  ordersList: TOrder[];
};

const initialState: State = {
  orderRequest: false,
  order: null,
  ordersList: []
};

export const createOrder = createAsyncThunk(
  'orders/create',
  async (ingredientIds: string[]) => {
    const res = await orderBurgerApi(ingredientIds);
    return res.order;
  }
);

export const getOrders = createAsyncThunk('orders/get', getOrdersApi);

export const ordersSlice = createSlice({
  name: 'orders',
  reducers: {
    clearOrderData: (state) => {
      state.order = null;
    },
    clearOrders: (state) => {
      state.ordersList = [];
    }
  },
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.orderRequest = false;
      })
      .addCase(createOrder.rejected, (state) => {
        state.orderRequest = false;
      })

      /* Orders */
      .addCase(getOrders.fulfilled, (state, action) => {
        state.ordersList = action.payload;
      });
  }
});

export const { clearOrderData, clearOrders } = ordersSlice.actions;
