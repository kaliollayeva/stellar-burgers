import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { orderBurgerApi } from '../../utils/burger-api';
import { v4 as uuidv4 } from 'uuid';

type ConstructorState = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

const initialState: ConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        state.constructorItems.ingredients.push(action.payload);
      },
      prepare: (ingredient: TConstructorIngredient) => ({
        payload: { ...ingredient, id: uuidv4() }
      })
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload
        );
    },
    setBun: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.constructorItems.bun = action.payload;
    },
    clearConstructor: (state) => {
      state.constructorItems = { bun: null, ingredients: [] };
    },
    closeOrderModal: (state) => {
      state.orderModalData = null;
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  setBun,
  clearConstructor,
  closeOrderModal
} = constructorSlice.actions;
