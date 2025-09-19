import reducer, {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser
} from './userSlice';
import { TUser } from '@utils-types';

describe('userSlice', () => {
  const initialState = {
    isAuthChecked: false,
    isAuthenticated: false,
    data: null,
    loginUserError: null,
    registerUserError: null,
    loginUserRequest: false,
    registerUserRequest: false,
    updateUserError: null,
    updateUserRequest: false
  };

  const mockUser: TUser = {
    email: 'test@example.com',
    name: 'Test User'
  };

  it('проверка registerUser.pending', () => {
    const state = reducer(initialState, { type: registerUser.pending.type });
    expect(state.registerUserRequest).toBe(true);
    expect(state.registerUserError).toBeNull();
  });

  it('проверка registerUser.fulfilled', () => {
    const state = reducer(initialState, {
      type: registerUser.fulfilled.type,
      payload: mockUser
    });
    expect(state.data).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
    expect(state.registerUserRequest).toBe(false);
  });

  it('проверка registerUser.rejected', () => {
    const state = reducer(initialState, {
      type: registerUser.rejected.type,
      payload: 'Ошибка регистрации'
    });
    expect(state.registerUserError).toBe('Ошибка регистрации');
    expect(state.registerUserRequest).toBe(false);
  });

  it('проверка loginUser.pending', () => {
    const state = reducer(initialState, { type: loginUser.pending.type });
    expect(state.loginUserRequest).toBe(true);
    expect(state.loginUserError).toBeNull();
  });

  it('проверка  loginUser.fulfilled', () => {
    const state = reducer(initialState, {
      type: loginUser.fulfilled.type,
      payload: mockUser
    });
    expect(state.data).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
    expect(state.isAuthChecked).toBe(true);
    expect(state.loginUserRequest).toBe(false);
  });

  it('проверка loginUser.rejected', () => {
    const state = reducer(initialState, {
      type: loginUser.rejected.type,
      payload: 'Ошибка логина'
    });
    expect(state.loginUserError).toBe('Ошибка логина');
    expect(state.isAuthChecked).toBe(true);
    expect(state.loginUserRequest).toBe(false);
  });

  it('проверка getUser.fulfilled', () => {
    const state = reducer(initialState, {
      type: getUser.fulfilled.type,
      payload: mockUser
    });
    expect(state.data).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
    expect(state.isAuthChecked).toBe(true);
  });

  it('проверка getUser.rejected', () => {
    const state = reducer(initialState, { type: getUser.rejected.type });
    expect(state.isAuthenticated).toBe(false);
    expect(state.isAuthChecked).toBe(true);
  });

  it('проверка updateUser.pending', () => {
    const state = reducer(initialState, { type: updateUser.pending.type });
    expect(state.updateUserRequest).toBe(true);
    expect(state.updateUserError).toBeNull();
  });

  it('проверка updateUser.fulfilled', () => {
    const state = reducer(initialState, {
      type: updateUser.fulfilled.type,
      payload: mockUser
    });
    expect(state.data).toEqual(mockUser);
    expect(state.updateUserRequest).toBe(false);
  });

  it('проверка updateUser.rejected', () => {
    const state = reducer(initialState, {
      type: updateUser.rejected.type,
      payload: 'Ошибка обновления'
    });
    expect(state.updateUserError).toBe('Ошибка обновления');
    expect(state.updateUserRequest).toBe(false);
  });

  it('проверка deleteUser.fulfilled', () => {
    const modifiedState = { ...initialState, data: mockUser, isAuthenticated: true };
    const state = reducer(modifiedState, { type: deleteUser.fulfilled.type });
    expect(state.data).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.isAuthChecked).toBe(true);
  });
});
