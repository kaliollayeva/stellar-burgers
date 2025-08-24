import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserApi, loginUserApi, registerUserApi, TRegisterData } from '@api';
import { TUser } from '@utils-types';
import { getCookie, setCookie } from '../../utils/cookie';

type State = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  data: TUser | null;
  loginUserError: unknown | null;
  registerUserError: unknown | null;
  loginUserRequest: unknown | null;
  registerUserRequest: boolean;
};

const initialState: State = {
  isAuthChecked: false,
  isAuthenticated: false,
  data: null,
  loginUserError: null,
  registerUserError: null,
  loginUserRequest: false,
  registerUserRequest: false
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ email, password, name }: TRegisterData, { rejectWithValue }) => {
    const data = await registerUserApi({ email, password, name });

    if (!data.success) {
      return rejectWithValue(data);
    }

    return data.user;
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (
    { email, password }: Omit<TRegisterData, 'name'>,
    { rejectWithValue }
  ) => {
    const data = await loginUserApi({ email, password });

    if (!data?.success) {
      return rejectWithValue(data);
    }

    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const getUser = createAsyncThunk(
  'user/getUser',
  async (_, { rejectWithValue }) => {
    try {
      if (getCookie('accessToken')) {
        const data = await getUserApi();
        return data.user;
      } else {
        return rejectWithValue('No access token');
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.registerUserRequest = true;
        state.registerUserError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerUserRequest = false;
        state.registerUserError = action.payload;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.registerUserRequest = false;
        state.isAuthenticated = true;
      });
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(getUser.rejected, (state) => {
        state.isAuthenticated = false;
        state.isAuthChecked = true;
      });
  }
});
