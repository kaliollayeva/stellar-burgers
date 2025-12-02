import { ordersSlice, createOrder, getOrders, clearOrderData, clearOrders } from './ordersSlice';
import { TOrder } from '@utils-types';

const reducer = ordersSlice.reducer;

const mockOrder: TOrder = {
  _id: '123',
  status: 'done',
  name: 'Test Burger',
  createdAt: '2023-01-01',
  updatedAt: '2023-01-01',
  number: 1,
  ingredients: ['ing1', 'ing2']
};

describe('ordersSlice', () => {
  it('должен возвращать initialState', () => {
    expect(reducer(undefined, { type: '' })).toEqual({
      orderRequest: false,
      order: null,
      ordersList: []
    });
  });

  it('createOrder.pending → orderRequest = true', () => {
    const state = reducer(undefined, { type: createOrder.pending.type });
    expect(state.orderRequest).toBe(true);
    expect(state.order).toBeNull();
  });

  it('createOrder.fulfilled → кладёт заказ и сбрасывает orderRequest', () => {
    const state = reducer(
      { orderRequest: true, order: null, ordersList: [] },
      { type: createOrder.fulfilled.type, payload: mockOrder }
    );
    expect(state.order).toEqual(mockOrder);
    expect(state.orderRequest).toBe(false);
  });

  it('createOrder.rejected → orderRequest = false', () => {
    const state = reducer(
      { orderRequest: true, order: null, ordersList: [] },
      { type: createOrder.rejected.type }
    );
    expect(state.orderRequest).toBe(false);
  });

  it('getOrders.fulfilled → записывает список заказов', () => {
    const orders = [mockOrder];
    const state = reducer(
      undefined,
      { type: getOrders.fulfilled.type, payload: orders }
    );
    expect(state.ordersList).toEqual(orders);
  });

  it('clearOrderData → очищает order', () => {
    const state = reducer(
      { orderRequest: false, order: mockOrder, ordersList: [] },
      clearOrderData()
    );
    expect(state.order).toBeNull();
  });

  it('clearOrders → очищает ordersList', () => {
    const state = reducer(
      { orderRequest: false, order: null, ordersList: [mockOrder] },
      clearOrders()
    );
    expect(state.ordersList).toEqual([]);
  });
});
