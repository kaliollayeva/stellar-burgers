import { TOrder } from '../types';

let mockOrders: TOrder[] = [
  {
    _id: 'order-1',
    status: 'done',
    name: 'Space Burger',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    number: 1001,
    ingredients: ['ingredient-1', 'ingredient-2']
  },
  {
    _id: 'order-2',
    status: 'pending',
    name: 'Galaxy Burger',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    number: 1002,
    ingredients: ['ingredient-3']
  }
];

export const addMockOrder = (order: TOrder) => {
  mockOrders = [order, ...mockOrders];
};

export const getMockOrders = () => mockOrders;

export const getMockOrderByNumber = (number: number) =>
  mockOrders.find((o) => o.number === number);
