import { feedSlice, fetchFeed } from './feedSlice';
import type { TFeedsResponse } from '../../utils/burger-api';
import type { TOrder } from '../../utils/types';

describe('feedSlice async actions', () => {
  const reducer = feedSlice.reducer;

  it('должен установить isLoading = true и очистить error при fetchFeed.pending', () => {
    const initialState = reducer(undefined, { type: '' });

    const state = reducer(initialState, { type: fetchFeed.pending.type });

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен сохранить данные и снять isLoading при fetchFeed.fulfilled', () => {
    const initialState = reducer(undefined, { type: '' });

    const mockResponse: TFeedsResponse = {
      success: true,
      orders: [
        {
          _id: '1',
          status: 'done',
          name: 'Тестовый бургер',
          createdAt: '2025-09-16',
          updatedAt: '2025-09-16',
          number: 101,
          ingredients: ['123', '456']
        } as TOrder
      ],
      total: 10,
      totalToday: 2
    };

    const state = reducer(initialState, {
      type: fetchFeed.fulfilled.type,
      payload: mockResponse
    });

    expect(state.isLoading).toBe(false);
    expect(state.data).toEqual(mockResponse);
  });

  it('должен сохранить ошибку и снять isLoading при fetchFeed.rejected', () => {
    const initialState = reducer(undefined, { type: '' });

    const state = reducer(initialState, {
      type: fetchFeed.rejected.type,
      payload: 'Ошибка загрузки'
    });

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });
});
