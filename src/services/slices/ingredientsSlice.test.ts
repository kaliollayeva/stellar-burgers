import { configureStore } from '@reduxjs/toolkit';
import { ingredientsSlice, fetchIngredients } from './ingredientsSlice';
import * as api from '../../utils/burger-api';

describe('ingredientsSlice', () => {
  const store = configureStore({
    reducer: {
      ingredients: ingredientsSlice.reducer,
    },
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should handle fetchIngredients.pending', () => {
    store.dispatch({ type: fetchIngredients.pending.type });
    const state = store.getState().ingredients;
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fetchIngredients.fulfilled', () => {
    const mockIngredients = [
      {
        _id: '1',
        name: 'Булка',
        type: 'bun',
        proteins: 10,
        fat: 5,
        carbohydrates: 20,
        calories: 200,
        price: 50,
        image: 'image.png',
        image_large: 'image_large.png',
        image_mobile: 'image_mobile.png',
      },
    ];

    store.dispatch({ type: fetchIngredients.fulfilled.type, payload: mockIngredients });
    const state = store.getState().ingredients;
    expect(state.isLoading).toBe(false);
    expect(state.items).toEqual(mockIngredients);
  });

  it('should handle fetchIngredients.rejected', () => {
    store.dispatch({
      type: fetchIngredients.rejected.type,
      payload: 'Не удалось загрузить ингредиенты',
    });
    const state = store.getState().ingredients;
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Не удалось загрузить ингредиенты');
  });

  it('should dispatch fetchIngredients and load data (mocked API)', async () => {
    const mockIngredients = [
      { _id: '2', name: 'Соус', type: 'sauce', proteins: 1, fat: 2, carbohydrates: 3, calories: 10, price: 15, image: '', image_large: '', image_mobile: '' },
    ];
    jest.spyOn(api, 'getIngredientsApi').mockResolvedValueOnce(mockIngredients);

    await store.dispatch(fetchIngredients() as any);

    const state = store.getState().ingredients;
    expect(state.items).toEqual(mockIngredients);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });
});
