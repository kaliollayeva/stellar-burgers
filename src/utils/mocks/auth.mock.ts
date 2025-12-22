import { TRegisterData, TAuthResponse } from '../burger-api';

export const mockRegisterUserApi = (
  data: TRegisterData
): Promise<TAuthResponse> =>
  Promise.resolve({
    success: true,
    accessToken: 'mock-access-token',
    refreshToken: 'mock-refresh-token',
    user: {
      name: data.name,
      email: data.email,
      _id: 'mock-user-id'
    }
  });
