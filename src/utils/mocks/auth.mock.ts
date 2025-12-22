import { TAuthResponse } from '../burger-api';
import { TUser } from '../types';

let mockUser: TUser;

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
    accessToken: 'mock-access-token',
    refreshToken: 'mock-refresh-token',
    user: mockUser
  });
};

export const mockLogin = (email: string): Promise<TAuthResponse> =>
  Promise.resolve({
    success: true,
    accessToken: 'mock-access-token',
    refreshToken: 'mock-refresh-token',
    user: mockUser ?? {
      _id: 'mock-user-id',
      email,
      name: 'Mock User'
    }
  });
