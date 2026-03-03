import { TAuthResponse } from '../burger-api';
import { TUser } from '../types';

export let mockUser: TUser | null = null;

export const setMockUser = (user: TUser | null) => {
  mockUser = user;
};

export const mockRegister = (
  email: string,
  name: string
): Promise<TAuthResponse> => {
  mockUser = {
    email,
    name
  };

  return Promise.resolve({
    success: true,
    refreshToken: 'mock-refresh-token',
    accessToken: 'mock-access-token',
    user: mockUser
  });
};

export const mockLogin = (email: string): Promise<TAuthResponse> => {
  const user = {
    email,
    name: 'Mock User'
  };

  setMockUser(user);

  return Promise.resolve({
    success: true,
    accessToken: 'mock-access-token',
    refreshToken: 'mock-refresh-token',
    user: user
  });
};
