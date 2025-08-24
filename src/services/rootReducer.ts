import { combineReducers } from '@reduxjs/toolkit';

import { ingredientsSlice } from './slices/ingredientsSlice';
import { constructorSlice } from './slices/constructorSlice';
import { userSlice } from './slices/userSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  constructorData: constructorSlice.reducer,
  user: userSlice.reducer
});
