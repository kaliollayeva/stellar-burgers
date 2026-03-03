import { TFeedsResponse, TNewOrderResponse } from '../burger-api';
import { getMockOrders, addMockOrder } from './orders.store';
import { mockUser } from './auth.mock';
import { TOrder } from '../types';

export const mockGetFeedsApi = (): Promise<TFeedsResponse> => {
  const orders = getMockOrders();
  return Promise.resolve({
    success: true,
    orders: orders,
    total: orders.length,
    totalToday: orders.length
  });
};

export const mockOrderBurgerApi = (
  ingredients: string[]
): Promise<TNewOrderResponse> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const newOrder: TOrder = {
        _id: crypto.randomUUID(),
        number: Math.floor(Math.random() * 90000) + 10000,
        name: 'Mock Burger',
        status: 'done',
        ingredients,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        owner: mockUser?.email
      } as any;

      addMockOrder(newOrder);

      resolve({
        success: true,
        order: newOrder,
        name: newOrder.name
      });
    }, 500);
  });

export const mockGetUserOrdersApi = (): Promise<TOrder[]> => {
  const allOrders = getMockOrders();
  const myOrders = allOrders.filter(
    (order) => (order as any).owner === mockUser?.email
  );
  return Promise.resolve(myOrders);
};
